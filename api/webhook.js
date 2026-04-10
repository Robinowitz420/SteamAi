export const config = {
  runtime: 'edge',
};

// Stripe webhook to mark users as paid
// Requires STRIPE_WEBHOOK_SECRET environment variable

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    // Parse the event
    const event = JSON.parse(body);
    
    // In production, verify signature:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const steamId = session.client_reference_id || session.metadata?.steam_id;
      
      if (steamId) {
        // Mark user as paid
        // In production with KV:
        // await kv.sadd('paid_users', steamId);
        
        console.log(`User ${steamId} paid successfully`);
        
        // For now, store in a simple global (not persistent)
        // In production, use Vercel KV or Supabase
        global.paidUsers = global.paidUsers || new Set();
        global.paidUsers.add(steamId);
      }
    }
    
    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
