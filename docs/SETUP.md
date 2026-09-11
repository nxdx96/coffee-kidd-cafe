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

## Forms (mailing list + contact)

The mailing-list, contact, and homepage signup forms are **built and wired**. They submit to a
form service you choose; until an endpoint is set they stay inert (no submit), so the design is
unchanged and nothing breaks.

1. Pick a service that accepts a POST of form fields and returns 2xx — e.g.
   [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com), or a newsletter tool's
   embed form ([Buttondown](https://buttondown.email), Mailchimp).
   - **Contact** → a form-to-email service (Formspree is simplest; delivers to
     `coffeekiddcafe@gmail.com`).
   - **Mailing list / signups** → the newsletter tool where the founders will actually send emails,
     or Formspree to start and export later.
2. Create each form there and copy its POST URL.
3. Set the endpoints (repo root `.env`, and the host's env settings for production):
   ```
   PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/your-id
   PUBLIC_MAILING_ENDPOINT=https://your-newsletter-or-formspree-url
   ```
4. Redeploy. With JavaScript, submitting shows an in-style confirmation without leaving the page;
   without JS it falls back to a normal POST.

Subscribers/messages live in the chosen service — the founders manage them there, no database here.

## Brand assets

The favicon and social-share image are generated from the pixel cat:
```bash
npm run gen:assets   # writes public/favicon.svg, favicon-32.png, apple-touch-icon.png, og.png
```
Re-run only if you change the design; the outputs are committed. A designer can later replace
`public/og.png` (1200×630) with a fully art-directed card.

## Go-live checklist

**Launch (before opening day)**
- [ ] Connect Netlify/Vercel to the repo; site builds from `main` (Deploy section above).
- [ ] Point `coffeekiddcafe.com` DNS at the host; confirm HTTPS.
- [ ] Create the Sanity project, `npm run seed`, deploy the Studio, set `SANITY_PROJECT_ID` on the
      host (Content editing section).
- [ ] Connect the mailing-list + contact form services; set `PUBLIC_MAILING_ENDPOINT` /
      `PUBLIC_CONTACT_ENDPOINT` (Forms section).
- [ ] Confirm Instagram/TikTok URLs and the contact email in **Site settings**.
- [ ] Leave **Pre-launch mode ON** — `/` shows Coming-soon; the mailing list still collects sign-ups.
- [ ] Test on a real phone; submit the signup once end-to-end.
- [ ] Hand the founders [`FOUNDER-GUIDE.md`](FOUNDER-GUIDE.md) and walk through the Studio.

**Opening day (founders, no developer)**
- [ ] Post the street address and hours in **Site settings**; clear the "posted before opening" notes.
- [ ] Add the first **Menu items** (nav flips "Menu, soon" → "Menu" automatically).
- [ ] Add any **Events**; set "Now on the walls".
- [ ] Replace placeholder photos with the real shoot (room, Natalia, Zach, a cup on the counter).
- [ ] **Turn OFF Pre-launch mode** → the full homepage goes live.

## Notes
- Secrets (Sanity token, form service keys) live in `.env` locally and in the host's environment
  variable settings — never commit them. `.gitignore` already excludes `.env`.
- `PUBLIC_`-prefixed vars (form endpoints) are visible in the page source by design — use a service
  where the POST URL is safe to expose (Formspree, Web3Forms, and newsletter embeds all are).
