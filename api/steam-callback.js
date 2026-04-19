// Vercel Edge Function - Handles Steam OpenID callback
// Extracts Steam ID from the OpenID response and redirects back to the app
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);
  const params = url.searchParams;

  // Extract Steam ID from the claimed_id parameter
  // Format: https://steamcommunity.com/openid/id/76561198029274325
  const claimedId = params.get('openid.claimed_id') || params.get('openid.identity') || '';

  const steamIdMatch = claimedId.match(/\/id\/(\d+)$/);

  if (!steamIdMatch) {
    // Failed to extract Steam ID - redirect back with error
    return Response.redirect(`${url.origin}/?steam_error=no_id`, 302);
  }

  const steamId = steamIdMatch[1];

  // Verify the OpenID response with Steam (security check)
  try {
    const verifyParams = new URLSearchParams(params);
    verifyParams.set('openid.mode', 'check_authentication');

    const verifyResponse = await fetch('https://steamcommunity.com/openid/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verifyParams.toString()
    });

    const verifyText = await verifyResponse.text();

    if (!verifyText.includes('is_valid:true')) {
      console.error('Steam OpenID verification failed:', verifyText);
      return Response.redirect(`${url.origin}/?steam_error=verification_failed`, 302);
    }
  } catch (error) {
    console.error('Steam verification error:', error);
    // Still redirect with Steam ID - verification is a security enhancement
  }

  // Redirect back to the app with the Steam ID
  return Response.redirect(`${url.origin}/?steam_id=${steamId}`, 302);
}
