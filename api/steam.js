export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const steamId = searchParams.get('steamid');
  const apiKey = searchParams.get('key');
  const appid = searchParams.get('appid');
  const endpoint = searchParams.get('endpoint');

  // Store endpoint doesn't need steamid/key
  if (endpoint === 'store' && appid) {
    try {
      const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
      const data = await res.json();

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  if (!steamId || !apiKey) {
    return new Response(JSON.stringify({ error: 'Missing steamid or key' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let steamUrl;

  if (endpoint === 'achievements' && appid) {
    // Achievement endpoint
    steamUrl = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?appid=${appid}&steamid=${steamId}&key=${apiKey}&format=json`;
  } else {
    // Default: owned games endpoint
    steamUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true&format=json`;
  }

  try {
    const res = await fetch(steamUrl);
    const text = await res.text();
    
    // Check if Steam returned HTML (error page)
    if (text.startsWith('<') || text.startsWith('<!')) {
      return new Response(JSON.stringify({ 
        error: 'Steam API returned an error. Check your API key and Steam ID.',
        hint: 'Get your API key at https://steamcommunity.com/dev/apikey'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
    
    const data = JSON.parse(text);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}