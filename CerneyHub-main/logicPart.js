
// ---- Password gate ----
const CORRECT = 'html5';

function checkPassword(){
  const val = document.getElementById('pw-input').value;
  if(val.toLowerCase() === CORRECT.toLowerCase()){
    const gate = document.getElementById('pw-gate');
    gate.classList.add('unlocking');
    setTimeout(()=>{
      gate.style.display = 'none';
      const main = document.getElementById('main');
      main.style.display = 'flex';
      spawnPixels();
    }, 480);
  } else {
    const inp = document.getElementById('pw-input');
    const err = document.getElementById('pw-error');
    inp.classList.remove('shake');
    void inp.offsetWidth;
    inp.classList.add('shake');
    err.textContent = 'ACCESS DENIED';
    inp.value = '';
    setTimeout(()=>{ err.textContent=''; inp.classList.remove('shake'); }, 1500);
  }
}

document.getElementById('pw-input').addEventListener('keydown', e => {
  if(e.key === 'Enter') checkPassword();
});

function spawnPixels(){
  const colors = ['#ff2d2d','#ffd700','#b44dff','#00e5cc','#39ff14'];
  for(let i=0;i<30;i++){
    const p = document.createElement('div');
    p.className = 'pixel';
    p.style.cssText = `
      left:${Math.random()*100}vw;
      bottom:${Math.random()*-20}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-delay:${Math.random()*8}s;
      animation-duration:${4+Math.random()*6}s;
    `;
    document.body.appendChild(p);
  }
}

function flash(){ const f=document.createElement('div'); f.className='flash'; document.body.appendChild(f); setTimeout(()=>f.remove(),500); }

