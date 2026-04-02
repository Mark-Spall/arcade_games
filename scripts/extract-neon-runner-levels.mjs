import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';

const INPUT = new URL('../games/neon-runner.html', import.meta.url);
const OUTPUT = new URL('../levels/neon-runner-levels.json', import.meta.url);

function extractLevelsSource(html) {
  const m = html.match(/const\s+LEVELS\s*=\s*(\[[\s\S]*?\n\]\s*;)/m);
  if (!m) throw new Error('Could not find `const LEVELS = [...]` block.');
  return m[1];
}

function evalLevels(levelsSource) {
  // Evaluate LEVELS array literal in a very restricted context.
  const sandbox = {};
  vm.createContext(sandbox);
  const script = new vm.Script(
    `(() => {\n` +
      `  const LEVELS = ${levelsSource.replace(/;\s*$/, '')};\n` +
      `  return LEVELS;\n` +
      `})()`,
    { timeout: 1000 }
  );
  return script.runInContext(sandbox, { timeout: 1000 });
}

function validate(levels) {
  if (!Array.isArray(levels)) throw new Error('LEVELS did not evaluate to an array');
  for (let i = 0; i < levels.length; i++) {
    const lv = levels[i];
    if (!lv || typeof lv !== 'object') throw new Error(`Level ${i + 1} is not an object`);
    for (const k of ['name', 'theme', 'gravity', 'timeLimit', 'playerStart', 'exit', 'platforms', 'hazards', 'collectibles', 'enemies', 'doors']) {
      if (!(k in lv)) throw new Error(`Level ${i + 1} missing key: ${k}`);
    }
  }
}

const html = await readFile(INPUT, 'utf8');
const levelsSource = extractLevelsSource(html);
const levels = evalLevels(levelsSource);
validate(levels);
await writeFile(OUTPUT, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log(`Wrote ${levels.length} levels to ${OUTPUT.pathname}`);

