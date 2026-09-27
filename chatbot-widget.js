(function () {
  "use strict";

  const script =
    document.currentScript ||
    document.querySelector('script[src*="chatbot-widget.js"]');

  const API_URL =
    script?.dataset?.api ||
    "https://sivaraj-chatbot-api.vercel.app/api/chat";

  const WHATSAPP_URL =
    "https://wa.me/919840465309?text=Hi%20Sivaraj%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!";

  const style = document.createElement("style");

  style.textContent = `
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
      color: white !important;
      border: none !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      z-index: 2147483647 !important;
      box-shadow: 0 8px 24px rgba(0,0,0,.18) !important;
      pointer-events: auto !important;
    }

    .scw-launcher svg {
      pointer-events: none !important;
    }

    .scw-panel {
      position: fixed !important;
      right: 28px !important;
      bottom: 102px !important;
      width: 360px !important;
      max-width: calc(100vw - 32px) !important;
      height: 500px !important;
      max-height: calc(100vh - 130px) !important;
      background: white !important;
      border-radius: 18px !important;
      box-shadow: 0 20px 56px rgba(0,0,0,.22) !important;
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
      z-index: 2147483646 !important;
      opacity: 0;
      visibility: hidden;
      pointer-events: none !important;
      transform: translateY(10px);
      transition: .2s ease;
    }

    .scw-panel.scw-open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto !important;
      transform: translateY(0);
    }

    .scw-header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 16px;
      background: #2e6b6e !important;
      color: white !important;
    }

    .scw-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255,255,255,.18);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .scw-header-name {
      font-size: 15px;
      font-weight: 700;
    }

    .scw-header-status {
      font-size: 11px;
    }

    .scw-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ade80;
      margin-right: 4px;
    }

    .scw-close {
      margin-left: auto;
      background: transparent !important;
      border: none !important;
      color: white !important;
      cursor: pointer !important;
      font-size: 20px;
      pointer-events: auto !important;
    }

    .scw-messages {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .scw-msg {
      max-width: 82%;
      padding: 10px 12px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.5;
      white-space: pre-wrap;
    }

    .scw-bot {
      align-self: flex-start;
      background: #eaf3f3;
      color: #1a1a1a;
    }

    .scw-user {
      align-self: flex-end;
      background: #2e6b6e;
      color: white;
    }

    .scw-error {
      background: #fdecea;
      color: #9f1f13;
    }

    .scw-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 0 14px 10px;
    }

    .scw-chip {
      border: 1px solid #ddd !important;
      background: white !important;
      border-radius: 999px !important;
      padding: 6px 10px !important;
      cursor: pointer !important;
      pointer-events: auto !important;
    }

    .scw-footer-link {
      text-align: center;
      padding-bottom: 10px;
      font-size: 11px;
    }

    .scw-footer-link a {
      color: #2e6b6e !important;
      text-decoration: none;
      font-weight: 600;
    }

    .scw-inputbar {
      display: flex;
      gap: 8px;
      padding: 10px;
      border-top: 1px solid #ddd;
      background: white !important;
      flex-shrink: 0;
      z-index: 10;
      pointer-events: auto !important;
    }

    .scw-input {
      flex: 1;
      min-width: 0;
      border: 1.5px solid #ddd !important;
      border-radius: 20px !important;
      padding: 10px 14px !important;
      outline: none !important;
      background: white !important;
      color: #222 !important;
      pointer-events: auto !important;
    }

    .scw-send {
      width: 40px !important;
      height: 40px !important;
      min-width: 40px !important;
      border-radius: 50% !important;
      border: none !important;
      background: #2e6b6e !important;
      color: white !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      pointer-events: auto !important;
      z-index: 20 !important;
    }

    .scw-send svg {
      pointer-events: none !important;
    }

    .scw-send:disabled {
      opacity: .5 !important;
      cursor: wait !important;
    }
  `;

  document.head.appendChild(style);

  const launcher = document.createElement("button");

  launcher.type = "button";
  launcher.className = "scw-launcher";
  launcher.setAttribute(
    "aria-label",
    "Open Sivaraj's AI assistant"
  );

  launcher.innerHTML = `
    <svg width="28" height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8
      8.5 8.5 0 0 1-7.6 4.7
      8.38 8.38 0 0 1-3.8-.9
      L3 21l1.9-5.7
      a8.38 8.38 0 0 1-.9-3.8
      8.5 8.5 0 0 1 4.7-7.6
      8.38 8.38 0 0 1 3.8-.9h.5
      a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  `;

  const panel = document.createElement("div");

  panel.className = "scw-panel";

  panel.innerHTML = `
    <div class="scw-header">

      <div class="scw-avatar">SR</div>

      <div>
        <div class="scw-header-name">
          Sivaraj's AI Assistant
        </div>

        <div class="scw-header-status">
          <span class="scw-dot"></span>
          Ask about his work
        </div>
      </div>

      <button
        type="button"
        class="scw-close"
        aria-label="Close chat">
        ×
      </button>

    </div>

    <div class="scw-messages"></div>

    <div class="scw-suggestions">

      <button type="button" class="scw-chip">
        What has he worked on?
      </button>

      <button type="button" class="scw-chip">
        Skills?
      </button>

      <button type="button" class="scw-chip">
        Is he available for work?
      </button>

    </div>

    <div class="scw-footer-link">
      <a
        href="${WHATSAPP_URL}"
        target="_blank"
        rel="noopener">
        Prefer WhatsApp? Chat directly →
      </a>
    </div>

    <div class="scw-inputbar">

      <input
        class="scw-input"
        type="text"
        autocomplete="off"
        placeholder="Type a message..."
      />

      <button
        type="button"
        class="scw-send"
        aria-label="Send message">

        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">

          <path d="M22 2 11 13"/>
          <path d="M22 2 15 22l-4-9-9-4 20-7z"/>

        </svg>

      </button>

    </div>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  const messages = panel.querySelector(".scw-messages");
  const input = panel.querySelector(".scw-input");
  const send = panel.querySelector(".scw-send");
  const close = panel.querySelector(".scw-close");
  const suggestions = panel.querySelector(".scw-suggestions");

  let history = [];

  let opened = false;

  function addMessage(type, text) {

    const message = document.createElement("div");

    message.className =
      "scw-msg " +
      (type === "user"
        ? "scw-user"
        : type === "error"
        ? "scw-error"
        : "scw-bot");

    message.textContent = text;

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;
  }

  function openChat() {

    opened = true;

    panel.classList.add("scw-open");

    if (!messages.children.length) {

      addMessage(
        "bot",
        "Hi! I can answer questions about Sivaraj's design work, experience, and skills. What would you like to know?"
      );

    }

    setTimeout(() => input.focus(), 100);
  }

  function closeChat() {

    opened = false;

    panel.classList.remove("scw-open");
  }

  async function sendMessage(text) {

    text = String(text || "").trim();

    if (!text || send.disabled) {
      return;
    }

    addMessage("user", text);

    input.value = "";

    suggestions.style.display = "none";

    history.push({
      role: "user",
      content: text
    });

    send.disabled = true;

    try {

      console.log("Sending message to:", API_URL);

      const response = await fetch(API_URL, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

        body: JSON.stringify({
          messages: history
        })

      });

      const raw = await response.text();

      console.log("API status:", response.status);
      console.log("API response:", raw);

      let data;

      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(
          "The API returned an invalid response."
        );
      }

      if (!response.ok) {

        throw new Error(
          data.error ||
          `API error ${response.status}`
        );

      }

      const reply =
        data.reply ||
        data.message ||
        data.response ||
        data.content;

      if (!reply) {

        throw new Error(
          "The API returned no reply."
        );

      }

      addMessage("bot", reply);

      history.push({
        role: "assistant",
        content: reply
      });

    } catch (error) {

      console.error(
        "CHATBOT ERROR:",
        error
      );

      addMessage(
        "error",
        "Sorry, I couldn't connect to the AI service. Please try again."
      );

    } finally {

      send.disabled = false;

      input.focus();

    }
  }

  launcher.addEventListener(
    "click",
    function (event) {

      event.preventDefault();
      event.stopPropagation();

      if (opened) {
        closeChat();
      } else {
        openChat();
      }

    }
  );

  close.addEventListener(
    "click",
    function (event) {

      event.preventDefault();
      event.stopPropagation();

      closeChat();

    }
  );

  send.addEventListener(
    "click",
    function (event) {

      event.preventDefault();
      event.stopPropagation();

      console.log(
        "SEND BUTTON CLICKED"
      );

      sendMessage(input.value);

    }
  );

  input.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendMessage(input.value);

      }

    }
  );

  panel
    .querySelectorAll(".scw-chip")
    .forEach(function (chip) {

      chip.addEventListener(
        "click",
        function (event) {

          event.preventDefault();
          event.stopPropagation();

          sendMessage(
            chip.textContent
          );

        }
      );

    });

})();