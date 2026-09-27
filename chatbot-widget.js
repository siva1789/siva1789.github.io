(function () {
  "use strict";

  const script =
    document.currentScript ||
    document.querySelector('script[src*="chatbot-widget.js"]');

  const API_URL =
    script?.getAttribute("data-api") ||
    "https://sivaraj-chatbot-api.vercel.app/api/chat";

  const WIDGET_ID = "sivaraj-chatbot-widget";

  function injectStyles() {
    if (document.getElementById("sivaraj-chatbot-styles")) return;

    const style = document.createElement("style");
    style.id = "sivaraj-chatbot-styles";

    style.textContent = `
      #sivaraj-chatbot-launcher {
        position: fixed !important;
        right: 24px !important;
        bottom: 24px !important;
        width: 64px !important;
        height: 64px !important;
        min-width: 64px !important;
        min-height: 64px !important;
        border-radius: 50% !important;
        background: #2f7779 !important;
        color: white !important;
        border: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        z-index: 2147483647 !important;
        box-shadow: 0 8px 30px rgba(0,0,0,.20) !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        pointer-events: auto !important;
      }

      #sivaraj-chatbot-launcher:hover {
        transform: scale(1.05) !important;
      }

      #sivaraj-chatbot-launcher svg {
        width: 30px !important;
        height: 30px !important;
        display: block !important;
      }

      #sivaraj-chatbot-window {
        position: fixed !important;
        right: 24px !important;
        bottom: 100px !important;
        width: 385px !important;
        max-width: calc(100vw - 32px) !important;
        height: 500px !important;
        max-height: calc(100vh - 130px) !important;
        background: #fff !important;
        border-radius: 20px !important;
        overflow: hidden !important;
        z-index: 2147483646 !important;
        box-shadow: 0 20px 60px rgba(0,0,0,.20) !important;
        display: none !important;
        flex-direction: column !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      #sivaraj-chatbot-window.open {
        display: flex !important;
      }

      .sivaraj-chatbot-header {
        height: 76px;
        flex-shrink: 0;
        background: #2f7779;
        color: white;
        display: flex;
        align-items: center;
        padding: 0 18px;
      }

      .sivaraj-chatbot-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: rgba(255,255,255,.18);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        margin-right: 12px;
      }

      .sivaraj-chatbot-title {
        flex: 1;
        font-weight: 700;
        font-size: 16px;
      }

      .sivaraj-chatbot-status {
        display: block;
        font-size: 12px;
        margin-top: 3px;
        font-weight: 400;
      }

      .sivaraj-chatbot-close {
        background: transparent;
        border: none;
        color: white;
        font-size: 25px;
        cursor: pointer;
        padding: 5px;
      }

      .sivaraj-chatbot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 18px;
        background: white;
      }

      .sivaraj-chatbot-message {
        max-width: 85%;
        padding: 12px 14px;
        margin-bottom: 10px;
        border-radius: 14px;
        font-size: 14px;
        line-height: 1.5;
      }

      .sivaraj-chatbot-bot {
        background: #eaf3f3;
        color: #173b3c;
      }

      .sivaraj-chatbot-user {
        background: #2f7779;
        color: white;
        margin-left: auto;
      }

      .sivaraj-chatbot-input-area {
        display: flex;
        gap: 8px;
        padding: 12px;
        border-top: 1px solid #eee;
        background: white;
      }

      .sivaraj-chatbot-input {
        flex: 1;
        height: 46px;
        border: 1px solid #ddd;
        border-radius: 24px;
        padding: 0 16px;
        font-size: 14px;
        outline: none;
      }

      .sivaraj-chatbot-send {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        border: none;
        background: #2f7779;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @media (max-width: 600px) {
        #sivaraj-chatbot-launcher {
          right: 16px !important;
          bottom: 16px !important;
        }

        #sivaraj-chatbot-window {
          right: 16px !important;
          bottom: 92px !important;
          width: calc(100vw - 32px) !important;
          height: calc(100vh - 120px) !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function createWidget() {
    if (document.getElementById(WIDGET_ID)) return;

    injectStyles();

    const wrapper = document.createElement("div");
    wrapper.id = WIDGET_ID;

    wrapper.innerHTML = `
      <button
        id="sivaraj-chatbot-launcher"
        aria-label="Open Sivaraj AI Assistant"
        title="Ask Sivaraj's AI Assistant"
      >
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5
                   8.5 8.5 0 0 1-4.3-1.2L3 20l1.2-4.4
                   A8.4 8.4 0 0 1 3 11.5
                   8.5 8.5 0 1 1 21 11.5z"/>
        </svg>
      </button>

      <div id="sivaraj-chatbot-window">
        <div class="sivaraj-chatbot-header">
          <div class="sivaraj-chatbot-avatar">SR</div>

          <div class="sivaraj-chatbot-title">
            Sivaraj's AI Assistant
            <span class="sivaraj-chatbot-status">
              🟢 Ask about his work
            </span>
          </div>

          <button
            class="sivaraj-chatbot-close"
            aria-label="Close chatbot"
          >
            ×
          </button>
        </div>

        <div class="sivaraj-chatbot-messages">
          <div class="sivaraj-chatbot-message sivaraj-chatbot-bot">
            Hi! I can answer questions about Sivaraj's design work,
            experience, and skills. What would you like to know?
          </div>
        </div>

        <div class="sivaraj-chatbot-input-area">
          <input
            class="sivaraj-chatbot-input"
            type="text"
            placeholder="Type a message..."
          />

          <button
            class="sivaraj-chatbot-send"
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);

    const launcher =
      document.getElementById("sivaraj-chatbot-launcher");

    const windowEl =
      document.getElementById("sivaraj-chatbot-window");

    const closeButton =
      wrapper.querySelector(".sivaraj-chatbot-close");

    const input =
      wrapper.querySelector(".sivaraj-chatbot-input");

    const sendButton =
      wrapper.querySelector(".sivaraj-chatbot-send");

    launcher.addEventListener("click", function () {
      windowEl.classList.add("open");
    });

    closeButton.addEventListener("click", function () {
      windowEl.classList.remove("open");
    });

    async function sendMessage() {
      const message = input.value.trim();

      if (!message) return;

      addMessage(message, "user");
      input.value = "";

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: message
          })
        });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();

        const reply =
          data.reply ||
          data.message ||
          data.response ||
          "Sorry, I couldn't get a response.";

        addMessage(reply, "bot");

      } catch (error) {
        console.error("Chatbot error:", error);

        addMessage(
          "Sorry, I'm having trouble connecting right now. Please try again.",
          "bot"
        );
      }
    }

    function addMessage(text, type) {
      const messages =
        wrapper.querySelector(".sivaraj-chatbot-messages");

      const message = document.createElement("div");

      message.className =
        "sivaraj-chatbot-message " +
        (type === "user"
          ? "sivaraj-chatbot-user"
          : "sivaraj-chatbot-bot");

      message.textContent = text;

      messages.appendChild(message);

      messages.scrollTop = messages.scrollHeight;
    }

    sendButton.addEventListener("click", sendMessage);

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  }

  // Expose a public API so you can verify the widget in DevTools.
  window.ChatbotWidget = {
    init: createWidget,
    open: function () {
      createWidget();

      document
        .getElementById("sivaraj-chatbot-window")
        ?.classList.add("open");
    },
    close: function () {
      document
        .getElementById("sivaraj-chatbot-window")
        ?.classList.remove("open");
    }
  };

  function init() {
    if (document.body) {
      createWidget();
    } else {
      document.addEventListener("DOMContentLoaded", createWidget);
    }
  }

  init();

})();