const SCORE_NS = "arcade_scores_v1";

function getApiBase() {
  if (typeof globalThis.ARCADE_API_BASE === "string" && globalThis.ARCADE_API_BASE.trim()) {
    return globalThis.ARCADE_API_BASE.trim().replace(/\/+$/, "");
  }
  if (typeof document !== "undefined") {
    const m = document.querySelector('meta[name="arcade-api-base"]');
    const c = m?.getAttribute("content")?.trim();
    if (c) return c.replace(/\/+$/, "");
  }
  return "";
}

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

function mergeGameEntries(gameId, entries) {
  const all = loadAllScores();
  all[gameId] = entries;
  saveAllScores(all);
}

export async function submitScore({ gameId, name, score, limit = 10 }) {
  if (!gameId) throw new Error("submitScore requires gameId");
  const s = Number(score);
  if (!Number.isFinite(s)) throw new Error("submitScore requires a numeric score");
  const floor = Math.floor(s);

  try {
    const entries = await submitScoreServer({ gameId, name, score: floor, limit });
    mergeGameEntries(gameId, entries);
    return entries;
  } catch {
    const all = loadAllScores();
    const list = Array.isArray(all[gameId]) ? [...all[gameId]] : [];
    list.push({
      name: normalizeName(name),
      score: floor,
      at: nowIso(),
    });
    list.sort((a, b) => b.score - a.score);
    all[gameId] = list.slice(0, Math.max(1, Math.min(50, limit)));
    saveAllScores(all);
    return all[gameId];
  }
}

export async function getScores(gameId, { limit = 50 } = {}) {
  try {
    const entries = await getScoresServer(gameId, { limit });
    mergeGameEntries(gameId, entries);
    return entries;
  } catch {
    const all = loadAllScores();
    return Array.isArray(all[gameId]) ? all[gameId] : [];
  }
}

export function getAllScores() {
  const all = loadAllScores();
  return Object.entries(all)
    .map(([gameId, entries]) => ({ gameId, entries: Array.isArray(entries) ? entries : [] }))
    .sort((a, b) => (b.entries?.[0]?.score ?? 0) - (a.entries?.[0]?.score ?? 0));
}

export async function clearScores(gameId) {
  if (gameId) {
    const all = loadAllScores();
    delete all[gameId];
    saveAllScores(all);
    await clearScoresServer(gameId).catch(() => {});
    return;
  }
  localStorage.removeItem(SCORE_NS);
}

function apiUrl(path) {
  const base = getApiBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/** Fetches leaderboard rows from the server and mirrors them into localStorage for offline display. */
export async function syncAllScoresFromServer(manifestIds, { limit = 50 } = {}) {
  const all = loadAllScores();
  const ids = Array.from(new Set([...(manifestIds ?? []), ...Object.keys(all)]));
  await Promise.all(
    ids.map(async (id) => {
      try {
        const entries = await getScoresServer(id, { limit });
        all[id] = entries;
      } catch {
        /* keep cached local rows if the API is unreachable */
      }
    }),
  );
  saveAllScores(all);
}

export async function submitScoreServer({ gameId, name, score, limit = 10 }) {
  const res = await fetch(apiUrl(`/api/scores?gameId=${encodeURIComponent(gameId)}`), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name, score, limit }),
  });
  if (!res.ok) throw new Error(`submitScoreServer failed (${res.status})`);
  const data = await res.json();
  if (!data?.ok) throw new Error(data?.error || "submitScoreServer failed");
  return data.entries ?? [];
}

export async function getScoresServer(gameId, { limit = 10 } = {}) {
  const res = await fetch(
    apiUrl(`/api/scores?gameId=${encodeURIComponent(gameId)}&limit=${encodeURIComponent(limit)}`),
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error(`getScoresServer failed (${res.status})`);
  const data = await res.json();
  if (!data?.ok) throw new Error(data?.error || "getScoresServer failed");
  return data.entries ?? [];
}

export async function clearScoresServer(gameId) {
  const res = await fetch(apiUrl(`/api/scores?gameId=${encodeURIComponent(gameId)}`), { method: "DELETE" });
  if (!res.ok) throw new Error(`clearScoresServer failed (${res.status})`);
  const data = await res.json();
  if (!data?.ok) throw new Error(data?.error || "clearScoresServer failed");
}

