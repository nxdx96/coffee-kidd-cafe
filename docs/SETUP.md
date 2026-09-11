# Setup & deployment

How to run the site locally and finish the account-based setup from Phase 0 of
[`plan.md`](plan.md). The code foundation is already in the repo; the steps below
need logins, so they're documented for a human to click through once.

## Run locally

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static site to dist/
npm run preview   # serve the built dist/ locally
```

Requires Node 22+ (this repo was set up on Node 22 / npm 11).

## Project layout

```
src/
  layouts/BaseLayout.astro   # shared HTML shell: fonts, tokens, cat cursor
  pages/                     # one file per route (index.astro = "/")
  styles/global.css          # design tokens from ui-mockups/README.md
public/
  cat-cursor.js              # pixel cat cursor, served at /cat-cursor.js
astro.config.mjs             # site config (static output)
netlify.toml                 # deploy config
ui-mockups/                  # reference mockups (not part of the build)
docs/                        # discovery notes
```

## Deploy (Netlify) — one-time, needs a login

1. Push this repo to GitHub (already on `main`).
2. Log in at https://netlify.com → **Add new site → Import an existing project** → pick this repo.
3. Netlify reads `netlify.toml` automatically: build `npm run build`, publish `dist`. Confirm and deploy.
4. **Custom domain:** Site settings → Domain management → add `coffeekiddcafe.com`, then point the
   domain's DNS at Netlify (they show the exact records). HTTPS is automatic.
5. After this, every push to `main` redeploys the site.

> Vercel works the same way if preferred (Import project → framework auto-detected as Astro →
> deploy). Only one host is needed.

## Content editing (Sanity) — set up in Phase 2, account created now

The founders' editing tool. Creating the project needs a login, so do this once:

1. Log in at https://sanity.io with the `coffeekiddcafe@gmail.com` Google account.
2. Create a new project named **Coffee Kidd Cafe**; note the **Project ID** and dataset (`production`).
3. In **Members**, invite both founders (Natalia + Zach) as editors with their Google logins.
4. Hand the Project ID to the developer — it goes in a `.env` file (never committed) and wires the
   site to the CMS in Phase 2. The editing app ("Studio") is then published to
   `coffeekiddcafe.com/studio`.

Until Phase 2, the site reads the copy already baked into the mockups, so nothing is blocked.

## Notes
- Secrets (Sanity token, form service keys) live in `.env` locally and in the host's environment
  variable settings — never commit them. `.gitignore` already excludes `.env`.
