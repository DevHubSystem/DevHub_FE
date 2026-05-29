# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

DevHub_FE is the frontend for "DevHub". The repository is currently a fresh Vite + React 19 scaffold — `src/App.jsx` is still the default Vite landing page. The intended architecture is encoded in the installed dependencies rather than in code yet, so most feature work starts from a clean slate.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Production build to dist/
npm run preview  # Serve the production build locally
npm run lint     # ESLint over the whole project (flat config in eslint.config.js)
```

There is no test runner configured yet — no `test` script, and no testing libraries in `package.json`. Add one (e.g. Vitest, which pairs with Vite) before writing tests.

## Stack & intended architecture

The project is JavaScript + JSX (not TypeScript), ESM (`"type": "module"`). Key dependencies that are installed but **not yet wired into the code** — wire them up as features are built:

- **@reduxjs/toolkit + react-redux** — global state. No store exists yet; create the store and `<Provider>` (typically wrapping `<App />` in `src/main.jsx`).
- **react-router-dom v7** — routing. No router is set up yet.
- **axios** — HTTP client for the DevHub backend API.
- **sonner** — toast notifications (needs a `<Toaster />` mounted near the root).
- **tailwindcss v4** via `@tailwindcss/vite** — styling. Note Tailwind v4 is configured through the Vite plugin and CSS `@import`, not a `tailwind.config.js`. The plugin is **not yet added** to `vite.config.js` (`plugins: [react()]` only) — add `@tailwindcss/vite` there and `@import "tailwindcss";` in CSS when enabling Tailwind.

## Entry points

- `src/main.jsx` — React root (`createRoot` + `StrictMode`). Providers (Redux, Router, Toaster) belong here.
- `src/App.jsx` — root component (currently template content, safe to replace).
- `index.html` — Vite HTML entry.
