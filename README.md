# $HAPPINESS - The Happiest Meme Coin on Solana

Eine vollständige, produktionsreife Next.js 15 Website für $HAPPINESS – die glücklichste Meme-Coin auf Solana, die tägliche Live-Charity-Shows über Creator-Trading-Gebühren finanziert.

## 🚀 Features

### Design & Stil
- **2025 Solo Agency Ästhetik**: Ultra-sauberes, wissenschaftliches Design
- **Light/Dark Mode**: Nahtloser Theme-Wechsel mit MagicUI Animated Theme Toggler
- **Responsive**: Mobile-first, vollständig responsive
- **Animationen**: Moderne, geschmackvolle Animationen mit Framer Motion

### Seiten
- **Home**: Hero mit Orbiting Circles, Animated Gradient Text, Live Pool Ticker
- **Apply**: Multi-Step Application Form mit Progress Bar und File Upload
- **Vote**: Daily Voting Leaderboard mit Bento Grid und Magic Cards
- **Pool**: Live Happiness Pool mit Animated Beams und zwei Counters
- **Analysis**: Wissenschaftliche Seite mit MathJax Gleichungen und Tabellen
- **Live**: Embedded Pump.fun Stream mit Chat und Confetti
- **Transparency**: On-Chain Proof Section mit Solscan Links

### Komponenten
- MagicUI Komponenten (Orbiting Circles, Animated Beam, Number Ticker, Particles, etc.)
- shadcn/ui Basis-Komponenten
- Custom UI Komponenten (Shimmer Button, Ripple Button, Rainbow Button)
- Live Pool Ticker mit Particles Background
- Happiness Badge System (Supporter → Guardian → God)
- Floating Dock Navigation

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **UI Libraries**:
  - shadcn/ui
  - MagicUI
  - Aceternity UI (komponenten)
  - FloatUI (komponenten)
  - DaisyUI (komponenten)
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Math**: react-katex für LaTeX Gleichungen
- **Theming**: next-themes
- **Icons**: Lucide React

## 🛠️ Installation

1. **Dependencies installieren**:
```bash
npm install
```

2. **Development Server starten**:
```bash
npm run dev
```

3. **Öffne** [http://localhost:3000](http://localhost:3000) im Browser

## 📝 Build & Production

```bash
# Production Build erstellen
npm run build

# Production Server starten
npm start
```

## 🚢 Deployment auf Vercel

### Option 1: GitHub Integration (Empfohlen)

1. **Repository auf GitHub pushen**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/happiness-website.git
git push -u origin main
```

2. **Auf Vercel deployen**:
   - Gehe zu [vercel.com](https://vercel.com)
   - Klicke auf "New Project"
   - Importiere dein GitHub Repository
   - Vercel erkennt automatisch Next.js
   - Klicke auf "Deploy"

### Option 2: Vercel CLI

1. **Vercel CLI installieren**:
```bash
npm i -g vercel
```

2. **Login**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Production Deploy**:
```bash
vercel --prod
```

### Environment Variables (Optional)

Falls du später API Keys oder andere Secrets benötigst, kannst du diese in Vercel hinzufügen:
- Gehe zu Project Settings → Environment Variables
- Füge Variablen hinzu (z.B. `NEXT_PUBLIC_SOLANA_RPC_URL`)

## 📁 Projektstruktur

```
Project Happiness/
├── app/
│   ├── layout.tsx          # Root Layout mit Navbar & Dock
│   ├── page.tsx            # Home/Hero Seite
│   ├── globals.css         # Globale Styles
│   ├── apply/              # Application Form Seite
│   ├── vote/               # Voting Leaderboard Seite
│   ├── pool/               # Live Pool Seite
│   ├── analysis/           # Scientific Analysis Seite
│   ├── live/               # Live Stream Seite
│   └── transparency/       # On-Chain Transparency Seite
├── components/
│   ├── ui/                 # shadcn/ui Komponenten
│   ├── magicui/            # MagicUI Komponenten
│   ├── live-pool-ticker.tsx
│   ├── happiness-badge.tsx
│   └── navbar.tsx
├── lib/
│   └── utils.ts            # Utility Funktionen
├── data/
│   └── mock-data.ts        # Mock Daten
└── public/                 # Statische Assets
```

## 🎨 Customization

### Farben anpassen

Farben können in `app/globals.css` angepasst werden:
- Light Mode: `:root` Variablen
- Dark Mode: `.dark` Variablen

### Mock Daten

Mock Daten befinden sich in `data/mock-data.ts` und können dort angepasst werden.

### Komponenten

Alle Komponenten sind modular aufgebaut und können einfach angepasst werden.

## 🔧 Troubleshooting

### Build Fehler

Falls es Build-Fehler gibt:
```bash
# Node Modules löschen und neu installieren
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Fehler

Falls TypeScript Fehler auftreten:
```bash
# TypeScript Cache löschen
rm -rf .next
npm run build
```

## 📄 License

MIT License - Siehe LICENSE Datei für Details.

## 🤝 Contributing

Beiträge sind willkommen! Bitte erstelle einen Pull Request.

## 📞 Support

Bei Fragen oder Problemen öffne bitte ein Issue auf GitHub.

---

**Made with ❤️ for $HAPPINESS**

