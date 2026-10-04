# Mohammad Abrar — Interactive VS Code Developer Portfolio

An interactive, responsive Visual Studio Code themed developer portfolio for **Mohammad Abrar**, React Native Developer.

Inspired by [aahanabobade.com](https://www.aahanabobade.com/) and powered by React 18, Vite, TypeScript, and Tailwind CSS.

## 🚀 Features

- **VS Code IDE Interface**:
  - macOS Traffic Lights & Dropdown Menus (File, View, Terminal, Help)
  - Activity Bar with Explorer, Search, Source Control (Git), Run & Debug, Extensions, Theme Switcher, and Settings
  - Collapsible Sidebar with virtual file tree:
    - `src/home.tsx`: Developer overview, dynamic typing roles, stats counters, CTAs
    - `src/about.html`: Narrative bio, B.Tech CS degree (8.4 GPA), strengths
    - `src/projects.js`: Production mobile apps with filtering and technical feats
    - `data/skills.json`: Categorized skills with toggleable Visual Cards and Raw JSON views
    - `src/experience.ts`: Chronological career timeline with Websenor Infotech & Lakebrains
    - `src/contact.css`: CSS-styled interactive contact form & 1-click copy direct channels
    - `README.md`: Profile documentation & quick links
    - `Mohammad_Abrar_Resume.pdf`: Embedded PDF viewer & direct download button
  - Tabbed Editor with breadcrumbs (`portfolio > src > ...`) and file-type colored badges
  - **Mobile App Simulator**: Run Project Demo or Launch Mobile App opens an Android-style phone with nine original app logos; each app links to its Google Play listing
  - Real simulated Terminal shell supporting `help`, `ls`, `pwd`, `cat`, `open`, `whoami`, `projects`, `skills`, `contact`, `git log`, `theme`, `resume`, `clear`, etc.
  - Status Bar with git branch, error counters, Prettier, language mode, line/col, and theme picker
- **6 Switchable Color Themes** (stored in `localStorage`):
  1. 💙 **Abrar Dark** (Modern VS Code Dark)
  2. 🌸 **Rosé Pine**
  3. 🌃 **Tokyo Night**
  4. 🐱 **Catppuccin Macchiato**
  5. 🧊 **Nord**
  6. 🔥 **Gruvbox Dark**
- **Command Palette (`Ctrl/Cmd + P`)**:
  - Fuzzy search across all files, themes, and actions
- **Responsive Design**:
  - Adaptive layout for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS with custom CSS variables & theme tokens
- **Icons**: Lucide React
- **Typography**: JetBrains Mono & Syne

## 💻 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Checks

```bash
npx playwright install chromium
npm run test:e2e
```

Headless Chromium checks cover desktop, mobile, landscape, keyboard navigation, app links, local logos, and logo failure handling. Screenshots are saved under `test-results/`.

See [the simulator maintenance notes](docs/mobile-simulator.md) for the app catalog, asset sources, and interaction decisions.

## 📄 License

MIT © [Mohammad Abrar](https://github.com/AbrarChhipa)
