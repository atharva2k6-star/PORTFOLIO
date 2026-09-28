# 🚀 CYBERNETIC ARCHITECT // NEXUS OS PORTFOLIO

A futuristic, high-performance, cyberpunk HUD-inspired portfolio designed for Full Stack Engineers, Cyber Architects, Systems Builders, and Web3/AI Integrators.

---

## ⚡ Quick Start

No Node.js, npm, or build step required! Simply double-click `index.html` or run:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or serve with any static web server:
```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## 📂 Project Architecture

```
Projects/
├── index.html            # Main semantic HTML5 markup & HUD layout
├── README.md             # Documentation & customization guide
├── css/
│   └── cyber.css         # Neon glows, HUD corners, scanlines, animations & design system
├── js/
│   ├── config.js         # 🛠️ Central configuration file (Edit your profile info here!)
│   ├── audio.js          # Web Audio API futuristic sound synthesizer (SFX)
│   ├── canvas.js         # Interactive background particle network & Matrix code rain
│   ├── terminal.js       # Interactive CLI terminal emulator with command parser
│   └── app.js            # Dynamic DOM renderer, real-time clock & theme controller
└── assets/
    └── images/
        ├── avatar.jpg        # Cybernetic architect portrait
        ├── project-ai.jpg    # Neural network AI hologram preview
        ├── project-web3.jpg  # Decentralized crypto DEX hologram preview
        └── project-cloud.jpg # Cloud telemetry monitoring grid preview
```

---

## 🛠️ How to Customize Your Portfolio

All personal info, skills, projects, and terminal commands are centralized inside **`js/config.js`**. You don't have to touch complex HTML markup:

### 1. Update Name & Personal Bio
Open `js/config.js` and modify the `personal` block:
```javascript
personal: {
    name: "YOUR NAME",
    callsign: "AGENT PROFILE ID: 007-X",
    systemVersion: "v1.0.0_STABLE",
    location: "YOUR CITY / REMOTE",
    avatarImage: "assets/images/avatar.jpg", // Or URL to your profile photo
    typingTitles: [
        "FULL STACK DEVELOPER",
        "CLOUD ARCHITECT",
        "OPEN SOURCE CONTRIBUTOR"
    ],
    bio: "Brief intro describing your expertise and mission...",
    // ...
}
```

### 2. Update Skills Matrix
Modify `skills` array to adjust categories, names, and proficiency percentages (0-100%):
```javascript
skills: [
    {
        category: "FRONTEND PROTOCOLS",
        items: [
            { name: "React / Next.js", level: 95 },
            { name: "TypeScript", level: 90 },
            // ...
        ]
    }
]
```

### 3. Add or Modify Projects
Add your own projects inside `projects` array:
```javascript
{
    id: "SYS_01",
    category: "ai", // 'ai', 'web3', or 'cloud'
    badge: "// AI & MACHINE LEARNING",
    title: "MY COOL PROJECT",
    description: "What the project does and the impact it achieved.",
    image: "assets/images/your-screenshot.jpg",
    tags: ["React", "FastAPI", "PostgreSQL"],
    liveUrl: "https://yourproject.com",
    githubUrl: "https://github.com/yourusername/project"
}
```

### 4. Custom CLI Terminal Commands
Add or edit commands inside `terminal.commands`:
```javascript
commands: {
    help: "...",
    whoami: "...",
    resume: "Download resume at https://yourlink.com/resume.pdf"
}
```

---

## 🌟 Interactive Features Included

- **Web Audio SFX Engine**: Procedurally synthesizes high-tech clicks, beeps, terminal keypresses, and theme chords using the browser's built-in Web Audio API.
- **Theme Palette Switcher**: Dynamic theme switching between **Neon Cyan**, **Cyber Magenta**, **Matrix Green**, **Solar Gold**, and **Electric Violet**.
- **Interactive CLI Terminal**:
  - Command history (navigate with <kbd>↑</kbd> and <kbd>↓</kbd> arrows)
  - Tab auto-completion (<kbd>Tab</kbd>)
  - Commands: `help`, `skills`, `projects`, `timeline`, `specs`, `matrix`, `theme`, `audio`, `scan`, `clear`, `sudo`
- **Matrix Digital Rain**: Run `matrix` in the terminal to activate full-screen holographic code rain.
- **System Diagnostics HUD**: Interactive hardware and telemetry scanner modal.
- **Interactive Mouse Particles**: Particle canvas responds to mouse cursor proximity and links nearby nodes with dynamic laser lines.
- **Encrypted Message Dispatch**: Contact form with simulated cryptographic packet encryption before transmitting.

---

## 🚀 Free Deployment Guide

### Deploy to GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Repository Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and `/root`, then click **Save**.
4. Your cyber portfolio will be live in 1-2 minutes!

### Deploy to Vercel / Netlify
- Drag and drop this folder directly into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).
