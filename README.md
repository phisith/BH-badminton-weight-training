# Weight Training for Birdie

React + Vite PWA for stepping through your Wednesday (Upper & Core) and Saturday (Legs & Hardware) workouts with timers, rest tracking, and per-exercise YouTube tutorial videos.

## Local dev

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Output is in `dist/`.

## Deploy to Vercel

Two ways:

1. **One-click via GitHub**
   1. Push this folder to a GitHub repo.
   2. Go to vercel.com, "Add New Project", import the repo.
   3. Vercel auto-detects Vite. Framework preset: **Vite**. Build command: `npm run build`. Output dir: `dist`. Hit Deploy.

2. **CLI**
   ```bash
   npm i -g vercel
   vercel
   ```
   Follow the prompts. Subsequent deploys: `vercel --prod`.

## Features

- Two sessions: Wednesday (Upper & Core), Saturday (Legs & Hardware)
- Step-by-step flow: warm-up, blocks, exercises, cool down
- Per-set tracking with visual dots
- Rest timer between sets (60 or 90 sec, configurable, +15s extension, skip)
- Countdown for timed exercises and warm-up / cool-down
- Beep and vibration on timer completion (toggleable)
- Coaching cue on every exercise
- "Search YouTube" button always works, opens a query for the exercise
- "Set custom video" lets you paste a YouTube URL or 11-char video ID. The video embeds inline and is saved per exercise in localStorage
- Installable PWA, works offline after first load (via `vite-plugin-pwa`)
- Mobile-first design with desktop layout above 880px
