// ==================== GLOBAL STATE ====================
let steamData = { games: [], wishlist: [], profile: null, apiKey: '', steamId: '' };
let chatState = { chats: {}, currentChatId: null };
let analysisState = { shameScore: 0, heroHeadline: '', weeklyPick: null, lastSession: null };
let badgeState = { earned: [], filter: 'all' };

// ==================== TAB SWITCHING ====================
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    const id = 'tab' + tab.charAt(0).toUpperCase() + tab.slice(1);
    document.getElementById(id).classList.remove('hidden');
    document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');
}

// ==================== STEAM LOGIN ====================
function loginWithSteam() { window.location.href = '/api/steam-login'; }

// ==================== APP INIT ====================
async function initializeApp() {
    const steamApiKey = document.getElementById('steamApiKey').value.trim();
    const steamId = document.getElementById('steamId').value.trim();
    if (!steamApiKey || !steamId) { showSetupError('Please login with Steam or fill in both fields'); return; }
    try {
        steamData.apiKey = steamApiKey;
        steamData.steamId = steamId;
        localStorage.setItem('steamData', JSON.stringify({ apiKey: steamApiKey, steamId: steamId }));
        loadLastSession();
        await fetchSteamProfile();
        await fetchSteamData();
        document.getElementById('setup').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        showSetupSuccess('Steam.AI initialized successfully!');
    } catch (error) {
        showSetupError(`Failed to load Steam data: ${error.message}`);
    }
}

// Auto-init from URL params (Steam callback) or localStorage
(function autoInit() {
    const params = new URLSearchParams(window.location.search);
    const steamIdParam = params.get('steam_id');
    if (steamIdParam) {
        document.getElementById('steamId').value = steamIdParam;
        history.replaceState(null, '', '/');
    }
    const saved = localStorage.getItem('steamData');
    if (saved) {
        const d = JSON.parse(saved);
        document.getElementById('steamApiKey').value = d.apiKey || '';
        document.getElementById('steamId').value = d.steamId || steamIdParam || '';
        if (d.apiKey && d.steamId) initializeApp();
    }
})();

async function fetchSteamProfile() {
    try {
        const r = await fetch(`/api/steam-profile?apikey=${steamData.apiKey}&steamid=${steamData.steamId}`);
        if (r.ok) { steamData.profile = await r.json(); updateProfileDisplay(steamData.profile); }
    } catch (e) { console.error('Profile fetch error:', e); }
}

function updateProfileDisplay(profile) {
    if (!profile) return;
    const avatar = document.getElementById('topBarAvatar');
    const placeholder = document.getElementById('topBarAvatarPlaceholder');
    const username = document.getElementById('topBarUsername');
    if (profile.avatar) { avatar.src = profile.avatar; avatar.classList.remove('hidden'); placeholder.classList.add('hidden'); }
    if (profile.personaname) { username.textContent = profile.personaname; }
}

async function fetchSteamData() {
    const r = await fetch(`/api/steam?apikey=${steamData.apiKey}&steamid=${steamData.steamId}`);
    if (!r.ok) throw new Error(`Steam API error: ${r.status}`);
    const data = await r.json();
    if (data.response && data.response.games) { steamData.games = data.response.games; }
    else { throw new Error('No games found. Your profile might be private.'); }
    steamData.wishlist = [];
    updateStats();
}

// ==================== PRICE FETCHING ====================
async function fetchAllPrices() {
    // Check cache first (valid 24h)
    const cached = localStorage.getItem('steamai_prices');
    const cacheTs = localStorage.getItem('steamai_prices_timestamp');
    if (cached && cacheTs && Date.now() - parseInt(cacheTs) < 86400000) {
        try {
            steamData.prices = JSON.parse(cached);
            return;
        } catch (e) { /* cache corrupt, re-fetch */ }
    }

    const appids = steamData.games.map(g => g.appid);
    const prices = {};

    // Steam allows batching — fetch in chunks of 50 to be safe
    for (let i = 0; i < appids.length; i += 50) {
        const chunk = appids.slice(i, i + 50);
        try {
            const r = await fetch(`/api/prices?appids=${chunk.join(',')}`);
            if (r.ok) {
                const data = await r.json();
                Object.assign(prices, data);
            }
        } catch (e) { console.error('Price fetch chunk error:', e); }
        // Small delay to avoid rate limiting
        if (i + 50 < appids.length) await new Promise(r => setTimeout(r, 300));
    }

    steamData.prices = prices;
    localStorage.setItem('steamai_prices', JSON.stringify(prices));
    localStorage.setItem('steamai_prices_timestamp', Date.now().toString());
}

function calculateMoneyStats() {
    if (!steamData.prices || Object.keys(steamData.prices).length === 0) return null;
    let totalSpent = 0, wastedOnUnplayed = 0, wastedOnBarelyPlayed = 0;
    const gameValues = [];

    for (const game of steamData.games) {
        const p = steamData.prices[game.appid];
        const price = p?.price || 0;
        totalSpent += price;
        const hours = (game.playtime_forever || 0) / 60;
        if (hours === 0) wastedOnUnplayed += price;
        else if (hours < 1) wastedOnBarelyPlayed += price;
        if (hours > 0 && price > 0) {
            gameValues.push({ name: game.name, price, hours, valuePerHour: price / hours });
        }
    }

    const totalHours = steamData.games.reduce((s, g) => s + (g.playtime_forever || 0), 0) / 60;
    gameValues.sort((a, b) => a.valuePerHour - b.valuePerHour);

    analysisState.moneyStats = {
        totalSpent: totalSpent.toFixed(2),
        wastedOnUnplayed: wastedOnUnplayed.toFixed(2),
        wastedOnBarelyPlayed: wastedOnBarelyPlayed.toFixed(2),
        costPerHour: totalHours > 0 ? (totalSpent / totalHours).toFixed(2) : '0',
        bestValueGame: gameValues[0] || null,
        worstValueGame: gameValues[gameValues.length - 1] || null
    };
    return analysisState.moneyStats;
}

