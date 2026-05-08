const CORRECT_PASSWORD = '3point14159';
const LAUNCHER_WINDOW_NAME = 'CHubLauncher';

const pwGate = document.getElementById('pw-gate');
const launchScreen = document.getElementById('launch-screen');
const pwInput = document.getElementById('pw-input');
const pwError = document.getElementById('pw-error');
const launchButton = document.getElementById('launch-btn');

pwInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    checkPassword();
  }
});

launchButton.addEventListener('click', openLauncherWindow);

function checkPassword() {
  const value = pwInput.value.trim();

  if (value.toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
    pwGate.classList.add('unlocking');
    setTimeout(() => {
      pwGate.style.display = 'none';
      launchScreen.style.display = 'flex';
      pwInput.value = '';
    }, 480);
    return;
  }

  pwInput.classList.remove('shake');
  void pwInput.offsetWidth;
  pwInput.classList.add('shake');
  pwError.textContent = 'ACCESS DENIED';
  pwInput.value = '';

  setTimeout(() => {
    pwError.textContent = '';
    pwInput.classList.remove('shake');
  }, 1500);
}

function openLauncherWindow() {
  const win = window.open('https://cdn.jsdelivr.net/gh/ActuallyDigitsofpi314159/CerneyHub@main/launcher.html', LAUNCHER_WINDOW_NAME, 'width=1280,height=760,menubar=no,toolbar=no,location=no,status=no');

  if (!win) {
    alert('Popup blocked. Enable popups to launch the launcher.');
    return;
  }

  try {
    win.focus();
  } catch (error) {
    console.warn('Launcher window opened but focus failed.', error);
  }
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