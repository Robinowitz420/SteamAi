const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Steam API proxy
app.get('/api/steam', async (req, res) => {
  try {
    const { apikey, steamid } = req.query;
    
    if (!apikey || !steamid) {
      return res.status(400).json({ error: 'Missing API key or Steam ID' });
    }

    const steamApiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apikey}&steamid=${steamid}&format=json&include_appinfo=1&include_played_free_games=1`;
    
    const response = await fetch(steamApiUrl);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Steam API proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Steam Wishlist API proxy
app.get('/api/wishlist', async (req, res) => {
  try {
    const { apikey, steamid } = req.query;
    
    if (!apikey || !steamid) {
      return res.status(400).json({ error: 'Missing API key or Steam ID' });
    }

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
    
    res.json(wishlist);
  } catch (error) {
    console.error('Steam wishlist API proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Claude API proxy
app.post('/api/claude', async (req, res) => {
  try {
    const { apiKey, prompt } = req.body;

    if (!apiKey || !prompt) {
      return res.status(400).json({ error: 'Missing API key or prompt' });
    }

    // List of Claude models to try (in order of preference)
    const models = [
      'claude-3-5-sonnet-20241022',
      'claude-3-5-sonnet-20240620',
      'claude-3-5-sonnet',
      'claude-3-sonnet-20240229',
      'claude-3-sonnet',
      'claude-3-opus-20240229',
      'claude-3-opus',
      'claude-3-haiku-20240307',
      'claude-3-haiku',
      'claude-2.1',
      'claude-2.0',
      'claude-instant-1.2'
    ];

    let lastError = null;
    
    // Try each model until one works
    for (const model of models) {
      try {
        console.log(`Trying Claude model: ${model}`);
        
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: model,
            max_tokens: 1000,
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ]
          })
        });

        if (claudeResponse.ok) {
          const claudeData = await claudeResponse.json();
          const response = claudeData.content[0]?.text || 'No response generated';
          console.log(`Success with model: ${model}`);
          return res.json({ response });
        } else {
          const errorData = await claudeResponse.text();
          console.log(`Model ${model} failed: ${claudeResponse.status}`);
          lastError = { status: claudeResponse.status, data: errorData };
        }
      } catch (modelError) {
        console.log(`Model ${model} error:`, modelError.message);
        lastError = modelError;
      }
    }
    
    // If all models failed, return the last error
    throw new Error(`All Claude models failed. Last error: ${JSON.stringify(lastError)}`);
    
  } catch (error) {
    console.error('Claude API proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log('API endpoints:');
  console.log('  GET /api/steam - Steam games proxy');
  console.log('  GET /api/wishlist - Steam wishlist proxy');
  console.log('  POST /api/claude - Claude API proxy');
});
