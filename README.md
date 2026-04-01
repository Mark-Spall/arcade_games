# Arcade Cabinet

A small static **arcade lobby** (`index.html`) plus self-contained **HTML games** under `games/`. A Cloudflare Worker serves the site and stores shared leaderboards in **KV** (`/api/scores`).

**Repository:** [github.com/Mark-Spall/arcade_games](https://github.com/Mark-Spall/arcade_games) (public)

## Repository layout

| Path | Role |
|------|------|
| `index.html` | Lobby: game grid, starfield, high-score preview |
| `home.js` | Loads `games/games.json` and renders cards; wires score UI |
| `highscores.html` | Full leaderboard view |
| `scores.js` | Client API: submit/fetch scores (localStorage fallback if the API is down) |
| `styles.css` | Shared lobby / shell styling |
| `games/games.json` | **Manifest** — list of games shown on the home page |
| `games/*.html` | Individual games (mostly single-file) |
| `games/template.html` | Minimal starter with canvas, exit link, and `submitScore` |
| `worker/src/index.js` | Worker: `/api/scores`, static assets via Workers Assets |
| `wrangler.jsonc` | Wrangler config (root — use `npm run dev` / `deploy` from repo root) |

## Local development

From the repository root:

```bash
npm install
npm run dev
```

Wrangler serves the Worker and the repo root as static assets. Open the URL Wrangler prints (often `http://127.0.0.1:8787`).

- `GET /api/ping` — health check  
- `GET|POST|DELETE /api/scores?gameId=...` — leaderboard API  

Deploy:

```bash
npm run deploy
```

You need a Cloudflare account and a **KV namespace** bound as `SCORES` in `wrangler.jsonc` (replace IDs when forking the project).

## Adding a new game

### 1. Pick a stable `gameId`

Use **lowercase** letters, digits, and hyphens only. It must match the server rule: start with a letter or digit, then up to 63 more characters from `[a-z0-9-]` (same pattern the Worker uses for `gameId`).

Examples: `neon-hop`, `void-defender`, `my-game-01`.

### 2. Add your HTML file

- Put the page under `games/`, e.g. `games/my-game.html`.
- Link back to the lobby with something like `<a href="/">Exit</a>` (see `games/template.html` for a shell that uses `/styles.css`).

### 3. Register it in the manifest

Append an object to the **array** in `games/games.json`:

```json
{
  "id": "my-game",
  "title": "My Game",
  "href": "/games/my-game.html",
  "description": "One line for the lobby card.",
  "tags": ["Arcade", "Demo"],
  "hot": false
}
```

| Field | Required | Notes |
|--------|----------|--------|
| `id` | Yes | Must equal the `gameId` you pass to `submitScore` |
| `title` | Yes | Shown on the card and in score dropdowns |
| `href` | Yes | Path to the game page (usually `/games/....html`) |
| `description` | No | Card body text |
| `tags` | No | Array of short labels (pills on the card) |
| `hot` | No | If `true`, shows a “Hot” pill |

Order in the JSON array is the order games appear on the home page.

### 4. Submit scores (optional but typical)

Import `/scores.js` and call `submitScore` with the **same** `gameId` as in the manifest:

```js
import { submitScore } from "/scores.js";

await submitScore({ gameId: "my-game", name: "AAA", score: 12345, limit: 10 });
```

`games/template.html` sets `GAME_ID` and submits on Enter for a quick test.

If the Worker is not reachable, scores are still kept in **localStorage** under the key used by `scores.js`, so local play keeps working.

### 5. Point the client at a different API (optional)

By default, requests go to the **same origin** as the page (`/api/scores`). To use another base URL (e.g. split static hosting and API), set either:

- `globalThis.ARCADE_API_BASE = "https://your-api.example.com"` before loading `scores.js`, or  
- `<meta name="arcade-api-base" content="https://your-api.example.com" />` in the document head.

## Related pages

- `home.js` and `highscores.html` both fetch `/games/games.json`; keep that file valid JSON so the lobby and full scores page stay in sync.
- Full leaderboard: `/highscores.html`.
