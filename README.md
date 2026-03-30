# DataSync Dashboard

A real-time data sync dashboard built with React.

## Features
- Fetches 12 posts from JSONPlaceholder API on load
- Auto re-fetches every **60 seconds** without any page reload
- Live **countdown ring + progress bar** showing time until next sync
- Sync counter & last-synced timestamp in the header
- Manual **Refresh Now** button resets the auto-sync timer
- Proper `useEffect` cleanup to prevent memory leaks
- Responsive grid layout, dark theme

## Tech
- React 18 (hooks: `useEffect`, `useCallback`, `useRef`, `useState`)
- `setInterval` with cleanup via returned function from `useEffect`
- CSS Modules for scoped styling
- Google Fonts (Syne + Space Mono)

## Run Locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

```
useDataSync.js
├── fetchData()          – fetches from API, resets countdown
├── useEffect #1         – initial fetch on mount
├── useEffect #2         – setInterval for auto re-fetch every 60s (cleanup on unmount)
└── useEffect #3         – setInterval for 1-second countdown tick (cleanup on unmount)
```

Each `useEffect` returns a cleanup function (`clearInterval`) so no memory leaks occur even if the component unmounts mid-cycle.
