# 🌸 Chatties - Your Cozy Corner 🌸

A cozy, doodle-themed community chat app where joy, cuteness, and emotional comfort come first! Built with love and sprinkled with wholesome vibes ✨

## 💕 What makes Chatties special?

Chatties isn't just another chat app - it's a warm hug in digital form. Every interaction is designed to make you feel supported, welcomed, and emotionally comforted.

### ✨ Core Features

🎨 **Doodle Login** - Simple username + cute doodle avatar selection
💬 **MSN-Style Public Chat** - Nostalgic chatroom with cozy vibes  
🌟 **Animated Stickers** - Express yourself with adorable doodle reactions
🎨 **Mood Themes** - Choose your cozy vibe (Rainy Day, Spring Flowers, Midnight Sky)
🥺 **"Are You Leaving Me?" Exit Page** - Even goodbyes are wholesome
💝 **Support Page** - Ko-fi/Patreon integration for tip jar functionality
🌱 **Wholesome Notifications** - Gentle reminders that you matter
📱 **Mobile-Friendly** - Cozy on every device

### 🎪 Magical Features

- **Hand-drawn aesthetic** with soft pastels and cute animations
- **Local storage** saves your preferences and chat history
- **Typing indicators** and smooth message animations
- **Simulated responses** from friendly bots for demo purposes
- **Theme persistence** - your cozy vibe stays with you
- **Responsive design** - looks adorable on phones and computers

## 🚀 Getting Started

### Prerequisites

- Node.js (version 20 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone or download this cozy corner:

   ```bash
   git clone <your-repo-url>
   cd chatties
   ```

2. Install the magical dependencies:

   ```bash
   npm install
   ```

3. Start your cozy development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit the local development URL (usually `http://localhost:5173`)

5. Pick a cute username, choose your doodle friend, and start spreading cozy vibes! 🌸

## 🏗️ Project Structure

```
chatties/
├── 🏠 index.html          # Main HTML structure with all pages
├── 🎨 src/
│   ├── style.css          # All the cozy CSS magic
│   ├── main.js            # JavaScript functionality and charm
│   └── assets/            # Images and icons (if any)
├── 📦 package.json        # Dependencies and scripts
├── 🌟 README.md           # You are here!
└── 📁 public/             # Static assets
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (creates `dist/` folder)
- `npm run preview` - Preview the production build locally

## 🎨 Customization Guide

### Adding Your Tip Jar Links

1. Open `index.html`
2. Find the "Support Page" section
3. Update the href attributes in the support links:
   ```html
   <a href="https://ko-fi.com/yourusername" class="support-link kofi">
     <a href="https://patreon.com/yourusername" class="support-link patreon">
       <a
         href="https://your-tip-jar-link.com"
         class="support-link tipjar"
       ></a></a
   ></a>
   ```

### Adding New Themes

1. Open `src/style.css`
2. Add new theme variables in the "Theme Variations" section
3. Open `src/main.js`
4. Add your theme to the `COZY_THEMES` array

### Adding New Doodle Avatars or Stickers

1. Open `src/main.js`
2. Add new items to `DOODLE_AVATARS` or `DOODLE_STICKERS` arrays
3. Use emoji characters or update CSS for custom images

## 🚀 Deployment

### Quick Deploy Options

**Netlify (Recommended):**

1. Run `npm run build`
2. Drag the `dist/` folder to Netlify
3. Your cozy corner is live! 🎉

**Vercel:**

1. Connect your repo to Vercel
2. Set build command to `npm run build`
3. Set output directory to `dist`
4. Deploy with love ✨

**GitHub Pages:**

1. Run `npm run build`
2. Copy `dist/` contents to your gh-pages branch
3. Enable GitHub Pages in repo settings

## 💖 Technologies Used

- **Vite** - Lightning fast build tool
- **Vanilla JavaScript** - No frameworks, just pure cozy code
- **CSS3** - Modern styling with gradients and animations
- **HTML5** - Semantic and accessible markup
- **Local Storage** - Keeps your cozy data safe

## 🤝 Contributing

Found a bug? Want to add more cozy features? Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/more-coziness`)
3. Commit your changes (`git commit -m 'Add more wholesome vibes'`)
4. Push to the branch (`git push origin feature/more-coziness`)
5. Open a Pull Request with love 💕

## 🐛 Known Quirks

- This is a demo app - messages are stored locally (perfect for personal use!)
- "Other users" are simulated bots for demonstration
- Real-time chat would require a backend server (future enhancement!)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💌 Special Thanks

Built with love for everyone who needs a cozy corner on the internet. Remember: you matter, you're doing amazing, and the world is brighter with you in it! 🌟

---

💝 **Support this cozy space:** If you love Chatties, consider supporting development through Ko-fi, Patreon, or your favorite tip jar platform!

🌸 **Made with love and doodles** - Spreading cozy vibes since 2025 ✨
