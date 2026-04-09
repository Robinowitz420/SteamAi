# Steam.AI Dashboard - Frontend Handoff Package

## Project Overview

**Steam.AI** is a Steam library analytics dashboard that provides insights into a user's gaming habits, patterns, and library composition. It fetches data from Steam's API and uses Claude AI for behavioral analysis.

**Live App:** https://steamaiapp.vercel.app  
**GitHub:** https://github.com/Robinowitz420/SteamAi

---

## Tech Stack

- **Frontend:** Vanilla JavaScript, Pure CSS (no frameworks)
- **Backend:** Vercel Edge Functions (serverless)
- **APIs:** Steam Web API, Steam Store API, Anthropic Claude API
- **Deployment:** Vercel

---

## Application Flow

### 3 Phases:

1. **Setup Phase (p0)** - User enters API keys and Steam ID
2. **Loading Phase (p1)** - Fetches library data with progress logs
3. **Dashboard Phase (p2)** - Displays all analytics and AI chat

---

## UI Components Needed

### Phase 0: Setup Screen

**Current Elements:**
- Header with title "STEAM.AI"
- Input fields:
  - Steam API Key (text input)
  - Steam ID (text input)
  - Proxy URL (text input, pre-filled)
  - Anthropic API Key (text input)
- "ANALYZE MY LIBRARY" button
- "Saved credentials" indicator

**Data Collected:**
```javascript
config = {
  apiKey: string,      // Steam API key
  steamId: string,     // User's Steam ID
  proxyUrl: string,    // Vercel proxy URL
  anthropicKey: string // Claude API key
}
```

---

### Phase 1: Loading Screen

**Current Elements:**
- Spinner animation
- "FETCHING YOUR STEAM LIBRARY..." text
- Log output showing progress:
  - "Connecting to Steam..."
  - "Found X games..."
  - "Calculating stats..."
  - "Ready!"

---

### Phase 2: Dashboard

#### Top Section: AI Gaming Analyst Box

**Components:**
- Title: "AI GAMING ANALYST"
- "REGENERATE PROFILE" button (top right)
- AI analysis text area (scrollable, ~180px max-height)
  - Dynamic welcome message
  - Behavioral profile text
  - Changes based on returning vs new user
- Chat log (scrollable, ~150px max-height)
- Chat input field with SEND button

**Data Flow:**
- On load: Fetches AI analysis from `/api/claude`
- Chat: Sends user message, appends response to chat log
- Regenerate: Re-fetches behavioral profile

---

#### Chart Row 1 (3 columns):

**1. COMMITMENT LEVEL (Donut Chart)**
- Shows game distribution by playtime:
  - Never played
  - Barely tried (1-60m)
  - Dabbled (1-10h)
  - Invested (10-100h)
  - Committed (100h+)
- Data: Array of `{ label, count, color }`

**2. WHERE YOUR TIME WENT (Horizontal Bar Chart)**
- Top 15 games by playtime
- Shows game name and hours
- Data: Array of `{ name, hours }`

**3. LAST 2 WEEKS (Live Activity List)**
- Games played in last 2 weeks
- Shows game name and hours with green dot indicator
- Data: Array of `{ name, hours }`
- Fallback: "Nothing played in last 2 weeks"

---

#### Chart Row 2 (2 columns):

**4. PLAYTIME VS CRITICAL RECEPTION (Scatter Plot)**
- X-axis: Playtime (log scale)
- Y-axis: Metacritic score (0-100)
- Dots for each game
- Hover shows game name
- Data: Array of `{ name, hours, score, recent }`
- Error state: "No Metacritic data found"

**5. YOUR GAMING GENRES (Horizontal Bar Chart)**
- Top 8 genres by total playtime
- Shows genre name and hours
- Data: Array of `{ genre, hours }`
- Colors: Array of 8 hex colors

---

#### Chart Row 3 (3 columns):

**6. ACHIEVEMENT PROGRESS (Progress Bars)**
- Top 8 games by completion percentage
- Shows game name, progress bar, unlocked/total
- Data: Array of `{ name, percent, unlocked, total }`
- Error state: "No achievement data available" + link to Steam privacy settings

**7. YOUR MONEY VS YOUR TIME (Stats Grid)**
- Total games
- Never played count
- Under 1 hour count
- Total hours
- Cost per hour (estimated)
- Wasted money estimate
- Data: Object with stat values

**8. YOUR LIBRARY FINGERPRINT (Heatmap Grid)**
- 7x24 grid (days × hours)
- Shows playtime intensity by time of week
- Color intensity based on playtime
- Hover shows day/hour
- Data: 2D array of playtime minutes

---

## API Endpoints

### `/api/steam` (GET)

**Parameters:**
- `key` - Steam API key
- `steamid` - User's Steam ID
- `endpoint` - Optional: `achievements` or `store`
- `appid` - Required for achievements/store endpoints

**Responses:**
- Default: Owned games list
- `endpoint=achievements`: Player achievements for appid
- `endpoint=store`: Game details (Metacritic, genres) for appid

