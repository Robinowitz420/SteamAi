// ==================== BADGE SYSTEM ====================

const TIER_COLORS = { bronze: '#cd7f32', silver: '#c0c0c0', gold: '#ffd700', platinum: '#e5e4e2' };
const TIER_ORDER = { platinum: 0, gold: 1, silver: 2, bronze: 3 };

const BADGE_IMAGES = {
    // Row 2
    bundle_victim: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c2.png',
    hidden_gem_hunter: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c3.png',
    contrarian: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c4.png',
    parallel_player: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c5.png',
    false_starter: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c6.png',
    tutorial_dropout: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c7.png',
    genre_tourist: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c9.png',
    the_archaeologist: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c10.png',
    niche_lord: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c11.png',
    wishlist_warrior: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c12.png',
    impulse_buyer: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c13.png',
    humble_addict: 'FrontEnd/Badges2/Badges1-Photoroom_r2_c14.png',
    // Row 3
    deep_diver: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c2.png',
    butterfly: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c3.png',
    binge_machine: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c4.png',
    the_loyalist: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c5.png',
    speed_runner: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c6.png',
    the_ghost: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c7.png',
    the_monogamist: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c9.png',
    chronic_returner: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c10.png',
    obsessive: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c11.png',
    one_trick_pony: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c12.png',
    sale_hoarder: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c13.png',
    grand_strategist: 'FrontEnd/Badges2/Badges1-Photoroom_r3_c14.png',
    // Row 4
    the_curator: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c2.png',
    completionist: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c3.png',
    achievement_hunter: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c4.png',
    achievement_ignorer: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c5.png',
    the_purist: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c6.png',
    digital_hoarder: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c7.png',
    early_adopter: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c9.png',
    warlord: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c10.png',
    mercenary_captain: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c11.png',
    chicken_dinner: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c12.png',
    eternal_exile: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c13.png',
    space_emperor: 'FrontEnd/Badges2/Badges1-Photoroom_r4_c14.png',
    // Row 6
    survival_addict: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c2.png',
    rpg_fanatic: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c3.png',
    rogue_lover: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c4.png',
    soulsborne_veteran: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c5.png',
    dungeon_crawler: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c6.png',
    world_builder: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c7.png',
    colony_manager: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c9.png',
    dark_fantasy: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c10.png',
    space_cadet: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c11.png',
    lore_goblin: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c12.png',
    tactician: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c13.png',
    milsim_devotee: 'FrontEnd/Badges2/Badges1-Photoroom_r6_c14.png',
    // Row 7
    pixel_pilgrim: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c2.png',
    strategy_brain: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c3.png',
    witcher_badge: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c4.png',
    vault_dweller: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c5.png',
    commander_badge: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c6.png',
    architect_of_ruin: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c7.png',
    dungeon_master: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c9.png',
    merchant_prince: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c10.png',
    franchise_collector: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c11.png',
    never_finishes: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c12.png',
    dragonborn: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c13.png',
    first_step: 'FrontEnd/Badges2/Badges1-Photoroom_r7_c14.png',
    // Row 8
    going_deeper: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c2.png',
    committed: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c3.png',
    no_going_back: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c4.png',
    five_alive: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c5.png',
    backlog_buster: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c6.png',
    shame_eraser: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c7.png',
    pile_shrinker: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c9.png',
    zero_week: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c10.png',
    shame_reducer: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c11.png',
    shame_free: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c12.png',
    efficiency_expert: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c13.png',
    trophy_hunter: 'FrontEnd/Badges2/Badges1-Photoroom_r8_c14.png'
};

