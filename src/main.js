// ✨ Cozy Chat App - Where magic and friendship meet ✨
import "./style.css";

// 🌟 App State Management 🌟
class CozyState {
  constructor() {
    this.currentUser = null;
    this.currentTheme = "default";
    this.messages = [];
    this.isTyping = false;
    this.typingTimeout = null;
    this.lastNotificationTime = 0;

    // Load saved state
    this.loadState();
  }

  saveState() {
    const state = {
      currentUser: this.currentUser,
      currentTheme: this.currentTheme,
      messages: this.messages.slice(-50), // Keep last 50 messages
    };
    localStorage.setItem("chatties-state", JSON.stringify(state));
  }

  loadState() {
    const saved = localStorage.getItem("chatties-state");
    if (saved) {
      const state = JSON.parse(saved);
      this.currentUser = state.currentUser;
      this.currentTheme = state.currentTheme || "default";
      this.messages = state.messages || [];

      // Apply saved theme
      if (this.currentTheme !== "default") {
        document.body.className = `theme-${this.currentTheme}`;
      }
    }
  }
}

// 🎨 Doodle Data Collections 🎨
const DOODLE_AVATARS = [
  { emoji: "🦋", name: "Butterfly" },
  { emoji: "🌸", name: "Cherry Blossom" },
  { emoji: "🍄", name: "Mushroom" },
  { emoji: "⭐", name: "Star" },
  { emoji: "🌙", name: "Moon" },
  { emoji: "🐱", name: "Kitty" },
  { emoji: "🦔", name: "Hedgehog" },
  { emoji: "🐼", name: "Panda" },
  { emoji: "🌻", name: "Sunflower" },
  { emoji: "🦜", name: "Birdie" },
  { emoji: "🐸", name: "Frog" },
  { emoji: "🦋", name: "Butterfly" },
  { emoji: "☁️", name: "Cloud" },
  { emoji: "🌈", name: "Rainbow" },
  { emoji: "🎃", name: "Pumpkin" },
  { emoji: "🧸", name: "Teddy Bear" },
];

const DOODLE_STICKERS = [
  { emoji: "💕", name: "Heart" },
  { emoji: "✨", name: "Sparkles" },
  { emoji: "🌟", name: "Star" },
  { emoji: "💖", name: "Hearts" },
  { emoji: "🥰", name: "Love" },
  { emoji: "😊", name: "Happy" },
  { emoji: "🤗", name: "Hug" },
  { emoji: "☕", name: "Coffee" },
  { emoji: "🍪", name: "Cookie" },
  { emoji: "🌙", name: "Moon" },
  { emoji: "☀️", name: "Sun" },
  { emoji: "🌸", name: "Blossom" },
];

const COZY_THEMES = [
  {
    id: "default",
    name: "Cozy Default 🌸",
    description: "Our signature pastel paradise",
    colors: ["#FFE1E6", "#E1D5F7", "#D5E8F7"],
  },
  {
    id: "rainy",
    name: "Rainy Day 🌧️",
    description: "Gentle blues for peaceful vibes",
    colors: ["#E8F4F8", "#D5E8F7", "#B8D8E8"],
  },
  {
    id: "spring",
    name: "Spring Flowers 🌺",
    description: "Fresh blooms and new beginnings",
    colors: ["#FFE8F0", "#F0E8FF", "#E8F8E8"],
  },
  {
    id: "midnight",
    name: "Midnight Sky 🌌",
    description: "Dreamy dark mode for night owls",
    colors: ["#2D2B3A", "#3A2D3A", "#2D3A3A"],
  },
];

const WHOLESOME_MESSAGES = [
  "You matter 🧡",
  "Your presence is cozy! ✨",
  "Have you stretched today? 🦋",
  "You're doing amazing! 🌟",
  "Remember to drink water 💧",
  "Your smile brightens the room 😊",
  "You're exactly where you need to be 🌸",
  "Take a deep breath, you've got this 💕",
  "You make the world a little brighter ☀️",
  "Someone is grateful for you today 🌙",
];

