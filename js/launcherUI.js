function initLauncher() {
  const root = document.getElementById('launcher-root');
  if (!root) return;

  root.innerHTML = `
    <div class="launcher-shell">
      <header class="launcher-header">
        <div class="launcher-brand">C-Hub Launcher</div>
        <p class="launcher-tag">Select a game tile and fire it up.</p>
      </header>
      <div class="tiles-grid">
        ${GAME_LIBRARY.map(game => `
          <button class="game-tile" data-game-id="${game.id}" type="button">
            <div class="tile-art" style="border-color: ${game.color};">
              <img src="${game.image}" alt="${game.title} icon" />
            </div>
            <div class="tile-title">${game.title}</div>
            <div class="tile-status">${game.status}</div>
          </button>
        `).join('')}
      </div>
      <footer class="launcher-footer">If a game is blocked, allow popups and try again.</footer>
    </div>
  `;

  root.querySelectorAll('.game-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const gameId = tile.getAttribute('data-game-id');
      launchGame(gameId);
    });
  });
}

function launchGame(gameId) {
  const game = GAME_LIBRARY.find(entry => entry.id === gameId);
  if (!game) return;

  const target = window.open('about:blank', game.id, 'width=1280,height=760,menubar=no,toolbar=no,location=no,status=no');
  if (!target) {
    alert('Popup blocked. Enable popups to open the game.');
    return;
  }

  const loadingHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Loading ${game.title}</title><link rel="stylesheet" href="stylingPart.css"></head><body><div class="loading-screen"><div class="loading-card"><div class="loading-ring"></div><div class="loading-label">Loading ${game.title}</div><div class="loading-subtext">If the game does not start, check your popup blocker.</div></div></div></body></html>`;
  target.document.open();
  target.document.write(loadingHtml);
  target.document.close();

  if (game.special && game.wrapperUrl) {
    const wrapperHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${game.title}</title><style>body,html{margin:0;padding:0;min-height:100%;background:#050816;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif;}button{padding:16px 28px;border:none;border-radius:14px;background:#06b6d4;color:#fff;font-size:16px;cursor:pointer;box-shadow:0 15px 40px rgba(0,0,0,0.25);}iframe{width:100%;height:100%;border:none;display:none;}</style></head><body><iframe id="gameFrame"></iframe><button id="playButton">Load ${game.title}</button><script>const btn=document.getElementById('playButton');const fr=document.getElementById('gameFrame');btn.addEventListener('click',async()=>{try{const r=await fetch('${game.wrapperUrl}');const t=await r.text();fr.contentDocument.open();fr.contentDocument.write(t);fr.contentDocument.close();fr.style.display='block';btn.style.display='none';}catch(e){alert('Failed to load game.');console.error(e);}});</script></body></html>`;
    target.document.open();
    target.document.write(wrapperHtml);
    target.document.close();
    return;
  }

  target.location.href = `${game.url}?v=${Date.now()}`;
}