const BADGES = [
    // ===== TRAIT BADGES =====
    { id:'obsessive', name:'OBSESSIVE', description:"You don't play games. You inhabit them.", icon:'🔥', tier:'gold', category:'trait',
      unlockHint:'Have one game over 1,000 hours',
      check:(g,s)=> s.gamesOver1000h >= 1 },
    { id:'one_trick_pony', name:'ONE TRICK PONY', description:"One game. All the hours. No regrets.", icon:'🐴', tier:'silver', category:'trait',
      unlockHint:'Have your most played game be 60%+ of total playtime',
      check:(g,s)=> s.topGamePercent >= 60 },
    { id:'deep_diver', name:'DEEP DIVER', description:"You don't sample. You commit.", icon:'🤿', tier:'silver', category:'trait',
      unlockHint:'Average 50+ hours per played game',
      check:(g,s)=> s.avgHoursPerPlayed >= 50 },
    { id:'butterfly', name:'BUTTERFLY', description:"Everything is interesting. Nothing holds you.", icon:'🦋', tier:'bronze', category:'trait',
      unlockHint:'Own 50+ games with none over 20 hours',
      check:(g,s)=> s.gamesOver20h === 0 && s.totalGames > 50 },
    { id:'binge_machine', name:'BINGE MACHINE', description:"You found something. The world outside can wait.", icon:'📺', tier:'gold', category:'trait',
      unlockHint:'Play 30%+ of a game\'s total hours in the last 2 weeks',
      check:(g,s)=> { const top = g.reduce((m,x)=>(x.playtime_forever||0)>(m.playtime_forever||0)?x:m,g[0]||{}); return top && (top.playtime_2weeks||0) > 0 && (top.playtime_2weeks) / (top.playtime_forever||1) >= 0.3; }},
    { id:'the_loyalist', name:'THE LOYALIST', description:"Some games never leave you.", icon:'❤️', tier:'gold', category:'trait',
      unlockHint:'Still playing a game with 20+ hours after 1,200+ total hours',
      check:(g,s)=> g.some(x=>(x.playtime_forever||0)>1200 && (x.playtime_2weeks||0)>0) },
    { id:'speed_runner', name:'SPEED RUNNER', description:"Quantity over depth. Always.", icon:'⚡', tier:'bronze', category:'trait',
      unlockHint:'Own 100+ games with under 10h average each',
      check:(g,s)=> s.totalGames > 100 && s.avgHoursPerGame < 10 },
    { id:'the_ghost', name:'THE GHOST', description:"Your library waits. Patiently.", icon:'👻', tier:'silver', category:'trait',
      unlockHint:'Own 50+ games with zero played recently',
      check:(g,s)=> s.recentlyActive === 0 && s.totalGames > 50 },
    { id:'the_monogamist', name:'THE MONOGAMIST', description:"When you love something you really love it.", icon:'💍', tier:'gold', category:'trait',
      unlockHint:'Spend 80%+ of recent playtime on a single game',
      check:(g,s)=> { const top2w = g.reduce((m,x)=>(x.playtime_2weeks||0)>(m.playtime_2weeks||0)?x:m,g[0]||{}); const total2w = g.reduce((a,x)=>a+(x.playtime_2weeks||0),0); return total2w > 0 && (top2w.playtime_2weeks||0)/total2w >= 0.8; }},
    { id:'chronic_returner', name:'CHRONIC RETURNER', description:"You keep coming back. Every time.", icon:'🔁', tier:'silver', category:'trait',
      unlockHint:'Recently play 3+ games with 10+ hours each',
      check:(g,s)=> g.filter(x=>(x.playtime_forever||0)>600 && (x.playtime_2weeks||0)>0).length >= 3 },

    // ===== GENRE BADGES =====
    { id:'strategy_brain', name:'STRATEGY BRAIN', description:"Every problem is a resource allocation problem.", icon:'🧠', tier:'silver', category:'genre',
      unlockHint:'Play 15%+ of your time in strategy games',
      check:(g,s)=> genreMatch(g,['strategy','tactics','total war','civilization','xcom','age of empires','starcraft','warcraft','command']) },
    { id:'survival_addict', name:'SURVIVAL ADDICT', description:"You thrive under artificial scarcity.", icon:'🏕️', tier:'silver', category:'genre',
      unlockHint:'Play 15%+ of your time in survival games',
      check:(g,s)=> genreMatch(g,['survival','rust','ark','the forest','dont starve','subnautica','7 days','valheim']) },
    { id:'rpg_fanatic', name:'RPG FANATIC', description:"You are whoever the game lets you be.", icon:'⚔️', tier:'silver', category:'genre',
      unlockHint:'Play 15%+ of your time in RPG games',
      check:(g,s)=> genreMatch(g,['rpg','role','elder scrolls','witcher','dragon age','mass effect','final fantasy','diablo','skyrim']) },
    { id:'grand_strategist', name:'GRAND STRATEGIST', description:"You think in decades. You plan in centuries.", icon:'👑', tier:'gold', category:'genre',
      unlockHint:'Play 15%+ of your time in Paradox grand strategy games',
      check:(g,s)=> genreMatch(g,['stellaris','crusader kings','europa universalis','hearts of iron','victoria','paradox']) },
    { id:'rogue_lover', name:'ROGUE LOVER', description:"Death is just another run.", icon:'💀', tier:'silver', category:'genre',
      unlockHint:'Play 15%+ of your time in roguelike games',
      check:(g,s)=> genreMatch(g,['rogue','roguelike','roguelite','hades','slay the spire','dead cells','binding of isaac','enter the gungeon','spelunky']) },
    { id:'soulsborne_veteran', name:'SOULSBORNE VETERAN', description:"You read attack patterns like words on a page.", icon:'🗡️', tier:'gold', category:'genre',
      unlockHint:'Play 15%+ of your time in Souls-like games',
      check:(g,s)=> genreMatch(g,['dark souls','elden ring','bloodborne','sekiro','demon souls']) },
    { id:'dungeon_crawler', name:'DUNGEON CRAWLER', description:"Down. Always further down.", icon:'🕳️', tier:'bronze', category:'genre',
      unlockHint:'Play 15%+ of your time in dungeon crawling games',
      check:(g,s)=> genreMatch(g,['dungeon','crawler','darkest dungeon','pathfinder','grimrock','diablo']) },
    { id:'world_builder', name:'WORLD BUILDER', description:"You need to be in control of everything.", icon:'🏗️', tier:'silver', category:'genre',
      unlockHint:'Play 15%+ of your time in city builder games',
      check:(g,s)=> genreMatch(g,['city','builder','sim','skylines','simcity','planet coaster','frostpunk','banished','anno']) },
    { id:'colony_manager', name:'COLONY MANAGER', description:"Your colonists will not starve. Probably.", icon:'🏘️', tier:'silver', category:'genre',
      unlockHint:'Play 15%+ of your time in colony management games',
      check:(g,s)=> genreMatch(g,['colony','rimworld','oxygen','factorio','prison architect','dwarf fortress']) },
    { id:'dark_fantasy', name:'DARK FANTASY ENTHUSIAST', description:"You prefer your worlds broken and beautiful.", icon:'🌑', tier:'bronze', category:'genre',
      unlockHint:'Play 15%+ of your time in dark fantasy games',
      check:(g,s)=> genreMatch(g,['dark fantasy','dark souls','elden ring','diablo','pathologic','blasphemous']) },
    { id:'space_cadet', name:'SPACE CADET', description:"The void calls and you answer.", icon:'🚀', tier:'bronze', category:'genre',
      unlockHint:'Play 15%+ of your time in space games',
      check:(g,s)=> genreMatch(g,['space','stellaris','elite dangerous','no mans sky','eve','star citizen','kerbal','everspace']) },
    { id:'lore_goblin', name:'LORE GOBLIN', description:"You read every codex entry. Every one.", icon:'📖', tier:'gold', category:'genre',
      unlockHint:'Play RPGs for 15%+ of time with 40+ avg hours per game',
      check:(g,s)=> genreMatch(g,['rpg','elder scrolls','witcher','mass effect','dragon age','divinity','pathfinder']) && s.avgHoursPerPlayed > 40 },
    { id:'tactician', name:'TACTICIAN', description:"You take your time. You make it count.", icon:'♟️', tier:'silver', category:'genre',
      unlockHint:'Play 15%+ of your time in turn-based tactics games',
      check:(g,s)=> genreMatch(g,['turn-based','tactics','xcom','fire emblem','into the breach','civilization','advance wars']) },
    { id:'milsim_devotee', name:'MILSIM DEVOTEE', description:"Authenticity over fun. Always.", icon:'🎖️', tier:'silver', category:'genre',
      unlockHint:'Play 15%+ of your time in military simulation games',
      check:(g,s)=> genreMatch(g,['milsim','arma','squad','post scriptum','dcs','il-2','war thunder']) },
    { id:'pixel_pilgrim', name:'PIXEL PILGRIM', description:"You find gold in small packages.", icon:'🎮', tier:'bronze', category:'genre',
      unlockHint:'Play 15%+ of your time in indie games',
      check:(g,s)=> genreMatch(g,['indie','hollow knight','celeste','undertale','shovel knight','terraria','stardew','dead cells']) },
    { id:'warlord', name:'WARLORD', description:"War is just politics with better graphics.", icon:'⚔️', tier:'gold', category:'genre',
      unlockHint:'Play strategy and tactics games for 15%+ each',
      check:(g,s)=> genreMatch(g,['total war','crusader kings','hearts of iron','civilization','stellaris']) && genreMatch(g,['tactics','xcom','command']) },
    { id:'mercenary_captain', name:'MERCENARY CAPTAIN', description:"Blood and iron. No contracts, no mercy.", icon:'🛡️', tier:'platinum', category:'genre',
      unlockHint:'Have Battle Brothers in your top 5 most played games',
      check:(g,s)=> isInTop(g,'battle brothers',5) },
    { id:'chicken_dinner', name:'CHICKEN DINNER', description:"Winner winner. You live here.", icon:'🍗', tier:'platinum', category:'genre',
      unlockHint:'Have PUBG in your top 3 most played games',
      check:(g,s)=> isInTop(g,'pubg',3) },
    { id:'eternal_exile', name:'ETERNAL EXILE', description:"Calradia is home now.", icon:'🏰', tier:'gold', category:'genre',
      unlockHint:'Have Mount & Blade in your top 5 most played games',
      check:(g,s)=> isInTop(g,'bannerlord',5) || isInTop(g,'warband',5) },
    { id:'space_emperor', name:'SPACE EMPEROR', description:"The galaxy bends to your will. Eventually.", icon:'🌌', tier:'gold', category:'genre',
      unlockHint:'Have Stellaris in your top 5 most played games',
      check:(g,s)=> isInTop(g,'stellaris',5) },
    { id:'dragonborn', name:'DRAGONBORN', description:"Fus Roh Dah is a lifestyle.", icon:'🐉', tier:'gold', category:'genre',
      unlockHint:'Have Skyrim or Elder Scrolls in your top 5 most played',
      check:(g,s)=> isInTop(g,'skyrim',5) || isInTop(g,'elder scrolls',5) },
    { id:'witcher_badge', name:'WITCHER', description:"The White Wolf walks among us.", icon:'🐺', tier:'gold', category:'genre',
      unlockHint:'Have The Witcher in your top 5 most played games',
      check:(g,s)=> isInTop(g,'witcher',5) },
    { id:'vault_dweller', name:'VAULT DWELLER', description:"War never changes. Neither do you.", icon:'☢️', tier:'gold', category:'genre',
      unlockHint:'Have Fallout in your top 5 most played games',
      check:(g,s)=> isInTop(g,'fallout',5) },
    { id:'commander_badge', name:'COMMANDER', description:"Leading armies since day one.", icon:'🎖️', tier:'gold', category:'genre',
      unlockHint:'Have Total War in your top 5 most played games',
      check:(g,s)=> isInTop(g,'total war',5) },
    { id:'architect_of_ruin', name:'ARCHITECT OF RUIN', description:"Build it up. Watch it fall. Repeat.", icon:'🏚️', tier:'silver', category:'genre',
      unlockHint:'Play builder and survival games for 15%+ each',
      check:(g,s)=> genreMatch(g,['city','builder','sim','skylines','frostpunk']) && genreMatch(g,['survival','horror']) },
    { id:'dungeon_master', name:'DUNGEON MASTER', description:"RPG and strategy. The perfect combo.", icon:'🎲', tier:'gold', category:'genre',
      unlockHint:'Play RPG and strategy games for 15%+ each',
      check:(g,s)=> genreMatch(g,['rpg','dungeon','pathfinder','divinity']) && genreMatch(g,['strategy','tactics']) },
    { id:'merchant_prince', name:'MERCHANT PRINCE', description:"Trading, economy, wheeling and dealing.", icon:'💰', tier:'silver', category:'genre',
      unlockHint:'Play 15%+ of your time in economy/trading games',
      check:(g,s)=> genreMatch(g,['trading','economy','patrician','offworld','victoria','merchant']) },

    // ===== BEHAVIORAL BADGES =====
    { id:'sale_hoarder', name:'SALE HOARDER', description:"You bought it. You'll never play it. You know this.", icon:'🛒', tier:'silver', category:'behavioral',
      unlockHint:'Have over 40% of your library never played',
      check:(g,s)=> s.neverPlayedPercent >= 40 },
    { id:'bundle_victim', name:'BUNDLE VICTIM', description:"The bundle seemed like a good deal at the time.", icon:'📦', tier:'bronze', category:'behavioral',
      unlockHint:'Own 100+ games with under 5h average each',
      check:(g,s)=> s.totalGames > 100 && s.avgHoursPerGame < 5 },
    { id:'the_curator', name:'THE CURATOR', description:"You collect with intention. Rare.", icon:'🏛️', tier:'gold', category:'behavioral',
      unlockHint:'Own 100+ games with 60%+ played',
      check:(g,s)=> s.totalGames > 100 && s.playedPercent >= 60 },
    { id:'completionist', name:'COMPLETIONIST', description:"If it can be done, you've done it.", icon:'✅', tier:'gold', category:'behavioral',
      unlockHint:'Unlock over 70% of achievements across your library',
      check:(g,s)=> s.achievementPercent !== null && s.achievementPercent >= 70 },
    { id:'achievement_hunter', name:'ACHIEVEMENT HUNTER', description:"The checklist is the game.", icon:'🏆', tier:'silver', category:'behavioral',
      unlockHint:'Unlock over 50% of achievements across your library',
      check:(g,s)=> s.achievementPercent !== null && s.achievementPercent >= 50 },
    { id:'achievement_ignorer', name:'ACHIEVEMENT IGNORER', description:"The game is the game. The list is noise.", icon:'🚫', tier:'bronze', category:'behavioral',
      unlockHint:'Play 500+ hours with under 10% achievements unlocked',
      check:(g,s)=> s.totalHours > 500 && s.achievementPercent !== null && s.achievementPercent < 10 },
    { id:'the_purist', name:'THE PURIST', description:"You own what you play. Exactly what you play.", icon:'💎', tier:'platinum', category:'behavioral',
      unlockHint:'Own under 30 games with over 80% played',
      check:(g,s)=> s.totalGames < 30 && s.playedPercent >= 80 },
    { id:'digital_hoarder', name:'DIGITAL HOARDER', description:"Your hard drive weeps.", icon:'💾', tier:'bronze', category:'behavioral',
      unlockHint:'Own 500 or more games',
      check:(g,s)=> s.totalGames >= 500 },
    { id:'early_adopter', name:'EARLY ADOPTER', description:"You were there before it was good.", icon:'🚀', tier:'silver', category:'behavioral',
      unlockHint:'Own more than 20 games',
      check:(g,s)=> s.totalGames > 20 },
    { id:'franchise_collector', name:'FRANCHISE COLLECTOR', description:"When you find something good you go all in.", icon:'📚', tier:'silver', category:'behavioral',
      unlockHint:'Collect 3+ franchises with 3+ entries each',
      check:(g,s)=> detectFranchise(g) >= 3 },
    { id:'hidden_gem_hunter', name:'HIDDEN GEM HUNTER', description:"You find what others miss.", icon:'💎', tier:'gold', category:'behavioral',
      unlockHint:'Have a game with 10+ hours that few others play',
      check:(g,s)=> { const lowPlay = g.filter(x=>(x.playtime_forever||0)>600); return lowPlay.length > 0 && s.totalGames > 30; }},
    { id:'contrarian', name:'CONTRARIAN', description:"The crowd is usually wrong.", icon:'🤘', tier:'silver', category:'behavioral',
      unlockHint:'Play games that go against popular trends',
      check:(g,s)=> false },
    { id:'parallel_player', name:'PARALLEL PLAYER', description:"Commitment is just one game at a time. Why limit yourself?", icon:'🔀', tier:'bronze', category:'behavioral',
      unlockHint:'Play 5+ games in the last 2 weeks',
      check:(g,s)=> s.recentlyActive >= 5 },
    { id:'false_starter', name:'FALSE STARTER', description:"The beginning is always the best part anyway.", icon:'🏁', tier:'silver', category:'behavioral',
      unlockHint:'Have 15+ games between 1-3 hours played',
      check:(g,s)=> s.gamesBetween1and3h > 15 },
    { id:'tutorial_dropout', name:'TUTORIAL DROPOUT', description:"15 minutes told you everything you needed to know.", icon:'🎓', tier:'bronze', category:'behavioral',
      unlockHint:'Have 10+ games under 1 hour played',
      check:(g,s)=> s.gamesUnder1h > 10 },
    { id:'never_finishes', name:'NEVER FINISHES', description:"So close. Every time.", icon:'🚧', tier:'silver', category:'behavioral',
      unlockHint:'Have 10+ games at 1-3h but under 5 games over 20h',
      check:(g,s)=> s.gamesBetween1and3h > 10 && s.gamesOver20h < 5 },
    { id:'genre_tourist', name:'GENRE TOURIST', description:"Why specialize when you can dabble in everything?", icon:'🗺️', tier:'bronze', category:'behavioral',
      unlockHint:'Play games across 8+ different genres',
      check:(g,s)=> s.uniqueGenres > 8 },
    { id:'the_archaeologist', name:'THE ARCHAEOLOGIST', description:"The classics never die.", icon:'🦕', tier:'gold', category:'behavioral',
      unlockHint:'Return to a game with 5+ hours after a long break',
      check:(g,s)=> g.some(x=>(x.playtime_forever||0)>300 && (x.playtime_2weeks||0)>0) },
    { id:'niche_lord', name:'NICHE LORD', description:"You found your corner of the universe.", icon:'🎯', tier:'gold', category:'behavioral',
      unlockHint:'Play 20+ games in only 3 or fewer genres',
      check:(g,s)=> s.uniqueGenres <= 3 && s.totalGames > 20 },
    { id:'wishlist_warrior', name:'WISHLIST WARRIOR', description:"The wishlist is longer than the library.", icon:'📝', tier:'bronze', category:'behavioral',
      unlockHint:'Own 50+ games with over 50% never played',
      check:(g,s)=> s.totalGames > 50 && s.neverPlayedPercent > 50 },
    { id:'impulse_buyer', name:'IMPULSE BUYER', description:"Buy now, think later. Much later.", icon:'💸', tier:'bronze', category:'behavioral',
      unlockHint:'Own 50+ games with 50%+ never played',
      check:(g,s)=> s.neverPlayedPercent >= 50 && s.totalGames > 50 },
    { id:'humble_addict', name:'HUMBLE ADDICT', description:"Bundle after bundle after bundle...", icon:'🎁', tier:'bronze', category:'behavioral',
      unlockHint:'Own 100+ games with under 3h average each',
      check:(g,s)=> s.totalGames > 100 && s.avgHoursPerGame < 3 },

    // ===== CHALLENGE BADGES =====
    { id:'first_step', name:'FIRST STEP', description:"It begins.", icon:'👣', tier:'bronze', category:'challenge',
      unlockHint:'Launch a game you\'ve never played before',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.length >= 1 },
    { id:'going_deeper', name:'GOING DEEPER', description:"You gave it a real chance.", icon:'🕳️', tier:'silver', category:'challenge',
      unlockHint:'Play a previously unplayed game for 10+ hours',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.some(appid => { const gm = g.find(x=>x.appid===appid); return gm && (gm.playtime_forever||0)/60 >= 10; })},
    { id:'committed', name:'COMMITTED', description:"This one stuck.", icon:'📌', tier:'gold', category:'challenge',
      unlockHint:'Play a previously unplayed game for 50+ hours',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.some(appid => { const gm = g.find(x=>x.appid===appid); return gm && (gm.playtime_forever||0)/60 >= 50; })},
    { id:'no_going_back', name:'NO GOING BACK', description:"This is part of you now.", icon:'⛓️', tier:'platinum', category:'challenge',
      unlockHint:'Hit 100 hours in a previously unplayed game',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.some(appid => { const gm = g.find(x=>x.appid===appid); return gm && (gm.playtime_forever||0)/60 >= 100; })},
    { id:'five_alive', name:'FIVE ALIVE', description:"The backlog fears you.", icon:'🖐️', tier:'silver', category:'challenge',
      unlockHint:'Play 5 previously unplayed games',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.length >= 5 },
    { id:'backlog_buster', name:'BACKLOG BUSTER', description:"Making a dent.", icon:'💪', tier:'silver', category:'challenge',
      unlockHint:'Reduce unplayed game count by 10 since first session',
      check:(g,s,ch)=> ch.previousUnplayed - s.neverPlayed >= 10 },
    { id:'shame_eraser', name:'SHAME ERASER', description:"The pile shrinks.", icon:'🧹', tier:'gold', category:'challenge',
      unlockHint:'Play 20 previously unplayed games',
      check:(g,s,ch)=> ch.gamesPlayedSinceFirst.length >= 20 },
    { id:'pile_shrinker', name:'PILE SHRINKER', description:"Progress.", icon:'📉', tier:'bronze', category:'challenge',
      unlockHint:'Reduce unplayed percentage by 5% since first session',
      check:(g,s,ch)=> ch.previousUnplayedPercent - s.neverPlayedPercent >= 5 },
    { id:'zero_week', name:'ZERO WEEK', description:"You resisted the sale.", icon:'🛑', tier:'gold', category:'challenge',
      unlockHint:'Improve your Backlog Shame Score since last session',
      check:(g,s,ch)=> ch.previousShameScore > 0 && s.shameScore > ch.previousShameScore },
    { id:'shame_reducer', name:'SHAME REDUCER', description:"Getting better.", icon:'📈', tier:'silver', category:'challenge',
      unlockHint:'Improve your Backlog Shame Score by 10+ points',
      check:(g,s,ch)=> ch.previousShameScore > 0 && (s.shameScore - ch.previousShameScore) >= 10 },
    { id:'shame_free', name:'SHAME FREE', description:"You are the 1%.", icon:'🌟', tier:'platinum', category:'challenge',
      unlockHint:'Achieve a Backlog Shame Score of 80 or higher',
      check:(g,s,ch)=> s.shameScore >= 80 },
    { id:'efficiency_expert', name:'EFFICIENCY EXPERT', description:"Maximum value extracted.", icon:'📊', tier:'gold', category:'challenge',
      unlockHint:'Get your cost per hour under $0.15',
      check:(g,s,ch)=> s.costPerHour !== null && s.costPerHour < 0.15 },
    { id:'trophy_hunter', name:'TROPHY HUNTER', description:"The hunt is real.", icon:'🏅', tier:'silver', category:'challenge',
      unlockHint:'Unlock over 40% of achievements across your library',
      check:(g,s,ch)=> s.achievementPercent !== null && s.achievementPercent >= 40 },

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

// ==================== BADGE EXPLANATION ====================
function getBadgeExplanation(badge, games, stats) {
    const fmt = (mins) => mins >= 6000 ? `${(mins/60).toFixed(0)}h` : mins >= 60 ? `${(mins/60).toFixed(1)}h` : `${mins}m`;
    const sorted = [...games].sort((a,b) => (b.playtime_forever||0) - (a.playtime_forever||0));
    const top5 = sorted.slice(0, 5);
    const recent = games.filter(g => (g.playtime_2weeks||0) > 0).sort((a,b) => (b.playtime_2weeks||0) - (a.playtime_2weeks||0));
    const recent5 = recent.slice(0, 5);
    const unplayed = games.filter(g => (g.playtime_forever||0) === 0).length;

    switch(badge.id) {
        case 'obsessive': { const g = sorted.filter(g=>(g.playtime_forever||0)>=60000); return g.length ? `Earned for 1000+ hours in: ${g.map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'one_trick_pony': { const t = sorted[0]; return t ? `${((t.playtime_forever||0)/(stats.totalMinutes||1)*100).toFixed(0)}% of your playtime is ${t.name} (${fmt(t.playtime_forever)})` : badge.description; }
        case 'deep_diver': return `Average ${stats.avgHoursPerPlayed.toFixed(0)}h per played game. Top: ${top5.map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}`;
        case 'butterfly': return `${stats.totalGames} games, none over 20h. You flit between worlds.`;
        case 'binge_machine': { const t = sorted[0]; return t ? `${t.name}: ${fmt(t.playtime_2weeks)} in last 2 weeks (${((t.playtime_2weeks||0)/(t.playtime_forever||1)*100).toFixed(0)}% of total)` : badge.description; }
        case 'the_loyalist': { const g = games.filter(x=>(x.playtime_forever||0)>1200&&(x.playtime_2weeks||0)>0); return g.length ? `Still playing after 20h+: ${g.map(x=>`${x.name} (${fmt(x.playtime_forever)}, ${fmt(x.playtime_2weeks)} recent)`).join(', ')}` : badge.description; }
        case 'speed_runner': return `${stats.totalGames} games, avg ${stats.avgHoursPerGame.toFixed(1)}h each. Breadth over depth.`;
        case 'the_ghost': return `${stats.totalGames} games, 0 played recently. The library waits.`;
        case 'the_monogamist': { const t = recent[0]; const tot2w = games.reduce((a,x)=>a+(x.playtime_2weeks||0),0); return t ? `${t.name}: ${((t.playtime_2weeks||0)/tot2w*100).toFixed(0)}% of recent playtime` : badge.description; }
        case 'chronic_returner': { const g = games.filter(x=>(x.playtime_forever||0)>600&&(x.playtime_2weeks||0)>0); return g.length ? `Returned to: ${g.map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'strategy_brain': { const m = games.filter(g=>['strategy','tactics','total war','civilization','xcom','age of empires','starcraft','warcraft','command'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Strategy games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'survival_addict': { const m = games.filter(g=>['survival','rust','ark','the forest','dont starve','subnautica','7 days','valheim'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Survival games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'rpg_fanatic': { const m = games.filter(g=>['rpg','role','elder scrolls','witcher','dragon age','mass effect','final fantasy','diablo','skyrim'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `RPG games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'grand_strategist': { const m = games.filter(g=>['stellaris','crusader kings','europa universalis','hearts of iron','victoria','paradox'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Grand strategy: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'rogue_lover': { const m = games.filter(g=>['rogue','roguelike','roguelite','hades','slay the spire','dead cells','binding of isaac','enter the gungeon','spelunky'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Roguelikes: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'soulsborne_veteran': { const m = games.filter(g=>['dark souls','elden ring','bloodborne','sekiro','demon souls'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Souls games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'dungeon_crawler': { const m = games.filter(g=>['dungeon','crawler','darkest dungeon','pathfinder','grimrock','diablo'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Dungeon games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'world_builder': { const m = games.filter(g=>['city','builder','sim','skylines','simcity','planet coaster','frostpunk','banished','anno'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Builder games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'colony_manager': { const m = games.filter(g=>['colony','rimworld','oxygen','factorio','prison architect','dwarf fortress'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Colony games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'dark_fantasy': { const m = games.filter(g=>['dark fantasy','dark souls','elden ring','diablo','pathologic','blasphemous'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Dark fantasy: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'space_cadet': { const m = games.filter(g=>['space','stellaris','elite dangerous','no mans sky','eve','star citizen','kerbal','everspace'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Space games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'lore_goblin': { const m = games.filter(g=>['rpg','elder scrolls','witcher','mass effect','dragon age','divinity','pathfinder'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Lore-heavy RPGs: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'tactician': { const m = games.filter(g=>['turn-based','tactics','xcom','fire emblem','into the breach','civilization','advance wars'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Tactical games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'milsim_devotee': { const m = games.filter(g=>['milsim','arma','squad','post scriptum','dcs','il-2','war thunder'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Milsim games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'pixel_pilgrim': { const m = games.filter(g=>['indie','hollow knight','celeste','undertale','shovel knight','terraria','stardew','dead cells'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Indie games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'warlord': { const m = games.filter(g=>['total war','crusader kings','hearts of iron','civilization','stellaris'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `War games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'mercenary_captain': { const m = games.filter(g=>(g.name||'').toLowerCase().includes('battle brothers')).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Battle Brothers: ${m.map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'chicken_dinner': { const m = games.filter(g=>(g.name||'').toLowerCase().includes('pubg')).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `PUBG: ${m.map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'eternal_exile': { const m = games.filter(g=>(g.name||'').toLowerCase().includes('bannerlord')||(g.name||'').toLowerCase().includes('warband')).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Mount & Blade: ${m.map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'space_emperor': { const m = games.filter(g=>(g.name||'').toLowerCase().includes('stellaris')).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Stellaris: ${m.map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'dragonborn': { const m = games.filter(g=>(g.name||'').toLowerCase().includes('skyrim')||(g.name||'').toLowerCase().includes('elder scrolls')).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Elder Scrolls: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'witcher_badge': { const m = games.filter(g=>(g.name||'').toLowerCase().includes('witcher')).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `The Witcher: ${m.map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'vault_dweller': { const m = games.filter(g=>(g.name||'').toLowerCase().includes('fallout')).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Fallout: ${m.map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'commander_badge': { const m = games.filter(g=>(g.name||'').toLowerCase().includes('total war')).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Total War: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'architect_of_ruin': { const m = games.filter(g=>['city','builder','sim','skylines','frostpunk','survival','horror'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Builder+Survival: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'dungeon_master': { const m = games.filter(g=>['rpg','dungeon','pathfinder','divinity','strategy','tactics'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `RPG+Strategy: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'merchant_prince': { const m = games.filter(g=>['trading','economy','patrician','offworld','victoria','merchant'].some(k=>(g.name||'').toLowerCase().includes(k))).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Economy games: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'sale_hoarder': return `${unplayed} unplayed games (${stats.neverPlayedPercent.toFixed(0)}%). You buy, but don't play.`;
        case 'bundle_victim': return `${stats.totalGames} games, avg ${stats.avgHoursPerGame.toFixed(1)}h each. The bundles own you.`;
        case 'the_curator': return `${stats.totalGames} games, ${stats.playedPercent.toFixed(0)}% played. Intentional collection.`;
        case 'completionist': return badge.description;
        case 'achievement_hunter': return badge.description;
        case 'achievement_ignorer': return `${stats.totalHours.toFixed(0)}h played, <10% achievements. The game is the game.`;
        case 'the_purist': return `${stats.totalGames} games, ${stats.playedPercent.toFixed(0)}% played. Quality over quantity.`;
        case 'digital_hoarder': return `${stats.totalGames} games and counting. The hard drive weeps.`;
        case 'early_adopter': return `${stats.totalGames} games in your library. Early and often.`;
        case 'franchise_collector': { const f = detectFranchise(games); return `${f} franchises with 3+ entries. All in.`; }
        case 'hidden_gem_hunter': { const m = games.filter(x=>(x.playtime_forever||0)>600).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Deep plays: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'contrarian': return badge.description;
        case 'parallel_player': return `${stats.recentlyActive} games active in last 2 weeks. Why choose?`;
        case 'false_starter': return `${stats.gamesBetween1and3h} games between 1-3h. The beginning is the best part.`;
        case 'tutorial_dropout': return `${stats.gamesUnder1h} games under 1h. You know enough.`;
        case 'never_finishes': return `${stats.gamesBetween1and3h} started, ${stats.gamesOver20h} finished. So close.`;
        case 'genre_tourist': return `${stats.uniqueGenres} genres explored. Why specialize?`;
        case 'the_archaeologist': { const m = games.filter(x=>(x.playtime_forever||0)>300&&(x.playtime_2weeks||0)>0).sort((a,b)=>(b.playtime_forever||0)-(a.playtime_forever||0)); return m.length ? `Classic returns: ${m.slice(0,3).map(x=>`${x.name} (${fmt(x.playtime_forever)})`).join(', ')}` : badge.description; }
        case 'niche_lord': return `${stats.uniqueGenres} genres across ${stats.totalGames} games. Found your corner.`;
        case 'wishlist_warrior': return `${stats.totalGames} games, ${stats.neverPlayedPercent.toFixed(0)}% unplayed. The wishlist grows.`;
        case 'impulse_buyer': return `${stats.neverPlayedPercent.toFixed(0)}% unplayed of ${stats.totalGames} games. Buy now, think later.`;
        case 'humble_addict': return `${stats.totalGames} games, avg ${stats.avgHoursPerGame.toFixed(1)}h each. Bundle after bundle.`;
        case 'first_step': return badge.description;
        case 'going_deeper': return badge.description;
        case 'committed': return badge.description;
        case 'no_going_back': return badge.description;
        case 'five_alive': return badge.description;
        case 'backlog_buster': return badge.description;
        case 'shame_eraser': return badge.description;
        case 'pile_shrinker': return badge.description;
        case 'zero_week': return badge.description;
        case 'shame_reducer': return badge.description;
        case 'shame_free': return badge.description;
        case 'efficiency_expert': return badge.description;
        case 'trophy_hunter': return badge.description;
        default: return badge.description;
    }
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
        b.style.background = 'transparent';
        b.style.color = 'var(--muted)';
        if (b.dataset.filter === 'platinum') {
            b.style.borderColor = '#9b59b6';
            b.style.color = '#9b59b6';
        }
    });
    const active = document.querySelector(`.badge-filter[data-filter="${category}"]`);
    if (active) {
        active.classList.add('active');
        if (category === 'platinum') {
            active.style.background = '#9b59b6';
            active.style.color = 'var(--bg)';
            active.style.borderColor = '#9b59b6';
        } else {
            active.style.background = 'var(--accent)';
            active.style.color = 'var(--bg)';
            active.style.borderColor = 'var(--accent)';
        }
    }
    renderBadges();
}

function renderBadges() {
    const earned = badgeState.earned;
    const filter = badgeState.filter;
    const stats = calculateBadgeStats(steamData.games);

    // Filter badges - platinum is a tier filter, not category
    let filtered;
    if (filter === 'all') {
        filtered = BADGES.filter(b => BADGE_IMAGES[b.id]);
    } else if (filter === 'platinum') {
        filtered = BADGES.filter(b => b.tier === 'platinum' && BADGE_IMAGES[b.id]);
    } else {
        filtered = BADGES.filter(b => b.category === filter && BADGE_IMAGES[b.id]);
    }

    const earnedFiltered = filtered.filter(b => earned.includes(b.id));
    const lockedFiltered = filtered.filter(b => !earned.includes(b.id));

    // Sort by tier rarity
    const sortByTier = (a, b) => (TIER_ORDER[a.tier]||3) - (TIER_ORDER[b.tier]||3);
    const earnedSorted = [...earnedFiltered].sort(sortByTier);
    const lockedSorted = [...lockedFiltered].sort(sortByTier);

    const totalWithImages = BADGES.filter(b => BADGE_IMAGES[b.id]).length;
    const earnedWithImages = earned.filter(id => BADGE_IMAGES[id]).length;
    const pct = totalWithImages > 0 ? (earnedWithImages / totalWithImages * 100) : 0;

    // Progress bar
    document.getElementById('badgeProgressBar').style.width = pct + '%';
    document.getElementById('badgeCount').textContent = `${earnedWithImages} / ${totalWithImages} EARNED`;

    // Tier breakdown
    const tierCounts = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
    earnedFiltered.forEach(b => { if (tierCounts[b.tier] !== undefined) tierCounts[b.tier]++; });
    document.getElementById('badgeTierBreakdown').innerHTML =
        `<span style="color:#e5e4e2">●</span> ${tierCounts.platinum} PLATINUM  ` +
        `<span style="color:#ffd700">●</span> ${tierCounts.gold} GOLD  ` +
        `<span style="color:#c0c0c0">●</span> ${tierCounts.silver} SILVER  ` +
        `<span style="color:#cd7f32">●</span> ${tierCounts.bronze} BRONZE`;

    // Trophy Shelf - top 3 rarest earned
    const featured = earnedSorted.slice(0, 3);
    document.getElementById('featuredBadges').innerHTML = featured.length > 0 ? featured.map(b => {
        const imgSrc = BADGE_IMAGES[b.id];
        const explanation = getBadgeExplanation(b, steamData.games, stats);
        const tierColor = TIER_COLORS[b.tier];
        return `
        <div class="trophy-card ${b.tier} p-6 space-y-3 relative group/feat" style="--tier-color:${tierColor}">
            <div class="flex flex-col items-center text-center">
                ${imgSrc ? `<img src="${imgSrc}" alt="${b.name}" style="width:192px;height:192px;object-fit:contain"/>` : ''}
                <p class="font-headline font-bold text-white text-base tracking-widest mt-3">${b.name}</p>
                <div class="flex items-center gap-1 mt-1">
                    <span class="inline-block w-3 h-3 rounded-sm" style="background:${tierColor}"></span>
                    <span class="text-[11px] font-label text-slate-500 uppercase">${b.tier}</span>
                </div>
                <p class="text-[12px] font-body text-slate-400 italic mt-2">${b.description}</p>
            </div>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-black/95 border rounded-lg text-[11px] font-body text-slate-300 max-w-[300px] opacity-0 group-hover/feat:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl" style="border-color:${tierColor}">
                <p class="font-headline text-white text-xs mb-1">${b.name}</p>
                <p>${explanation}</p>
            </div>
        </div>`;
    }).join('') : '<p class="text-slate-500 font-label text-xs col-span-3 text-center py-8">Play some games to earn your first badges!</p>';

    // Earned label
    document.getElementById('earnedLabel').textContent = `EARNED — ${earnedSorted.length} BADGES`;

    // Earned grid
    const earnedGrid = document.getElementById('earnedBadgeGrid');
    if (earnedSorted.length === 0) {
        const catName = filter === 'all' ? '' : ` ${filter.toUpperCase()}`;
        earnedGrid.innerHTML = `<div class="col-span-full text-center py-8 text-[12px] font-body" style="color:var(--muted)">NO${catName} BADGES EARNED YET</div>`;
    } else {
        earnedGrid.innerHTML = earnedSorted.map(b => {
            const imgSrc = BADGE_IMAGES[b.id];
            const explanation = getBadgeExplanation(b, steamData.games, stats);
            const tierColor = TIER_COLORS[b.tier];
            return `
            <div class="badge-card earned-card relative p-3" style="--tier-color:${tierColor}">
                ${imgSrc ? `<img src="${imgSrc}" alt="${b.name}" class="badge-img" style="width:128px;height:128px;object-fit:contain;display:block;margin:0 auto"/>` : ''}
                <p class="font-headline text-[10px] tracking-[1px] uppercase text-center mt-2 text-white">${b.name}</p>
                <span class="block w-[6px] h-[6px] rounded-full mx-auto mt-1" style="background:${tierColor}"></span>
                <div class="badge-tooltip">
                    <p class="font-headline text-white text-xs mb-1">${b.name}</p>
                    <p>${explanation}</p>
                </div>
            </div>`;
        }).join('');
    }

    // Locked divider
    document.getElementById('lockedDividerLabel').textContent = `🔒 LOCKED — ${lockedSorted.length} REMAINING`;

    // Locked label
    document.getElementById('lockedLabel').textContent = `LOCKED — ${lockedSorted.length} BADGES`;

    // Locked grid
    const lockedGrid = document.getElementById('lockedBadgeGrid');
    if (lockedSorted.length === 0) {
        const catName = filter === 'all' ? '' : ` ${filter.toUpperCase()}`;
        lockedGrid.innerHTML = `<div class="col-span-full text-center py-8 text-[14px] font-headline" style="color:var(--green)">ALL${catName} BADGES EARNED — LEGENDARY</div>`;
    } else {
        lockedGrid.innerHTML = lockedSorted.map(b => {
            const imgSrc = BADGE_IMAGES[b.id];
            const tierColor = TIER_COLORS[b.tier];
            const isChallenge = b.category === 'challenge';
            const descText = isChallenge ? '???' : b.description;
            return `
            <div class="badge-card locked-card relative p-2" style="--tier-color:${tierColor}">
                ${imgSrc ? `<img src="${imgSrc}" alt="${b.name}" class="badge-img" style="width:96px;height:96px;object-fit:contain;display:block;margin:0 auto"/>` : ''}
                <p class="font-headline text-[9px] tracking-[1px] uppercase text-center mt-1.5" style="color:var(--muted)">${b.name}</p>
                <span class="block w-[4px] h-[4px] rounded-full mx-auto mt-1" style="background:${tierColor};opacity:0.4"></span>
                <div class="badge-tooltip">
                    <p class="font-headline text-white text-xs mb-1">${b.name}</p>
                    <p>${descText}</p>
                    <p class="mt-1" style="color:var(--accent)">Unlock: ${b.unlockHint || 'Unknown'}</p>
                </div>
            </div>`;
        }).join('');
    }
}
