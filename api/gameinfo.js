export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const game = searchParams.get('game');
  const feature = searchParams.get('feature'); // e.g., "controller support", "story", etc.

  if (!game) {
    return new Response(JSON.stringify({ error: 'Missing game parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    // Search for game info using DuckDuckGo instant answer API (free, no key needed)
    const searchQuery = encodeURIComponent(`${game} game ${feature || 'info'}`);
    const searchUrl = `https://api.duckduckgo.com/?q=${searchQuery}&format=json&no_html=1&skip_disambig=1`;
    
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    
    // Extract relevant info
    const abstract = searchData.Abstract || '';
    const infobox = searchData.Infobox?.content || [];
    
    // Also try to get Steam store page info for controller support
    let controllerSupport = null;
    let steamInfo = null;
    
    // Search for the game on Steam to get appid
    const steamSearchUrl = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(game)}&l=english&cc=US`;
    const steamSearchRes = await fetch(steamSearchUrl);
    const steamSearchData = await steamSearchRes.json();
    
    if (steamSearchData.items && steamSearchData.items.length > 0) {
      const firstMatch = steamSearchData.items[0];
      const appid = firstMatch.id;
      
      // Get detailed info
      const detailsRes = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
      const detailsData = await detailsRes.json();
      
      if (detailsData[appid]?.data) {
        const data = detailsData[appid].data;
        steamInfo = {
          name: data.name,
          controller_support: data.controller_support || 'None',
          genres: data.genres?.map(g => g.description) || [],
          short_description: data.short_description || '',
          release_date: data.release_date?.date || '',
          metacritic: data.metacritic?.score || null,
        };
        controllerSupport = data.controller_support || 'Unknown';
      }
    }

    const result = {
      game,
      feature: feature || 'general info',
      abstract: abstract.substring(0, 500),
      steamInfo,
      controllerSupport,
      hasFeature: feature ? checkFeature(abstract, steamInfo, feature) : null,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

function checkFeature(abstract, steamInfo, feature) {
  const featureLower = feature.toLowerCase();
  
  // Check controller support
  if (featureLower.includes('controller')) {
    if (steamInfo?.controller_support) {
      return steamInfo.controller_support.toLowerCase().includes('full') || 
             steamInfo.controller_support.toLowerCase().includes('partial');
    }
    return abstract.toLowerCase().includes('controller');
  }
  
  // Check for story
  if (featureLower.includes('story') || featureLower.includes('narrative')) {
    const storyKeywords = ['story', 'narrative', 'campaign', 'story-driven', 'plot'];
    return storyKeywords.some(k => abstract.toLowerCase().includes(k)) ||
           (steamInfo?.genres?.some(g => g.toLowerCase().includes('rpg') || g.toLowerCase().includes('adventure')));
  }
  
  // Check for multiplayer
  if (featureLower.includes('multiplayer') || featureLower.includes('co-op')) {
    return abstract.toLowerCase().includes('multiplayer') || 
           abstract.toLowerCase().includes('co-op') ||
           (steamInfo?.genres?.some(g => g.toLowerCase().includes('multiplayer')));
  }
  
  return null; // Unknown
}