function renderMoneyStats() {
    const stats = analysisState.moneyStats;
    if (!stats) return;
    const el = document.getElementById('moneyStats');
    if (!el) return;
    el.innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-surface-container p-4 border-l-4 border-primary">
                <p class="text-[10px] font-label text-slate-500 uppercase">Total Spent</p>
                <p class="text-2xl font-headline font-bold text-white">$${stats.totalSpent}</p>
            </div>
            <div class="bg-surface-container p-4 border-l-4 border-accent2">
                <p class="text-[10px] font-label text-slate-500 uppercase">Wasted (Unplayed)</p>
                <p class="text-2xl font-headline font-bold text-red-400">$${stats.wastedOnUnplayed}</p>
            </div>
            <div class="bg-surface-container p-4 border-l-4 border-yellow-500">
                <p class="text-[10px] font-label text-slate-500 uppercase">Wasted (Under 1h)</p>
                <p class="text-2xl font-headline font-bold text-yellow-400">$${stats.wastedOnBarelyPlayed}</p>
            </div>
            <div class="bg-surface-container p-4 border-l-4 border-green">
                <p class="text-[10px] font-label text-slate-500 uppercase">Cost Per Hour</p>
                <p class="text-2xl font-headline font-bold text-green">$${stats.costPerHour}</p>
            </div>
        </div>
        ${stats.bestValueGame ? `<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-surface-container p-4 border-l-4 border-green">
                <p class="text-[10px] font-label text-slate-500 uppercase">Best Value</p>
                <p class="text-sm font-headline font-bold text-white">${stats.bestValueGame.name}</p>
                <p class="text-[11px] font-body text-slate-400">$${stats.bestValueGame.price} • ${Math.round(stats.bestValueGame.hours)}h • $${stats.bestValueGame.valuePerHour.toFixed(2)}/hr</p>
            </div>
            <div class="bg-surface-container p-4 border-l-4 border-accent2">
                <p class="text-[10px] font-label text-slate-500 uppercase">Worst Value</p>
                <p class="text-sm font-headline font-bold text-white">${stats.worstValueGame.name}</p>
                <p class="text-[11px] font-body text-slate-400">$${stats.worstValueGame.price} • ${Math.round(stats.worstValueGame.hours)}h • $${stats.worstValueGame.valuePerHour.toFixed(2)}/hr</p>
            </div>
        </div>` : ''}`;
}

function updateStats() {
    calculateShameScore();
    renderHeroBanner();
    renderDNATags();
    renderTopGamesChart();
    renderBrutalStats();
    renderReturnToGame();
    renderBacklogBreakdown();
    renderGraveyard();
    loadMomentumTracking();
    generateHeroHeadline();
    fetchAllPrices().then(() => { calculateMoneyStats(); renderMoneyStats(); });
    loadOrGenerateWeeklyPick();
    checkAndRenderBadges();
    saveCurrentSession();
    loadChatHistory();
    renderRoastHistory();
}

// ==================== HERO BANNER ====================
function renderHeroBanner() {
    if (!steamData.profile) return;
    const banner = document.getElementById('heroBanner');
    if (!banner) return;
    
    const profile = steamData.profile;
    const totalHours = Math.round(steamData.games.reduce((a,g) => a + (g.playtime_forever||0), 0) / 60);
    const memberSince = profile.timecreated ? new Date(profile.timecreated * 1000).getFullYear() : 'Unknown';
    const analyzedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    document.getElementById('heroAvatar').src = profile.avatar || '';
    document.getElementById('heroUsername').textContent = profile.personaname || 'Unknown';
    document.getElementById('heroUsername').href = profile.profileurl || '#';
    document.getElementById('heroTotalGames').textContent = steamData.games.length;
    document.getElementById('heroTotalHours').textContent = totalHours;
    document.getElementById('heroMemberSince').textContent = memberSince;
    document.getElementById('heroAnalyzedDate').textContent = analyzedDate;
    
    banner.classList.remove('hidden');
}

// ==================== DNA TAGS ====================
const DNA_EMOJIS = {
    'STRATEGY BRAIN': '🧠', 'SALE HOARDER': '🛒', 'GRAND STRATEGIST': '♟️', 'SURVIVAL ADDICT': '🏕️',
    'RPG FANATIC': '⚔️', 'ROGUE LOVER': '💀', 'SOULSBORNE VETERAN': '🗡️', 'DUNGEON CRAWLER': '🕳️',
    'WORLD BUILDER': '🏗️', 'COLONY MANAGER': '🏘️', 'DARK FANTASY': '🌑', 'SPACE CADET': '🚀',
    'LORE GOBLIN': '📖', 'TACTICIAN': '♟️', 'MILSIM DEVOTEE': '🎖️', 'PIXEL PILGRIM': '🎮',
    'WARLORD': '⚔️', 'MERCENARY CAPTAIN': '🛡️', 'CHICKEN DINNER': '🍗', 'ETERNAL EXILE': '🏰',
    'SPACE EMPEROR': '🌌', 'DRAGONBORN': '🐉', 'WITCHER': '🐺', 'VAULT DWELLER': '☢️',
    'COMMANDER': '🎖️', 'ARCHITECT OF RUIN': '🏚️', 'DUNGEON MASTER': '🎲', 'MERCHANT PRINCE': '💰',
    'BUNDLE VICTIM': '📦', 'THE CURATOR': '🏛️', 'COMPLETIONIST': '✅', 'ACHIEVEMENT HUNTER': '🏆',
    'ACHIEVEMENT IGNORER': '🚫', 'THE PURIST': '💎', 'DIGITAL HOARDER': '💾', 'EARLY ADOPTER': '🚀',
    'FRANCHISE COLLECTOR': '📚', 'HIDDEN GEM HUNTER': '💎', 'CONTRARIAN': '🤘', 'PARALLEL PLAYER': '🔀',
    'FALSE STARTER': '🏁', 'TUTORIAL DROPOUT': '🎓', 'NEVER FINISHES': '🚧', 'GENRE TOURIST': '🗺️',
    'THE ARCHAEOLOGIST': '🦕', 'NICHE LORD': '🎯', 'WISHLIST WARRIOR': '📝', 'IMPULSE BUYER': '💸',
    'HUMBLE ADDICT': '🎁', 'OBSESSIVE': '🔥', 'ONE TRICK PONY': '🐴', 'DEEP DIVER': '🤿',
    'BUTTERFLY': '🦋', 'BINGE MACHINE': '📺', 'THE LOYALIST': '❤️', 'SPEED RUNNER': '⚡',
    'THE GHOST': '👻', 'RUBBER BAND PLAYER': '🔄', 'THE MONOGAMIST': '💍', 'CHRONIC RETURNER': '🔁'
};

function renderDNATags() {
    const tags = badgeState.earned.map(id => BADGES.find(b => b.id === id)).filter(b => b && (b.category === 'trait' || b.category === 'genre' || b.category === 'behavioral')).slice(0, 8);
    if (tags.length === 0) return;
    
    const container = document.getElementById('dnaTags');
    const section = document.getElementById('dnaTagsSection');
    if (!container || !section) return;
    
    container.innerHTML = tags.map((tag, i) => {
        const emoji = DNA_EMOJIS[tag.name] || '🎮';
        const colorClass = `dna-tag-${(i % 5) + 1}`;
        return `<div class="dna-tag ${colorClass}">${emoji} ${tag.name}</div>`;
    }).join('');
    
    section.classList.remove('hidden');
}

function shareDNA() {
    const tags = [...document.querySelectorAll('.dna-tag')].map(el => el.textContent.trim()).join(', ');
    const text = `My Steam.AI Gaming DNA: ${tags} - steamai.com`;
    navigator.clipboard.writeText(text).then(() => showToast('DNA tags copied to clipboard!'));
}

// ==================== SHAME SCORE ====================
function calculateShameScore() {
    let score = 100;
    const total = steamData.games.length || 1;
    const unplayed = steamData.games.filter(g => (g.playtime_forever || 0) === 0).length;
    const unplayedPct = unplayed / total;

    // --- PENALTIES ---
    // Unplayed games (biggest factor)
    score -= unplayed * 5;

    // Barely touched
    const under30min = steamData.games.filter(g => { const m = g.playtime_forever || 0; return m > 0 && m < 30; }).length;
    const under2h = steamData.games.filter(g => { const m = g.playtime_forever || 0; return m >= 30 && m < 120; }).length;
    score -= under30min * 1.0;
    score -= under2h * 0.6;

    // Hoarding behavior
    if (unplayedPct > 0.5) score -= 20;
    if (unplayedPct > 0.7) score -= 20;

    // Recency (last 2 weeks — approximate via recent playtime)
    const recentlyPlayed = steamData.games.filter(g => (g.playtime_2weeks || 0) > 0).length;
    if (recentlyPlayed === 0) score -= 16;
    else if (recentlyPlayed === 1) score -= 8;

    // --- BONUSES ---
    // Deep commitment
    const over20h = steamData.games.filter(g => (g.playtime_forever || 0) >= 1200).length;
    const over100h = steamData.games.filter(g => (g.playtime_forever || 0) >= 6000).length;
    const over500h = steamData.games.filter(g => (g.playtime_forever || 0) >= 30000).length;
    const over2000h = steamData.games.filter(g => (g.playtime_forever || 0) >= 120000).length;
    const over3000h = steamData.games.filter(g => (g.playtime_forever || 0) >= 180000).length;
    score += over20h * 0.25;
    score += over100h * 0.5;
    score += over500h * 1;
    score += over2000h * 1.5;
    score += over3000h * 2;

    // Variety
    const over10h = steamData.games.filter(g => (g.playtime_forever || 0) >= 600).length;
    if (over10h >= 5) score += 2.5;
    if (over10h >= 10) score += 2.5;

    // Recent activity
    if (recentlyPlayed >= 3) score += 2.5;
    if (recentlyPlayed >= 5) score += 2.5;

    // Clamp
    score = Math.max(0, Math.min(100, Math.round(score)));
    analysisState.shameScore = score;
    renderShameScore(score);
}

function renderShameScore(score) {
    let verdict = score >= 90 ? 'RESPECTABLE. You actually play what you buy.' : score >= 75 ? 'DECENT. Room for improvement.' : score >= 60 ? 'AVERAGE HOARDER. Steam sales are your weakness.' : score >= 40 ? 'CHRONIC HOARDER. Your backlog has a backlog.' : score >= 20 ? 'FULL SHAME. Your library is a graveyard.' : 'LEGENDARY SHAME. Future archaeologists will study you.';
    document.getElementById('shameScore').textContent = score;
    document.getElementById('shameVerdict').textContent = verdict;
    
    // Trend indicator
    const trendEl = document.getElementById('shameTrend');
    if (analysisState.lastSession && analysisState.lastSession.shameScore) {
        const prevScore = analysisState.lastSession.shameScore;
        if (score > prevScore) {
            trendEl.textContent = '↑ IMPROVED';
            trendEl.className = 'shame-trend improved';
        } else if (score < prevScore) {
            trendEl.textContent = '↓ DECLINED';
            trendEl.className = 'shame-trend declined';
        } else {
            trendEl.textContent = '— UNCHANGED';
            trendEl.className = 'shame-trend';
        }
    }
    
    // Animated progress bar
    const bar = document.getElementById('shameBar');
    setTimeout(() => bar.style.width = score + '%', 100);
    
    generateShameExplanation(score);
}

async function generateShameExplanation(score) {
    const unplayed = steamData.games.filter(g => (g.playtime_forever || 0) === 0).length;
    const lowPlay = steamData.games.filter(g => (g.playtime_forever || 0) > 0 && (g.playtime_forever || 0) < 300).length;
    const heavyPlay = steamData.games.filter(g => (g.playtime_forever || 0) >= 1200).length;
    const prompt = `A Steam user has a Backlog Shame Score of ${score}/100. They have ${steamData.games.length} total games, ${unplayed} never launched, ${lowPlay} barely touched, and ${heavyPlay} heavily played. Write ONE brutally honest sentence (max 25 words) explaining why their score is what it is. Be funny and specific. No quotes.`;
    try {
        const explanation = await callAI(prompt);
        document.getElementById('shameExplanation').textContent = explanation.trim();
    } catch (e) {
        document.getElementById('shameExplanation').textContent = `${unplayed} games never launched. ${lowPlay} barely touched. That's why.`;
    }
}