### `/api/claude` (POST)

**Body:**
```json
{
  "apiKey": "string",
  "prompt": "string",
  "maxTokens": number
}
```

**Response:**
```json
{
  "response": "string"
}
```

---

## Data Structures

### Games Array
```javascript
games = [
  {
    appid: number,
    name: string,
    playtime_forever: number,  // minutes
    playtime_2weeks: number    // minutes
  }
]
```

### Chart Data Examples

**Commitment Level:**
```javascript
buckets = [
  { label: 'Never played', count: 50, color: '#1e2d40' },
  { label: 'Barely tried (1-60m)', count: 20, color: '#2a3f5f' },
  // ...
]
```

**Genre Breakdown:**
```javascript
sorted = [
  ['Action', 1250.5],
  ['RPG', 890.2],
  // ...
]
```

**Achievement Data:**
```javascript
achievements = [
  { name: 'PUBG', percent: 89.2, unlocked: 33, total: 37 },
  // ...
]
```

---

## Current Color Scheme (CSS Variables)

```css
--bg: #0a0e14;
--panel: #0d1117;
--border: #1e2d40;
--text: #c5d1de;
--muted: #5c6370;
--accent: #4fc3f7;
--success: #4caf7d;
--error: #f44336;
```

---

## Current Fonts

- **Headers:** Rajdhani (Google Fonts)
- **Body/Data:** IBM Plex Mono (Google Fonts)

---

## Responsive Requirements

- Desktop-first design
- Max width: 1600px
- Chart grid: 3 columns (row 1), 2 columns (row 2), 3 columns (row 3)
- All charts should scale proportionally

---

## Error States Needed

1. **Missing API keys** - "Add X API key for analysis"
2. **Private Steam profile** - "Profile must be public" + link to settings
3. **No Metacritic data** - "No Metacritic data found"
4. **No genre data** - "Unable to load genre data"
5. **No achievement data** - "No achievement data available" + privacy link
6. **No recent activity** - "Nothing played in last 2 weeks"
7. **AI analysis failed** - "AI analysis failed: [error message]"

---

## Loading States Needed

1. **Initial load** - Spinner + "FETCHING YOUR STEAM LIBRARY..."
2. **Per-chart loading** - Small spinner in each chart container
3. **AI analysis loading** - Spinner in AI box
4. **Chat sending** - Input disabled, spinner in chat log

---

## LocalStorage Keys

- `steamai` - Saved config (API keys, Steam ID, proxy URL)
- `steamai.chat` - Chat message history
- `steamai_last_session` - Last session data (for dynamic welcome)

---

## Interaction Requirements

1. **Enter key** - Sends chat message
2. **Chart hovers** - Show tooltips/data on hover
3. **Scrollable areas** - AI analysis, chat log
4. **Regenerate button** - Re-fetch AI profile
5. **New Profile button** - Return to setup screen

---

## Files to Reference

- `index.html` - Main application (HTML + CSS + JS)
- `api/steam.js` - Steam API proxy
- `api/claude.js` - Claude API proxy

---

## Notes

- No external chart libraries (currently pure CSS/SVG)
- No JavaScript frameworks (currently vanilla JS)
- All API calls go through Vercel proxy to avoid CORS
- Progressive loading with batching (5 games per batch, 200ms delay)
- Dark terminal aesthetic currently used

---

## Deliverables Expected

1. Redesigned UI with improved visual hierarchy
2. Better chart visualizations (can use libraries if needed)
3. Improved loading states and animations
4. Better error state designs
5. Responsive layout improvements
6. Enhanced interactivity (hover states, transitions)
7. Cleaner typography and spacing

---

# NEW UI DESIGN PACKAGE

**Design files location:** `D:\DigitalTwin\DigitalTwin\stitch_steam_ai_dashboard_design`

## Design System: "The Galactic HUD"

### Creative North Star
**"The Tactical Glass Horizon"** - A cockpit HUD (Heads-Up Display) aesthetic. Not a website, but aerospace instrumentation. Features concentric depth, curvilinear framing, and holographic layering.

---

## New Color Palette

```css
/* Primary Colors */
--primary: #a8e8ff;           /* Ion Blue - Active state, primary data */
--primary-container: #00d4ff; /* Bright cyan for CTAs */
--secondary: #ffb77d;         /* Solar Flare - Warnings, heat signatures */
--tertiary: #00fcc0;          /* Plasma Green - System 'Go' status */

/* Backgrounds */
--background: #0f1418;        /* The Void - Main background */
--surface: #0f1418;
--surface-container: #1b2024;
--surface-container-low: #171c20;
--surface-container-high: #262b2f;
--surface-container-lowest: #0a0f13;

/* Text */
--on-surface: #dfe3e9;
--on-surface-variant: #bbc9cf;
--outline: #859398;
--outline-variant: #3c494e;
```

---

## Typography

