// Vercel Edge Function for Steam Wishlist API proxy
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // Enable CORS
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
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get wishlist from Steam API
    const steamApiUrl = `https://store.steampowered.com/wishlist/profiles/${steamid}/wishlistdata`;
    
    const response = await fetch(steamApiUrl);
    
    if (!response.ok) {
      throw new Error(`Steam wishlist API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the data to a simpler format
    const wishlist = Object.values(data).map(item => ({
      name: item.name,
      appid: item.id,
      release_date: item.release_string,
      price: item.price_overview?.final_formatted || 'N/A',
      reviews_summary: item.reviews_summary,
      tags: item.tags?.map(tag => tag.name) || []
    }));
    
    return new Response(
      JSON.stringify(wishlist),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Steam wishlist API proxy error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
}