// ==================== SOCIAL SHARING ====================
function getShareText() {
    return `My Steam Backlog Shame Score is ${analysisState.shameScore}/100 — ${analysisState.heroHeadline || 'my library is judging me'}. Find yours at Steam.AI`;
}

function shareToSocial(platform) {
    const text = getShareText();
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard! Share on ' + platform.toUpperCase()));
    const encoded = encodeURIComponent(text);
    const url = encodeURIComponent(window.location.href);
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encoded}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encoded}`,
        instagram: null,
        tiktok: null,
        reddit: `https://www.reddit.com/submit?title=${encoded}&url=${url}`
    };
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    } else {
        showToast('Text copied! Paste it on ' + platform.toUpperCase());
    }
}

function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ==================== AI CALL (GROQ) ====================
async function callAI(prompt) {
    const r = await fetch('/api/groq', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
    if (!r.ok) throw new Error(`AI API error: ${r.status}`);
    const data = await r.json();
    return data.response;
}

// ==================== HERO HEADLINE (PROFILE BURN) ====================
async function generateHeroHeadline() {
    // Randomize all input data so every load produces different roasts
    const shuffledNeverPlayed = steamData.games
        .filter(g => !g.playtime_forever)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    const shuffledBarely = steamData.games
        .filter(g => g.playtime_forever > 0 && g.playtime_forever < 60)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    const topGame = steamData.games[0];
    const topHours = Math.round((topGame?.playtime_forever || 0) / 60);

    const angles = [
        `mock a specific never-played game by name — why is it funny that they own it but never launched it`,
        `mock a game they quit in under an hour — what does that say about them`,
        `mock their top game obsession — ${topHours} hours in ${topGame?.name} is a lot`,
        `mock the sheer volume of unplayed games`,
        `mock what their taste in never-played games reveals about their self-image vs reality`,
    ];
    const angle = angles[Math.floor(Math.random() * angles.length)];

    const prompt = `You are a sharp roast comedian who knows PC gaming deeply. Write ONE roast sentence about this Steam user.

THEIR DATA:
Most played: ${topGame?.name} (${topHours}h)
Games they own but NEVER launched: ${shuffledNeverPlayed.map(g => g.name).join(', ')}
Games they quit in under 1 hour: ${shuffledBarely.map(g => g.name).join(', ')}
Total owned: ${steamData.games.length} games

ANGLE: ${angle}

RULES:
- ONE sentence, max 20 words
- Reference specific game names from the data above
- Never invent stats or prices you don't have
- Never compare unrelated games as if they're connected
- Never use "probably because..." structure
- No ALL CAPS output
- Make it land like a punchline

Respond with the roast sentence only. No quotes.`;

    try {
        const res = await fetch('/api/roast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: prompt }]
            })
        });
        if (!res.ok) throw new Error(`Roast API error: ${res.status}`);
        const data = await res.json();
        const headline = data.content?.[0]?.text?.trim() || 'YOUR LIBRARY SPEAKS VOLUMES';
        analysisState.heroHeadline = headline;
        document.getElementById('heroHeadline').textContent = headline.toUpperCase();
        // Save roast to history
        saveRoastToHistory(headline);
    } catch (e) {
        console.error('Profile burn error:', e);
        document.getElementById('heroHeadline').textContent = 'PROFILE BURN ERROR — CHECK API KEY';
    }
}

