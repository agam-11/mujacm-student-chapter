# MUJ ACM Student Chapter — Frontend

This repository contains the frontend for the MUJ ACM Student Chapter website. It's a Vite + React app that includes a Three.js animated background (`ThreeGlobe`) and a theme system (dark/light) with a theme switcher and mobile-responsive navigation.

## What’s included

- `frontend/` — main Vite React application
  - `src/components/ThreeGlobe.jsx` — Three.js animated globe, stars, rays, and small rockets/UFOs
  - `src/context/ThemeContext.jsx` — Theme provider with localStorage persistence
  - `src/components/ThemeSwitcher.jsx` — Light/Dark toggle button
  - `src/components/MobileMenu.jsx` — Mobile hamburger menu and slide-in nav panel
  - `index.html` — includes Sreda font import
  - `src/index.css` — global styles and light-theme overrides

## Requirements

- Node.js 16+ (recommended)
- npm (or yarn/pnpm if you prefer)

## Setup (dev)

Open a terminal and run:

```powershell
cd frontend
npm install
npm run dev
```

This starts the Vite dev server and opens the app at `http://localhost:5173` (or another port shown in the terminal).

## Build (production)

```powershell
cd frontend
npm run build
npm run preview  # optional: preview the production build locally
```

## Notes for contributors

- The `ThreeGlobe` component is heavy on CPU/GPU due to many particles and animations. It has viewport-based scaling logic to reduce counts on smaller screens. If you change constants like `starCount`, `rayCount`, or `rocketCount`, consider updating the responsive logic accordingly.
- The theme system uses `document.documentElement` class toggling (`light-theme` / `dark-theme`) plus CSS overrides to force black text in light mode. Some page components still include Tailwind `text-white` classes; the global overrides are used to ensure text turns black in light mode. If you prefer, refactor page components to use the theme context directly for colors.
- Logo assets are expected in `frontend/public/` as `acm.png` (dark theme) and `acmblue.png` (light theme).

## How to test mobile responsiveness

1. Start the dev server (`npm run dev`).
2. Open the site in Chrome/Edge and open DevTools (F12). Toggle device toolbar and select a mobile viewport (<768px) to verify:
   - The desktop horizontal nav is hidden.
   - A themed hamburger button appears (top-right). Click it to open the slide-in menu.
   - ThreeGlobe background scales down: globe size, star count, rays and rockets are reduced.
3. Test at tablet sizes (768–1024px) and desktop (>=1024px) to confirm intermediate and full settings.

## Troubleshooting

- If the Three.js canvas disappears, check z-index layering: the globe is rendered inside an absolutely positioned background wrapper. Make sure header or other elements don't inadvertently overlay it with a higher z-index.
- If the dev server doesn't start, ensure you have Node.js 16+ and run `npm install` inside `frontend`.

## Development tips

- Use the ThemeContext in components to access `theme.isDark` and `theme.colors` for consistent styling.
- Keep 3D counts conservative for better performance on low-end devices.

---

If you'd like, I can also add a short CONTRIBUTING.md or an issue template. Let me know what else to include.