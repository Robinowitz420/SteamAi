// ==================== BADGE SYSTEM ====================

const TIER_COLORS = { bronze: '#cd7f32', silver: '#c0c0c0', gold: '#ffd700', platinum: '#e5e4e2' };
const TIER_ORDER = { platinum: 0, gold: 1, silver: 2, bronze: 3 };

const BADGE_IMAGES = {
    // Row 1 (c1-c15)
    first_step: 'FrontEnd/Badges2/badges1-Photoroom_r1_c1.png',
    sale_hoarder: 'FrontEnd/Badges2/badges1-Photoroom_r1_c2.png',
    grand_strategist: 'FrontEnd/Badges2/badges1-Photoroom_r1_c3.png',
    survival_addict: 'FrontEnd/Badges2/badges1-Photoroom_r1_c4.png',
    rpg_fanatic: 'FrontEnd/Badges2/badges1-Photoroom_r1_c5.png',
    rogue_lover: 'FrontEnd/Badges2/badges1-Photoroom_r1_c6.png',
    soulsborne_veteran: 'FrontEnd/Badges2/badges1-Photoroom_r1_c7.png',
    dungeon_crawler: 'FrontEnd/Badges2/badges1-Photoroom_r1_c8.png',
    world_builder: 'FrontEnd/Badges2/badges1-Photoroom_r1_c9.png',
    colony_manager: 'FrontEnd/Badges2/badges1-Photoroom_r1_c10.png',
    dark_fantasy: 'FrontEnd/Badges2/badges1-Photoroom_r1_c11.png',
    space_cadet: 'FrontEnd/Badges2/badges1-Photoroom_r1_c12.png',
    lore_goblin: 'FrontEnd/Badges2/badges1-Photoroom_r1_c13.png',
    tactician: 'FrontEnd/Badges2/badges1-Photoroom_r1_c14.png',
    milsim_devotee: 'FrontEnd/Badges2/badges1-Photoroom_r1_c15.png',
    // Row 2 (c1-c15)
    pixel_pilgrim: 'FrontEnd/Badges2/badges1-Photoroom_r2_c1.png',
    bundle_victim: 'FrontEnd/Badges2/badges1-Photoroom_r2_c2.png',
    hidden_gem_hunter: 'FrontEnd/Badges2/badges1-Photoroom_r2_c3.png',
    contrarian: 'FrontEnd/Badges2/badges1-Photoroom_r2_c4.png',
    parallel_player: 'FrontEnd/Badges2/badges1-Photoroom_r2_c5.png',
    false_starter: 'FrontEnd/Badges2/badges1-Photoroom_r2_c6.png',
    tutorial_dropout: 'FrontEnd/Badges2/badges1-Photoroom_r2_c7.png',
    never_finishes: 'FrontEnd/Badges2/badges1-Photoroom_r2_c8.png',
    genre_tourist: 'FrontEnd/Badges2/badges1-Photoroom_r2_c9.png',
    the_archaeologist: 'FrontEnd/Badges2/badges1-Photoroom_r2_c10.png',
    niche_lord: 'FrontEnd/Badges2/badges1-Photoroom_r2_c11.png',
    wishlist_warrior: 'FrontEnd/Badges2/badges1-Photoroom_r2_c12.png',
    impulse_buyer: 'FrontEnd/Badges2/badges1-Photoroom_r2_c13.png',
    humble_addict: 'FrontEnd/Badges2/badges1-Photoroom_r2_c14.png',
    obsessive: 'FrontEnd/Badges2/badges1-Photoroom_r2_c15.png',
    // Row 3 (c1-c15)
    one_trick_pony: 'FrontEnd/Badges2/badges1-Photoroom_r3_c1.png',
    deep_diver: 'FrontEnd/Badges2/badges1-Photoroom_r3_c2.png',
    butterfly: 'FrontEnd/Badges2/badges1-Photoroom_r3_c3.png',
    binge_machine: 'FrontEnd/Badges2/badges1-Photoroom_r3_c4.png',
    the_loyalist: 'FrontEnd/Badges2/badges1-Photoroom_r3_c5.png',
    speed_runner: 'FrontEnd/Badges2/badges1-Photoroom_r3_c6.png',
    the_ghost: 'FrontEnd/Badges2/badges1-Photoroom_r3_c7.png',
    rubber_band: 'FrontEnd/Badges2/badges1-Photoroom_r3_c8.png',
    the_monogamist: 'FrontEnd/Badges2/badges1-Photoroom_r3_c9.png',
    chronic_returner: 'FrontEnd/Badges2/badges1-Photoroom_r3_c10.png',
    // Row 4 (c1-c15)
    strategy_brain: 'FrontEnd/Badges2/badges1-Photoroom_r4_c1.png',
    warlord: 'FrontEnd/Badges2/badges1-Photoroom_r4_c10.png',
    mercenary_captain: 'FrontEnd/Badges2/badges1-Photoroom_r4_c11.png',
    chicken_dinner: 'FrontEnd/Badges2/badges1-Photoroom_r4_c12.png',
    eternal_exile: 'FrontEnd/Badges2/badges1-Photoroom_r4_c13.png',
    space_emperor: 'FrontEnd/Badges2/badges1-Photoroom_r4_c14.png',
    dragonborn: 'FrontEnd/Badges2/badges1-Photoroom_r4_c15.png',
    // Badges without images in new set - fallback to emoji or missing
    witcher_badge: null, // 'WITCHER' - not found in new set
    vault_dweller: null, // 'VAULT DWELLER' - not found in new set  
    commander_badge: null, // 'COMMANDER' - not found in new set
    architect_of_ruin: null, // 'ARCHITECT OF RUIN' - not found in new set
    dungeon_master: null, // 'DUNGEON MASTER' - not found in new set
    merchant_prince: null, // 'MERCHANT PRINCE' - not found in new set
    completionist: null, // 'COMPLETIONIST' - not found in new set
    achievement_hunter: null, // 'ACHIEVEMENT HUNTER' - not found in new set
    achievement_ignorer: null, // 'ACHIEVEMENT IGNORER' - not found in new set
    the_purist: null, // 'THE PURIST' - not found in new set
    digital_hoarder: null, // 'DIGITAL HOARDER' - not found in new set
    early_adopter: null, // 'EARLY ADOPTER' - not found in new set
    franchise_collector: null, // 'FRANCHISE COLLECTOR' - not found in new set
    tactician: 'FrontEnd/Badges2/badges1-Photoroom_r3_c2.png', // Found in row 3
    milsim_devotee: 'FrontEnd/Badges2/badges1-Photoroom_r3_c3.png', // Found in row 3
    // Challenge badges - none have images, will use emoji fallbacks
    going_deeper: null,
    committed: null,
    no_going_back: null,
    five_alive: null,
    backlog_buster: null,
    shame_eraser: null,
    pile_shrinker: null,
    zero_week: null,
    shame_reducer: null,
    shame_free: null,
    efficiency_expert: null,
    trophy_hunter: null,
    perfectionist: null,
    variety_week: null,
    binge_breaker: null
};

