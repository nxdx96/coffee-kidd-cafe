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

## Content editing (Sanity)

The editing app and content model are **built** (in [`studio/`](../studio/), plus the site's
content layer in `src/lib/`). What's left needs a login, so do it once:

1. Log in at https://sanity.io with the `coffeekiddcafe@gmail.com` Google account.
2. Create a project named **Coffee Kidd Cafe**; note the **Project ID** (dataset `production`).
3. In **Members**, invite both founders (Natalia + Zach) as editors.
4. Follow [`studio/README.md`](../studio/README.md) to seed the starting copy and deploy the Studio
   (`npm run seed`, `npm run deploy`).
5. Point the **site** at the project: copy `.env.example` → `.env` in the repo root and set
   `SANITY_PROJECT_ID`, then redeploy.

Until step 5 is done, the site renders the built-in fallback copy (identical to the mockups), so
nothing is blocked — the CMS just isn't the source yet.

### How the content layer works
- `src/data/fallback.ts` — the mockup copy, baked in.
- `src/lib/sanity.ts` — creates the client only when `SANITY_PROJECT_ID` is set (else `null`).
- `src/lib/content.ts` — getters that return live Sanity data when available, merged over the
  fallback so a blank CMS field never blanks a page. Pages import only from here.

## Notes
- Secrets (Sanity token, form service keys) live in `.env` locally and in the host's environment
  variable settings — never commit them. `.gitignore` already excludes `.env`.
