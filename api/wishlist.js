export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const steamId = searchParams.get('steamid');

  if (!steamId) {
    return new Response(JSON.stringify({ error: 'Missing steamid' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const wishlistUrl = `https://store.steampowered.com/wishlist/profiles/${encodeURIComponent(steamId)}/wishlistdata/`;

  const res = await fetch(wishlistUrl, {
    headers: {
      'User-Agent': 'steam-proxy',
      'Accept': 'application/json,text/plain,*/*',
    },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: `Wishlist HTTP ${res.status}` }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
