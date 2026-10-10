# Coffee Kidd Cafe

Website for Coffee Kidd Cafe, a neighborhood cafe in McGinley Square, Jersey City. The site introduces the cafe and its founders, shares menus and events, and collects opening updates and contact inquiries.

Built with Astro, TypeScript, and custom CSS, with a separate Sanity Studio for editing content.

## Features

- Coming-soon homepage controlled by a pre-launch setting.
- Pages for the cafe story, menu, events, contact, and mailing list.
- Sanity-managed text, photos, hours, menu items, and events.
- Built-in content for running the site without a configured Sanity project.
- Contact and signup forms with configurable submission endpoints, a honeypot, and JavaScript confirmation messages.
- Responsive layouts, a pixel cat cursor, and branded icons.
- Canonical URLs, social preview metadata, and a generated sitemap.

## Run locally

Use Node.js 22 or later and npm.

```bash
git clone https://github.com/nxdx96/coffee-kidd-cafe.git
cd coffee-kidd-cafe
npm ci
cp .env.example .env
npm run dev
```

Open http://localhost:4321. On Windows, copy `.env.example` to `.env` using your file manager or `Copy-Item .env.example .env` in PowerShell.

Sanity and form configuration are optional for local development. Without a Sanity project ID, the site uses the content in `src/data/fallback.ts`. Forms remain inactive until their endpoints are configured.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate the static site in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run gen:assets` | Regenerate the favicon and social preview assets |

## Configuration

Set these values in the root `.env` file for local development and in your hosting provider's build environment for deployment.

| Variable | Purpose |
| --- | --- |
| `SANITY_PROJECT_ID` | Connect the public site to a Sanity project |
| `SANITY_DATASET` | Dataset name; defaults to `production` |
| `SANITY_API_VERSION` | Sanity API version; see `.env.example` |
| `PUBLIC_MAILING_ENDPOINT` | Submission URL for mailing-list signup forms |
| `PUBLIC_CONTACT_ENDPOINT` | Submission URL for contact inquiries |
| `PUBLIC_WEB3FORMS_KEY` | Public access key when using Web3Forms |

The forms can use Web3Forms, Formspree, or a compatible service. Submission handling and subscriber storage belong to that service; this repository does not include an application database.

Values prefixed with `PUBLIC_` are exposed to visitors. Do not put private credentials in them or commit your `.env` files.

## Content editing

The `studio/` directory contains a separate Sanity Studio with schemas for site settings, page content, photos, menu items, and events.

To configure the editing app:

1. Create a Sanity project with a `production` dataset.
2. Create `studio/.env` with:

   ```dotenv
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   ```

3. Install dependencies and run the Studio:

   ```bash
   cd studio
   npm ci
   npm run dev
   ```

4. Set the public site's `SANITY_PROJECT_ID` to the same project ID.

See [Studio instructions](studio/README.md) for seeding and deploying the editing app, and the [founder guide](docs/FOUNDER-GUIDE.md) for maintaining content.

**Content is fetched at build time.** Publishing changes in Sanity requires rebuilding and redeploying the public site. A Sanity webhook can trigger your host's build hook once configured.

## Deployment

The public site builds to static files and can be deployed to a static hosting provider.

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node.js version:** `22`

A Netlify configuration is included in `netlify.toml`. Add any Sanity and form variables to the host's build environment, then deploy.

The canonical site URL is configured as `https://coffeekiddcafe.com` in `astro.config.mjs`. Update it if the production domain changes.

See [setup and deployment](docs/SETUP.md) for the full configuration steps.

## Repository structure

| Path | Contents |
| --- | --- |
| `src/pages/` | Public website routes |
| `src/components/` | Shared layouts, navigation, images, and form components |
| `src/layouts/` | Shared HTML shell and metadata |
| `src/styles/` | Global styles and design tokens |
| `src/lib/` | Sanity client, content getters, and form configuration |
| `src/data/` | Default site content and supporting data |
| `src/types/` | Content type definitions |
| `public/` | Static assets and browser scripts |
| `studio/` | Sanity editing app and content schemas |
| `scripts/` | Brand asset generation |
| `ui-mockups/` | Reference designs, separate from the production build |
| `docs/` | Setup instructions, founder guide, and project planning |

## Project status

The repository includes the website, content schemas, and form integration code. Account setup, hosting configuration, real photos, and launch content should be verified before opening. Some built-in content is intended for the pre-launch site.

