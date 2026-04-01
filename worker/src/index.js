function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(init.headers || {}),
    },
    ...init,
  });
}

function badRequest(message) {
  return json({ ok: false, error: message }, { status: 400 });
}

function normalizeGameId(gameId) {
  const id = String(gameId ?? "").trim().toLowerCase();
  if (!id) return null;
  if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(id)) return null;
  return id;
}

function normalizeName(name) {
  const n = String(name ?? "").trim();
  if (!n) return "AAA";
  return n.slice(0, 12);
}

function clampScore(score) {
  const s = Number(score);
  if (!Number.isFinite(s)) return null;
  return Math.max(0, Math.min(2_000_000_000, Math.floor(s)));
}

function clampLimit(limit, fallback) {
  const n = Number(limit);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(1, Math.min(50, Math.floor(n)));
}

function keyFor(gameId) {
  return `lb:${gameId}`;
}

async function getBoard(env, gameId) {
  const raw = await env.SCORES.get(keyFor(gameId));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function setBoard(env, gameId, entries) {
  await env.SCORES.put(keyFor(gameId), JSON.stringify(entries));
}

const cors = { "access-control-allow-origin": "*" };

function corsOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
    },
  });
}

/** API routes only; returns null if this request should be served as a static asset. */
async function handleApi(request, env) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/")) return null;

  if (request.method === "OPTIONS") return corsOptions();

  if (url.pathname === "/api/ping") {
    if (request.method !== "GET") {
      return json({ ok: false, error: "Method not allowed" }, { status: 405, headers: cors });
    }
    return json({ ok: true }, { headers: cors });
  }

  if (url.pathname !== "/api/scores") {
    return json({ ok: false, error: "Not found" }, { status: 404, headers: cors });
  }

  const gameId = normalizeGameId(url.searchParams.get("gameId"));
  if (!gameId) return badRequest("Invalid or missing gameId");

  if (request.method === "GET") {
    const limit = clampLimit(url.searchParams.get("limit") ?? 10, 10);
    const entries = (await getBoard(env, gameId)).slice(0, limit);
    return json({ ok: true, gameId, entries }, { headers: cors });
  }

  if (request.method === "POST") {
    let body;
    try {
      body = await request.json();
    } catch {
      return badRequest("Invalid JSON body");
    }

    const name = normalizeName(body?.name);
    const score = clampScore(body?.score);
    if (score == null) return badRequest("Invalid score");
    const limit = clampLimit(body?.limit ?? 10, 10);

    const entries = await getBoard(env, gameId);
    entries.push({ name, score, at: new Date().toISOString() });
    entries.sort((a, b) => (b?.score ?? 0) - (a?.score ?? 0));
    const trimmed = entries.slice(0, Math.max(1, Math.min(50, limit)));
    await setBoard(env, gameId, trimmed);

    return json({ ok: true, gameId, entries: trimmed }, { headers: cors });
  }

  return json({ ok: false, error: "Method not allowed" }, { status: 405, headers: cors });
}

export default {
  async fetch(request, env) {
    const apiResponse = await handleApi(request, env);
    if (apiResponse) return apiResponse;

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return json({ ok: false, error: "Not found (deploy with static assets or use /api/*)" }, { status: 404, headers: cors });
  },
};
