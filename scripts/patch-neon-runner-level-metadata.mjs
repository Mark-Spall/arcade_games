/**
 * Merge in-game defaults for level background + select-screen card image
 * (matches games/neon-runner.html LEVEL_BG and conventional card filenames).
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const JSON_PATH = `${ROOT}/levels/neon-runner-levels.json`;

const BG_BY_INDEX = [
  { src: 'neon-runner-background-level-1.jpg', darkenAlpha: 0.34, zoom: 1.25, panStrength: 0.85 },
  { src: 'neon-runner-background-level-2.jpg', darkenAlpha: 0.34, zoom: 1.25, panStrength: 0.85 },
  { src: 'neon-runner-background-level-3.jpg', darkenAlpha: 0.34, zoom: 1.25, panStrength: 0.85 },
  { src: 'neon-runner-background-level-4.jpg', darkenAlpha: 0.38, zoom: 1.25, panStrength: 0.85 },
];

function needsBackground(lv) {
  const b = lv.background;
  if (!b || typeof b !== 'object') return true;
  if (typeof b.src !== 'string' || !b.src.trim()) return true;
  return false;
}

function needsCard(lv) {
  return typeof lv.selectCardImage !== 'string' || !lv.selectCardImage.trim();
}

const levels = JSON.parse(await readFile(JSON_PATH, 'utf8'));
if (!Array.isArray(levels)) throw new Error('Expected array');

let nBg = 0;
let nCard = 0;
for (let i = 0; i < levels.length; i++) {
  const lv = levels[i];
  if (i < BG_BY_INDEX.length && needsBackground(lv)) {
    lv.background = { ...BG_BY_INDEX[i] };
    nBg++;
  }
  if (i < BG_BY_INDEX.length && needsCard(lv)) {
    lv.selectCardImage = `neon-runner-card-level-${i + 1}.jpg`;
    nCard++;
  }
}

await writeFile(JSON_PATH, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log(`Patched ${JSON_PATH}: background restored ${nBg}, selectCardImage set ${nCard} (levels 1–4)`);
