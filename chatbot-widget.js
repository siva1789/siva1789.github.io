/**
 * Sivaraj Portfolio AI Assistant — matches the site's own design tokens
 * (--teal / --bg / --surface / --border / --text / --muted, DM Sans +
 * Cormorant Garamond, and the .dark-mode class already on <html>).
 *
 * This REPLACES the .whatsapp-float button + .wa-popup block.
 * See README for the exact HTML to remove and where to add this script.
 *
 * USAGE — add before </body>:
 *   <script src="chatbot-widget.js" data-api="https://YOUR-VERCEL-APP.vercel.app/api/chat"></script>
 */
(function () {
  const scriptTag = document.currentScript;
  const API_URL = scriptTag?.dataset?.api || '/api/chat';
  const WHATSAPP_URL = "https://wa.me/919840465309?text=Hi%20Sivaraj%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!";

  // ---------- Styles (reads the page's own CSS variables) ----------
  const css = `
    .scw-launcher {
    position: fixed !important;
    right: 28px !important;
    bottom: 28px !important;

    width: 62px !important;
    height: 62px !important;

    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    background: #2e6b6e !important;
    color: #ffffff !important;

    border: none !important;
    border-radius: 50% !important;

    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18) !important;

    cursor: pointer !important;

    opacity: 1 !important;
    visibility: visible !important;

    z-index: 2147483647 !important;

    transform: none !important;
}
    .scw-launcher:hover { transform: scale(1.06); background: var(--teal); box-shadow: 0 8px 28px rgba(46,107,110,0.4); }
    .scw-launcher:focus-visible { outline: 2px solid var(--teal); outline-offset: 3px; }
    @keyframes scw-rise { to { transform: translateY(0); opacity: 1; } }
    .scw-launcher svg {
    width: 28px !important;
    height: 28px !important;
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
}

    .scw-panel {
      position: fixed; bottom: 92px; right: 28px;
      width: 320px; max-width: calc(100vw - 32px);
      height: 440px; max-height: calc(100vh - 140px);
      background: var(--surface, var(--white));
      border: 1.5px solid var(--border);
      border-radius: 16px;
      box-shadow: 0 20px 56px rgba(0,0,0,0.22);
      display: flex; flex-direction: column; overflow: hidden;
      z-index: 999;
      font-family: 'DM Sans', system-ui, sans-serif;
      transform-origin: bottom right;
      transform: scale(0.96) translateY(8px); opacity: 1; pointer-events: none;
      transition: transform 0.18s ease, opacity 0.18s ease;
    }
    .scw-panel.scw-open { transform: scale(1) translateY(0); opacity: 1; pointer-events: auto; }

    .scw-header {
      display: flex; align-items: center; gap: 10px;
      padding: 14px 16px; background: var(--teal); color: #fff;
    }
    .scw-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: rgba(255,255,255,0.18);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-weight: 700; font-size: 15px; flex-shrink: 0;
    }
    .scw-header-name { font-size: 14px; font-weight: 700; line-height: 1.3; }
    .scw-header-status { font-size: 11.5px; color: rgba(255,255,255,0.85); display: flex; align-items: center; gap: 5px; }
    .scw-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; display: inline-block; }
    .scw-close { margin-left: auto; background: none; border: none; color: rgba(255,255,255,0.8); cursor: pointer; font-size: 18px; padding: 4px; }
    .scw-close:hover { color: #fff; }

    .scw-messages { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
    .scw-msg { max-width: 82%; padding: 9px 12px; border-radius: 14px; font-size: 13.5px; line-height: 1.5; white-space: pre-wrap; }
    .scw-msg.scw-user { align-self: flex-end; background: var(--teal); color: #fff; border-bottom-right-radius: 4px; }
    .scw-msg.scw-bot { align-self: flex-start; background: var(--teal-lt); color: var(--text); border-bottom-left-radius: 4px; }
    .scw-msg.scw-error { align-self: flex-start; background: #fdecea; color: #9f1f13; }

    .scw-typing { align-self: flex-start; display: flex; gap: 4px; padding: 10px 12px; background: var(--teal-lt); border-radius: 14px; border-bottom-left-radius: 4px; }
    .scw-typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); animation: scw-bounce 1.2s infinite; }
    .scw-typing span:nth-child(2) { animation-delay: 0.15s; }
    .scw-typing span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes scw-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-4px); opacity: 1; } }

    .scw-suggestions { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 14px 10px; }
    .scw-chip { border: 1px solid var(--border); background: var(--white); border-radius: 999px; padding: 5px 10px; font-size: 11.5px; cursor: pointer; color: var(--text); font-family: inherit; }
    .scw-chip:hover { border-color: var(--teal); color: var(--teal); }

    .scw-footer-link { text-align: center; padding: 0 14px 10px; font-size: 11px; }
    .scw-footer-link a { color: var(--teal); text-decoration: none; font-weight: 600; }
    .scw-footer-link a:hover { text-decoration: underline; }

    .scw-inputbar { display: flex; gap: 8px; padding: 10px; border-top: 1px solid var(--border); background: var(--white); }
    .scw-input { flex: 1; border: 1.5px solid var(--border); border-radius: 20px; padding: 9px 14px; font-size: 13.5px; outline: none; font-family: inherit; background: var(--white); color: var(--text); }
    .scw-input:focus { border-color: var(--teal); }
    .scw-send { width: 34px; height: 34px; border-radius: 50%; border: none; background: var(--teal); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .scw-send:disabled { opacity: 0.5; cursor: default; }

    @media (max-width: 420px) {
      .scw-panel { right: 12px; left: 12px; width: auto; bottom: 84px; }
      .scw-launcher { right: 16px; bottom: 16px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .scw-launcher, .scw-panel, .scw-typing span { animation: none !important; transition: none !important; }
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ---------- Markup ----------
  const launcher = document.createElement('button');
  launcher.className = 'scw-launcher';
  launcher.id = 'scwLauncher';
  launcher.setAttribute('aria-label', "Chat with Sivaraj's AI assistant");
  launcher.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;

  const panel = document.createElement('div');
  panel.className = 'scw-panel';
  panel.innerHTML = `
    <div class="scw-header">
      <div class="scw-avatar">SR</div>
      <div>
        <div class="scw-header-name">Sivaraj's AI Assistant</div>
        <div class="scw-header-status"><span class="scw-dot"></span>Ask about his work</div>
      </div>
      <button class="scw-close" aria-label="Close chat">&times;</button>
    </div>
    <div class="scw-messages" id="scw-messages"></div>
    <div class="scw-suggestions" id="scw-suggestions">
      <button class="scw-chip">What has he worked on?</button>
      <button class="scw-chip">Skills?</button>
      <button class="scw-chip">Is he available for work?</button>
    </div>
    <div class="scw-footer-link"><a href="${WHATSAPP_URL}" target="_blank" rel="noopener">Prefer WhatsApp? Chat directly →</a></div>
    <div class="scw-inputbar">
      <input class="scw-input" id="scw-input" type="text" placeholder="Type a message..." />
      <button class="scw-send" id="scw-send" aria-label="Send">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>
      </button>
    </div>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  // ---------- State & behavior ----------
  const messagesEl = panel.querySelector('#scw-messages');
  const inputEl = panel.querySelector('#scw-input');
  const sendBtn = panel.querySelector('#scw-send');
  const closeBtn = panel.querySelector('.scw-close');
  const suggestionsEl = panel.querySelector('#scw-suggestions');

  let history = [];
  let open = false;
  let greeted = false;

  function addMessage(role, text) {
    const el = document.createElement('div');
    el.className = 'scw-msg ' + (role === 'user' ? 'scw-user' : role === 'error' ? 'scw-error' : 'scw-bot');
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'scw-typing';
    el.id = 'scw-typing-indicator';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  function hideTyping() { document.getElementById('scw-typing-indicator')?.remove(); }

  async function sendMessage(text) {
    if (!text.trim()) return;
    suggestionsEl.style.display = 'none';
    addMessage('user', text);
    history.push({ role: 'user', content: text });
    inputEl.value = '';
    sendBtn.disabled = true;
    showTyping();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      hideTyping();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      addMessage('bot', data.reply);
      history.push({ role: 'assistant', content: data.reply });
    } catch (err) {
      hideTyping();
      addMessage('error', "Sorry, I'm having trouble connecting right now — try again, or reach out via the WhatsApp link below.");
      console.error('Chat widget error:', err);
    } finally {
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  launcher.addEventListener('click', () => {
    open = !open;
    panel.classList.toggle('scw-open', open);
    if (open) {
      inputEl.focus();
      if (!greeted) {
        greeted = true;
        addMessage('bot', "Hi! I can answer questions about Sivaraj's design work, experience, and skills. What would you like to know?");
      }
    }
  });
  closeBtn.addEventListener('click', () => { open = false; panel.classList.remove('scw-open'); });
  sendBtn.addEventListener('click', () => sendMessage(inputEl.value));
  inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(inputEl.value); });
  suggestionsEl.querySelectorAll('.scw-chip').forEach((chip) => {
    chip.addEventListener('click', () => sendMessage(chip.textContent));
  });
})();
