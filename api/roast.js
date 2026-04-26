// Vercel Edge Function for Claude Haiku roast proxy
// Uses ANTHROPIC_API_KEY env var — only for profile burn, everything else stays on Groq
export const config = { runtime: 'edge' };

export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();

    if (!body.messages) {
      return new Response(
        JSON.stringify({ error: 'Missing messages' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Anthropic API key not configured. Add ANTHROPIC_API_KEY env var.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 100,
        messages: body.messages
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Anthropic API error:', res.status, errorText);
      throw new Error(`Anthropic API error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Roast API proxy error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
