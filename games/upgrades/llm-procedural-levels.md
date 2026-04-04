# LLM-assisted procedural levels (future idea)

Use a **Cloudflare Worker** to call an LLM that returns **structured level data** for the next wave or stage, based on the previous level and game rules. Goal: **infinite escalation** without hand-authoring every tier, while staying inside what the game engine already supports.

## Why a Worker

- **Secrets** for API keys (Workers AI, AI Gateway, or external providers).
- **Validation** on the server before the client trusts any payload.
- **Rate limits** and optional **caching** of similar `(seed, levelIndex)` requests.

## High-level flow

1. Client sends something like: `levelIndex`, `previousLevelPayload` (or summary), optional `seed`, optional aggregate player stats.
2. Worker builds a prompt with a **fixed JSON schema** the game understands (enemy mix weights, row/col caps, tempo multipliers, drop biases, canyon flags, etc.—only fields the engine already reads).
3. LLM returns JSON; Worker **validates** (types, ranges, allowed keys, sum constraints) and **clamps** unsafe values.
4. Client applies overrides for the upcoming level; on failure, **fallback** to the existing formula-based progression (e.g. Neon Blaster’s `level`-driven `CONFIG`).

## Design constraints

- **No free-form level design**: output must match a strict schema; reject or repair invalid responses.
- **Fairness**: hard caps so early waves cannot become impossible (e.g. max divers, formation size).
- **Latency**: prefetch during the current wave or show interlude UI while the next level is generated.
- **Offline / errors**: game must remain playable without the Worker.
- **Leaderboards**: if level data affects score, consider **server-signed** payloads or server-side verification so clients cannot forge easier levels.

## Repo-specific notes

- **Neon Blaster 2026** today derives difficulty mostly from **global `CONFIG` + `level`**. To use this idea, add an explicit **per-level or per-wave override** object the game merges on top of defaults; the LLM would output **small deltas or overrides**, not a full duplicate of `CONFIG`.
- **Neon Runner–style** games with large level JSON files map more directly: “previous level JSON → next level JSON,” still with the same validation pipeline.

## Alternatives (cheaper / simpler)

- **Pure procedural curves** (seed + formulas): infinite levels without LLM cost or latency.
- **Hybrid**: formulas pick difficulty band; LLM only generates **flavor text** or picks among **preset templates**.

## Status

Not implemented—placeholder for a later pass when schema and Worker API are defined.
