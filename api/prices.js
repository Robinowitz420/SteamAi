// Vercel Edge Function - Fetches Steam store prices for games
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

  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const url = new URL(req.url);
    const appids = url.searchParams.get('appids');

    if (!appids) {
      return new Response(
        JSON.stringify({ error: 'Missing appids parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Steam appdetails API — up to 100 appids per request
    const steamUrl = `https://store.steampowered.com/api/appdetails?appids=${appids}&filters=price_overview&cc=us&l=en`;

    const response = await fetch(steamUrl);

    if (!response.ok) {
      throw new Error(`Steam Store API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract just the prices
    const prices = {};
    for (const [appid, info] of Object.entries(data)) {
      if (info.success && info.data?.price_overview) {
        prices[appid] = {
          name: info.data.name || '',
          price: info.data.price_overview.final / 100,
          formatted: info.data.price_overview.final_formatted,
          discount: info.data.price_overview.discount_percent || 0
        };
      } else {
        prices[appid] = { name: '', price: 0, formatted: 'Free/Unknown', discount: 0 };
      }
    }

    return new Response(
      JSON.stringify(prices),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Steam prices API proxy error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