```css
/* Fonts */
--font-headline: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
--font-label: 'Space Grotesk', sans-serif;

/* Sizes */
--display-lg: 3.5rem;    /* Critical ship status */
--headline-md: 1.75rem;  /* Module titles */
--body-md: 0.875rem;     /* Tactical readouts */
--label-sm: 0.6875rem;   /* All-caps labels (+10% letter-spacing) */
```

---

## Design Rules

### The "No-Line" Rule
- **NO 1px solid borders**
- Define sections by tonal transitions (surface to surface-container-low)
- Use glow-bleed: 1-2px inner-shadow with surface-tint at 10% opacity

### Glassmorphism (All Primary Surfaces)
```css
.glass-panel {
  background: rgba(27, 32, 36, 0.6);
  backdrop-filter: blur(12px);
  box-shadow: inset 0 0 2px rgba(168, 232, 255, 0.1);
}
```

### Signature Gradient (CTAs)
```css
background: linear-gradient(135deg, #a8e8ff, #00d4ff);
```

### Ambient Shadows
```css
/* For floating HUD elements */
box-shadow: 0px 20px 40px rgba(168, 232, 255, 0.05);
```

### Ghost Borders (If Needed)
```css
border: 1px solid rgba(60, 73, 78, 0.15);
```

---

## New Component Mappings

### Phase 0: Setup Screen
**File:** `setup_secure_terminal/code.html`

**Mapping:**
- "Vessel Commander ID" input = Steam ID
- "Access Frequency" input = Steam API Key (password field)
- "Navigation Sector Key" input = Proxy URL
- "Biometric Link" section = Anthropic API Key
- "INITIATE SCAN" button = "ANALYZE MY LIBRARY"

**Visual Elements:**
- Spaceship bridge background image
- Glass panel with scan-line effect
- Radar sweep animation (CSS conic-gradient)
- Retina scan visual (decorative)
- Encryption level indicator (decorative)
- System status footer (CPU temp, latency, etc.)

---

### Phase 1: Loading Screen
**File:** `loading_warp_jump/code.html`

**Mapping:**
- Progress percentage = Loading progress
- Segmented progress bar = Visual loading indicator
- "LIVE_TELEMETRY" log = Fetch log output
- Status messages = "Connecting to Steam...", "Found X games...", etc.

**Visual Elements:**
- Warp tunnel background (hyperspace jump)
- Cockpit glass overlay contours
- Radar sweep placeholder
- Power bar display (reactor output)
- Hardware diagnostics (temp, bolt, wifi)
- G-Force warning indicator

---

### Phase 2: Dashboard
**File:** `main_dashboard_ship_s_bridge/code.html`

**Layout:**
- **SideNavBar:** Navigation (Bridge, Logbook, Comms, AI Officer, Launch)
- **TopNavBar:** Search, settings, profile
- **Status Bar:** Life support, shields, reactor core status
- **AI Officer Box:** Chat interface with AI
- **Main Grid:** Charts in bento-grid layout

**Chart Mappings:**

| Old Chart | New Component | Visual Style |
|-----------|---------------|--------------|
| COMMITMENT LEVEL | Commitment Core | Circular SVG progress with glow |
| WHERE YOUR TIME WENT | Time Allocation Cells | Vertical fuel cell bars |
| YOUR GAMING GENRES | (Add to Time Allocation) | Same fuel cell visualization |
| LAST 2 WEEKS | (Add to Status Bar or separate panel) | Live activity list |
| PLAYTIME VS CRITICAL RECEPTION | (Add new panel) | Scatter plot in HUD style |
| ACHIEVEMENT PROGRESS | (Add new panel) | Progress bars with glow |
| YOUR MONEY VS YOUR TIME | (Add to Library Fingerprint) | Stats in radar panel |
| YOUR LIBRARY FINGERPRINT | Library Fingerprint | Radar grid with data points |

**AI Officer Box:**
- Avatar with glow border
- Chat log with timestamped messages
- Input field with send icon
- Regenerate button for profile

---

## Required Animations

```css
/* Radar Sweep */
.radar-sweep {
  background: conic-gradient(from 0deg, rgba(0, 252, 192, 0.2) 0%, transparent 20%);
  animation: spin 4s linear infinite;
}

/* Scanning Line */
.scanning-line {
  background: linear-gradient(to right, transparent, #a8e8ff, transparent);
  animation: bounce 2s ease-in-out infinite;
}

/* Pulse Glow */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 10px rgba(168, 232, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(168, 232, 255, 0.6); }
}
```

---

## Implementation Notes

1. **Use Tailwind CSS** - New designs use Tailwind with custom config
2. **Keep existing JavaScript** - All API calls and data processing remain the same
3. **Map data to new components** - Same data, new visual representation
4. **Maintain error states** - Use glass-panel styling for error messages
5. **Preserve localStorage** - Same keys for persistence
6. **Keep proxy endpoints** - Same API routes

---

## Contact

For questions about data structures or API integration, refer to the codebase or reach out.
