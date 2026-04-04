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
    maxLives: 5, maxShields: 3, maxBombs: 3, maxGravityWells: 3,
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
    sentinel:{ hp: 50, speed: 0.15, points: 5000, shootRate: 0.012, diveShootRate: 0,
               colors: ['#ff2244','#cc44ff'], accent: '#ffe600', size: 80, shape: 'boss',
               isBoss: true, phases: [
                 { above: 0.6, rate: 0.010, pattern: 'spread3' },
                 { above: 0.3, rate: 0.018, pattern: 'spread5', spawnMinions: 'scout', minionCount: 4 },
                 { above: 0.0, rate: 0.025, pattern: 'spray' },
               ]},
  },

  difficulty: {
    hpPerLevel: 0.25,
    formationSpeedPerLevel: 0.08,
    diveRateBase: 0.0008, diveRatePerLevel: 0.0003,
    shootRatePerLevel: 0.0004,
    bulletSpeedBase: 3.2, bulletSpeedPerLevel: 0.22,
    maxDiversBase: 2, maxDiversPerLevel: 0.5, maxDiversCap: 6,
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
      { minLevel: 14, types: ['cloaker', 'orbiter', 'splitter', 'heavy'] },
      { minLevel: 18, types: ['cloaker', 'orbiter', 'heavy'] },
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
  },

  gravityWell: {
    duration: 200,
    growDuration: 32,
    maxRadius: 88,
    pullRadiusMax: 155,
    pullMul: 1.45,
    pullStrength: 26,
    pullCap: 7.5,
    swirlStrength: 4.8,
    consumeRadius: 16,
    collapseDamageRadius: 120,
    playerPullMul: 0.55,
    playerSwirlMul: 0.7,
    bossPullScale: 0.22,
    spawnCooldown: 18,
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
        {
          id: 'dissonant_industrial',
          match: (level) => CONFIG.waves.bossEvery && level > 1 && level % CONFIG.waves.bossEvery === 0,
        },
        { id: 'heavy_bass', match: (level) => level >= 12 },
        { id: 'high_tempo', match: (level) => level <= 6 },
      ],
    },

    /**
     * Theme presets: merged over CONFIG.music.layers[*]. Oscillator / filter morphs + optional patterns.
     * bpmDelta is added on top of level-scaled BPM in MusicManager.update (capped by maxBpm).
     */
    themes: {
      default: {},
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
      },
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
      },
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
        bass: { oscillator: { type: 'sawtooth' } },
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
        kick: { pitchDecay: 0.04, octaves: 6, envelope: { attack: 0.001, decay: 0.28, sustain: 0, release: 0.14 } },
        snare: { volume: -18, envelope: { attack: 0.001, decay: 0.18, sustain: 0, release: 0.12 } },
        hihat: { volume: -22, envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.04 } },
      },
    },
  },
  story: {
    url: 'neon-blaster-2026-story.json',
  },
};

function resolveWaveMusicTheme(level) {
  const wt = CONFIG.music.waveThemes;
  for (const r of wt.rules) {
    if (r.match(level)) return r.id;
  }
  return wt.defaultId;
}

global.NeonBlaster2026Config = { PERF, CONFIG, resolveWaveMusicTheme };
})(typeof window !== 'undefined' ? window : this);