const BADGES = [
    // ===== TRAIT BADGES =====
    { id:'obsessive', name:'OBSESSIVE', description:"You don't play games. You inhabit them.", icon:'🔥', tier:'gold', category:'trait',
      check:(g,s)=> s.gamesOver1000h >= 1 },
    { id:'one_trick_pony', name:'ONE TRICK PONY', description:"One game. All the hours. No regrets.", icon:'🐴', tier:'silver', category:'trait',
      check:(g,s)=> s.topGamePercent >= 60 },
    { id:'deep_diver', name:'DEEP DIVER', description:"You don't sample. You commit.", icon:'🤿', tier:'silver', category:'trait',
      check:(g,s)=> s.avgHoursPerPlayed >= 50 },
    { id:'butterfly', name:'BUTTERFLY', description:"Everything is interesting. Nothing holds you.", icon:'🦋', tier:'bronze', category:'trait',
      check:(g,s)=> s.gamesOver20h === 0 && s.totalGames > 50 },
    { id:'binge_machine', name:'BINGE MACHINE', description:"You found something. The world outside can wait.", icon:'📺', tier:'gold', category:'trait',
      check:(g,s)=> { const top = g.reduce((m,x)=>(x.playtime_forever||0)>(m.playtime_forever||0)?x:m,g[0]||{}); return top && (top.playtime_2weeks||0) > 0 && (top.playtime_2weeks) / (top.playtime_forever||1) >= 0.3; }},
    { id:'the_loyalist', name:'THE LOYALIST', description:"Some games never leave you.", icon:'❤️', tier:'gold', category:'trait',
      check:(g,s)=> g.some(x=>(x.playtime_forever||0)>1200 && (x.playtime_2weeks||0)>0) },
    { id:'speed_runner', name:'SPEED RUNNER', description:"Quantity over depth. Always.", icon:'⚡', tier:'bronze', category:'trait',
      check:(g,s)=> s.totalGames > 100 && s.avgHoursPerGame < 10 },
    { id:'the_ghost', name:'THE GHOST', description:"Your library waits. Patiently.", icon:'👻', tier:'silver', category:'trait',
      check:(g,s)=> s.recentlyActive === 0 && s.totalGames > 50 },
    { id:'rubber_band', name:'RUBBER BAND PLAYER', description:"You disappear for months then return like nothing happened.", icon:'🔄', tier:'silver', category:'trait',
      check:(g,s)=> s.recentlyActive > 0 && s.neverPlayedPercent > 40 },
    { id:'the_monogamist', name:'THE MONOGAMIST', description:"When you love something you really love it.", icon:'💍', tier:'gold', category:'trait',
      check:(g,s)=> { const top2w = g.reduce((m,x)=>(x.playtime_2weeks||0)>(m.playtime_2weeks||0)?x:m,g[0]||{}); const total2w = g.reduce((a,x)=>a+(x.playtime_2weeks||0),0); return total2w > 0 && (top2w.playtime_2weeks||0)/total2w >= 0.8; }},
    { id:'chronic_returner', name:'CHRONIC RETURNER', description:"You keep coming back. Every time.", icon:'🔁', tier:'silver', category:'trait',
      check:(g,s)=> g.filter(x=>(x.playtime_forever||0)>600 && (x.playtime_2weeks||0)>0).length >= 3 },

    // ===== GENRE BADGES =====
    { id:'strategy_brain', name:'STRATEGY BRAIN', description:"Every problem is a resource allocation problem.", icon:'🧠', tier:'silver', category:'genre',
      check:(g,s)=> genreMatch(g,['strategy','tactics','total war','civilization','xcom','age of empires','starcraft','warcraft','command']) },
    { id:'survival_addict', name:'SURVIVAL ADDICT', description:"You thrive under artificial scarcity.", icon:'🏕️', tier:'silver', category:'genre',
      check:(g,s)=> genreMatch(g,['survival','rust','ark','the forest','dont starve','subnautica','7 days','valheim']) },
    { id:'rpg_fanatic', name:'RPG FANATIC', description:"You are whoever the game lets you be.", icon:'⚔️', tier:'silver', category:'genre',
      check:(g,s)=> genreMatch(g,['rpg','role','elder scrolls','witcher','dragon age','mass effect','final fantasy','diablo','skyrim']) },
    { id:'grand_strategist', name:'GRAND STRATEGIST', description:"You think in decades. You plan in centuries.", icon:'👑', tier:'gold', category:'genre',
      check:(g,s)=> genreMatch(g,['stellaris','crusader kings','europa universalis','hearts of iron','victoria','paradox']) },
    { id:'rogue_lover', name:'ROGUE LOVER', description:"Death is just another run.", icon:'💀', tier:'silver', category:'genre',
      check:(g,s)=> genreMatch(g,['rogue','roguelike','roguelite','hades','slay the spire','dead cells','binding of isaac','enter the gungeon','spelunky']) },
    { id:'soulsborne_veteran', name:'SOULSBORNE VETERAN', description:"You read attack patterns like words on a page.", icon:'🗡️', tier:'gold', category:'genre',
      check:(g,s)=> genreMatch(g,['dark souls','elden ring','bloodborne','sekiro','demon souls']) },
    { id:'dungeon_crawler', name:'DUNGEON CRAWLER', description:"Down. Always further down.", icon:'🕳️', tier:'bronze', category:'genre',
      check:(g,s)=> genreMatch(g,['dungeon','crawler','darkest dungeon','pathfinder','grimrock','diablo']) },
    { id:'world_builder', name:'WORLD BUILDER', description:"You need to be in control of everything.", icon:'🏗️', tier:'silver', category:'genre',
      check:(g,s)=> genreMatch(g,['city','builder','sim','skylines','simcity','planet coaster','frostpunk','banished','anno']) },
    { id:'colony_manager', name:'COLONY MANAGER', description:"Your colonists will not starve. Probably.", icon:'🏘️', tier:'silver', category:'genre',
      check:(g,s)=> genreMatch(g,['colony','rimworld','oxygen','factorio','prison architect','dwarf fortress']) },
    { id:'dark_fantasy', name:'DARK FANTASY ENTHUSIAST', description:"You prefer your worlds broken and beautiful.", icon:'🌑', tier:'bronze', category:'genre',
      check:(g,s)=> genreMatch(g,['dark fantasy','dark souls','elden ring','diablo','pathologic','blasphemous']) },
    { id:'space_cadet', name:'SPACE CADET', description:"The void calls and you answer.", icon:'🚀', tier:'bronze', category:'genre',
      check:(g,s)=> genreMatch(g,['space','stellaris','elite dangerous','no mans sky','eve','star citizen','kerbal','everspace']) },
    { id:'lore_goblin', name:'LORE GOBLIN', description:"You read every codex entry. Every one.", icon:'📖', tier:'gold', category:'genre',
      check:(g,s)=> genreMatch(g,['rpg','elder scrolls','witcher','mass effect','dragon age','divinity','pathfinder']) && s.avgHoursPerPlayed > 40 },
    { id:'tactician', name:'TACTICIAN', description:"You take your time. You make it count.", icon:'♟️', tier:'silver', category:'genre',
      check:(g,s)=> genreMatch(g,['turn-based','tactics','xcom','fire emblem','into the breach','civilization','advance wars']) },
    { id:'milsim_devotee', name:'MILSIM DEVOTEE', description:"Authenticity over fun. Always.", icon:'🎖️', tier:'silver', category:'genre',
      check:(g,s)=> genreMatch(g,['milsim','arma','squad','post scriptum','dcs','il-2','war thunder']) },
    { id:'pixel_pilgrim', name:'PIXEL PILGRIM', description:"You find gold in small packages.", icon:'🎮', tier:'bronze', category:'genre',
      check:(g,s)=> genreMatch(g,['indie','hollow knight','celeste','undertale','shovel knight','terraria','stardew','dead cells']) },
    { id:'warlord', name:'WARLORD', description:"War is just politics with better graphics.", icon:'⚔️', tier:'gold', category:'genre',
      check:(g,s)=> genreMatch(g,['total war','crusader kings','hearts of iron','civilization','stellaris']) && genreMatch(g,['tactics','xcom','command']) },
    { id:'mercenary_captain', name:'MERCENARY CAPTAIN', description:"Blood and iron. No contracts, no mercy.", icon:'🛡️', tier:'platinum', category:'genre',
      check:(g,s)=> isInTop(g,'battle brothers',5) },
    { id:'chicken_dinner', name:'CHICKEN DINNER', description:"Winner winner. You live here.", icon:'🍗', tier:'platinum', category:'genre',
      check:(g,s)=> isInTop(g,'pubg',3) },
    { id:'eternal_exile', name:'ETERNAL EXILE', description:"Calradia is home now.", icon:'🏰', tier:'gold', category:'genre',
      check:(g,s)=> isInTop(g,'bannerlord',5) || isInTop(g,'warband',5) },
    { id:'space_emperor', name:'SPACE EMPEROR', description:"The galaxy bends to your will. Eventually.", icon:'🌌', tier:'gold', category:'genre',
      check:(g,s)=> isInTop(g,'stellaris',5) },
    { id:'dragonborn', name:'DRAGONBORN', description:"Fus Roh Dah is a lifestyle.", icon:'🐉', tier:'gold', category:'genre',
      check:(g,s)=> isInTop(g,'skyrim',5) || isInTop(g,'elder scrolls',5) },
    { id:'witcher_badge', name:'WITCHER', description:"The White Wolf walks among us.", icon:'🐺', tier:'gold', category:'genre',
      check:(g,s)=> isInTop(g,'witcher',5) },
    { id:'vault_dweller', name:'VAULT DWELLER', description:"War never changes. Neither do you.", icon:'☢️', tier:'gold', category:'genre',
      check:(g,s)=> isInTop(g,'fallout',5) },
    { id:'commander_badge', name:'COMMANDER', description:"Leading armies since day one.", icon:'🎖️', tier:'gold', category:'genre',
      check:(g,s)=> isInTop(g,'total war',5) },
    { id:'architect_of_ruin', name:'ARCHITECT OF RUIN', description:"Build it up. Watch it fall. Repeat.", icon:'🏚️', tier:'silver', category:'genre',
      check:(g,s)=> genreMatch(g,['city','builder','sim','skylines','frostpunk']) && genreMatch(g,['survival','horror']) },
    { id:'dungeon_master', name:'DUNGEON MASTER', description:"RPG and strategy. The perfect combo.", icon:'🎲', tier:'gold', category:'genre',
      check:(g,s)=> genreMatch(g,['rpg','dungeon','pathfinder','divinity']) && genreMatch(g,['strategy','tactics']) },
    { id:'merchant_prince', name:'MERCHANT PRINCE', description:"Trading, economy, wheeling and dealing.", icon:'💰', tier:'silver', category:'genre',
      check:(g,s)=> genreMatch(g,['trading','economy','patrician','offworld','victoria','merchant']) },

    // ===== BEHAVIORAL BADGES =====
    { id:'sale_hoarder', name:'SALE HOARDER', description:"You bought it. You'll never play it. You know this.", icon:'🛒', tier:'silver', category:'behavioral',
      check:(g,s)=> s.neverPlayedPercent >= 40 },
    { id:'bundle_victim', name:'BUNDLE VICTIM', description:"The bundle seemed like a good deal at the time.", icon:'📦', tier:'bronze', category:'behavioral',
      check:(g,s)=> s.totalGames > 100 && s.avgHoursPerGame < 5 },
    { id:'the_curator', name:'THE CURATOR', description:"You collect with intention. Rare.", icon:'🏛️', tier:'gold', category:'behavioral',
      check:(g,s)=> s.totalGames > 100 && s.playedPercent >= 60 },
    { id:'completionist', name:'COMPLETIONIST', description:"If it can be done, you've done it.", icon:'✅', tier:'gold', category:'behavioral',
      check:(g,s)=> s.achievementPercent !== null && s.achievementPercent >= 70 },
    { id:'achievement_hunter', name:'ACHIEVEMENT HUNTER', description:"The checklist is the game.", icon:'🏆', tier:'silver', category:'behavioral',
      check:(g,s)=> s.achievementPercent !== null && s.achievementPercent >= 50 },
    { id:'achievement_ignorer', name:'ACHIEVEMENT IGNORER', description:"The game is the game. The list is noise.", icon:'🚫', tier:'bronze', category:'behavioral',
      check:(g,s)=> s.totalHours > 500 && s.achievementPercent !== null && s.achievementPercent < 10 },
    { id:'the_purist', name:'THE PURIST', description:"You own what you play. Exactly what you play.", icon:'💎', tier:'platinum', category:'behavioral',
      check:(g,s)=> s.totalGames < 30 && s.playedPercent >= 80 },
    { id:'digital_hoarder', name:'DIGITAL HOARDER', description:"Your hard drive weeps.", icon:'💾', tier:'bronze', category:'behavioral',
      check:(g,s)=> s.totalGames >= 500 },
    { id:'early_adopter', name:'EARLY ADOPTER', description:"You were there before it was good.", icon:'🚀', tier:'silver', category:'behavioral',
      check:(g,s)=> s.totalGames > 20 }, // simplified - can't detect review counts
    { id:'franchise_collector', name:'FRANCHISE COLLECTOR', description:"When you find something good you go all in.", icon:'📚', tier:'silver', category:'behavioral',
      check:(g,s)=> detectFranchise(g) >= 3 },
    { id:'hidden_gem_hunter', name:'HIDDEN GEM HUNTER', description:"You find what others miss.", icon:'💎', tier:'gold', category:'behavioral',
      check:(g,s)=> { const lowPlay = g.filter(x=>(x.playtime_forever||0)>600); return lowPlay.length > 0 && s.totalGames > 30; }},
    { id:'contrarian', name:'CONTRARIAN', description:"The crowd is usually wrong.", icon:'🤘', tier:'silver', category:'behavioral',
      check:(g,s)=> false }, // can't detect review scores
    { id:'parallel_player', name:'PARALLEL PLAYER', description:"Commitment is just one game at a time. Why limit yourself?", icon:'🔀', tier:'bronze', category:'behavioral',
      check:(g,s)=> s.recentlyActive >= 5 },
    { id:'false_starter', name:'FALSE STARTER', description:"The beginning is always the best part anyway.", icon:'🏁', tier:'silver', category:'behavioral',
      check:(g,s)=> s.gamesBetween1and3h > 15 },
    { id:'tutorial_dropout', name:'TUTORIAL DROPOUT', description:"15 minutes told you everything you needed to know.", icon:'🎓', tier:'bronze', category:'behavioral',
      check:(g,s)=> s.gamesUnder1h > 10 },
    { id:'never_finishes', name:'NEVER FINISHES', description:"So close. Every time.", icon:'🚧', tier:'silver', category:'behavioral',
      check:(g,s)=> s.gamesBetween1and3h > 10 && s.gamesOver20h < 5 },
    { id:'genre_tourist', name:'GENRE TOURIST', description:"Why specialize when you can dabble in everything?", icon:'🗺️', tier:'bronze', category:'behavioral',
      check:(g,s)=> s.uniqueGenres > 8 },
    { id:'the_archaeologist', name:'THE ARCHAEOLOGIST', description:"The classics never die.", icon:'🦕', tier:'gold', category:'behavioral',
      check:(g,s)=> g.some(x=>(x.playtime_forever||0)>300 && (x.playtime_2weeks||0)>0) },
    { id:'niche_lord', name:'NICHE LORD', description:"You found your corner of the universe.", icon:'🎯', tier:'gold', category:'behavioral',
      check:(g,s)=> s.uniqueGenres <= 3 && s.totalGames > 20 },
    { id:'wishlist_warrior', name:'WISHLIST WARRIOR', description:"The wishlist is longer than the library.", icon:'📝', tier:'bronze', category:'behavioral',
      check:(g,s)=> s.totalGames > 50 && s.neverPlayedPercent > 50 },
    { id:'impulse_buyer', name:'IMPULSE BUYER', description:"Buy now, think later. Much later.", icon:'💸', tier:'bronze', category:'behavioral',
      check:(g,s)=> s.neverPlayedPercent >= 50 && s.totalGames > 50 },
    { id:'humble_addict', name:'HUMBLE ADDICT', description:"Bundle after bundle after bundle...", icon:'🎁', tier:'bronze', category:'behavioral',
      check:(g,s)=> s.totalGames > 100 && s.avgHoursPerGame < 3 },

    // ===== CHALLENGE BADGES =====
    { id:'first_step', name:'FIRST STEP', description:"It begins.", icon:'👣', tier:'bronze', category:'challenge',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.length >= 1 },
    { id:'going_deeper', name:'GOING DEEPER', description:"You gave it a real chance.", icon:'🕳️', tier:'silver', category:'challenge',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.some(appid => { const gm = g.find(x=>x.appid===appid); return gm && (gm.playtime_forever||0)/60 >= 10; })},
    { id:'committed', name:'COMMITTED', description:"This one stuck.", icon:'📌', tier:'gold', category:'challenge',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.some(appid => { const gm = g.find(x=>x.appid===appid); return gm && (gm.playtime_forever||0)/60 >= 50; })},
    { id:'no_going_back', name:'NO GOING BACK', description:"This is part of you now.", icon:'⛓️', tier:'platinum', category:'challenge',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.some(appid => { const gm = g.find(x=>x.appid===appid); return gm && (gm.playtime_forever||0)/60 >= 100; })},
    { id:'five_alive', name:'FIVE ALIVE', description:"The backlog fears you.", icon:'🖐️', tier:'silver', category:'challenge',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.length >= 5 },
    { id:'backlog_buster', name:'BACKLOG BUSTER', description:"Making a dent.", icon:'💪', tier:'silver', category:'challenge',
      check:(g,s,ch)=> ch.previousUnplayed - s.neverPlayed >= 10 },
    { id:'shame_eraser', name:'SHAME ERASER', description:"The pile shrinks.", icon:'🧹', tier:'gold', category:'challenge',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.length >= 20 },
    { id:'pile_shrinker', name:'PILE SHRINKER', description:"Progress.", icon:'📉', tier:'bronze', category:'challenge',
      check:(g,s,ch)=> ch.previousUnplayedPercent - s.neverPlayedPercent >= 5 },
    { id:'zero_week', name:'ZERO WEEK', description:"You resisted the sale.", icon:'🛑', tier:'gold', category:'challenge',
      check:(g,s,ch)=> ch.previousShameScore > 0 && s.shameScore > ch.previousShameScore },
    { id:'shame_reducer', name:'SHAME REDUCER', description:"Getting better.", icon:'📈', tier:'silver', category:'challenge',
      check:(g,s,ch)=> ch.previousShameScore > 0 && (s.shameScore - ch.previousShameScore) >= 10 },
    { id:'shame_free', name:'SHAME FREE', description:"You are the 1%.", icon:'🌟', tier:'platinum', category:'challenge',
      check:(g,s,ch)=> s.shameScore >= 80 },
    { id:'efficiency_expert', name:'EFFICIENCY EXPERT', description:"Maximum value extracted.", icon:'📊', tier:'gold', category:'challenge',
      check:(g,s,ch)=> s.costPerHour !== null && s.costPerHour < 0.15 },
    { id:'trophy_hunter', name:'TROPHY HUNTER', description:"The hunt is real.", icon:'🏅', tier:'silver', category:'challenge',
      check:(g,s,ch)=> s.achievementPercent !== null && s.achievementPercent >= 40 },
    { id:'perfectionist', name:'PERFECTIONIST', description:"Done. Completely done.", icon:'💯', tier:'platinum', category:'challenge',
      check:(g,s,ch)=> s.achievementPercent !== null && s.achievementPercent >= 95 },
    { id:'variety_week', name:'VARIETY WEEK', description:"Eclectic.", icon:'🎨', tier:'silver', category:'challenge',
      check:(g,s,ch)=> s.recentlyActive >= 5 },
    { id:'binge_breaker', name:'BINGE BREAKER', description:"Moderation achieved.", icon:'⚖️', tier:'gold', category:'challenge',
      check:(g,s,ch)=> { const active = g.filter(x=>(x.playtime_2weeks||0)>0).sort((a,b)=>(b.playtime_2weeks||0)-(a.playtime_2weeks||0)); if(active.length<4) return false; const top = active[0].playtime_2weeks||0; const rest = active.slice(1,4).reduce((a,x)=>a+(x.playtime_2weeks||0),0); return top/(rest||1) < 2; }},
];

