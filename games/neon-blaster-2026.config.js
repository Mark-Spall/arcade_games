/**
 * Neon Blaster 2026 — game tuning (load before main script).
 * Story copy: neon-blaster-2026-story.json (see CONFIG.story.url).
 * The same JSON is embedded in neon-blaster-2026.html (#neon-blaster-story-embed) so interludes work without HTTP; refresh the embed when you edit the .json.
 */
(function (global) {
'use strict';
const _isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || (window.innerWidth < 800 && 'ontouchstart' in window);
const PERF = {
  glow: !_isMobile,           // shadowBlur on desktop only
  bloomIntensity: _isMobile ? 0.3 : 0.55,
  bloomDownscale: _isMobile ? 8 : 5,
  particleMax: _isMobile ? 600 : 1200,
};
const CONFIG = {
  world: { minWidth: 480, height: 720, width: 480 },

  player: {
    speed: 5.2, verticalSpeed: 3.8,
    size: { w: 34, h: 32 },
    startY: 0.82,
    invincibilityFrames: 90,
    maxLives: 10, maxShields: 5, maxBombs: 5, maxGravityWells: 5,
    weapons: [
      { name: 'Single',  cooldown: 11, bullets: [{ ox: 0, oy: -14, vx: 0, vy: -9, color: '#ff00c8', dmg: 1 }] },
      { name: 'Dual',    cooldown: 8,  bullets: [
        { ox: 0, oy: -14, vx: 0,   vy: -9,  color: '#ff00c8', dmg: 1 },
        { ox:-10, oy: -8,  vx:-0.8, vy: -8,  color: '#00d4ff', dmg: 1 },
        { ox: 10, oy: -8,  vx: 0.8, vy: -8,  color: '#00d4ff', dmg: 1 },
      ]},
      { name: 'Spread',  cooldown: 6,  bullets: [
        { ox: 0, oy: -14, vx: 0,   vy: -9,  color: '#ff00c8', dmg: 1 },
        { ox:-10, oy: -8,  vx:-0.8, vy: -8,  color: '#00d4ff', dmg: 1 },
        { ox: 10, oy: -8,  vx: 0.8, vy: -8,  color: '#00d4ff', dmg: 1 },
        { ox:-20, oy: -4,  vx:-1.8, vy: -7,  color: '#39ff14', dmg: 1, pierce: true },
        { ox: 20, oy: -4,  vx: 1.8, vy: -7,  color: '#39ff14', dmg: 1, pierce: true },
      ]},
      { name: 'Storm',   cooldown: 5,  bullets: [
        { ox: 0, oy: -14, vx: 0,    vy: -9.5, color: '#ff00c8', dmg: 1 },
        { ox:-10, oy: -8,  vx:-0.8,  vy: -8.5, color: '#00d4ff', dmg: 1 },
        { ox: 10, oy: -8,  vx: 0.8,  vy: -8.5, color: '#00d4ff', dmg: 1 },
        { ox:-20, oy: -4,  vx:-1.8,  vy: -7.5, color: '#39ff14', dmg: 1, pierce: true },
        { ox: 20, oy: -4,  vx: 1.8,  vy: -7.5, color: '#39ff14', dmg: 1, pierce: true },
        { ox:-28, oy:  0,  vx:-2.6,  vy: -6.5, color: '#ffe600', dmg: 2, pierce: true },
        { ox: 28, oy:  0,  vx: 2.6,  vy: -6.5, color: '#ffe600', dmg: 2, pierce: true },
        { ox:-14, oy: -11, vx:-1.15, vy: -8.9, color: '#ff00c8', dmg: 1 },
        { ox: 14, oy: -11, vx: 1.15, vy: -8.9, color: '#ff00c8', dmg: 1 },
        { ox:-32, oy: -2,  vx:-2.85, vy: -6.2, color: '#ffffff', dmg: 1, pierce: true },
        { ox: 32, oy: -2,  vx: 2.85, vy: -6.2, color: '#ffffff', dmg: 1, pierce: true },
      ]},
      { name: 'Nova',    cooldown: 4,  bullets: [
        { ox: 0, oy: -16, vx: 0,    vy: -10, color: '#ffffff', dmg: 2, pierce: true },
        { ox: 0, oy: -14, vx: 0,    vy: -9.8, color: '#ff00c8', dmg: 1 },
        { ox:-8, oy: -15, vx:-0.35, vy: -9.6, color: '#ff00c8', dmg: 1 },
        { ox: 8, oy: -15, vx: 0.35, vy: -9.6, color: '#ff00c8', dmg: 1 },
        { ox:-10, oy: -8,  vx:-0.85, vy: -8.8, color: '#00d4ff', dmg: 1 },
        { ox: 10, oy: -8,  vx: 0.85, vy: -8.8, color: '#00d4ff', dmg: 1 },
        { ox:-18, oy: -6,  vx:-1.45, vy: -8.2, color: '#00d4ff', dmg: 1, pierce: true },
        { ox: 18, oy: -6,  vx: 1.45, vy: -8.2, color: '#00d4ff', dmg: 1, pierce: true },
        { ox:-22, oy: -3,  vx:-1.95, vy: -7.6, color: '#39ff14', dmg: 1, pierce: true },
        { ox: 22, oy: -3,  vx: 1.95, vy: -7.6, color: '#39ff14', dmg: 1, pierce: true },
        { ox:-30, oy:  0,  vx:-2.75, vy: -6.8, color: '#ffe600', dmg: 2, pierce: true },
        { ox: 30, oy:  0,  vx: 2.75, vy: -6.8, color: '#ffe600', dmg: 2, pierce: true },
        { ox:-36, oy:  1,  vx:-3.1,  vy: -6.2, color: '#cc44ff', dmg: 2, pierce: true },
        { ox: 36, oy:  1,  vx: 3.1,  vy: -6.2, color: '#cc44ff', dmg: 2, pierce: true },
        { ox:-12, oy: -12, vx:-1.0,  vy: -9.2, color: '#ff66ff', dmg: 1 },
        { ox: 12, oy: -12, vx: 1.0,  vy: -9.2, color: '#ff66ff', dmg: 1 },
      ]},
    ],
  },

  enemies: {
    scout:   { hp: 1, speed: 0.5, points: 100, shootRate: 0.003, diveShootRate: 0.025,
               colors: ['#39ff14','#00cc44'], accent: '#ff2244', size: 32, shape: 'diamond' },
    fighter: { hp: 2, speed: 0.4, points: 200, shootRate: 0.005, diveShootRate: 0.03,
               colors: ['#ff6600','#ff9933'], accent: '#ffe600', size: 34, shape: 'chevron' },
    splitter:{ hp: 4, speed: 0.35, points: 250, shootRate: 0.004, diveShootRate: 0.02,
               colors: ['#ff44ff','#bb22dd'], accent: '#ffffff', size: 36, shape: 'hexagon',
               splitInto: 'scout', splitCount: 3 },
    cloaker: { hp: 3, speed: 0.45, points: 350, shootRate: 0.006, diveShootRate: 0.03,
               colors: ['#4466aa','#223366'], accent: '#00d4ff', size: 34, shape: 'diamond',
               cloaked: true },
    orbiter: { hp: 2, speed: 0.55, points: 200, shootRate: 0.005, diveShootRate: 0.035,
               colors: ['#00ffcc','#009977'], accent: '#ffffff', size: 30, shape: 'chevron',
               preferDive: 'circle' },
    heavy:   { hp: 3, speed: 0.3, points: 300, shootRate: 0.007, diveShootRate: 0.035,
               colors: ['#ff2244','#cc1133'], accent: '#ff00c8', size: 38, shape: 'hexagon' },
    pulsar:  { hp: 2, speed: 0.6, points: 250, shootRate: 0.008, diveShootRate: 0.04,
               colors: ['#ffcc00','#ff8800'], accent: '#ffffff', size: 30, shape: 'star',
               burstShoot: true },
    wraith:  { hp: 5, speed: 0.5, points: 400, shootRate: 0.005, diveShootRate: 0.03,
               colors: ['#335588','#112244'], accent: '#66aaff', size: 36, shape: 'crescent',
               cloaked: true, preferDive: 'figure8' },
    carrier: { hp: 6, speed: 0.2, points: 500, shootRate: 0.003, diveShootRate: 0.01,
               colors: ['#886622','#aa8833'], accent: '#ffe600', size: 42, shape: 'cross',
               splitInto: 'fighter', splitCount: 4 },
    berserker:{ hp: 2, speed: 0.75, points: 350, shootRate: 0.01, diveShootRate: 0.05,
               colors: ['#ff0044','#ff4466'], accent: '#ffffff', size: 28, shape: 'triangle',
               preferDive: 'zigzag', alwaysDive: true },

    // ── Bosses ──
    sentinel:{ hp: 50, speed: 0.15, points: 5000, shootRate: 0.012, diveShootRate: 0,
               colors: ['#ff2244','#cc44ff'], accent: '#ffe600', size: 80, shape: 'boss',
               isBoss: true, phases: [
                 { above: 0.6, rate: 0.010, pattern: 'spread3' },
                 { above: 0.3, rate: 0.018, pattern: 'spread5', spawnMinions: 'scout', minionCount: 4 },
                 { above: 0.0, rate: 0.025, pattern: 'spray' },
               ]},
    warden:  { hp: 70, speed: 0.12, points: 7500, shootRate: 0.015, diveShootRate: 0,
               colors: ['#886622','#ffaa00'], accent: '#ff6600', size: 90, shape: 'boss',
               isBoss: true, phases: [
                 { above: 0.7, rate: 0.012, pattern: 'aimed_burst', spawnMinions: 'fighter', minionCount: 3 },
                 { above: 0.4, rate: 0.020, pattern: 'ring', spawnMinions: 'pulsar', minionCount: 5, cloak: true },
                 { above: 0.15,rate: 0.025, pattern: 'cross', spawnMinions: 'heavy', minionCount: 3, decloak: true },
                 { above: 0.0, rate: 0.030, pattern: 'spray', spawnMinions: 'berserker', minionCount: 6 },
               ]},
    dreadnought:{ hp: 100, speed: 0.1, points: 10000, shootRate: 0.018, diveShootRate: 0,
               colors: ['#220044','#8844cc'], accent: '#ff00c8', size: 100, shape: 'boss',
               isBoss: true, cloaked: true, phases: [
                 { above: 0.8, rate: 0.014, pattern: 'helix' },
                 { above: 0.6, rate: 0.020, pattern: 'wall', spawnMinions: 'cloaker', minionCount: 4 },
                 { above: 0.35,rate: 0.024, pattern: 'ring', recloak: true },
                 { above: 0.15,rate: 0.028, pattern: 'helix', spawnMinions: 'wraith', minionCount: 5 },
                 { above: 0.0, rate: 0.035, pattern: 'spray', spawnMinions: 'berserker', minionCount: 8 },
               ]},
    leviathan:{ hp: 160, speed: 0.08, points: 15000, shootRate: 0.02, diveShootRate: 0,
               colors: ['#440000','#ff2244'], accent: '#ffe600', size: 110, shape: 'boss',
               isBoss: true, spawnSubBoss: 'sentinel', phases: [
                 { above: 0.85,rate: 0.012, pattern: 'spread5' },
                 { above: 0.65,rate: 0.018, pattern: 'wall', spawnMinions: 'heavy', minionCount: 4 },
                 { above: 0.45,rate: 0.022, pattern: 'helix', spawnSubBoss: true, cloak: true },
                 { above: 0.25,rate: 0.028, pattern: 'ring', spawnMinions: 'carrier', minionCount: 3 },
                 { above: 0.1, rate: 0.032, pattern: 'cross', spawnSubBoss: true, decloak: true },
                 { above: 0.0, rate: 0.040, pattern: 'spray', spawnMinions: 'berserker', minionCount: 10 },
               ]},
  },

  difficulty: {
    hpPerLevel: 0.3,
    formationSpeedPerLevel: 0.09,
    diveRateBase: 0.0008, diveRatePerLevel: 0.00035,
    shootRatePerLevel: 0.0005,
    bulletSpeedBase: 3.2, bulletSpeedPerLevel: 0.24,
    maxDiversBase: 2, maxDiversPerLevel: 0.6, maxDiversCap: 9,
  },

  waves: {
    rowsBase: 3, rowsPerLevel: 0.4, rowsCap: 5,
    colsBase: 6, colsPerLevel: 0.25, colsCap: 9,
    spacingX: 46, spacingY: 44, offsetY: 55,
    bossEvery: 5,
    typeProgression: [
      { minLevel: 1,  types: ['scout'] },
      { minLevel: 3,  types: ['scout', 'fighter'] },
      { minLevel: 5,  types: ['scout', 'fighter', 'splitter'] },
      { minLevel: 7,  types: ['scout', 'fighter', 'splitter', 'heavy'] },
      { minLevel: 9,  types: ['scout', 'fighter', 'cloaker', 'splitter', 'heavy'] },
      { minLevel: 11, types: ['fighter', 'cloaker', 'orbiter', 'splitter', 'heavy'] },
      { minLevel: 14, types: ['cloaker', 'orbiter', 'splitter', 'heavy', 'pulsar'] },
      { minLevel: 16, types: ['cloaker', 'orbiter', 'heavy', 'pulsar', 'wraith'] },
      { minLevel: 18, types: ['orbiter', 'heavy', 'pulsar', 'wraith', 'carrier'] },
      { minLevel: 21, types: ['heavy', 'pulsar', 'wraith', 'carrier', 'berserker'] },
      { minLevel: 24, types: ['wraith', 'carrier', 'berserker', 'heavy', 'pulsar'] },
      { minLevel: 27, types: ['berserker', 'wraith', 'carrier', 'heavy'] },
      { minLevel: 30, types: ['berserker', 'wraith', 'carrier'] },
    ],
    bossProgression: [
      { minLevel: 5,  boss: 'sentinel' },
      { minLevel: 10, boss: 'warden' },
      { minLevel: 15, boss: 'sentinel' },
      { minLevel: 20, boss: 'dreadnought' },
      { minLevel: 25, boss: 'leviathan' },
    ],
    canyonFirstLevel: 4,
    canyonCycle: [2, 2],
  },

  drops: {
    baseChance: 0.085,
    upgradeStartLevel: 8, shieldStartLevel: 10, bombStartLevel: 12,
    seekerStartLevel: 6, mineStartLevel: 8, rearStartLevel: 11, 
    gravityStartLevel: 13,
    upgradeChance: 0.18, shieldChance: 0.30, bombChance: 0.20,
    lifeChance: 0.30, pityUpgradeChance: 0.55,
    seekerChance: 0.22, mineChance: 0.18, rearChance: 0.15,
    gravityChance: 0.12,
    /** Extra frames added per P pickup while boost already active (caps below). */
    powerStackFrames: 220,
    powerTimerCap: 1500,
    /** Extra seeker duration per H while already active; cap keeps dupes worthwhile. */
    seekerStackFrames: 260,
    seekerTimerCap: 1680,
  },

  gravityWell: {
    duration: 200,
    growDuration: 36,
    maxRadius: 88,
    pullRadiusMax: 155,
    pullMul: 1.45,
    pullStrength: 32,
    pullCap: 8.5,
    swirlStrength: 6.0,
    consumeRadius: 18,
    collapseDamageRadius: 130,
    playerPullMul: 0.45,
    playerSwirlMul: 0.6,
    bossPullScale: 0.22,
    spawnCooldown: 18,
    bulletPullMul: 2.8,
    bulletSwirlMul: 1.6,
    bulletConsumeRadius: 14,
    ambientParticles: 3,
  },

  auxWeapons: {
    seeker: { fireRate: 28, speed: 5, turnRate: 0.08, life: 180, dmg: 2, duration: 900, color: '#ff2244' },
    mine:   { dropRate: 70, radius: 18, detonateRadius: 30, dmg: 3, life: 400, duration: 800, color: '#ff6600' },
    rear:   { fireRate: 18, speed: 6, dmg: 1, duration: 700, color: '#cc44ff' },
  },

  canyon: {
    segments: 50, segHeight: 20,
    widthFraction: 0.46,
    minWidthFraction: 0.32,
    narrowPerLevel: 0.005,
    widthJitter: 0.075,
    widthJitterSpeed: 0.045,
    scrollSpeedBase: 1.2, scrollSpeedPerLevel: 0.08,
    sway: {
      speed1: 0.06,
      speed2: 0.155,
      amplitude1: 0.14,
      amplitude2: 0.05,
      ampPerLevel: 0.004,
      ampCap: 0.19,
    },
    enterFrames: 120, exitFrames: 90,
    wallColor: '#110822', edgeColor: '#5a25aa', glowColor: '#cc44ff',
  },

  starfield: { count: 180, layers: 3 },

  particles: { max: PERF.particleMax },

  bloom: { downscale: PERF.bloomDownscale, intensity: PERF.bloomIntensity },

  audio: { masterVol: 0.15 },

  colors: {
    pink: '#ff00c8', blue: '#00d4ff', green: '#39ff14', yellow: '#ffe600',
    orange: '#ff6600', red: '#ff2244', purple: '#cc44ff', bg: '#06000f',
  },

  music: {
    // Arcade-forward tempo (cf. dynamic BGM patterns in game-audio tutorials)
    bpm: 132,
    masterVolume: 0.55,
    bpmPerLevel: 0.45,
    maxBpm: 148,
    fadeTime: 1.8,

    // Am → Dm → F → E  (classic synthwave minor)
    progression: [
      ['A2','C3','E3'],
      ['D2','F2','A2'],
      ['F2','A2','C3'],
      ['E2','G#2','B2'],
    ],

    layers: {
      pad: {
        synthType: 'poly',
        maxPolyphony: 8,
        oscillator: { type: 'fatsawtooth', count: 3, spread: 32 },
        envelope: { attack: 1.2, decay: 0.8, sustain: 0.65, release: 2.2 },
        filterFreq: 1200,
        filterRolloff: -24,
        volume: -21,
        noteDuration: '2n',
        pattern: 'chords',
        subdivision: '1m',
        minIntensity: 0,
        reverb: true,
      },
      bass: {
        synthType: 'mono',
        oscillator: { type: 'square' },
        envelope: { attack: 0.005, decay: 0.12, sustain: 0.35, release: 0.06 },
        volume: -13,
        noteDuration: '16n',
        pattern: [
          ['A1',null,'A1',null,null,null,'E1',null],
          ['D1',null,'D1',null,null,null,'A1',null],
          ['F1',null,'F1',null,null,null,'C2',null],
          ['E1',null,'E1',null,'B0',null,'E1',null],
        ],
        subdivision: '8n',
        minIntensity: 1,
      },
      // MembraneSynth kick — punchy 4-on-the-floor (tutorial-style envelope)
      kick: {
        synthType: 'membrane',
        pitchDecay: 0.05,
        octaves: 5,
        envelope: { attack: 0.001, decay: 0.22, sustain: 0, release: 0.12 },
        volume: -11,
        noteDuration: '32n',
        pattern: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
        subdivision: '16n',
        minIntensity: 1,
      },
      // Snare-ish noise burst on 2 & 4 — backbeat glue for Invaders-style tension
      snare: {
        synthType: 'noise',
        noiseType: 'white',
        envelope: { attack: 0.002, decay: 0.14, sustain: 0, release: 0.1 },
        volume: -21,
        noteDuration: '32n',
        pattern: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
        subdivision: '16n',
        minIntensity: 2,
      },
      hihat: {
        synthType: 'noise',
        noiseType: 'white',
        envelope: { attack: 0.001, decay: 0.045, sustain: 0, release: 0.035 },
        volume: -19,
        noteDuration: '32n',
        pattern: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,1],
        subdivision: '16n',
        minIntensity: 2,
      },
      arp: {
        synthType: 'mono',
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.004, decay: 0.08, sustain: 0.03, release: 0.06 },
        filterFreq: 7800,
        filterRolloff: -12,
        volume: -19,
        noteDuration: '32n',
        pattern: [
          ['A3','C4','E4','A4','E4','C4','A3','C4','E4','A4','E4','C4','A3','E4','A4','E4'],
          ['D3','F3','A3','D4','A3','F3','D3','F3','A3','D4','A3','F3','D3','A3','D4','A3'],
          ['F3','A3','C4','F4','C4','A3','F3','A3','C4','F4','C4','A3','F3','C4','F4','C4'],
          ['E3','G#3','B3','E4','B3','G#3','E3','G#3','B3','E4','B3','G#3','E3','B3','E4','B3'],
        ],
        subdivision: '16n',
        minIntensity: 2,
      },
      lead: {
        synthType: 'mono',
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.03, decay: 0.18, sustain: 0.5, release: 0.25 },
        filterFreq: 3000,
        filterRolloff: -12,
        volume: -17,
        noteDuration: '8n',
        pattern: ['E4',null,'C5','A4', 'F4',null,'D4',null, 'C4',null,'A4',null, 'B3',null,'E4',null],
        subdivision: '4n',
        minIntensity: 3,
        reverb: true,
      },
      drone: {
        synthType: 'fm',
        harmonicity: 1.5,
        modulationIndex: 8,
        oscillator: { type: 'sine' },
        modulation: { type: 'triangle' },
        envelope: { attack: 2.0, decay: 1.0, sustain: 0.7, release: 3.0 },
        modulationEnvelope: { attack: 1.5, decay: 0.5, sustain: 0.6, release: 2.0 },
        filterFreq: 600,
        filterRolloff: -24,
        volume: -32,
        noteDuration: '2n',
        pattern: ['A1', null, 'D1', null, 'F1', null, 'E1', null],
        subdivision: '2n',
        minIntensity: 0,
        reverb: true,
      },
      sub: {
        synthType: 'mono',
        oscillator: { type: 'sine' },
        envelope: { attack: 0.3, decay: 0.5, sustain: 0.8, release: 0.5 },
        volume: -18,
        noteDuration: '2n',
        pattern: ['A1', null, null, null, 'D1', null, null, null, 'F1', null, null, null, 'E1', null, null, null],
        subdivision: '4n',
        minIntensity: 1,
      },
    },

    intensity: {
      // thresholds: [minEnemies, minDivers]
      wave:    [1, 0],
      combat:  [6, 1],
      intense: [12, 3],
    },

    /** Crossfade / morph time when wave theme changes (seconds) */
    themeTransitionTime: 2.5,

    /**
     * Wave → music theme (first matching rule wins). WaveManager.getMusicThemeForLevel uses this.
     * high_tempo: early swarms | heavy_bass: late formations | dissonant_industrial: boss waves
     */
    waveThemes: {
      defaultId: 'default',
      rules: [
        { id: 'leviathan_wrath', match: (level) => level > 1 && CONFIG.waves.bossEvery && level % CONFIG.waves.bossEvery === 0 && _bossForLevel(level) === 'leviathan' },
        { id: 'phantom', match: (level) => level > 1 && CONFIG.waves.bossEvery && level % CONFIG.waves.bossEvery === 0 && _bossForLevel(level) === 'dreadnought' },
        { id: 'dissonant_industrial', match: (level) => CONFIG.waves.bossEvery && level > 1 && level % CONFIG.waves.bossEvery === 0 },
        { id: 'deep_abyss', match: (level) => level >= 20 },
        { id: 'heavy_bass', match: (level) => level >= 12 },
        { id: 'high_tempo', match: (level) => level <= 6 },
      ],
    },

    /**
     * Theme presets: merged over CONFIG.music.layers[*]. Oscillator / filter morphs + optional patterns.
     * bpmDelta is added on top of level-scaled BPM in MusicManager.update (capped by maxBpm).
     */
    themes: {
      default: {
        drone: { volume: -32, harmonicity: 1.5, modulationIndex: 8 },
        sub: { volume: -18 },
      },

      // ── Early game: bright, energetic, arcade-forward ──
      high_tempo: {
        bpmDelta: 6,
        reverbWet: 0.22,
        pad: { filterFreq: 1600 },
        bass: { oscillator: { type: 'square' } },
        arp: { oscillator: { type: 'triangle' }, filterFreq: 3800 },
        lead: { filterFreq: 3400 },
        kick: { envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 } },
        snare: { volume: -20 },
        hihat: { volume: -17 },
        drone: { volume: -60 },
        sub: { volume: -60 },
      },

      // ── Mid-late game: heavier, darker, sub-bass presence ──
      heavy_bass: {
        bpmDelta: -2,
        reverbWet: 0.16,
        pad: { filterFreq: 900, oscillator: { type: 'fatsawtooth', count: 3, spread: 22 } },
        bass: { oscillator: { type: 'sawtooth' } },
        arp: { oscillator: { type: 'triangle' }, filterFreq: 2200 },
        lead: { oscillator: { type: 'sawtooth' }, filterFreq: 2400 },
        kick: { pitchDecay: 0.06, octaves: 5 },
        snare: { volume: -22 },
        hihat: { volume: -20, noiseType: 'pink' },
        drone: { volume: -26, harmonicity: 2, modulationIndex: 6,
                 pattern: ['A1', null, 'E1', null, 'F1', null, 'D1', null] },
        sub: { volume: -14,
               pattern: ['A1', null, 'A1', null, 'D1', null, 'D1', null, 'F1', null, 'F1', null, 'E1', null, 'E1', null] },
      },

      // ── Standard boss waves: dissonant, industrial, menacing ──
      dissonant_industrial: {
        bpmDelta: -8,
        reverbWet: 0.34,
        progression: [
          ['A2', 'C3', 'Eb3'],
          ['Bb2', 'Db3', 'F3'],
          ['F2', 'Ab2', 'C3'],
          ['E2', 'G2', 'B3'],
        ],
        pad: { filterFreq: 650, oscillator: { type: 'fatsawtooth', count: 3, spread: 55 } },
        bass: { oscillator: { type: 'sawtooth' },
                pattern: [
                  ['A1', null, 'A1', 'Bb1', null, null, 'E1', null],
                  ['Bb0', null, 'Bb0', null, null, null, 'F1', null],
                  ['F1', null, 'F1', null, 'C1', null, 'Ab0', null],
                  ['E1', null, 'E1', null, 'B0', null, 'E1', 'F1'],
                ] },
        arp: {
          oscillator: { type: 'sawtooth' },
          filterFreq: 1800,
          pattern: [
            ['A3', 'Bb3', 'B3', 'C4', 'E4', 'D4', 'C4', 'Bb3', 'A3', 'Bb3', 'C4', 'E4', 'D4', 'C4', 'Bb3', 'A3'],
            ['D3', 'Eb3', 'E3', 'F3', 'A3', 'G3', 'F3', 'Eb3', 'D3', 'Eb3', 'F3', 'A3', 'G3', 'F3', 'Eb3', 'D3'],
            ['F3', 'Gb3', 'G3', 'Ab3', 'C4', 'Bb3', 'Ab3', 'G3', 'F3', 'Gb3', 'Ab3', 'C4', 'Bb3', 'Ab3', 'G3', 'F3'],
            ['E3', 'F3', 'F#3', 'G3', 'B3', 'A3', 'G3', 'F#3', 'E3', 'F3', 'G3', 'B3', 'A3', 'G3', 'F#3', 'E3'],
          ],
        },
        lead: { oscillator: { type: 'sawtooth' }, filterFreq: 2000 },
        kick: { pitchDecay: 0.04, octaves: 6,
                envelope: { attack: 0.001, decay: 0.28, sustain: 0, release: 0.14 },
                pattern: [1,0,0,0, 1,0,0,1, 0,0,1,0, 1,0,0,0] },
        snare: { volume: -18, envelope: { attack: 0.001, decay: 0.18, sustain: 0, release: 0.12 } },
        hihat: { volume: -22, envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.04 },
                 pattern: [1,0,1,0, 1,1,1,0, 1,0,1,0, 1,0,1,1] },
        drone: { volume: -20, harmonicity: 3.5, modulationIndex: 14,
                 modulation: { type: 'sawtooth' },
                 pattern: ['A1', null, 'Bb1', null, null, null, 'E1', null] },
        sub: { volume: -12,
               pattern: ['A1', null, null, null, 'Bb0', null, null, null, 'F1', null, null, null, 'E1', null, null, null] },
      },

      // ── Cloaked boss (Dreadnought): Phrygian mode, ghostly, haunting ──
      phantom: {
        bpmDelta: -14,
        reverbWet: 0.55,
        progression: [
          ['E2', 'B2', 'E3'],
          ['F2', 'A2', 'C3'],
          ['A1', 'E2', 'A2'],
          ['B1', 'D2', 'F2'],
        ],
        pad: { filterFreq: 350, oscillator: { type: 'fatsawtooth', count: 3, spread: 60 }, volume: -24 },
        bass: { oscillator: { type: 'sine' }, volume: -16,
                pattern: [
                  ['E1', null, null, null, null, null, null, null],
                  ['F1', null, null, null, null, null, null, null],
                  ['A0', null, null, null, null, null, null, null],
                  ['B0', null, null, null, null, null, null, null],
                ] },
        arp: {
          oscillator: { type: 'sine' },
          filterFreq: 4200,
          volume: -22,
          pattern: [
            ['E4', null, 'F4', null, null, null, null, null, 'E4', null, null, null, 'B4', null, null, null],
            ['F4', null, null, null, 'C5', null, null, null, null, null, 'A4', null, null, null, null, null],
            ['A3', null, null, null, null, null, 'E4', null, null, null, null, null, 'C4', null, null, null],
            ['B3', null, 'F4', null, null, null, null, null, 'D4', null, null, null, null, null, 'B3', null],
          ],
        },
        lead: { oscillator: { type: 'triangle' }, filterFreq: 1800, volume: -38 },
        kick: { pitchDecay: 0.08, octaves: 7,
                envelope: { attack: 0.001, decay: 0.35, sustain: 0, release: 0.18 },
                pattern: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
        snare: { volume: -40 },
        hihat: { volume: -26,
                 envelope: { attack: 0.001, decay: 0.03, sustain: 0, release: 0.02 },
                 pattern: [0,0,1,0, 0,0,0,0, 0,0,1,0, 0,0,0,0] },
        drone: { volume: -16, harmonicity: 2.5, modulationIndex: 18,
                 oscillator: { type: 'sine' },
                 modulation: { type: 'sine' },
                 envelope: { attack: 3.0, decay: 1.5, sustain: 0.8, release: 4.0 },
                 modulationEnvelope: { attack: 2.0, decay: 0.8, sustain: 0.7, release: 3.0 },
                 filterFreq: 400,
                 pattern: ['E1', null, null, null, 'F1', null, null, null] },
        sub: { volume: -14,
               pattern: ['E1', null, null, null, 'F1', null, null, null, 'A0', null, null, null, 'B0', null, null, null] },
      },

      // ── Leviathan boss: apocalyptic, cinematic, overwhelming ──
      leviathan_wrath: {
        bpmDelta: 6,
        reverbWet: 0.35,
        progression: [
          ['C2', 'Eb2', 'G2'],
          ['F1', 'Ab1', 'C2'],
          ['Ab1', 'C2', 'Eb2'],
          ['G1', 'B1', 'D2'],
        ],
        pad: { filterFreq: 1800, oscillator: { type: 'fatsawtooth', count: 4, spread: 40 }, volume: -18 },
        bass: { oscillator: { type: 'sawtooth' }, volume: -11,
                pattern: [
                  ['C1', null, 'C1', null, 'C1', null, 'G1', null],
                  ['F0', null, 'F0', null, 'F0', null, 'C1', null],
                  ['Ab0', null, 'Ab0', null, 'Ab0', null, 'Eb1', null],
                  ['G0', null, 'G0', null, 'B0', null, 'G0', null],
                ] },
        arp: {
          oscillator: { type: 'sawtooth' },
          filterFreq: 5000,
          volume: -16,
          pattern: [
            ['G5','Eb5','C5','G4', 'Eb4','C4','G5','F5', 'Eb5','D5','C5','Bb4', 'Ab4','G4','F4','Eb4'],
            ['Ab4','F4','C4','Ab3', 'F3','C3','Ab4','G4', 'F4','Eb4','D4','C4', 'Bb3','Ab3','G3','F3'],
            ['Eb5','C5','Ab4','Eb4', 'C4','Ab3','Eb5','D5', 'C5','Bb4','Ab4','G4', 'F4','Eb4','D4','C4'],
            ['D5','B4','G4','D4', 'B3','G3','D5','C5', 'B4','A4','G4','F4', 'Eb4','D4','C4','B3'],
          ],
        },
        lead: { oscillator: { type: 'sawtooth' }, filterFreq: 4000, volume: -14,
                pattern: ['C5',null,'Eb5','G5', 'F5','Eb5','D5','C5', 'Bb4',null,'G4',null, 'Ab4',null,'G4',null] },
        kick: { pitchDecay: 0.03, octaves: 8,
                envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.08 },
                pattern: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
        snare: { volume: -16,
                 envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.14 },
                 pattern: [0,0,0,0, 1,0,0,1, 0,0,0,0, 1,0,1,0] },
        hihat: { volume: -16,
                 pattern: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
        drone: { volume: -14, harmonicity: 5, modulationIndex: 25,
                 oscillator: { type: 'sawtooth' },
                 modulation: { type: 'square' },
                 envelope: { attack: 0.8, decay: 0.5, sustain: 0.9, release: 1.5 },
                 modulationEnvelope: { attack: 0.3, decay: 0.2, sustain: 0.8, release: 1.0 },
                 filterFreq: 800,
                 pattern: ['C1', null, 'G1', null, null, null, 'C1', null] },
        sub: { volume: -10,
               pattern: ['C1', null, null, null, 'F0', null, null, null, 'Ab0', null, null, null, 'G0', null, null, null] },
      },

      // ── Late game 20+: cold vacuum, relentless mechanical precision ──
      deep_abyss: {
        bpmDelta: 2,
        reverbWet: 0.28,
        progression: [
          ['Bb1', 'Db2', 'F2'],
          ['Gb1', 'Bb1', 'Db2'],
          ['Eb2', 'Gb2', 'Bb2'],
          ['F2', 'A2', 'C3'],
        ],
        pad: { filterFreq: 800, oscillator: { type: 'fatsawtooth', count: 3, spread: 30 }, volume: -22 },
        bass: { oscillator: { type: 'square' },
                pattern: [
                  ['Bb0', null, 'Bb0', null, null, null, 'F1', null],
                  ['Gb0', null, 'Gb0', null, null, null, 'Db1', null],
                  ['Eb1', null, 'Eb1', null, null, null, 'Bb1', null],
                  ['F1', null, 'F1', null, 'C1', null, 'F1', null],
                ] },
        arp: {
          oscillator: { type: 'triangle' },
          filterFreq: 3200,
          pattern: [
            ['Bb3','Db4','F4','Bb4', 'F4','Db4','Bb3','F3', 'Bb3','Db4','F4','Ab4', 'F4','Db4','Bb3','Ab3'],
            ['Gb3','Bb3','Db4','Gb4', 'Db4','Bb3','Gb3','Db3', 'Gb3','Bb3','Db4','F4', 'Db4','Bb3','Gb3','F3'],
            ['Eb3','Gb3','Bb3','Eb4', 'Bb3','Gb3','Eb3','Bb2', 'Eb3','Gb3','Bb3','Db4', 'Bb3','Gb3','Eb3','Db3'],
            ['F3','A3','C4','F4', 'C4','A3','F3','C3', 'F3','A3','C4','Eb4', 'C4','A3','F3','Eb3'],
          ],
        },
        lead: { oscillator: { type: 'triangle' }, filterFreq: 2600, volume: -20,
                pattern: ['Bb4',null,'Db5','F4', 'Ab4',null,'Gb4',null, 'Eb4',null,'F4',null, 'Db4',null,'Bb3',null] },
        kick: { pattern: [1,0,0,0, 1,0,0,1, 0,0,1,0, 1,0,0,0] },
        snare: { volume: -20, pattern: [0,0,0,0, 1,0,0,0, 0,0,1,0, 1,0,0,0] },
        hihat: { volume: -18, pattern: [1,0,1,1, 1,0,1,0, 1,0,1,1, 1,0,1,1] },
        drone: { volume: -22, harmonicity: 2, modulationIndex: 10,
                 modulation: { type: 'triangle' },
                 filterFreq: 500,
                 pattern: ['Bb0', null, null, null, null, null, 'F1', null] },
        sub: { volume: -14,
               pattern: ['Bb0', null, null, null, 'Gb0', null, null, null, 'Eb1', null, null, null, 'F1', null, null, null] },
      },
    },
  },
  story: {
    url: 'neon-blaster-2026-story.json',
  },
};

function _bossForLevel(level) {
  const bp = CONFIG.waves.bossProgression;
  if (!bp || !bp.length) return 'sentinel';
  let boss = bp[0].boss;
  for (const e of bp) { if (level >= e.minLevel) boss = e.boss; }
  if (level > bp[bp.length - 1].minLevel) {
    const top = ['dreadnought', 'leviathan', 'warden'];
    const c = Math.floor((level - bp[bp.length - 1].minLevel) / 5);
    boss = top[c % top.length];
  }
  return boss;
}

function resolveWaveMusicTheme(level) {
  const wt = CONFIG.music.waveThemes;
  for (const r of wt.rules) {
    if (r.match(level)) return r.id;
  }
  return wt.defaultId;
}

global.NeonBlaster2026Config = { PERF, CONFIG, resolveWaveMusicTheme };
})(typeof window !== 'undefined' ? window : this);
