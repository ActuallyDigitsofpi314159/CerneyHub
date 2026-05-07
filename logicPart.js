// ---- Password gate ----
const CORRECT = '3point14159';
// IMPORTANT: base path (case-sensitive, must match GitHub exactly)
const BASE =
"https://cdn.jsdelivr.net/gh/ActuallyDigitsofpi314159/CerneyHub@latest/";
// Cache busting with timestamp for fresh loads
const CACHE_BUST = Date.now();
function checkPassword(){
  const val = document.getElementById('pw-input').value;
  if(val.toLowerCase() === CORRECT.toLowerCase()){
    const gate = document.getElementById('pw-gate');
    gate.classList.add('unlocking');
    setTimeout(()=>{
      gate.style.display = 'none';
      const main = document.getElementById('main');
      main.style.display = 'flex';
    }, 480);
  } else {
    const inp = document.getElementById('pw-input');
    const err = document.getElementById('pw-error');
    inp.classList.remove('shake');
    void inp.offsetWidth;
    inp.classList.add('shake');
    err.textContent = 'ACCESS DENIED';
    inp.value = '';
    setTimeout(()=>{
      err.textContent='';
      inp.classList.remove('shake');
    }, 1500);
  }
}
document.getElementById('pw-input').addEventListener('keydown', e => {
  if(e.key === 'Enter') checkPassword();
});
function flash(){
  const f = document.createElement('div');
  f.className = 'flash';
  document.body.appendChild(f);
  setTimeout(()=>f.remove(),500);
}

