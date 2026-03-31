import { clearScores, getAllScores, getScores } from "/scores.js";

async function loadManifest() {
  const res = await fetch("/games/games.json", { cache: "no-cache" });
  if (!res.ok) return [];
  return await res.json();
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fmtWhen(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return String(iso ?? "");
  }
}

function renderGames(games) {
  const grid = document.getElementById("games");
  const count = document.getElementById("gameCount");
  if (!grid || !count) return;

  grid.innerHTML = "";
  count.textContent = `${games.length} game${games.length === 1 ? "" : "s"}`;

  for (const g of games) {
    const a = document.createElement("a");
    a.className = "card";
    a.href = g.href;
    a.setAttribute("aria-label", `Play ${g.title}`);

    const h3 = document.createElement("h3");
    h3.textContent = g.title;
    a.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = g.description ?? "";
    a.appendChild(p);

    const meta = document.createElement("div");
    meta.className = "meta";

    for (const t of g.tags ?? []) {
      const span = document.createElement("span");
      span.className = "pill";
      span.textContent = t;
      meta.appendChild(span);
    }

    if (g.hot) {
      const span = document.createElement("span");
      span.className = "pill pill-hot";
      span.textContent = "Hot";
      meta.appendChild(span);
    }

    a.appendChild(meta);
    grid.appendChild(a);
  }
}

function renderScoreRows(entries) {
  const rows = document.getElementById("hsRows");
  if (!rows) return;
  rows.innerHTML = "";

  if (!entries.length) {
    rows.innerHTML = `<tr><td colspan="4" class="row-muted">No scores yet on this device.</td></tr>`;
    return;
  }

  for (let i = 0; i < Math.min(entries.length, 10); i++) {
    const e = entries[i];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="mono">#${i + 1}</td>
      <td>${escapeHtml(e.name ?? "AAA")}</td>
      <td class="mono">${Number(e.score ?? 0).toLocaleString()}</td>
      <td class="row-muted">${escapeHtml(fmtWhen(e.at))}</td>
    `;
    rows.appendChild(tr);
  }
}

function getSelectedGameId() {
  const sel = document.getElementById("hsGame");
  return sel?.value || "";
}

function refreshScores() {
  const id = getSelectedGameId();
  const entries = id ? getScores(id) : [];
  renderScoreRows(entries);
}

function setUpScores(manifest) {
  const sel = document.getElementById("hsGame");
  const clearBtn = document.getElementById("hsClear");
  if (!sel || !clearBtn) return;

  const all = getAllScores();
  const known = new Map(manifest.map((g) => [g.id, g.title]));
  const idsFromScores = all.map((x) => x.gameId);
  const ids = Array.from(new Set([...known.keys(), ...idsFromScores]));

  sel.innerHTML = "";
  for (const id of ids) {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = known.get(id) ?? id;
    sel.appendChild(opt);
  }

  if (!ids.length) {
    sel.innerHTML = `<option value="">(no games)</option>`;
  } else {
    sel.value = manifest[0]?.id ?? ids[0];
  }

  sel.addEventListener("change", refreshScores);
  clearBtn.addEventListener("click", () => {
    const id = getSelectedGameId();
    if (!id) return;
    clearScores(id);
    refreshScores();
  });

  refreshScores();
}

(async function init() {
  try {
    const manifest = await loadManifest();
    renderGames(manifest);
    setUpScores(manifest);
  } catch (e) {
    const grid = document.getElementById("games");
    const count = document.getElementById("gameCount");
    if (count) count.textContent = "0 games";
    if (grid) {
      grid.innerHTML =
        `<div class="tag" style="grid-column:1/-1">Couldn’t load <code>/games/games.json</code>.</div>`;
    }
    console.error(e);
  }
})();