// ==================== BADGE HELPERS ====================
function genreMatch(games, keywords) {
    const total = games.reduce((a,g) => a + (g.playtime_forever||0), 0) || 1;
    const matched = games.filter(g => keywords.some(k => (g.name||'').toLowerCase().includes(k.toLowerCase())));
    const matchedPT = matched.reduce((a,g) => a + (g.playtime_forever||0), 0);
    return matchedPT / total >= 0.15;
}

function isInTop(games, keyword, n) {
    const sorted = [...games].sort((a,b) => (b.playtime_forever||0) - (a.playtime_forever||0));
    return sorted.slice(0, n).some(g => (g.name||'').toLowerCase().includes(keyword.toLowerCase()));
}

function detectFranchise(games) {
    const franchises = {};
    const patterns = [
        ['dark souls','dark souls'],['elder scrolls','elder scrolls'],['witcher','witcher'],
        ['fallout','fallout'],['total war','total war'],['civilization','civilization'],
        ['final fantasy','final fantasy'],['dragon age','dragon age'],['mass effect','mass effect'],
        ['call of duty','call of duty'],['assassins creed','assassins creed'],
        ['resident evil','resident evil'],['borderlands','borderlands'],
        ['doom','doom'],['tomb raider','tomb raider'],['hitman','hitman'],
        ['far cry','far cry'],['metro','metro'],['yakuza','yakuza'],
    ];
    games.forEach(g => {
        const name = (g.name||'').toLowerCase();
        patterns.forEach(([key, franchise]) => {
            if (name.includes(key)) { franchises[franchise] = (franchises[franchise]||0) + 1; }
        });
    });
    return Object.values(franchises).filter(v => v >= 3).length;
}

