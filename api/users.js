export const config = {
  runtime: 'edge',
};

// User tracking and access control
// Simple in-memory store - for production, use Vercel KV or Supabase

// Global store (persists per edge function instance)
const userStore = {
  users: new Set(),
  paid: new Set(),
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');
  const steamId = searchParams.get('steamId');
  
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  
  if (action === 'status' && steamId) {
    // Check if user has access
    const userCount = userStore.users.size;
    const hasPaid = userStore.paid.has(steamId);
    const isRegistered = userStore.users.has(steamId);
    const isEarlyAdopter = userCount < 250;
    
    // First 250 users get free access, or if they've paid
    const hasAccess = hasPaid || (isEarlyAdopter && isRegistered) || userCount < 250;
    
    return new Response(JSON.stringify({
      hasAccess,
      hasPaid,
      userCount,
      isEarlyAdopter,
      isRegistered,
      needsPayment: !hasAccess,
      price: 4.99,
    }), { headers });
  }
  
  if (action === 'register' && steamId) {
    // Register a new user
    const wasAlreadyRegistered = userStore.users.has(steamId);
    
    if (!wasAlreadyRegistered) {
      userStore.users.add(steamId);
    }
    
    const userCount = userStore.users.size;
    const hasAccess = userCount <= 250 || userStore.paid.has(steamId);
    
    return new Response(JSON.stringify({
      success: true,
      userCount,
      hasAccess,
      wasAlreadyRegistered,
      needsPayment: !hasAccess,
    }), { headers });
  }
  
  if (action === 'paid' && steamId) {
    // Mark user as paid (called after successful payment)
    userStore.paid.add(steamId);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'User marked as paid',
    }), { headers });
  }
  
  if (action === 'count') {
    const userCount = userStore.users.size;
    const paidCount = userStore.paid.size;
    return new Response(JSON.stringify({ userCount, paidCount }), { headers });
  }
  
  return new Response(JSON.stringify({ error: 'Invalid action' }), {
    status: 400,
    headers,
  });
}
