````markdown
# MUJ ACM Student Chapter

This repository contains the frontend and backend for the MUJ ACM Student Chapter website. The frontend is a Vite + React app with Three.js animated background and theme system. The backend handles contact forms, email notifications.

## What's included

- `frontend/` — Vite + React application
  - `src/components/ThreeGlobe.jsx` — Three.js animated globe, stars, rays, and small rockets/UFOs
  - `src/context/ThemeContext.jsx` — Theme provider with localStorage persistence
  - `src/components/ThemeSwitcher.jsx` — Light/Dark toggle button
  - `src/components/MobileMenu.jsx` — Mobile hamburger menu and slide-in nav panel
  - `index.html` — includes Sreda font import
  - `src/index.css` — global styles and light-theme overrides

- `backend/` — Express.js server with cron jobs
  - Contact form API with email notifications (Nodemailer)
  - Keep-alive cron job (every 10 minutes)
  - Health check endpoint for monitoring

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

```bash
cd backend
cp .env.example .env
# Edit .env with your email credentials
npm install
npm run dev
```

This starts the Express server at `http://localhost:5000`.

**Note:** For the backend, you'll need to set up Gmail app-specific password or configure another SMTP service in `.env`. See `backend/README.md` for detailed setup instructions.

## Build (production)

### Frontend

```bash
cd frontend
npm run build
npm run preview  # optional: preview the production build locally
```

### Backend

```bash
cd backend
npm start
```

---

## Backend Features

The backend provides:

- **Contact Form API** (`POST /api/contact`)
  - Receives form submissions and sends emails to admin inbox
  - Sends automatic confirmation email to user
  - Email validation and error handling

- **Keep-Alive Cron Job**
  - Pings `/health` endpoint every 10 minutes
  - Prevents server sleep on free hosting (Render, Railway, etc.)

- **Health Check** (`GET /health`)
  - Monitors server uptime and status

For detailed backend documentation, see `backend/README.md`.

## API Usage

### Contact Form

```javascript
// From frontend React component
const handleContactSubmit = async (formData) => {
  const response = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Inquiry',
      message: 'Hello...'
    })
  });
  const data = await response.json();
  console.log(data);
};
```

---

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