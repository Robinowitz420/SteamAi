# Steam.AI

Real owned games + playtime—no fake data—through Claude and a tiny Edge proxy.

Steam.AI tackles decision fatigue and "library guilt": huge backlogs, repeat purchases you never launch, and wishlists that don't match how you actually play. It imports your real library, then surfaces a behavioral profile, pattern call-outs, mood- and time-based picks for tonight, wishlist verdicts, and "find something new" recommendations that track behavior—not stated taste.

## Features

- **Real Steam Data Integration**: Uses your actual Steam library and playtime data
- **Behavioral Profile**: AI-powered analysis of your gaming patterns and habits
- **Mood-Based Recommendations**: Get game suggestions based on your current mood and available time
- **Wishlist Analysis**: Honest verdicts on your wishlist items (YES/MAYBE/KIDDING YOURSELF)
- **Interactive Chat**: Library-aware chat with Claude grounded in your gaming data
- **Single File Architecture**: Fast, shareable, and easy to deploy

## Tech Stack

- **Frontend**: Single HTML/CSS/JS file (no build step required)
- **Backend**: Vercel Edge Functions for Steam + Claude API proxying
- **AI**: Anthropic Claude for behavioral analysis and recommendations
- **Storage**: localStorage for configuration, profiles, and chat history
- **APIs**: Steam Web API, Steam Store API, Anthropic Messages API

## Setup

### Prerequisites

1. **Steam API Key**: Get yours from [Steam Web API](https://steamcommunity.com/dev/apikey)
2. **Steam ID**: Find your Steam ID using [Steam ID Finder](https://steamid.io/)
3. **Claude API Key**: Get yours from [Anthropic Console](https://console.anthropic.com/)

### Local Development

1. Clone or download this repository
2. Install Vercel CLI: `npm i -g vercel`
3. Run locally: `vercel dev`
4. Open `http://localhost:3000` in your browser
5. Enter your API keys and Steam ID to initialize

### Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/steam-ai)

Or manually:

```bash
npm install
vercel --prod
```

## How It Works

### Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Browser UI    │────│  Edge Functions  │────│  External APIs  │
│  (index.html)   │    │  (/api/*)        │    │  Steam/Claude   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────│   localStorage  │──────────────┘
                        │  (persistence)  │
                        └─────────────────┘
```

### Data Flow

1. **Setup**: User enters API keys → saved to localStorage
2. **Data Import**: Edge functions proxy Steam API calls → fetch games/wishlist
3. **Analysis**: Claude processes gaming data → generates behavioral profile
4. **Features**: Mood selection + time → personalized recommendations
5. **Persistence**: All data stored locally → no re-authentication required

### Edge Functions

- `/api/steam` - Proxy for Steam PlayerService API (owned games)
- `/api/wishlist` - Proxy for Steam Store API (wishlist data)  
- `/api/claude` - Proxy for Anthropic Messages API (AI analysis)

## API Endpoints

### GET /api/steam
```javascript
// Query parameters
?apikey=STEAM_API_KEY&steamid=STEAM_ID

// Response format
{
  "response": {
    "game_count": 123,
    "games": [
      {
        "appid": 730,
        "name": "Counter-Strike 2",
        "playtime_forever": 12345,
        "img_icon_url": "...",
        "img_logo_url": "..."
      }
    ]
  }
}
```

### GET /api/wishlist
```javascript
// Query parameters  
?apikey=STEAM_API_KEY&steamid=STEAM_ID

// Response format
[
  {
    "name": "Game Title",
    "appid": 123456,
    "release_date": "Coming Soon",
    "price": "$19.99",
    "reviews_summary": "...",
    "tags": ["Action", "Adventure"]
  }
]
```

### POST /api/claude
```javascript
// Request body
{
  "apiKey": "ANTHROPIC_API_KEY",
  "prompt": "Your prompt here..."
}

// Response format
{
  "response": "Claude's response text"
}
```

## Security & Privacy

- **API Keys**: Stored only in browser localStorage (never on server)
- **Data Processing**: All AI processing happens via secure Edge functions
- **No Tracking**: No analytics or user tracking implemented
- **CORS Handling**: Properly configured for secure cross-origin requests

## Development Notes

### Single File Architecture

The entire frontend is contained in `index.html` for:
- **Speed**: No build step, instant loading
- **Portability**: Easy to share and deploy
- **Simplicity**: Minimal dependencies and configuration

### Claude Prompt Engineering

The system uses structured prompts to ensure consistent JSON output:
- Behavioral profile generation
- Mood-based recommendations
- Wishlist verdict analysis
- Contextual chat responses

### Error Handling

- Graceful fallbacks for API failures
- User-friendly error messages
- Retry logic for transient issues
- LocalStorage validation and recovery

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use, modify, and distribute.

## Troubleshooting

### Common Issues

**"Failed to fetch games"**
- Verify Steam API key is valid
- Check Steam ID format (64-bit SteamID)
- Ensure Steam profile is public

**"Claude API call failed"**  
- Verify Claude API key is valid
- Check API key permissions
- Monitor usage limits

**"CORS errors"**
- Ensure using Vercel dev or deployed environment
- Check Edge function deployment status
- Verify API endpoint URLs

### Debug Mode

Open browser console to see:
- API request/response logs
- localStorage state
- Error details and stack traces

---

Made with ❤️ for gamers who want to actually play their games.