// ==================== STATS CALCULATION ====================
function calculateBadgeStats(games) {
    const totalGames = games.length;
    const totalMinutes = games.reduce((a,g) => a + (g.playtime_forever||0), 0);
    const totalHours = totalMinutes / 60;
    const neverPlayed = games.filter(g => (g.playtime_forever||0) === 0).length;
    const neverPlayedPercent = totalGames > 0 ? (neverPlayed / totalGames) * 100 : 0;
    const playedGames = games.filter(g => (g.playtime_forever||0) > 0);
    const avgHoursPerPlayed = playedGames.length > 0 ? (playedGames.reduce((a,g) => a + (g.playtime_forever||0), 0) / 60) / playedGames.length : 0;
    const avgHoursPerGame = totalGames > 0 ? totalHours / totalGames : 0;
    const sorted = [...games].sort((a,b) => (b.playtime_forever||0) - (a.playtime_forever||0));
    const topGame = sorted[0] || {};
    const topGamePercent = totalMinutes > 0 ? ((topGame.playtime_forever||0) / totalMinutes) * 100 : 0;
    const gamesOver20h = games.filter(g => (g.playtime_forever||0) >= 1200).length;
    const gamesOver100h = games.filter(g => (g.playtime_forever||0) >= 6000).length;
    const gamesOver1000h = games.filter(g => (g.playtime_forever||0) >= 60000).length;
    const gamesUnder1h = games.filter(g => (g.playtime_forever||0) > 0 && (g.playtime_forever||0) < 60).length;
    const gamesBetween1and3h = games.filter(g => (g.playtime_forever||0) >= 60 && (g.playtime_forever||0) < 180).length;
    const recentlyActive = games.filter(g => (g.playtime_2weeks||0) > 0).length;
    const playedPercent = totalGames > 0 ? ((totalGames - neverPlayed) / totalGames) * 100 : 0;
    const shameScore = analysisState.shameScore;
    const costPerHour = null; // would need price data

    // Estimate unique genres from keywords
    const genreKeywords = ['rpg','strategy','shooter','survival','horror','simulation','racing','sports','puzzle','platformer','roguelike','adventure','indie','action','mmo','sandbox','tower defense','visual novel','fighting','stealth'];
    const detectedGenres = new Set();
    games.forEach(g => {
        const name = (g.name||'').toLowerCase();
        genreKeywords.forEach(k => { if (name.includes(k)) detectedGenres.add(k); });
    });
    const uniqueGenres = detectedGenres.size;

    return { totalGames, totalHours, totalMinutes, neverPlayed, neverPlayedPercent, avgHoursPerPlayed, avgHoursPerGame,
             topGame, topGamePercent, gamesOver20h, gamesOver100h, gamesOver1000h, gamesUnder1h, gamesBetween1and3h,
             recentlyActive, playedPercent, shameScore, costPerHour, uniqueGenres, achievementPercent: null };
}

