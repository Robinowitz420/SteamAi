export const config = {
  runtime: 'edge',
};

// User tracking and access control
// Uses Vercel KV (Redis) - requires @vercel/kv package

let kv = null;

async function getKV() {
  if (!kv) {
    // Dynamic import for Vercel KV
    const { VercelKV } = await import('@vercel/kv');
    kv = VercelKV;
  }
  return kv;
}

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');
  const steamId = searchParams.get('steamId');
  
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  
  try {
    // If no KV configured, use simple in-memory fallback (not persistent)
    // In production, set up Vercel KV at https://vercel.com/dashboard
    
    if (action === 'status' && steamId) {
      // Check if user has access
      const userCount = await getUserCount();
      const hasPaid = await hasUserPaid(steamId);
      const isEarlyAdopter = userCount <= 250;
      
      const hasAccess = hasPaid || isEarlyAdopter || (await isUserRegistered(steamId) && userCount <= 250);
      
      return new Response(JSON.stringify({
        hasAccess,
        hasPaid,
        userCount,
        isEarlyAdopter,
        needsPayment: !hasAccess,
        price: 4.99,
      }), { headers });
    }
    
    if (action === 'register' && steamId) {
      // Register a new user
      const alreadyRegistered = await isUserRegistered(steamId);
      
      if (!alreadyRegistered) {
        await registerUser(steamId);
      }
      
      const userCount = await getUserCount();
      const hasAccess = userCount <= 250;
      
      return new Response(JSON.stringify({
        success: true,
        userCount,
        hasAccess,
        needsPayment: !hasAccess,
      }), { headers });
    }
    
    if (action === 'count') {
      const userCount = await getUserCount();
      return new Response(JSON.stringify({ userCount }), { headers });
    }
    
    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers,
    });
  } catch (e) {
    // Fallback: Use localStorage-based counting (client-side will handle)
    return new Response(JSON.stringify({ 
      error: 'KV not configured',
      fallback: true,
      message: 'Set up Vercel KV for persistent user tracking',
    }), { headers });
  }
}

// These functions would use Vercel KV in production
// For now, we'll implement a simple version

const userStore = {
  users: new Set(),
  paid: new Set(),
};

async function getUserCount() {
  // In production: return await kv.get('user_count') || 0;
  return userStore.users.size;
}

async function isUserRegistered(steamId) {
  // In production: return await kv.sismember('registered_users', steamId);
  return userStore.users.has(steamId);
}

async function registerUser(steamId) {
  // In production:
  // await kv.sadd('registered_users', steamId);
  // await kv.incr('user_count');
  userStore.users.add(steamId);
}

async function hasUserPaid(steamId) {
  // In production: return await kv.sismember('paid_users', steamId);
  return userStore.paid.has(steamId);
}

async function markUserPaid(steamId) {
  // In production: await kv.sadd('paid_users', steamId);
  userStore.paid.add(steamId);
}
