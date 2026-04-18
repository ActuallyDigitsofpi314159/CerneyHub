// ---- Password gate ----
const CORRECT = 'html5';

// IMPORTANT: base path (case-sensitive, must match GitHub exactly)
const BASE =
"https://cdn.jsdelivr.net/gh/ActuallyDigitsofpi314159/CerneyHub-main@main/CerneyHub-main/";

// VERSION SYSTEM: Fetched from latest.json for easy cache busting
let VERSION = "latest";
(async () => {
  try {
    const versionRes = await fetch("https://cdn.jsdelivr.net/gh/ActuallyDigitsofpi314159/CerneyHub-main@main/latest.json");
    const versionData = await versionRes.json();
    VERSION = versionData.version || "latest";
  } catch (e) {
    console.warn("Failed to fetch version, using fallback");
  }
})();

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

// ---- SAFE WINDOW LOADER (FIXED PATTERN) ----
async function openApp(url, title, fallbackTitle){
  const win = window.open("about:blank", title,
    "width=1280,height=720,menubar=no,toolbar=no,location=no,status=no"
  );

  if (!win) {
    alert("Popup blocked. Enable popups.");
    return;
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const html = await res.text();

    win.document.open();
    win.document.write(html);
    win.document.close();

  } catch (err) {
    win.document.write(`
      <h1>${fallbackTitle} failed to load</h1>
      <p>${err.message}</p>
      <p>URL: ${url}</p>
    `);
  }

  try { win.focus(); } catch(e) {}
}

// ---- Mario 64 ----
function launchMario(){
  flash();

  setTimeout(()=>{
    const win = window.open("about:blank","sm64",
      "width=1280,height=720,menubar=no,toolbar=no,location=no,status=no"
    );

    win.document.open();
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>SM64</title>
<style>
body,html{margin:0;overflow:hidden;background:black;color:white;font-family:sans-serif;}
#overlay{position:absolute;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;font-size:26px;cursor:pointer;padding:20px;text-align:center;}
canvas{display:none;width:100vw;height:100vh;}
</style></head><body>

<div id="overlay">Click to start Super Mario 64</div>
<canvas id="canvas"></canvas>

<script>
const overlay=document.getElementById('overlay'),canvas=document.getElementById('canvas');

overlay.addEventListener('click',async function go(){
  const a=new (window.AudioContext||window.webkitAudioContext)();
  await a.resume().catch(()=>{});

  overlay.style.display='none';
  canvas.style.display='block';

  window.Module={canvas:canvas};

  const s=document.createElement('script');
  s.src='https://cdn.jsdelivr.net/gh/ArkShocer/sm64@main/sm64.us.f3dex2e.js';

  document.body.appendChild(s);
});
<\/script>

</body></html>`);

    win.document.close();
    try{win.focus();}catch(e){}
  },150);
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
  flash();
  setTimeout(()=>{ window.open("dumLLM.html","_blank"); },150);
}

// ---- Bad Browser ----
function launchBadBrowser(){
  flash();
  setTimeout(()=>{
    const win = window.open(
      "about:blank",
      "badbrowser",
      "width=1280,height=720,menubar=no,toolbar=no,location=no,status=no"
    );

    if (!win) return alert("Popup blocked");

    const version = VERSION !== "latest" ? VERSION : Date.now();
    fetch(BASE + "badbrowser.html?v=" + version)
      .then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then(html => {
        win.document.open();
        win.document.write(html);
        win.document.close();
      })
      .catch(err => {
        win.document.write("<h1>Failed to load Bad Browser</h1><p>" + err.message + "</p>");
      });

    try{win.focus();}catch(e){}
  },150);
}


// ---- MineKhan ----
function launchMineKhan(){
  flash();
  setTimeout(()=>{
    const win = window.open(
      "about:blank",
      "minekhan",
      "width=1280,height=720,menubar=no,toolbar=no,location=no,status=no"
    );

    if (!win) return alert("Popup blocked");

    const version = VERSION !== "latest" ? VERSION : Date.now();
    fetch(BASE + "mineKhan.html?v=" + version)
      .then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then(html => {
        win.document.open();
        win.document.write(html);
        win.document.close();
      })
      .catch(err => {
        win.document.write("<h1>Failed to load MineKhan</h1><p>" + err.message + "</p>");
      });

    try{win.focus();}catch(e){}
  },150);
}