// 🏗️ App State Instance
const state = new CozyState();

// 🎪 Main App Class 🎪
class ChattiesApp {
  constructor() {
    this.currentPage = "login-page";
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.populateAvatars();
    this.populateStickers();
    this.populateThemes();
    this.startWholesomeNotifications();

    // Show appropriate page based on user state
    if (state.currentUser) {
      this.showPage("chat-page");
      this.loadChatHistory();
      this.updateUserDisplay();
    } else {
      this.showPage("login-page");
    }
  }

  // 📄 Page Management
  showPage(pageId) {
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
    });
    document.getElementById(pageId).classList.add("active");
    this.currentPage = pageId;
  }

  // 🎨 Setup Functions
  setupEventListeners() {
    // Login form
    document
      .getElementById("username")
      .addEventListener("input", this.checkLoginForm.bind(this));
    document
      .getElementById("about-me")
      .addEventListener("input", this.checkLoginForm.bind(this));
    document
      .getElementById("join-chat")
      .addEventListener("click", this.handleLogin.bind(this));

    // Avatar selection
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("avatar-option")) {
        this.selectAvatar(e.target);
      }
    });

    // Chat functionality
    document
      .getElementById("chat-input")
      .addEventListener("keypress", this.handleChatInput.bind(this));
    document
      .getElementById("send-message")
      .addEventListener("click", this.sendMessage.bind(this));
    document
      .getElementById("chat-input")
      .addEventListener("input", this.handleTyping.bind(this));

    // Navigation buttons
    document
      .getElementById("leave-chat")
      .addEventListener("click", () => this.showPage("exit-page"));
    document
      .getElementById("support-button")
      .addEventListener("click", () => this.showPage("support-page"));
    document
      .getElementById("theme-toggle")
      .addEventListener("click", this.showThemeModal.bind(this));

    // Exit page
    document
      .getElementById("stay-button")
      .addEventListener("click", () => this.showPage("chat-page"));
    document
      .getElementById("goodbye-button")
      .addEventListener("click", this.handleGoodbye.bind(this));

    // Support page
    document
      .getElementById("back-to-chat")
      .addEventListener("click", () => this.showPage("chat-page"));

    // Theme modal
    document
      .getElementById("close-theme-modal")
      .addEventListener("click", this.hideThemeModal.bind(this));
    document.getElementById("theme-modal").addEventListener("click", (e) => {
      if (e.target.id === "theme-modal") this.hideThemeModal();
    });

    // Sticker clicks
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("sticker-button")) {
        this.sendSticker(e.target.textContent);
      }
    });

    // Theme selection
    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("theme-option") ||
        e.target.parentElement.classList.contains("theme-option")
      ) {
        const themeOption = e.target.classList.contains("theme-option")
          ? e.target
          : e.target.parentElement;
        this.selectTheme(themeOption.dataset.theme);
      }
    });
  }

  populateAvatars() {
    const grid = document.getElementById("avatar-grid");
    grid.innerHTML = DOODLE_AVATARS.map(
      (avatar, index) => `
      <div class="avatar-option" data-avatar="${avatar.emoji}" title="${avatar.name}">
        ${avatar.emoji}
      </div>
    `
    ).join("");
  }

  populateStickers() {
    const toolbar = document.getElementById("sticker-toolbar");
    toolbar.innerHTML = DOODLE_STICKERS.map(
      (sticker) => `
      <button class="sticker-button" title="${sticker.name}">
        ${sticker.emoji}
      </button>
    `
    ).join("");
  }

  populateThemes() {
    const grid = document.getElementById("theme-grid");
    grid.innerHTML = COZY_THEMES.map(
      (theme) => `
      <div class="theme-option" data-theme="${theme.id}">
        <div class="theme-name">${theme.name}</div>
        <div class="theme-description">${theme.description}</div>
        <div class="theme-preview" style="background: linear-gradient(45deg, ${theme.colors.join(
          ", "
        )})"></div>
      </div>
    `
    ).join("");
  }

  // 🔐 Login Functions
  selectAvatar(avatarElement) {
    document.querySelectorAll(".avatar-option").forEach((avatar) => {
      avatar.classList.remove("selected");
    });
    avatarElement.classList.add("selected");
    this.checkLoginForm();
  }

  checkLoginForm() {
    const username = document.getElementById("username").value.trim();
    const selectedAvatar = document.querySelector(".avatar-option.selected");
    const joinButton = document.getElementById("join-chat");

    if (username && selectedAvatar) {
      joinButton.disabled = false;
    } else {
      joinButton.disabled = true;
    }
  }

  handleLogin() {
    const username = document.getElementById("username").value.trim();
    const aboutMe = document.getElementById("about-me").value.trim();
    const selectedAvatar = document.querySelector(".avatar-option.selected");

    if (username && selectedAvatar) {
      state.currentUser = {
        username,
        aboutMe: aboutMe || "Spreading cozy vibes ✨",
        avatar: selectedAvatar.dataset.avatar,
        joinedAt: new Date().toISOString(),
      };

      state.saveState();
      this.showPage("chat-page");
      this.updateUserDisplay();
      this.addSystemMessage(`${username} joined the cozy corner! 🌸`);
      this.showNotification(`Welcome to Chatties, ${username}! 💕`);
    }
  }

  updateUserDisplay() {
    if (state.currentUser) {
      document.getElementById("current-user-avatar").textContent =
        state.currentUser.avatar;
      document.getElementById("current-user-name").textContent =
        state.currentUser.username;
    }
  }

  // 💬 Chat Functions
  handleChatInput(e) {
    if (e.key === "Enter") {
      this.sendMessage();
    }
  }

  handleTyping() {
    if (!state.isTyping) {
      state.isTyping = true;
      this.showTypingIndicator();
    }

    clearTimeout(state.typingTimeout);
    state.typingTimeout = setTimeout(() => {
      state.isTyping = false;
      this.hideTypingIndicator();
    }, 1000);
  }

  sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();

    if (message && state.currentUser) {
      this.addMessage({
        id: Date.now(),
        username: state.currentUser.username,
        avatar: state.currentUser.avatar,
        text: message,
        timestamp: new Date(),
        isOwn: true,
      });

      input.value = "";
      this.hideTypingIndicator();

      // Simulate other users responding occasionally
      if (Math.random() < 0.3) {
        setTimeout(() => this.simulateResponse(), 1000 + Math.random() * 3000);
      }
    }
  }

  sendSticker(sticker) {
    if (state.currentUser) {
      this.addMessage({
        id: Date.now(),
        username: state.currentUser.username,
        avatar: state.currentUser.avatar,
        text: sticker,
        timestamp: new Date(),
        isOwn: true,
        isSticker: true,
      });
    }
  }

  addMessage(message) {
    state.messages.push(message);
    this.renderMessage(message);
    state.saveState();
    this.scrollToBottom();
  }

  addSystemMessage(text) {
    const message = {
      id: Date.now(),
      username: "System",
      avatar: "✨",
      text: text,
      timestamp: new Date(),
      isSystem: true,
    };
    this.addMessage(message);
  }

  renderMessage(message) {
    const messagesContainer = document.getElementById("chat-messages");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${message.isOwn ? "own" : ""} ${
      message.isSystem ? "system" : ""
    }`;

    const timeString = message.timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    messageElement.innerHTML = `
      <div class="message-avatar">${message.avatar}</div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-username">${message.username}</span>
          <span class="message-time">${timeString}</span>
        </div>
        <div class="message-text ${message.isSticker ? "sticker" : ""}">${
      message.text
    }</div>
      </div>
    `;

    messagesContainer.appendChild(messageElement);
  }

  loadChatHistory() {
    const messagesContainer = document.getElementById("chat-messages");
    // Clear existing messages except welcome
    const welcome = messagesContainer.querySelector(".welcome-message");
    messagesContainer.innerHTML = "";
    if (welcome) messagesContainer.appendChild(welcome);

    // Render saved messages
    state.messages.forEach((message) => this.renderMessage(message));
    this.scrollToBottom();
  }

  scrollToBottom() {
    const messagesContainer = document.getElementById("chat-messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    document.getElementById("typing-indicator").style.display = "block";
  }

  hideTypingIndicator() {
    document.getElementById("typing-indicator").style.display = "none";
  }

  simulateResponse() {
    const responses = [
      "That's so cozy! 💕",
      "I love that! ✨",
      "Aww, so sweet! 🌸",
      "You're the best! 🦋",
      "This made my day! ☀️",
      "Sending you hugs! 🤗",
      "So wholesome! 💖",
    ];

    const randomAvatar =
      DOODLE_AVATARS[Math.floor(Math.random() * DOODLE_AVATARS.length)];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    this.addMessage({
      id: Date.now(),
      username: "CozyFriend",
      avatar: randomAvatar.emoji,
      text: randomResponse,
      timestamp: new Date(),
      isOwn: false,
    });
  }

  // 🎨 Theme Functions
  showThemeModal() {
    document.getElementById("theme-modal").classList.add("active");
    this.updateThemeSelection();
  }

  hideThemeModal() {
    document.getElementById("theme-modal").classList.remove("active");
  }

  updateThemeSelection() {
    document.querySelectorAll(".theme-option").forEach((option) => {
      option.classList.remove("active");
      if (option.dataset.theme === state.currentTheme) {
        option.classList.add("active");
      }
    });
  }

  selectTheme(themeId) {
    state.currentTheme = themeId;

    // Remove existing theme classes
    document.body.className = "";

    // Apply new theme
    if (themeId !== "default") {
      document.body.classList.add(`theme-${themeId}`);
    }

    state.saveState();
    this.updateThemeSelection();
    this.hideThemeModal();
    this.showNotification(
      `Theme changed to ${COZY_THEMES.find((t) => t.id === themeId)?.name}! ✨`
    );
  }

  // 👋 Exit Functions
  handleGoodbye() {
    if (state.currentUser) {
      this.addSystemMessage(
        `${state.currentUser.username} left the cozy corner... 💔`
      );
    }

    // Clear user data but keep messages
    state.currentUser = null;
    state.saveState();

    this.showPage("login-page");
    this.resetLoginForm();
  }

  resetLoginForm() {
    document.getElementById("username").value = "";
    document.getElementById("about-me").value = "";
    document.querySelectorAll(".avatar-option").forEach((avatar) => {
      avatar.classList.remove("selected");
    });
    document.getElementById("join-chat").disabled = true;
  }

  // ✨ Wholesome Notifications
  startWholesomeNotifications() {
    setInterval(() => {
      // Only show if user is logged in and it's been at least 5 minutes since last notification
      const now = Date.now();
      if (state.currentUser && now - state.lastNotificationTime > 300000) {
        const message =
          WHOLESOME_MESSAGES[
            Math.floor(Math.random() * WHOLESOME_MESSAGES.length)
          ];
        this.showNotification(message);
        state.lastNotificationTime = now;
      }
    }, 60000); // Check every minute
  }

  showNotification(text) {
    const notification = document.getElementById("wholesome-notification");
    const textElement = document.getElementById("notification-text");

    textElement.textContent = text;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 4000);
  }
}

// 🚀 Initialize App
document.addEventListener("DOMContentLoaded", () => {
  new ChattiesApp();
});

// 🎉 Add some cozy console messages
console.log("🌸 Welcome to Chatties! 🌸");
console.log("💕 Spreading cozy vibes since 2025 💕");
console.log("✨ Made with love and doodles ✨");
