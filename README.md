# 👋 Welcome to the Altitude Project

Hi and welcome aboard! This repo powers **Altitude**, a next-gen logistics and scheduling assistant for music tours — styled like an Apple-native app and built with elegance in mind.

## 🧰 Tech Stack

- **React 19 + Vite** — Modern frontend
- **Tailwind CSS** — Clean, iOS-inspired UI
- **Supabase** — Auth, real-time database, file storage
- **Vercel** — CI/CD and deployment
- **Framer Motion** — Smooth animations
- **Lucide Icons** — UI icons
- **qrcode.react** — For public tour sharing
- **html-to-image** — For social card export (coming soon)
- **OpenAI API** — (via Edge Function) for AI Assistant
- **Flight / Weather APIs** — Upcoming widgets

---

## 📁 Key Files

- `src/pages/Today.jsx` — Home screen with swipeable widgets
- `src/pages/Profile.jsx` — Settings, Tour Pass, AI Assistant
- `src/pages/EventDetails.jsx` — Per-event logistics
- `src/pages/BigCalendar.jsx` — Main calendar view
- `src/components/FlightWidget`, `WeatherWidget`, etc.
- `supabaseClient.js` — Supabase config
- `.env` — Make sure to get access separately (not in repo)

---

## 🛠 Getting Started

```bash
git clone https://github.com/jadenthompson/altitude.git
cd altitude
npm install
npm run dev
```

#### Optional:
```bash
cp .env.example .env
# Add Supabase + OpenAI keys
```

---

## 🔐 Deployment

- Auto-deploys from `main` to Vercel
- Uses `.npmrc` to handle React 19 + peer deps
- React Beautiful DnD conflict resolved with `legacy-peer-deps`

---

## ✅ To-Do

- Finish Tour Card generator (download/share)
- Polish AI Assistant UI + fallback handling
- Expand stats (cities visited, badges earned)
- Add Instagram Story export
- Refine dark mode icons and transitions
- Enable guest access or manager dashboards
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
