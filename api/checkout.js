export const config = {
  runtime: 'edge',
};

// Stripe checkout integration
// Requires STRIPE_SECRET_KEY environment variable

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
  
  try {
    const body = await req.json();
    const { steamId, successUrl, cancelUrl } = body;
    
    if (!steamId) {
      return new Response(JSON.stringify({ error: 'Missing steamId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
    
    // Get Stripe secret key from environment
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeKey) {
      // Mock response for testing without Stripe
      return new Response(JSON.stringify({
        url: `${successUrl}?mock_payment=true&steam_id=${steamId}`,
        message: 'Stripe not configured - mock checkout',
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
    
    // Create Stripe checkout session
    const sessionRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'line_items[][price_data][currency]': 'usd',
        'line_items[][price_data][product_data][name]': 'SteamAi Premium Access',
        'line_items[][price_data][product_data][description]': 'Lifetime access to SteamAi gaming analytics dashboard',
        'line_items[][price_data][unit_amount]': '499', // $4.99 in cents
        'line_items[][quantity]': '1',
        'mode': 'payment',
        'success_url': `${successUrl}?session_id={CHECKOUT_SESSION_ID}&steam_id=${steamId}`,
        'cancel_url': cancelUrl,
        'metadata[steam_id]': steamId,
        'client_reference_id': steamId,
      }),
    });
    
    const session = await sessionRes.json();
    
    if (session.error) {
      throw new Error(session.error.message);
    }
    
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