// ==================== ROAST HISTORY ====================
function saveRoastToHistory(roast) {
    let history = JSON.parse(localStorage.getItem('steamai_roast_history') || '[]');
    history.unshift({ text: roast, timestamp: Date.now(), score: analysisState.shameScore });
    if (history.length > 20) history = history.slice(0, 20); // keep last 20
    localStorage.setItem('steamai_roast_history', JSON.stringify(history));
    renderRoastHistory();
}

function renderRoastHistory() {
    const history = JSON.parse(localStorage.getItem('steamai_roast_history') || '[]');
    const el = document.getElementById('roastHistoryList');
    if (!el) return;
    if (history.length === 0) {
        el.innerHTML = '<p class="text-[9px] font-label text-slate-600 px-3 py-2">No roasts yet</p>';
        return;
    }
    el.innerHTML = history.map(r => {
        const date = new Date(r.timestamp);
        const timeStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `<div class="px-3 py-2 border-b border-outline-variant/5 hover:bg-white/5 cursor-pointer transition-colors" onclick="document.getElementById('heroHeadline').textContent='${r.text.replace(/'/g,"\\'").toUpperCase()}'">
            <p class="text-[10px] font-body text-slate-400 leading-tight line-clamp-2">${r.text}</p>
            <p class="text-[8px] font-label text-slate-600 mt-1">${timeStr} · Score: ${r.score}</p>
        </div>`;
    }).join('');
}

function toggleRoastHistory() {
    const panel = document.getElementById('roastHistoryPanel');
    if (!panel) return;
    panel.classList.toggle('hidden');
}

// ==================== WEEKLY PICK ====================
async function loadOrGenerateWeeklyPick() {
    const saved = localStorage.getItem('steamai_weekly_pick');
    if (saved) { const d = JSON.parse(saved); if (new Date(d.timestamp) > new Date(Date.now() - 7*24*60*60*1000)) { analysisState.weeklyPick = d; renderWeeklyPick(d); return; } }
    await generateWeeklyPick();
}

async function generateWeeklyPick() {
    const unplayedOrLow = steamData.games.filter(g => (g.playtime_forever || 0) < 300 && (g.playtime_forever || 0) > 0).sort((a, b) => (a.playtime_forever || 0) - (b.playtime_forever || 0)).slice(0, 20);
    if (unplayedOrLow.length === 0) {
        // No low-play games — pick any unplayed or random game as fallback
        const anyGame = steamData.games[Math.floor(Math.random() * steamData.games.length)];
        if (anyGame) {
            const fallback = { game: anyGame.name, why: 'A game waiting in your library.', first10: 'Just launch it and see what happens.', timestamp: Date.now() };
            analysisState.weeklyPick = fallback;
            localStorage.setItem('steamai_weekly_pick', JSON.stringify(fallback));
            renderWeeklyPick(fallback);
        }
        return;
    }
    const gamesList = unplayedOrLow.map(g => `${g.name}: ${Math.round((g.playtime_forever || 0) / 60)}h`).join('\n');
    const prompt = `Pick ONE game for this player to play this week.\n\nGAMES:\n${gamesList}\n\nFormat:\nGAME: [name]\nWHY: [one sentence]\nFIRST_10: [one sentence]`;
    try {
        const response = await callAI(prompt);
        const pickData = {
            game: (response.match(/GAME:\s*(.+)/i) || [,'Unknown'])[1].trim(),
            why: (response.match(/WHY:\s*(.+)/i) || [,''])[1].trim(),
            first10: (response.match(/FIRST_10:\s*(.+)/i) || [,''])[1].trim(),
            timestamp: Date.now()
        };
        analysisState.weeklyPick = pickData;
        localStorage.setItem('steamai_weekly_pick', JSON.stringify(pickData));
        renderWeeklyPick(pickData);
    } catch (e) {
        console.error('Weekly pick error:', e);
        // Fallback: pick a random low-play game without AI
        const randomGame = unplayedOrLow[Math.floor(Math.random() * unplayedOrLow.length)];
        const fallback = { game: randomGame.name, why: `Only ${Math.round((randomGame.playtime_forever||0)/60)}h played — time to give it a real chance.`, first10: 'Launch it and play for 10 minutes. You might be surprised.', timestamp: Date.now() };
        analysisState.weeklyPick = fallback;
        localStorage.setItem('steamai_weekly_pick', JSON.stringify(fallback));
        renderWeeklyPick(fallback);
    }
}