// ---- LOADING SCREEN ----
function showLoadingScreen(win) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: white;
          overflow: hidden;
        }
        .loading-container {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }
        .spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(6, 182, 212, 0.2);
          border-top-color: #06b6d4;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loading-text {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.05em;
        }
        .loading-subtext {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="loading-container">
        <div class="spinner"></div>
        <div>
          <div class="loading-text">LOADING...</div>
          <div class="loading-subtext">Please wait</div>
        </div>
      </div>
    </body>
    </html>
  `;
  win.document.open();
  win.document.write(html);
  win.document.close();
}

// ---- APP LAUNCHER ----
function launchApp(filename, title) {
  flash();
  
  setTimeout(() => {
    const win = window.open(
      "about:blank",
      title,
      "width=1280,height=720,menubar=no,toolbar=no,location=no,status=no"
    );
    if (!win) {
      alert("Popup blocked. Enable popups.");
      return;
    }
    
    // Show loading screen immediately
    showLoadingScreen(win);
    
    // 10 second timeout
    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      win.document.open();
      win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              color: white;
            }
            .error-container {
              text-align: center;
              max-width: 400px;
            }
            .error-icon {
              font-size: 60px;
              margin-bottom: 20px;
            }
            .error-title {
              font-size: 24px;
              font-weight: 600;
              margin-bottom: 10px;
              color: #ef4444;
            }
            .error-text {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.7);
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .retry-btn {
              padding: 12px 32px;
              background: #06b6d4;
              border: none;
              border-radius: 8px;
              color: white;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              transition: background 0.3s ease;
            }
            .retry-btn:hover {
              background: #0891b2;
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <div class="error-icon">⚠️</div>
            <div class="error-title">Loading Timeout</div>
            <div class="error-text">
              The game took too long to load (10+ seconds). This might be a network issue or the server is down. Please try again.
            </div>
            <button class="retry-btn" onclick="location.reload()">Retry</button>
          </div>
        </body>
        </html>
      `);
      win.document.close();
    }, 10000);
    
    const url = BASE + filename + "?v=" + CACHE_BUST;
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then(html => {
        if (!timedOut) {
          clearTimeout(timeoutId);
          win.document.open();
          win.document.write(html);
          win.document.close();
        }
      })
      .catch(err => {
        if (!timedOut) {
          clearTimeout(timeoutId);
          win.document.open();
          win.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body, html {
                  margin: 0;
                  padding: 0;
                  height: 100%;
                  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  color: white;
                }
                .error-container {
                  text-align: center;
                  max-width: 400px;
                }
                .error-icon {
                  font-size: 60px;
                  margin-bottom: 20px;
                }
                .error-title {
                  font-size: 24px;
                  font-weight: 600;
                  margin-bottom: 10px;
                  color: #ef4444;
                }
                .error-text {
                  font-size: 14px;
                  color: rgba(255, 255, 255, 0.7);
                  line-height: 1.6;
                  margin-bottom: 20px;
                }
                .error-code {
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 12px;
                  background: rgba(0, 0, 0, 0.3);
                  padding: 10px;
                  border-radius: 6px;
                  margin-top: 15px;
                  word-break: break-all;
                  color: rgba(255, 255, 255, 0.6);
                }
                .retry-btn {
                  padding: 12px 32px;
                  background: #06b6d4;
                  border: none;
                  border-radius: 8px;
                  color: white;
                  font-size: 14px;
                  font-weight: 500;
                  cursor: pointer;
                  transition: background 0.3s ease;
                  margin-top: 15px;
                }
                .retry-btn:hover {
                  background: #0891b2;
                }
              </style>
            </head>
            <body>
              <div class="error-container">
                <div class="error-icon">❌</div>
                <div class="error-title">Failed to Load</div>
                <div class="error-text">
                  Could not fetch ${title}. Please check your internet connection and try again.
                </div>
                <div class="error-code">${err.message}</div>
                <button class="retry-btn" onclick="location.reload()">Retry</button>
              </div>
            </body>
            </html>
          `);
          win.document.close();
        }
      });
    try { win.focus(); } catch(e) {}
  }, 150);
}

// ---- Mario 64 ----
function launchMario(){
  launchApp("mario64.html", "sm64");
}
// ---- Eaglercraft ----
function launchE112(){
  flash();
  setTimeout(()=>{
    const FILE_URL='https://cdn.jsdelivr.net/gh/PlanetDogeCodes/Eagletcraft-1.12@main/source%20file/egc1-12.xml';
    const win = window.open("about:blank","egc112",
      "width=1280,height=720,menubar=no,toolbar=no,location=no,status=no"
    );
    win.document.open();
    win.document.write(`<!DOCTYPE html><html><head><style>
body,html{margin:0;padding:0;overflow:hidden;height:100%;background:black;}
iframe{width:100%;height:100%;border:none;display:none;}
.btn{padding:20px 40px;background:#000;color:#fff;border:2px solid #b44dff;border-radius:10px;font:bold 24px Arial;cursor:pointer;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}
</style></head><body>
<iframe id="fr"></iframe>
<button class="btn" onclick="play(this)">PLAY</button>
<script>
async function play(btn){
  try{
    const r = await fetch('${FILE_URL}');
    const t = await r.text();
    const fr=document.getElementById('fr');
    fr.contentDocument.open();
    fr.contentDocument.write(t);
    fr.contentDocument.close();
    fr.style.display='block';
    btn.style.display='none';
  } catch(e){
    alert('Failed to load game');
  }
}
<\/script>
</body></html>`);
    win.document.close();
  },150);
}
// ---- dumLLM ----
function launchDumLLM(){
  launchApp("dumLLM.html", "dumLLM");
}
// ---- Bad Browser ----
function launchBadBrowser(){
  launchApp("badbrowser.html", "badbrowser");
}
// ---- MineKhan ----
function launchMineKhan(){
  launchApp("mineKhan.html", "minekhan");
}
// ---- Karlson ----
function launchKarlson(){
  launchApp("karlson.html", "karlson");
}
// ---- BSS ----
function launchBSS(){
  launchApp("BSS.html", "bss");
}
// ---- Granny ----
function launchGranny(){
  launchApp("granny.html", "granny");
}
// ---- Basketball Legends ----
function launchBasketballLegends(){
  launchApp("basketballlegends.html", "basketballlegends");
}
// ---- 1v1 ----
function launch1v1(){
  launchApp("1v1.html", "1v1");
}

// ---- Donkey Khan ----
function launchDonkeyKhan(){
  launchApp("donkeyKhan.html", "donkeyKhan");
}

// ---- Generic Platformer 3D ----
function launchGenericPlatformer3D(){
  launchApp("genericPlatformer3d.html", "genericPlatformer3d");
}