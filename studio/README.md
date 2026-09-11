# Coffee Kidd Cafe — Studio (the editing app)

This is the private app Natalia & Zach use to edit the website: text, photos,
hours, menu, and events. It's a [Sanity](https://www.sanity.io) Studio. The public
site (in the repo root) reads whatever is published here.

## First-time setup (needs a login, do once)

1. Create the project at https://sanity.io signed in with `coffeekiddcafe@gmail.com`
   (see the repo root [`SETUP.md`](../SETUP.md)). Note the **Project ID**.
2. Create `studio/.env` with:
   ```
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   ```
3. Install and seed the starting content (the mockup copy):
   ```bash
   cd studio
   npm install
   npm run seed      # imports seed.ndjson into the "production" dataset
   ```

## Run / deploy

```bash
npm run dev       # edit locally at http://localhost:3333
npm run deploy    # publish the editing app to <your-project>.sanity.studio
```

`npm run deploy` gives the founders a hosted URL to log into (with their Google
accounts) — no local setup needed after that. Optionally map it to
`studio.coffeekiddcafe.com`.

## Wiring the public site

The site reads from the same project. In the repo root, add to `.env`:
```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
```
Then redeploy the site. Until that's set, the site runs on the built-in fallback
copy (identical text), so nothing breaks.

## What's editable
- **Site settings** — tagline, address, hours, contact, socials, pre-launch switch
- **Home / Story / Contact / Mailing list pages** — copy + photos
- **Menu items** — added when the menu is ready (nav shows "Menu, soon" until then)
- **Events** — art shows, food drives, late nights
