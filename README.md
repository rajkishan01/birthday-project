# 🎂 Happy Birthday — Interactive Birthday Website

A heartfelt, multi-page interactive birthday website built with vanilla HTML, CSS, and JavaScript. Features animated pages, background music, photo galleries, and smooth page transitions — all crafted with love.

**🌐 Live Demo → [happy-birthday-riyaa.netlify.app]( https://rajkishan01.github.io/birthday-project/)**

---

## ✨ Features

- 🎵 **Auto-playing background music** with play/pause toggle — seamlessly continues across all pages
- 💫 **Animated landing page** with GSAP-powered bounce entrance, floating emojis, and a typing greeting
- 📸 **Aesthetic photo frame** with dual rotating arcs and a gentle floating animation
- 💌 **Surprise message page** with shuffling personal reasons and a reason counter
- 🖼️ **Memory/gallery page** with hover-animated photo cards and a heartfelt final message
- 🖱️ **Custom cursor** with pink bubble effect
- 📱 **Fully responsive** — works on mobile and desktop
- ⚡ **Smooth page transitions** — fade in/out between pages

---

## 📁 Project Structure

```
HappyBirthday-Riya/
│
├── index.html        # Landing page — main birthday greeting
├── style.css         # Styles for landing page
├── script.js         # GSAP animations, cursor, floating emojis
│
├── cause.html        # Page 2 — "Why You're Special" reasons
├── cause.css         # Styles for cause page
├── cause.js          # Shuffling reasons logic
│
├── last.html         # Page 3 — Memory gallery + final message
│
├── music.js          # Shared background music controller (all pages)
├── hbd.mp3           # Background music file
│
├── d1.png            # Photo — used in gallery
├── d2.jpg            # Photo — used in gallery
├── d3.jpg            # Photo — used in gallery
├── d4.png            # Photo
├── d5.png            # Photo — used as main profile photo on landing page
├── gif1.gif          # GIF asset
└── gif2.gif          # GIF asset
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and layout |
| **CSS3** | Animations, gradients, responsive design |
| **Vanilla JavaScript** | Interactions, typing effect, floating elements |
| **GSAP 3** (CDN) | Smooth entrance animations and page transitions |
| **Web Audio API** | Background music autoplay with session persistence |
| **SessionStorage** | Music position memory across page navigations |
| **Google Fonts** | Dancing Script & Quicksand fonts (last.html) |

---

## 🚀 How to Use / Run Locally

**No installation needed.** This is a pure frontend project.

**Step 1** — Clone the repository
```bash
git clone https://github.com/rajkishan01/birthday-project.git
cd birthday-project
```

**Step 2** — Open in browser

Simply open `index.html` in any modern browser:
```bash
# On Windows
start index.html

# On Mac
open index.html
```

Or use VS Code's **Live Server** extension for best experience.

> ⚠️ **Note:** Music autoplay is blocked by browsers when opening files directly. Either use Live Server or deploy to a hosting platform. On first page load, click anywhere on the page and music will start automatically.

---

## 🌍 How to Deploy (Free)

### Option 1 — Netlify (Drag & Drop, Easiest)
1. Go to [netlify.com](https://netlify.com) → Login
2. Drag your entire project folder onto the Netlify dashboard
3. Done — live link generated instantly ✅

### Option 2 — Vercel
1. Go to [vercel.com](https://vercel.com) → Login with GitHub
2. Import your GitHub repository
3. Click Deploy → live link ready ✅

### Option 3 — GitHub Pages
1. Push project to GitHub
2. Go to Repo → Settings → Pages
3. Set branch to `main` → Save
4. Link: `https://username.github.io/birthday-project` ✅

---

## 🎨 Pages Overview

### Page 1 — `index.html` (Landing)
The first thing she sees. Features the main photo with aesthetic spinning arc frame, animated "Happy Birthday Riya" heading with bounce effect, a typewriter greeting message, and floating emojis in the background.

### Page 2 — `cause.html` (Why You're Special)
An interactive page that reveals shuffling reasons why she's amazing, with a custom heart cursor and a running counter.

### Page 3 — `last.html` (Memories & Final Message)
A gallery-style page with hoverable photo cards, each with a caption. Ends with a heartfelt final message and animated floating hearts.

---

## 📝 Customization Guide

**Change the name** — Find and replace `Riya` / `Riyaa` in all HTML files.

**Change photos** — Replace `d1.png`, `d2.jpg`, `d3.jpg`, `d4.png`, `d5.png` with your own images (keep the same filenames).

**Change music** — Replace `hbd.mp3` with any `.mp3` file, keep the same filename.

**Change greeting text** — In `script.js`, edit line:
```js
const greetingText = "Hey You Know What! You're the most adorable human i ever met! 💖";
```

**Change reasons** — In `cause.js`, find the reasons array and edit the strings.

---

## 🙌 Credits

Built with 💗 by [Kishan Raj Patel](https://github.com/rajkishan01)

---

> *"Some people deserve to feel special on their birthday. This is for one of those people."*