function renderWeeklyPick(pickData) {
    if (!pickData || !pickData.game) return;
    document.getElementById('weeklyPick').innerHTML = `
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><span class="material-symbols-outlined text-[120px] text-[#2ecc71]">auto_awesome</span></div>
        <div class="relative z-10 space-y-4">
            <span class="bg-[#2ecc71]/10 text-[#2ecc71] font-label text-[10px] px-2 py-1 border border-[#2ecc71]/30">RECOMMENDED_FOR_CLOSURE</span>
            <h3 class="text-4xl font-headline font-bold text-white tracking-tight">THIS WEEK: ${pickData.game.toUpperCase()}</h3>
            <p class="text-slate-400 text-sm leading-relaxed max-w-xl font-body">${pickData.why || ''} ${pickData.first10 ? '<span class="text-[#2ecc71]">First 10 min: ' + pickData.first10 + '</span>' : ''}</p>
            <button onclick="generateWeeklyPick()" class="flex items-center gap-2 text-[#2ecc71] font-headline font-bold text-sm tracking-widest">REFRESH PICK <span class="material-symbols-outlined text-sm">refresh</span></button>
        </div>`;
}

// ==================== SESSION MANAGEMENT ====================
function loadLastSession() {
    const saved = localStorage.getItem('steamai_last_session');
    if (saved) { analysisState.lastSession = JSON.parse(saved); }
}

function saveCurrentSession() {
    const sessionData = { timestamp: Date.now(), shameScore: analysisState.shameScore, heroHeadline: analysisState.heroHeadline, unplayedCount: steamData.games.filter(g => (g.playtime_forever || 0) === 0).length };
    localStorage.setItem('steamai_last_session', JSON.stringify(sessionData));
    analysisState.lastSession = sessionData;
}

// ==================== MOMENTUM TRACKING ====================
function loadMomentumTracking() {
    const saved = localStorage.getItem('steamai_last_snapshot');
    if (saved) { renderMomentumTracking(calculateMomentum(JSON.parse(saved))); }
    saveCurrentSnapshot();
}

function saveCurrentSnapshot() {
    localStorage.setItem('steamai_last_snapshot', JSON.stringify({ timestamp: Date.now(), games: steamData.games.map(g => ({ appid: g.appid, name: g.name, playtime_forever: g.playtime_forever || 0 })) }));
}

function calculateMomentum(last) {
    const daysSince = Math.round((Date.now() - last.timestamp) / (1000*60*60*24));
    const lastPT = {}; last.games.forEach(g => lastPT[g.appid] = g.playtime_forever);
    const neglected = [], revisited = [], backlogProgress = [];
    steamData.games.forEach(game => {
        const cur = game.playtime_forever || 0, prev = lastPT[game.appid] || 0, diff = cur - prev;
        if (prev === cur && cur > 0) neglected.push(game);
        if (diff >= 30 && prev > 0) revisited.push({ game, diff: diff / 60 });
        if (diff > 30) backlogProgress.push({ game, diff: diff / 60 });
    });
    return { daysSince, neglected, revisited: revisited.sort((a, b) => b.diff - a.diff), backlogProgress: backlogProgress.sort((a, b) => b.diff - a.diff).slice(0, 5) };
}

function renderMomentumTracking(data) {
    if (data.daysSince === 0) return;
    document.getElementById('momentumTracking').innerHTML = `
        <div class="flex items-center justify-between border-b border-outline-variant/10 pb-4"><h4 class="font-headline font-bold text-xl text-white tracking-widest uppercase">Momentum Tracking (${data.daysSince} days)</h4></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-surface-container-low p-6 border-t border-outline-variant/20"><p class="font-label text-[10px] text-primary mb-2">REVISITED</p><p class="text-3xl font-headline font-bold text-white">${data.revisited.length}</p>${data.revisited.slice(0,3).map(i => `<p class="text-[10px] text-slate-400 mt-1">${i.game.name} +${i.diff.toFixed(1)}h</p>`).join('')}</div>
            <div class="bg-surface-container-low p-6 border-t border-outline-variant/20"><p class="font-label text-[10px] text-secondary mb-2">STILL NEGLECTED</p><p class="text-3xl font-headline font-bold text-white">${data.neglected.length}</p></div>
            <div class="bg-surface-container-low p-6 border-t border-outline-variant/20"><p class="font-label text-[10px] text-primary mb-2">BACKLOG PROGRESS</p><p class="text-3xl font-headline font-bold text-white">${data.backlogProgress.length > 0 ? '+' + data.backlogProgress.length : '--'}</p>${data.backlogProgress.slice(0,2).map(i => `<p class="text-[10px] text-slate-400 mt-1">${i.game.name} +${i.diff.toFixed(1)}h</p>`).join('')}</div>
        </div>`;
}

// ==================== RETURN TO GAME ====================
function renderReturnToGame() {
    const sorted = [...steamData.games].sort((a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0));
    document.getElementById('returnGameSelect').innerHTML = `<option value="">Select a game...</option>${sorted.map(g => `<option value="${g.appid}" data-name="${g.name}" data-hours="${Math.round((g.playtime_forever || 0) / 60)}">${g.name} (${Math.round((g.playtime_forever || 0) / 60)}h)</option>`).join('')}`;
}