// ---- Mario 64 ----
function launchMario(){
  flash();
  setTimeout(()=>{
    const win=window.open("about:blank","sm64","width=1280,height=720,menubar=no,toolbar=no,location=no,status=no");
    win.document.open();
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>SM64</title>
<style>body,html{margin:0;overflow:hidden;background:black;color:white;font-family:sans-serif;}
#overlay{position:absolute;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;font-size:26px;cursor:pointer;padding:20px;text-align:center;}
canvas{display:none;width:100vw;height:100vh;}</style></head><body>
<div id="overlay">Click to start Super Mario 64<small style="display:block;margin-top:10px;font-size:14px;color:#aaa;">Required by Chrome to enable audio</small></div>
<canvas id="canvas"></canvas>
<script>
const overlay=document.getElementById('overlay'),canvas=document.getElementById('canvas');
overlay.addEventListener('click',async function go(){
  const a=new(window.AudioContext||window.webkitAudioContext)();await a.resume().catch(()=>{});
  overlay.style.display='none';canvas.style.display='block';
  window.Module={canvas:canvas};
  const s=document.createElement('script');
  s.src='https://cdn.jsdelivr.net/gh/ArkShocer/sm64@main/sm64.us.f3dex2e.js';
  s.onload=()=>{
    const keyMap={KeyW:"ArrowUp",KeyA:"ArrowLeft",KeyS:"ArrowDown",KeyD:"ArrowRight",
      ArrowUp:"KeyW",ArrowLeft:"KeyA",ArrowDown:"KeyS",ArrowRight:"KeyD",
      Space:"KeyX",ControlLeft:"KeyQ",ShiftLeft:"Space",KeyE:"KeyC"};
    const keyCode={ArrowUp:38,ArrowDown:40,ArrowLeft:37,ArrowRight:39,KeyW:87,KeyA:65,KeyS:83,KeyD:68,KeyX:88,KeyQ:81,KeyC:67,Space:32};
    const origAdd=EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener=function(type,listener,opts){
      if(type==="keydown"||type==="keyup"){
        const wrapped=function(e){
          const mapped=e&&e.code?keyMap[e.code]:null;
          if(mapped){const fake={...e,code:mapped,keyCode:keyCode[mapped]||0,which:keyCode[mapped]||0};return listener.call(this,fake);}
          return listener.call(this,e);
        };
        return origAdd.call(this,type,wrapped,opts);
      }
      return origAdd.call(this,type,listener,opts);
    };
    document.addEventListener("mousedown",e=>{if(e.button===0){const ev=new Event("keydown");ev.keyCode=67;ev.which=67;canvas.dispatchEvent(ev);}});
    document.addEventListener("mouseup",  e=>{if(e.button===0){const ev=new Event("keyup");  ev.keyCode=67;ev.which=67;canvas.dispatchEvent(ev);}});
  };
  document.body.appendChild(s);
  overlay.removeEventListener('click',go);
});
<\/script></body></html>`);
    win.document.close();
    try{win.focus();}catch(e){}
  },150);
}

// ---- Eaglercraft 1.12 ----
function launchE112(){
  flash();
  setTimeout(()=>{
    const win=window.open("about:blank","egc112","width=1280,height=720,menubar=no,toolbar=no,location=no,status=no");
    const FILE_URL='https://cdn.jsdelivr.net/gh/PlanetDogeCodes/Eagletcraft-1.12@main/source%20file/egc1-12.xml';
    win.document.open();
    win.document.write(`<!DOCTYPE html><html><head><style>
body,html{margin:0;padding:0;overflow:hidden;height:100%;background:black;}
iframe{width:100%;height:100%;border:none;display:none;}
.btn{padding:20px 40px;background:#000;color:#fff;border:2px solid #b44dff;border-radius:10px;font:bold 24px Arial;cursor:pointer;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10;}
.btn:hover{background:#4a148c;}
</style></head><body>
<iframe id="fr"></iframe>
<button class="btn" onclick="play(this)">PLAY EAGLERCRAFT 1.12</button>
<script>
const DB='GameCacheDB',ST='GameFiles',TTL=90*24*60*60*1000;
function openDB(){return new Promise((res,rej)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=e=>e.target.result.createObjectStore(ST,{keyPath:'url'});r.onsuccess=e=>res(e.target.result);r.onerror=e=>rej(e.target.error);});}
async function cached(url){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction(ST,'readonly'),r=tx.objectStore(ST).get(url);r.onsuccess=async e=>{const d=e.target.result;if(d&&Date.now()-d.timestamp<TTL){res(d.content);}else{const t=await(await fetch(url)).text();const db2=await openDB();const tx2=db2.transaction(ST,'readwrite');tx2.objectStore(ST).put({url,content:t,timestamp:Date.now()});res(t);}};r.onerror=()=>rej();});}
async function play(btn){try{const t=await cached('${FILE_URL}');const fr=document.getElementById('fr');fr.contentDocument.open();fr.contentDocument.write(t);fr.contentDocument.close();fr.style.display='block';btn.style.display='none';}catch(e){alert('Game failed to load.');}}
<\/script></body></html>`);
    win.document.close();
    try{win.focus();}catch(e){}
  },150);
}

// ---- dumLLM ----
function launchDumLLM(){
  flash();
  setTimeout(()=>{
    const win=window.open("about:blank","dumllm","width=1280,height=720,menubar=no,toolbar=no,location=no,status=no");
    win.document.open();
    win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>dumLLM</title>
    <style>
        :root { 
            --bg: #0d1117; 
            --card: #161b22; 
            --accent: #7c4dff; 
            --text: #c9d1d9; 
        }
        body { 
            font-family: system-ui, -apple-system, sans-serif; 
            background: var(--bg); 
            color: var(--text); 
            margin: 0; 
            display: flex; 
            flex-direction: column; 
            height: 100vh; 
        }
        #header { 
            padding: 15px; 
            background: var(--card); 
            border-bottom: 1px solid #30363d; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            gap: 15px; 
            flex-wrap: wrap; 
        }
        select, button, input { 
            background:#21262d; 
            color:white; 
            border:1px solid #30363d; 
            padding:8px; 
            border-radius:4px; 
        }
        #chat { 
            flex: 1; 
            overflow-y: auto; 
            padding: 20px; 
            display: flex; 
            flex-direction: column; 
            gap: 16px; 
        }
        .msg { 
            max-width: 85%; 
            padding: 14px 18px; 
            border-radius: 14px; 
            line-height: 1.65; 
            font-size: 15.2px; 
        }
        .user { 
            align-self: flex-end; 
            background: var(--accent); 
            color: white; 
            border-bottom-right-radius: 4px; 
        }
        .ai { 
            align-self: flex-start; 
            background: var(--card); 
            border: 1px solid #30363d; 
            border-bottom-left-radius: 4px; 
        }
        .ai-text { white-space: pre-wrap; word-break: break-word; }
        .code-block { 
            background: #010409; 
            border: 1px solid #30363d; 
            border-radius: 8px; 
            margin: 10px 0; 
            overflow: hidden; 
        }
        .code-header { 
            background: #21262d; 
            padding: 8px 14px; 
            font-size: 12.5px; 
            color: #8b949e; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
        }
        .code-content { 
            padding: 14px; 
            font-family: 'Courier New', monospace; 
            font-size: 13.5px; 
            overflow-x: auto; 
            color: #c9d1d9; 
            white-space: pre; 
        }
        .copy-btn { 
            background: var(--accent); 
            color: white; 
            border: none; 
            padding: 4px 12px; 
            border-radius: 4px; 
            cursor: pointer; 
            font-size: 11px; 
        }
        #input-area { 
            padding: 20px; 
            background: var(--card); 
            border-top: 1px solid #30363d; 
            display: flex; 
            gap: 12px; 
        }
        input#user-input { 
            flex: 1; 
            background: #010409; 
            border: 1px solid #30363d; 
            color: white; 
            padding: 14px 20px; 
            border-radius: 25px; 
            outline: none; 
            font-size: 15px; 
        }
        button#main-btn { 
            background: var(--accent); 
            color: white; 
            border: none; 
            padding: 0 28px; 
            border-radius: 25px; 
            cursor: pointer; 
            font-weight: bold; 
        }
        button#main-btn:disabled { background: #21262d; opacity: 0.6; cursor: wait; }
        #status { 
            font-size: 12px; 
            text-align: center; 
            color: #8b949e; 
            background: #010409; 
            padding: 9px; 
            border-top: 1px solid #30363d; 
        }
        .thinking { font-style: italic; color: #8b949e; }
    </style>
</head>
<body>
    <div id="header">
        <b style="color: var(--accent); font-size: 18px;">dumLLM</b>
        <select id="model-select">
            <option value="gemma-2-2b-it-q4f16_1-MLC">Gemma 2 2B (Fast)</option>
            <option value="Phi-3-mini-4k-instruct-q4f16_1-MLC">Phi-3 Mini 4K</option>
            <option value="Llama-3.1-8B-Instruct-q4f16_1-MLC">Llama 3.1 8B</option>
            <option value="Mistral-7B-Instruct-v0.3-q4f16_1-MLC">Mistral 7B</option>
            <option value="Qwen2.5-3B-Instruct-q4f16_1-MLC">Qwen 2.5 3B</option>
            <option value="Qwen2.5-7B-Instruct-q4f16_1-MLC">Qwen 2.5 7B</option>
        </select>
    </div>

    <div id="chat"></div>
    <div id="status">Ready to initialize.</div>

    <div id="input-area">
        <input type="text" id="user-input" placeholder="Initialize to start..." disabled autocomplete="off">
        <button id="main-btn">Initialize Engine</button>
    </div>

    <script type="module">
        import * as webllm from "https://esm.run/@mlc-ai/web-llm";

        let engine = null;
        let isReady = false;

        const status = document.getElementById("status");
        const mainBtn = document.getElementById("main-btn");
        const chatDiv = document.getElementById("chat");
        const userInput = document.getElementById("user-input");
        const modelSelect = document.getElementById("model-select");

        const initProgressCallback = (p) => {
            status.innerText = p.text || "Loading...";
            if (p.progress === 1) status.innerText = "✓ Engine Ready!";
        };

        function formatResponse(text) {
            const container = document.createElement("div");
            container.className = "ai-text";
            const parts = text.split(/(\\u0060\\u0060\\u0060[\\s\\S]*?\\u0060\\u0060\\u0060)/g);
            for (let part of parts) {
                if (part.startsWith("\\u0060\\u0060\\u0060")) {
                    const match = part.match(/\\u0060\\u0060\\u0060(\\w*)\\n?([\\s\\S]*?)\\u0060\\u0060\\u0060/);
                    if (match) {
                        const lang = match[1] || "text";
                        const code = match[2].trim();
                        const codeBlock = document.createElement("div");
                        codeBlock.className = "code-block";
                        const header = document.createElement("div");
                        header.className = "code-header";
                        header.innerHTML = \`<span>\${lang}</span><button class="copy-btn">Copy</button>\`;
                        const codeContent = document.createElement("div");
                        codeContent.className = "code-content";
                        codeContent.textContent = code;
                        header.querySelector(".copy-btn").onclick = () => {
                            navigator.clipboard.writeText(code);
                            const btn = header.querySelector(".copy-btn");
                            btn.textContent = "Copied!";
                            setTimeout(() => btn.textContent = "Copy", 1500);
                        };
                        codeBlock.appendChild(header);
                        codeBlock.appendChild(codeContent);
                        container.appendChild(codeBlock);
                        continue;
                    }
                }
                if (!part.trim()) continue;
                const lines = part.split('\\n');
                let currentList = null, listType = null;
                for (let line of lines) {
                    let trimmed = line.trim();
                    if (/^(-{3,}|_{3,}|\\*{3,})$/.test(trimmed)) {
                        const hr = document.createElement("hr");
                        hr.style.cssText = "border:none;border-top:1px solid #30363d;margin:20px 0;";
                        container.appendChild(hr); currentList = null; continue;
                    }
                    if (trimmed.startsWith(">")) {
                        const quote = document.createElement("blockquote");
                        quote.style.cssText = "border-left:4px solid #7c4dff;padding-left:16px;margin:12px 0;color:#8b949e;";
                        quote.innerHTML = trimmed.replace(/^>\\s?/, '');
                        container.appendChild(quote); currentList = null; continue;
                    }
                    const headingMatch = trimmed.match(/^(#{1,6})\\s+(.+)$/);
                    if (headingMatch) {
                        const level = headingMatch[1].length;
                        const h = document.createElement(\`h\${level}\`);
                        h.innerHTML = processInline(headingMatch[2]);
                        h.style.margin = level === 1 ? "24px 0 12px 0" : "20px 0 8px 0";
                        container.appendChild(h); currentList = null; continue;
                    }
                    const listMatch = trimmed.match(/^(\\s*)([-*+]|\\d+\\.)\\s+(.+)$/);
                    if (listMatch) {
                        const isNumbered = listMatch[2].endsWith('.');
                        if (!currentList || (isNumbered && listType !== "ol") || (!isNumbered && listType !== "ul")) {
                            const newList = document.createElement(isNumbered ? "ol" : "ul");
                            newList.style.cssText = "margin:10px 0 10px 20px;padding-left:10px;";
                            container.appendChild(newList);
                            currentList = newList;
                            listType = isNumbered ? "ol" : "ul";
                        }
                        const li = document.createElement("li");
                        li.innerHTML = processInline(listMatch[3]);
                        currentList.appendChild(li); continue;
                    }
                    if (trimmed) {
                        const p = document.createElement("p");
                        p.style.margin = "12px 0";
                        p.innerHTML = processInline(trimmed);
                        container.appendChild(p); currentList = null;
                    }
                }
            }
            return container;
        }

        function processInline(text) {
            return text
                .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
                .replace(/\\*([^\\*]+?)\\*/g, '<em>$1</em>')
                .replace(/_(.+?)_/g, '<em>$1</em>')
                .replace(/\\u0060(.+?)\\u0060/g, '<code style="background:#21262d;padding:2px 6px;border-radius:4px;font-family:monospace;">$1</code>');
        }

        function resetToInitializeState() {
            isReady = false;
            mainBtn.innerText = "Initialize Engine";
            mainBtn.disabled = false;
            userInput.disabled = true;
            userInput.placeholder = "Initialize to start...";
            if (engine) { try { engine.terminate(); } catch(e) {} engine = null; }
        }

        modelSelect.onchange = () => {
            resetToInitializeState();
            status.innerText = "Model changed — click Initialize Engine to load.";
        };

        async function chatWebLLM(prompt) {
            const aBox = document.querySelector(".msg.ai:last-child");
            let fullText = "";
            const completion = await engine.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                stream: true,
                temperature: 0.7
            });
            for await (const chunk of completion) {
                const delta = chunk.choices[0]?.delta?.content || "";
                if (delta) {
                    fullText += delta;
                    aBox.innerHTML = "";
                    aBox.appendChild(formatResponse(fullText));
                    chatDiv.scrollTop = chatDiv.scrollHeight;
                }
            }
            return fullText;
        }

        async function chat() {
            const prompt = userInput.value.trim();
            if (!prompt || !isReady) return;
            const uBox = document.createElement("div");
            uBox.className = "msg user";
            uBox.textContent = prompt;
            chatDiv.appendChild(uBox);
            const aBox = document.createElement("div");
            aBox.className = "msg ai";
            aBox.innerHTML = '<span class="thinking">thinking...</span>';
            chatDiv.appendChild(aBox);
            chatDiv.scrollTop = chatDiv.scrollHeight;
            userInput.value = "";
            mainBtn.disabled = true;
            try {
                await chatWebLLM(prompt);
            } catch (e) {
                aBox.textContent = "Error: " + e.message;
            }
            chatDiv.scrollTop = chatDiv.scrollHeight;
            mainBtn.disabled = false;
            userInput.focus();
        }

        async function initWebLLM() {
            mainBtn.disabled = true;
            mainBtn.innerText = "Loading...";
            status.innerText = "Creating WebLLM engine...";
            try {
                if (!navigator.gpu) throw new Error("WebGPU not supported in this browser");
                const modelId = modelSelect.value;
                if (engine) await engine.terminate();
                engine = new webllm.MLCEngine({ initProgressCallback });
                status.innerText = \`Loading \${modelId}... (can take 30-90s first time)\`;
                await engine.reload(modelId);
                isReady = true;
                mainBtn.innerText = "Send";
                mainBtn.disabled = false;
                userInput.disabled = false;
                userInput.placeholder = "Ask me something...";
                userInput.focus();
                status.innerText = \`✓ Ready with \${modelId}\`;
            } catch (e) {
                console.error(e);
                status.innerText = "Error: " + e.message;
                mainBtn.innerText = "Try Again";
                mainBtn.disabled = false;
            }
        }

        mainBtn.onclick = () => {
            if (isReady) { chat(); }
            else { initWebLLM(); }
        };

        userInput.onkeydown = (e) => {
            if (e.key === "Enter" && isReady) { e.preventDefault(); chat(); }
        };

        window.onload = () => {
            resetToInitializeState();
        };
    <\/script>
</body>
</html>`);
    win.document.close();
    try{win.focus();}catch(e){}
  },150);
}

// ---- Bad Browser ----
function launchBadBrowser(){
  flash();
  setTimeout(()=>{
    const win = window.open("about:blank","badbrowser","width=1280,height=720,menubar=no,toolbar=no,location=no,status=no");
    fetch("badbrowser.html")
      .then(response => response.text())
      .then(html => {
        win.document.open();
        win.document.write(html);
        win.document.close();
      })
      .catch(err => console.error("Failed to load badbrowser.html", err));
    try{win.focus();}catch(e){}
  },150);
}

// ---- MineKhan ----
function launchMineKhan(){
  flash();
  setTimeout(()=>{
    const win = window.open("about:blank","minekhan","width=1280,height=720,menubar=no,toolbar=no,location=no,status=no");
    fetch("https://cdn.jsdelivr.net/gh/ActuallyDigitsofpi314159/CerneyHub@main/mineKhan.html")
      .then(response => response.text())
      .then(html => {
        win.document.open();
        win.document.write(html);
        win.document.close();
      })
      .catch(err => console.error("Failed to load mineKhan.html", err));
    try{win.focus();}catch(e){}
  },150);
}
