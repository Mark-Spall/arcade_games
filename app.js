function escapeCssUrlArg(s) {
  return String(s ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll(")", "\\)")
    .replaceAll("(", "\\(")
    .replaceAll("'", "\\'");
}

async function loadGames() {
  const grid = document.getElementById("games");
  const count = document.getElementById("gameCount");
  if (!grid || !count) return;

  try {
    const res = await fetch("/games/games.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`Failed to load games.json (${res.status})`);
    const games = await res.json();

    grid.innerHTML = "";
    count.textContent = `${games.length} game${games.length === 1 ? "" : "s"}`;

    for (const g of games) {
      const a = document.createElement("a");
      a.className = "card";
      a.href = g.href;
      a.setAttribute("aria-label", `Play ${g.title}`);

      const imgUrl = g.image?.trim();
      let appendTarget = a;
      if (imgUrl) {
        a.classList.add("has-card-bg");
        const bg = document.createElement("span");
        bg.className = "card-bg";
        bg.setAttribute("aria-hidden", "true");
        bg.style.backgroundImage = `url("${escapeCssUrlArg(imgUrl)}")`;
        a.appendChild(bg);
        const overlay = document.createElement("span");
        overlay.className = "card-bg-overlay";
        overlay.setAttribute("aria-hidden", "true");
        a.appendChild(overlay);
        const inner = document.createElement("div");
        inner.className = "card-inner";
        a.appendChild(inner);
        appendTarget = inner;
      }

      const h3 = document.createElement("h3");
      h3.textContent = g.title;
      appendTarget.appendChild(h3);

      const p = document.createElement("p");
      p.textContent = g.description ?? "";
      appendTarget.appendChild(p);

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

      appendTarget.appendChild(meta);
      grid.appendChild(a);
    }
  } catch (e) {
    count.textContent = "0 games";
    grid.innerHTML =
      `<div class="tag" style="grid-column:1/-1">Couldn’t load <code>/games/games.json</code>. Make sure it exists and your host serves JSON.</div>`;
    console.error(e);
  }
}

loadGames();