async function generateReentryGuide() {
    const select = document.getElementById('returnGameSelect');
    const option = select.options[select.selectedIndex];
    if (!option.value) { alert('Please select a game'); return; }
    const gameName = option.dataset.name, hours = option.dataset.hours;
    const prompt = `User has played ${gameName} for ${hours} hours but has not played recently. Generate a re-entry guide.\n\nReturn EXACTLY this format:\n\nYOU LEFT OFF:\n- (2 bullet points)\n\nREMEMBER THIS:\n- (2 bullet points)\n\nDO THIS FIRST (10 mins):\n- (2 bullet points)\n\nBe specific and actionable.`;
    document.getElementById('reentryGuide').innerHTML = '<div class="reentry-guide"><p style="color:#666">Generating re-entry guide...</p></div>';
    try {
        const response = await callAI(prompt);
        const parseBullets = (text) => text ? text.trim().split('\n').map(l => l.replace(/^[\s\-\*]+/, '').trim()).filter(l => l.length > 0) : [];
        const leftOff = parseBullets((response.match(/YOU LEFT OFF:\s*([\s\S]*?)(?=REMEMBER THIS:|$)/i) || [,''])[1]);
        const remember = parseBullets((response.match(/REMEMBER THIS:\s*([\s\S]*?)(?=DO THIS FIRST:|$)/i) || [,''])[1]);
        const doFirst = parseBullets((response.match(/DO THIS FIRST[^:]*:\s*([\s\S]*?)(?=$)/i) || [,''])[1]);
        document.getElementById('reentryGuide').innerHTML = `<div class="reentry-guide"><h4>YOU LEFT OFF</h4><ul>${leftOff.map(b => `<li>${b}</li>`).join('')}</ul><h4>REMEMBER THIS</h4><ul>${remember.map(b => `<li>${b}</li>`).join('')}</ul><h4>DO THIS FIRST (10 mins)</h4><ul>${doFirst.map(b => `<li>${b}</li>`).join('')}</ul></div>`;
    } catch (e) { document.getElementById('reentryGuide').innerHTML = '<div class="reentry-guide"><p style="color:#ff3e6c">Failed to generate guide. Try again.</p></div>'; }
}

// ==================== BACKLOG BREAKDOWN ====================
function renderBacklogBreakdown() {
    const gamesWithComp = steamData.games.map(g => ({ ...g, hours: (g.playtime_forever || 0) / 60, completion: calculateCompletionScore((g.playtime_forever || 0) / 60) }));
    const lowest = gamesWithComp.filter(g => g.hours > 0 && g.completion < 60).sort((a, b) => a.completion - b.completion).slice(0, 10);
    const near = gamesWithComp.filter(g => g.completion >= 60 && g.completion < 100).sort((a, b) => b.completion - a.completion).slice(0, 5);
    const cls = c => c < 30 ? 'text-secondary' : c < 60 ? 'text-amber-500' : 'text-primary';
    const maxLowHours = Math.max(...lowest.map(g => g.hours), 1);
    const maxNearHours = Math.max(...near.map(g => g.hours), 1);
    document.getElementById('lowCompletionBody').innerHTML = lowest.length > 0 ? lowest.map(g => {
        const rowClass = getTableRowClass(g.completion);
        const sparkWidth = (g.hours / maxLowHours) * 100;
        return `<tr class="${rowClass}"><td class="py-4 text-white font-medium"><span class="table-dot" style="background:${getBorderColor(g.completion)}"></span>${g.name}</td><td class="py-4 text-slate-400">${g.hours.toFixed(1)}H <div class="sparkline"><div class="sparkline-fill" style="width:${sparkWidth}%"></div></div></td><td class="py-4 text-right ${cls(g.completion)}">${String(g.completion).padStart(2,'0')}%</td></tr>`;
    }).join('') : '<tr><td colspan="3" class="py-4 text-slate-500">No low completion games</td></tr>';
    document.getElementById('nearCompleteBody').innerHTML = near.length > 0 ? near.map(g => {
        const rowClass = getTableRowClass(g.completion);
        const sparkWidth = (g.hours / maxNearHours) * 100;
        return `<tr class="${rowClass}"><td class="py-4 text-white font-medium"><span class="table-dot" style="background:${getBorderColor(g.completion)}"></span>${g.name}</td><td class="py-4 text-slate-400">${g.hours.toFixed(1)}H <div class="sparkline"><div class="sparkline-fill" style="width:${sparkWidth}%"></div></div></td><td class="py-4 text-right ${cls(g.completion)}">${g.completion}%</td></tr>`;
    }).join('') : '<tr><td colspan="3" class="py-4 text-slate-500">No near-complete games</td></tr>';
}

function getTableRowClass(completion) {
    if (completion === 0) return 'table-row table-row-0';
    if (completion <= 50) return 'table-row table-row-1';
    if (completion <= 85) return 'table-row table-row-2';
    if (completion <= 99) return 'table-row table-row-3';
    return 'table-row table-row-4';
}

function getBorderColor(completion) {
    if (completion === 0) return 'var(--accent2)';
    if (completion <= 50) return '#e67e22';
    if (completion <= 85) return '#f1c40f';
    if (completion <= 99) return 'var(--green)';
    return '#9b59b6';
}

function calculateCompletionScore(hours) {
    if (hours === 0) return 0; if (hours < 2) return 10; if (hours < 10) return 30; if (hours < 25) return 60; if (hours < 50) return 85; return 100;
}

// ==================== GRAVEYARD ====================
function renderGraveyard() {
    const graveyardGames = steamData.games.filter(g => (g.playtime_forever || 0) < 120).sort((a, b) => (a.playtime_forever || 0) - (b.playtime_forever || 0)).slice(0, 10);
    if (graveyardGames.length === 0) { document.getElementById('graveyard').classList.add('hidden'); return; }
    document.getElementById('graveyardList').innerHTML = graveyardGames.map(g => `
        <div class="border border-outline-variant/20 bg-surface overflow-hidden group hover:border-secondary transition-colors cursor-pointer">
            <img src="https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg" alt="${g.name}" class="w-full h-[43px] object-cover group-hover:brightness-110 transition-all" onerror="this.style.display='none'"/>
            <div class="px-3 py-2"><p class="text-[10px] text-white font-medium uppercase truncate">${g.name}</p><p class="text-[9px] text-slate-500 font-label">${Math.round((g.playtime_forever || 0) / 60)}h played</p></div>
        </div>`).join('');
}