// ==================== CHALLENGE TRACKING ====================
function getChallengeData() {
    const saved = localStorage.getItem('steamai_challenges');
    if (saved) return JSON.parse(saved);
    return { previousUnplayed: 0, previousUnplayedPercent: 0, previousTotalPlayed: 0,
             sessionsLoaded: 0, gamesPlayedSinceFirst: [], badgesEarned: [],
             firstSessionDate: Date.now(), previousShameScore: 0 };
}

function updateChallengeData(games, stats) {
    const ch = getChallengeData();
    const currentUnplayed = stats.neverPlayed;
    const currentUnplayedPct = stats.neverPlayedPercent;

    // Detect newly played games
    const previouslyUnplayed = (localStorage.getItem('steamai_prev_unplayed') || '').split(',').filter(Boolean);
    games.forEach(g => {
        if ((g.playtime_forever||0) > 0 && previouslyUnplayed.includes(String(g.appid))) {
            if (!ch.gamesPlayedSinceFirst.includes(g.appid)) {
                ch.gamesPlayedSinceFirst.push(g.appid);
            }
        }
    });

    // Save current unplayed list for next session
    const currentUnplayedList = games.filter(g => (g.playtime_forever||0) === 0).map(g => String(g.appid)).join(',');
    localStorage.setItem('steamai_prev_unplayed', currentUnplayedList);

    ch.previousShameScore = ch.previousShameScore || 0;
    if (ch.sessionsLoaded > 0) {
        ch.previousUnplayed = currentUnplayed;
        ch.previousUnplayedPercent = currentUnplayedPct;
    }
    ch.sessionsLoaded++;
    ch.previousTotalPlayed = stats.totalGames - stats.neverPlayed;

    localStorage.setItem('steamai_challenges', JSON.stringify(ch));
    return ch;
}

