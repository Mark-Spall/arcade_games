const SCORE_NS = "arcade_scores_v1";

function safeJsonParse(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

function loadAllScores() {
  return safeJsonParse(localStorage.getItem(SCORE_NS) ?? "{}", {});
}

function saveAllScores(all) {
  localStorage.setItem(SCORE_NS, JSON.stringify(all));
}

function normalizeName(name) {
  const n = String(name ?? "").trim();
  if (!n) return "AAA";
  return n.slice(0, 12);
}

function nowIso() {
  return new Date().toISOString();
}

export function submitScore({ gameId, name, score, limit = 10 }) {
  if (!gameId) throw new Error("submitScore requires gameId");
  const s = Number(score);
  if (!Number.isFinite(s)) throw new Error("submitScore requires a numeric score");

  const all = loadAllScores();
  const list = Array.isArray(all[gameId]) ? all[gameId] : [];

  list.push({
    name: normalizeName(name),
    score: Math.floor(s),
    at: nowIso(),
  });

  list.sort((a, b) => b.score - a.score);
  all[gameId] = list.slice(0, Math.max(1, Math.min(50, limit)));
  saveAllScores(all);
  return all[gameId];
}

export function getScores(gameId) {
  const all = loadAllScores();
  return Array.isArray(all[gameId]) ? all[gameId] : [];
}

export function getAllScores() {
  const all = loadAllScores();
  return Object.entries(all)
    .map(([gameId, entries]) => ({ gameId, entries: Array.isArray(entries) ? entries : [] }))
    .sort((a, b) => (b.entries?.[0]?.score ?? 0) - (a.entries?.[0]?.score ?? 0));
}

export function clearScores(gameId) {
  const all = loadAllScores();
  if (gameId) {
    delete all[gameId];
    saveAllScores(all);
    return;
  }
  localStorage.removeItem(SCORE_NS);
}