function reviveRandomGame() {
    const g = steamData.games.filter(g => (g.playtime_forever || 0) < 120).sort(() => Math.random() - 0.5).slice(0, 1);
    if (g.length === 0) return;
    document.getElementById('returnGameSelect').value = g[0].appid;
    generateReentryGuide();
    switchTab('analysis');
}

// ==================== TOP GAMES CHART ====================
function renderTopGamesChart() {
    const top10 = [...steamData.games].sort((a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0)).slice(0, 10);
    const maxPT = top10[0]?.playtime_forever || 1;
    document.getElementById('topGamesChart').innerHTML = `
        <h5 class="section-header">MAX_UTILIZATION</h5>
        <div class="space-y-4">${top10.map((g, i) => {
            const hours = Math.round((g.playtime_forever || 0) / 60);
            const pct = ((g.playtime_forever || 0) / maxPT) * 100;
            const opacity = 1 - (i * 0.08);
            return `<div class="flex items-center gap-3 group"><img src="https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg" alt="${g.name}" class="w-[92px] h-[43px] object-cover border border-outline-variant/20 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0" onerror="this.style.display='none'"/><div class="flex-1 min-w-0 space-y-1"><div class="flex justify-between text-[10px] font-label"><span class="text-white truncate">${g.name}</span><span class="text-primary flex-shrink-0 ml-2">${hours}H</span></div><div class="h-1 bg-slate-800 w-full"><div class="h-full bg-primary transition-all duration-1000" style="width:${pct}%;opacity:${opacity}"></div></div></div></div>`;
        }).join('')}</div>`;
}

// ==================== BRUTAL STATS ====================
function renderBrutalStats() {
    const total = steamData.games.length;
    const topG = steamData.games.reduce((max, g) => (g.playtime_forever || 0) > (max.playtime_forever || 0) ? g : max, steamData.games[0] || {});
    const never = steamData.games.filter(g => (g.playtime_forever || 0) === 0).length;
    const played10 = steamData.games.filter(g => (g.playtime_forever || 0) >= 600).length;
    document.getElementById('brutalStats').innerHTML = `
        <h5 class="section-header">BRUTAL_METRICS</h5>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="flex flex-col"><span class="material-symbols-outlined text-secondary text-xl mb-1">sports_esports</span><span class="text-3xl font-headline font-bold text-white">${total}</span><span class="text-[9px] font-label text-slate-500 uppercase">Total_Games</span></div>
            <div class="flex flex-col"><span class="material-symbols-outlined text-secondary text-xl mb-1">timer</span><span class="text-3xl font-headline font-bold text-white">${Math.round((topG.playtime_forever || 0) / 60)}H</span><span class="text-[9px] font-label text-slate-500 uppercase">In_Top_Game</span></div>
            <div class="flex flex-col"><span class="material-symbols-outlined text-secondary text-xl mb-1">skull</span><span class="text-3xl font-headline font-bold text-white">${never}</span><span class="text-[9px] font-label text-slate-500 uppercase">Never_Launched</span></div>
            <div class="flex flex-col"><span class="material-symbols-outlined text-secondary text-xl mb-1">show_chart</span><span class="text-3xl font-headline font-bold text-white">${played10}</span><span class="text-[9px] font-label text-slate-500 uppercase">Played_10h+</span></div>
        </div>`;
}

// ==================== GAME RECOMMENDATION ENGINE ====================
document.addEventListener('click', e => {
    const btn = e.target.closest('.mood-btn');
    if (btn) btn.classList.toggle('selected');
});

function getSelectedMoods() {
    const chatInput = document.getElementById('recChatInput');
    const chatText = chatInput ? chatInput.value.trim() : '';
    return chatText || '';
}

async function getRecommendations() {
    const moodText = getSelectedMoods();
    const time = document.getElementById('availableTime').value;
    if (!moodText) { showToast('Tell the engine what you\'re in the mood for'); return; }
    const top30 = [...steamData.games].sort((a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0)).slice(0, 30).map(g => `${g.name}: ${Math.round((g.playtime_forever || 0) / 60)}h`).join('\n');
    const prompt = `Recommend 3 games from this player's Steam library based on their current mood.\n\nMOOD/PREFERENCES: ${moodText}\nTIME AVAILABLE: ${time} minutes\n\nLIBRARY:\n${top30}\n\nFor each game, provide:\nGAME: [name]\nWHY: [one sentence matching mood]\nQUICK_START: [one sentence]\n\nList 3 recommendations.`;
    document.getElementById('recommendations').innerHTML = '<div class="p-6 text-center"><div class="loading mx-auto"></div><p class="text-slate-500 font-label text-xs mt-4">Analyzing library against your preferences...</p></div>';
    try {
        const response = await callAI(prompt);
        const recs = response.split(/GAME:/i).filter(s => s.trim()).map(s => {
            const lines = s.trim().split('\n');
            const name = lines[0]?.replace(/\[|\]/g, '').trim();
            const why = (s.match(/WHY:\s*(.+)/i) || [,''])[1]?.trim();
            const quickStart = (s.match(/QUICK_START:\s*(.+)/i) || [,''])[1]?.trim();
            return { name, why, quickStart };
        }).filter(r => r.name);
        document.getElementById('recommendations').innerHTML = recs.map(r => `
            <div class="bg-surface-container border border-outline-variant/20 p-6 mt-4">
                <h5 class="font-headline font-bold text-lg text-white">${r.name}</h5>
                <p class="text-slate-400 text-sm font-body mt-2">${r.why}</p>
                ${r.quickStart ? `<p class="text-primary text-xs font-label mt-2">QUICK START: ${r.quickStart}</p>` : ''}
            </div>`).join('');
    } catch (e) {
        document.getElementById('recommendations').innerHTML = '<p class="text-secondary font-label text-xs mt-4">Failed to get recommendations. Try again.</p>';
    }
}

// ==================== CHAT SYSTEM ====================
function createNewChat() {
    const id = 'chat_' + Date.now();
    chatState.chats[id] = { id, title: 'New Session', messages: [], createdAt: Date.now() };
    chatState.currentChatId = id;
    renderChatMessages();
    renderChatHistory();
}

function loadChatHistory() {
    const saved = localStorage.getItem('steamai_chats');
    if (saved) {
        const d = JSON.parse(saved);
        chatState.chats = d.chats || {};
        chatState.currentChatId = d.currentChatId;
        if (!chatState.currentChatId && Object.keys(chatState.chats).length > 0) {
            chatState.currentChatId = Object.keys(chatState.chats)[0];
        }
        if (!chatState.currentChatId) createNewChat();
        else { renderChatMessages(); renderChatHistory(); }
    } else { createNewChat(); }
}

