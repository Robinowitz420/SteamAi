export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const steamId = searchParams.get('steamid');
  const apiKey = searchParams.get('key');

  if (!steamId || !apiKey) {
    return new Response(JSON.stringify({ error: 'Missing steamid or key' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const steamUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true&format=json`;

  const res = await fetch(steamUrl);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}