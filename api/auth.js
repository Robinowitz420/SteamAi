export const config = {
  runtime: 'edge',
};

// Steam OpenID login
export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');
  const callbackUrl = searchParams.get('callback') || 'https://steamaiapp.vercel.app';
  
  if (action === 'login') {
    // Redirect to Steam OpenID
    const steamOpenIdUrl = 'https://steamcommunity.com/openid/login';
    const params = new URLSearchParams({
      'openid.ns': 'http://specs.openid.net/auth/2.0',
      'openid.mode': 'checkid_setup',
      'openid.return_to': `${callbackUrl}/api/auth?action=verify`,
      'openid.realm': callbackUrl,
      'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
      'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
    });
    
    return Response.redirect(`${steamOpenIdUrl}?${params}`);
  }
  
  if (action === 'verify') {
    // Verify Steam's response
    const openidParams = {};
    for (const [key, value] of searchParams.entries()) {
      openidParams[key] = value;
    }
    
    // Validate with Steam
    const validateParams = new URLSearchParams({
      ...openidParams,
      'openid.mode': 'check_authentication',
    });
    
    const validateRes = await fetch('https://steamcommunity.com/openid/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: validateParams,
    });
    
    const validateText = await validateRes.text();
    
    if (validateText.includes('is_valid:true')) {
      // Extract Steam ID from claimed_id
      const claimedId = openidParams['openid.claimed_id'];
      const steamIdMatch = claimedId.match(/\/id\/(\d+)$/);
      const steamId = steamIdMatch ? steamIdMatch[1] : null;
      
      if (steamId) {
        // Set session cookie and redirect to dashboard
        const sessionToken = btoa(JSON.stringify({ steamId, timestamp: Date.now() }));
        const redirectUrl = new URL(callbackUrl);
        redirectUrl.pathname = '/';
        redirectUrl.searchParams.set('session', sessionToken);
        
        return new Response(null, {
          status: 302,
          headers: {
            'Location': redirectUrl.toString(),
            'Set-Cookie': `steam_session=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
          },
        });
      }
    }
    
    // Failed verification
    return Response.redirect(`${callbackUrl}/?error=auth_failed`);
  }
  
  if (action === 'logout') {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': callbackUrl,
        'Set-Cookie': 'steam_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
      },
    });
  }
  
  return new Response(JSON.stringify({ error: 'Invalid action' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
}