// ==================== BADGE CHECKING & RENDERING ====================
function checkAndRenderBadges() {
    const stats = calculateBadgeStats(steamData.games);
    const ch = updateChallengeData(steamData.games, stats);

    const earned = [];
    BADGES.forEach(badge => {
        try {
            if (badge.check(steamData.games, stats, ch)) {
                earned.push(badge.id);
            }
        } catch(e) { /* badge check failed, skip */ }
    });

    badgeState.earned = earned;
    renderBadges();
}

function filterBadges(category) {
    badgeState.filter = category;
    document.querySelectorAll('.badge-filter').forEach(b => {
        b.classList.remove('active');
        b.classList.add('text-slate-500');
    });
    event.target.classList.add('active');
    event.target.classList.remove('text-slate-500');
    renderBadges();
}

function renderBadges() {
    const earned = badgeState.earned;
    const filter = badgeState.filter;
    const filtered = filter === 'all' ? BADGES : BADGES.filter(b => b.category === filter);

    // Sort: earned first, then by tier rarity
    const sorted = [...filtered].sort((a, b) => {
        const aEarned = earned.includes(a.id) ? 0 : 1;
        const bEarned = earned.includes(b.id) ? 0 : 1;
        if (aEarned !== bEarned) return aEarned - bEarned;
        return (TIER_ORDER[a.tier]||3) - (TIER_ORDER[b.tier]||3);
    });

    // Badge count
    document.getElementById('badgeCount').textContent = `${earned.length} / ${BADGES.length} EARNED`;

    // Featured badges - top 3 rarest earned
    const earnedBadges = BADGES.filter(b => earned.includes(b.id)).sort((a,b) => (TIER_ORDER[a.tier]||3) - (TIER_ORDER[b.tier]||3));
    const featured = earnedBadges.slice(0, 3);
    document.getElementById('featuredBadges').innerHTML = featured.length > 0 ? featured.map(b => {
        const imgSrc = BADGE_IMAGES[b.id];
        return `
        <div class="border border-[${TIER_COLORS[b.tier]}]/40 p-6 space-y-3">
            <div class="flex items-center gap-3">
                ${imgSrc ? `<img src="${imgSrc}" alt="${b.name}" class="w-12 h-12 object-contain"/>` : `<span class="text-4xl">${b.icon}</span>`}
                <div>
                    <p class="font-headline font-bold text-white text-sm tracking-widest">${b.name}</p>
                    <span class="inline-block w-2 h-2 rounded-full" style="background:${TIER_COLORS[b.tier]}"></span>
                    <span class="text-[9px] font-label text-slate-500 ml-1 uppercase">${b.tier}</span>
                </div>
            </div>
            <p class="text-[11px] font-body text-slate-400 italic">${b.description}</p>
        </div>`;
    }).join('') : '<p class="text-slate-500 font-label text-xs col-span-3">Play some games to earn your first badges!</p>';

    // Badge grid
    document.getElementById('badgeGrid').innerHTML = sorted.map(b => {
        const isEarned = earned.includes(b.id);
        const imgSrc = BADGE_IMAGES[b.id];
        return `
        <div class="badge-${b.tier} ${isEarned ? 'earned' : ''} group relative" title="${isEarned ? b.description : '???'}">
            <div class="w-full aspect-square border ${isEarned ? `border-[${TIER_COLORS[b.tier]}]/60` : 'border-outline-variant/10'} flex flex-col items-center justify-center ${isEarned ? '' : 'opacity-20 grayscale'} transition-all hover:opacity-100 hover:grayscale-0">
                ${imgSrc ? `<img src="${imgSrc}" alt="${b.name}" class="w-10 h-10 object-contain"/>` : `<span class="text-2xl">${b.icon}</span>`}
                <p class="text-[7px] font-label text-slate-400 mt-1 tracking-wider text-center leading-tight px-1">${b.name}</p>
                <span class="w-1.5 h-1.5 rounded-full mt-0.5" style="background:${TIER_COLORS[b.tier]}"></span>
            </div>
        </div>`;
    }).join('');
}
