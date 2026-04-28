// ---- Password gate ----
const CORRECT = 'html5';
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
// ---- GENERIC APP LAUNCHER ----
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
    const url = BASE + filename + "?v=" + CACHE_BUST;
    fetch(url)
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
        win.document.write(`<h1>${title} failed to load</h1><p>${err.message}</p><p>URL: ${url}</p>`);
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
// ---- 99 Nights ----
function launch99Nights(){
  launchApp("99nights.html", "99nights");
}
// ---- 1v1 ----
function launch1v1(){
  launchApp("1v1.html", "1v1");
}
