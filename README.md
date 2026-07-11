# AgriLink AI — local setup

## What's built so far
- Farmer Dashboard (profile, weather widget, season wheel, daily tips)
- Crop Disease Detection (photo upload + mock diagnosis)
- Crop Recommendation (soil/season/rainfall → ranked crop suggestions)
- Smart Weather (full page: alerts, irrigation guidance, 7-day forecast)
- Sidebar nav for all 12 planned modules (unbuilt ones show "coming soon")
- Language toggle: English / Telugu / Hindi (nav labels + greeting)

## Requirements
- Node.js installed (v18 or newer). Check with: `node -v`
  If you don't have it, download from https://nodejs.org

## Setup steps (run in a terminal, inside VS Code or any terminal)

1. Unzip this project folder anywhere on your computer, e.g. `Desktop/agrilink-project`
2. Open the folder in VS Code: `File > Open Folder...` → select `agrilink-project`
3. Open a terminal in VS Code: `Terminal > New Terminal`
4. Install dependencies:
   ```
   npm install
   ```
5. Start the dev server:
   ```
   npm run dev
   ```
6. VS Code / the terminal will print a local URL, usually:
   ```
   http://localhost:5173
   ```
   Open that in your browser — the app will be running there, and it hot-reloads whenever you save a file.

## Where everything lives
```
agrilink-project/
├── index.html          <- page shell, don't need to touch this
├── package.json         <- dependencies list
├── vite.config.js        <- build tool config
├── tailwind.config.js    <- styling config
├── postcss.config.js     <- styling config
├── src/
│   ├── main.jsx          <- mounts the App, don't need to touch this
│   ├── index.css         <- Tailwind imports, don't need to touch this
│   └── App.jsx           <- THE ENTIRE APP — this is where all our features live
└── README.md             <- this file
```

Everything we've built (dashboard, disease detection, crop recommendation, weather)
is inside the single file `src/App.jsx`. When we build the next feature, I'll give
you either a fresh full copy of `App.jsx`, or exact edit instructions for that file —
whichever is easier for you to apply in VS Code.

## Continuing the build without me
If you want to keep building features yourself before we talk again, the pattern
each module follows inside `App.jsx` is:
1. A small translations object for EN/TE/HI labels (e.g. `RECOMMEND_LABELS`)
2. Any static data it needs (e.g. `CROP_PROFILES`)
3. A component function (e.g. `function CropRecommendation(...)`)
4. One line added to the routing in the `App` component at the bottom, matching
   the nav `key` (see the `NAV` array near the top) to your new component.
