// Vercel Edge Function - Initiates Steam OpenID login
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);
  const returnUrl = url.searchParams.get('returnUrl') || `${url.origin}/api/steam-callback`;

  // Steam OpenID 2.0 login URL
  const steamLoginUrl = 'https://steamcommunity.com/openid/login';

  const params = new URLSearchParams({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': returnUrl,
    'openid.realm': url.origin,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select'
  });

  return Response.redirect(`${steamLoginUrl}?${params.toString()}`, 302);
}
