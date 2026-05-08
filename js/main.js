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
  const win = window.open('launcher.html', LAUNCHER_WINDOW_NAME, 'width=1280,height=760,menubar=no,toolbar=no,location=no,status=no');

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
