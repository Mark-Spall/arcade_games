var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker/src/index.js
function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...init.headers || {}
    },
    ...init
  });
}
__name(json, "json");
function badRequest(message) {
  return json({ ok: false, error: message }, { status: 400 });
}
__name(badRequest, "badRequest");
function normalizeGameId(gameId) {
  const id = String(gameId ?? "").trim().toLowerCase();
  if (!id) return null;
  if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(id)) return null;
  return id;
}
__name(normalizeGameId, "normalizeGameId");
function normalizeName(name) {
  const n = String(name ?? "").trim();
  if (!n) return "AAA";
  return n.slice(0, 12);
}
__name(normalizeName, "normalizeName");
function clampScore(score) {
  const s = Number(score);
  if (!Number.isFinite(s)) return null;
  return Math.max(0, Math.min(2e9, Math.floor(s)));
}
__name(clampScore, "clampScore");
function clampLimit(limit, fallback) {
  const n = Number(limit);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(1, Math.min(50, Math.floor(n)));
}
__name(clampLimit, "clampLimit");
function keyFor(gameId) {
  return `lb:${gameId}`;
}
__name(keyFor, "keyFor");
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
__name(getBoard, "getBoard");
async function setBoard(env, gameId, entries) {
  await env.SCORES.put(keyFor(gameId), JSON.stringify(entries));
}
__name(setBoard, "setBoard");
var cors = { "access-control-allow-origin": "*" };
function corsOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400"
    }
  });
}
__name(corsOptions, "corsOptions");
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
    entries.push({ name, score, at: (/* @__PURE__ */ new Date()).toISOString() });
    entries.sort((a, b) => (b?.score ?? 0) - (a?.score ?? 0));
    const trimmed = entries.slice(0, Math.max(1, Math.min(50, limit)));
    await setBoard(env, gameId, trimmed);
    return json({ ok: true, gameId, entries: trimmed }, { headers: cors });
  }
  return json({ ok: false, error: "Method not allowed" }, { status: 405, headers: cors });
}
__name(handleApi, "handleApi");
var src_default = {
  async fetch(request, env) {
    const apiResponse = await handleApi(request, env);
    if (apiResponse) return apiResponse;
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return json({ ok: false, error: "Not found (deploy with static assets or use /api/*)" }, { status: 404, headers: cors });
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-zlto2D/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-zlto2D/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
