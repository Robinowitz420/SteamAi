// Vercel Edge Function - Fetches Steam player profile data (avatar, username)
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const apikey = url.searchParams.get('apikey');
    const steamid = url.searchParams.get('steamid');

    if (!apikey || !steamid) {
      return new Response(
        JSON.stringify({ error: 'Missing API key or Steam ID' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get player summaries from Steam API
    const steamApiUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apikey}&steamids=${steamid}`;

    const response = await fetch(steamApiUrl);

    if (!response.ok) {
      throw new Error(`Steam API error: ${response.status}`);
    }

    const data = await response.json();

    const player = data.response?.players?.[0] || null;

    return new Response(
      JSON.stringify({
        steamid: steamid,
        personaname: player?.personaname || 'Unknown',
        avatar: player?.avatarfull || player?.avatarmedium || player?.avatar || '',
        avatarMedium: player?.avatarmedium || '',
        avatarSmall: player?.avatar || '',
        profileurl: player?.profileurl || '',
        personastate: player?.personastate || 0,
        realname: player?.realname || '',
        timecreated: player?.timecreated || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Steam profile API proxy error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
