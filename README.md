````markdown
# MUJ ACM Student Chapter

This repository contains the frontend for the MUJ ACM Student Chapter website. The frontend is a Vite + React app with a Three.js animated background and theme system.

Note: The original backend has been removed from this repository. Contact form handling is implemented client-side using EmailJS. If you need server-side functionality, provide a separate backend and update the frontend's `VITE_API_BASE` accordingly.

## What's included

- `frontend/` — Vite + React application
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

### Frontend

```bash
cd frontend
npm install
npm run dev
```

This starts the Vite dev server at `http://localhost:5173`.

### Backend

This repository no longer contains a backend. Contact form handling and email delivery are performed client-side using EmailJS (configured via frontend environment variables). If you require server-side features, create a separate backend repository and set `VITE_API_BASE` in the frontend to point to your API.

## Build (production)

### Frontend

```bash
cd frontend
npm run build
npm run preview  # optional: preview the production build locally
```

## API Usage

### Contact Form

This project uses EmailJS for client-side contact form submissions. Configure the EmailJS keys in `frontend/.env` (see `frontend/.env.example`) and follow the EmailJS template variables expected by the contact form.

If you prefer a server-side API, create a separate backend service and set `VITE_API_BASE` in the frontend to your API URL.

If you'd like, I can also add a short CONTRIBUTING.md or an issue template. Let me know what else to include.
````

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