function saveChatHistory() {
    localStorage.setItem('steamai_chats', JSON.stringify({ chats: chatState.chats, currentChatId: chatState.currentChatId }));
}

function renderChatHistory() {
    const list = document.getElementById('chatHistoryList');
    const sorted = Object.values(chatState.chats).sort((a, b) => b.createdAt - a.createdAt);
    list.innerHTML = sorted.map(c => `
        <div class="chat-history-item ${c.id === chatState.currentChatId ? 'active' : ''}" onclick="loadChat('${c.id}')">
            <p class="text-[10px] text-white/80 font-label truncate">${c.title}</p>
            <p class="text-[8px] text-slate-600 font-label">${new Date(c.createdAt).toLocaleDateString()}</p>
        </div>`).join('');
}

function loadChat(id) {
    if (!chatState.chats[id]) return;
    chatState.currentChatId = id;
    renderChatMessages();
    renderChatHistory();
}

function renderChatMessages() {
    const chat = chatState.chats[chatState.currentChatId];
    if (!chat) return;
    const container = document.getElementById('chatMessages');
    container.innerHTML = chat.messages.map(m => `
        <div class="flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} max-w-2xl">
            <div class="text-[9px] font-label ${m.role === 'user' ? 'text-primary' : 'text-slate-500'} mb-2 uppercase">${m.role === 'user' ? 'You' : 'System_Observer'}</div>
            <div class="${m.role === 'user' ? 'bg-primary/10 border border-primary/20 text-primary' : 'bg-surface-container-high text-slate-300'} p-4 text-sm font-body leading-relaxed">${m.content}</div>
        </div>`).join('');
    container.scrollTop = container.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    if (!chatState.currentChatId) createNewChat();
    const chat = chatState.chats[chatState.currentChatId];
    chat.messages.push({ role: 'user', content: msg });
    input.value = '';
    renderChatMessages();
    const top10 = [...steamData.games].sort((a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0)).slice(0, 10).map(g => `${g.name}: ${Math.round((g.playtime_forever || 0) / 60)}h`).join(', ');
    const profileBurn = analysisState.heroHeadline || 'Not generated yet';
    const moneyContext = analysisState.moneyStats ? ` Money stats: $${analysisState.moneyStats.totalSpent} spent, $${analysisState.moneyStats.wastedOnUnplayed} wasted on unplayed, $${analysisState.moneyStats.costPerHour}/hr average.` : '';
    const context = `You are Steam.AI, a brutally honest gaming analyst. The user has ${steamData.games.length} games, shame score ${analysisState.shameScore}/100. Top games: ${top10}.${moneyContext}\n\nTheir PROFILE BURN (the roast shown on load): "${profileBurn}"\nIf they ask about the profile burn, clarify or expand on it — but never make up prices or stats you don't have. If you don't know something, say so.\n\nBe concise, funny, and helpful. Roast their backlog.`;
    const history = chat.messages.slice(-8).map(m => `${m.role}: ${m.content}`).join('\n');
    const prompt = `${context}\n\nConversation:\n${history}\n\nRespond concisely (max 3 sentences).`;
    try {
        const response = await callAI(prompt);
        chat.messages.push({ role: 'assistant', content: response.trim() });
        // Generate title for new chats
        if (chat.title === 'New Session' && chat.messages.length >= 2) {
            try {
                const titlePrompt = `Summarize this conversation in 3-5 words. No quotes. Just the title:\n${chat.messages.slice(0,2).map(m => m.content).join('\n')}`;
                chat.title = (await callAI(titlePrompt)).trim().substring(0, 40);
            } catch (e) { chat.title = msg.substring(0, 30); }
        }
    } catch (e) {
        chat.messages.push({ role: 'assistant', content: 'Error: Could not reach AI. Try again.' });
    }
    renderChatMessages();
    renderChatHistory();
    saveChatHistory();
}

// Enter key for chat
document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && document.activeElement?.id === 'chatInput') sendMessage();
});

// ==================== HELP MODAL ====================
function showHelp(type) {
    const modal = document.getElementById('helpModal');
    const title = document.getElementById('helpTitle');
    const content = document.getElementById('helpContent');
    modal.classList.remove('hidden');
    if (type === 'privacy') {
        title.textContent = 'PRIVACY & SECURITY';
        content.innerHTML = `<ul class="space-y-3"><li><strong class="text-primary">Your Steam API Key:</strong> Processed entirely in your browser. Never sent to our servers or stored anywhere.</li><li><strong class="text-primary">AI Features:</strong> Powered by Groq's free tier. No API key needed from you.</li><li><strong class="text-primary">Your Data:</strong> All analysis runs client-side. Nothing is logged or shared.</li><li><strong class="text-primary">Open Source:</strong> <a href="https://github.com/Robinowitz420/SteamAi" target="_blank" class="text-primary hover:underline">View the code on GitHub</a> and verify for yourself.</li></ul>`;
    } else if (type === 'steam') {
        title.textContent = 'STEAM API KEY';
        content.innerHTML = `<p>Get your Steam Web API key from <a href="https://steamcommunity.com/dev/apikey" target="_blank" class="text-primary hover:underline">steamcommunity.com/dev/apikey</a></p><p class="mt-2 text-slate-500">This key is used only in your browser to fetch your game library. It is never stored on any server.</p>`;
    } else if (type === 'steamid') {
        title.textContent = 'STEAM ID 64';
        content.innerHTML = `<p>Your 17-digit Steam ID. This is auto-filled when you sign in through Steam.</p><p class="mt-2">You can also find it at <a href="https://steamid.io" target="_blank" class="text-primary hover:underline">steamid.io</a></p>`;
    }
}

function closeHelp() { document.getElementById('helpModal').classList.add('hidden'); }

// ==================== SETUP HELPERS ====================
function showSetupError(msg) {
    const el = document.getElementById('setupError');
    el.textContent = msg; el.classList.remove('hidden');
    document.getElementById('setupSuccess').classList.add('hidden');
}

function showSetupSuccess(msg) {
    const el = document.getElementById('setupSuccess');
    el.textContent = msg; el.classList.remove('hidden');
    document.getElementById('setupError').classList.add('hidden');
}
