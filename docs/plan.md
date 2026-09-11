# Coffee Kidd Cafe — Website Build Plan

_Last updated: 2026-09-11_

This document plans how the Coffee Kidd Cafe website will be built from the finalized
mockups in [`ui-mockups/`](ui-mockups/) and the discovery notes in
[`docs/`](docs/Coffee_Kidd_Cafe_Business_Plan_V1.md).

The headline requirement: **Natalia and Zach must be able to change photos, the menu, hours,
events, and all page text themselves — with no technical background and without calling a
developer.** Everything below is organized around making that true while keeping the public
site as fast, quiet, and minimal as the mockups.

---

## 1. Goals & constraints

**What the site must do (V1, pre-opening):**
- Tell people who Coffee Kidd is, what they sell, where they are, and the hours.
- Launch *before* the cafe opens (a "coming soon" state), then flip to the full site.
- Collect emails/phone numbers for a mailing list (opening day + events).
- Offer a light contact path (the founders prefer in-person, so this is secondary).
- Link out to Instagram / TikTok.
- Show a menu page later ("Menu, soon") and an Events page.

**What the founders must be able to edit themselves:**
- Hours and opening date
- Street address (posted before opening)
- All page copy (Home, Story, Contact, Mailing list, Coming soon)
- Photos (room, Natalia, Zach, cup on the counter, etc.) — upload/replace/reorder
- Menu items (name, description, price, section, seasonal on/off)
- Events (title, date, description, photo)
- "Now on the walls" / current art
- Social links, contact email

**Design constraints (do not drift from these — see [`ui-mockups/README.md`](ui-mockups/README.md)):**
- Aesthetic 7a "Plain page — paper." Text-first, mostly blank page, one photo per page.
- Colors: paper `#f4f2ed`, ink `#1c1b1a`, muted `#77736c`, placeholder `#a5a19a`. No accent color.
- Type: `Grenze Gotisch` 400 for the wordmark only; `Shippori Mincho` 400 for everything else.
  No bold, no uppercase, no letterspacing. Hierarchy via color + whitespace.
- No buttons — every action is a text link with an arrow (`Sign up →`).
- Two-column desktop (`300px | 1fr`), single column below 760px.
- Pixel cat cursor from [`cat-cursor.js`](ui-mockups/cat-cursor.js) on every page.

---

## 2. How founders will edit the site (the core decision)

The founder's instinct — "a private endpoint only we can access that lets us edit" — is
exactly the right shape. The question is only *whether we build that editing screen from
scratch or use one that already exists.*

### Recommendation: a headless CMS (Sanity), not a hand-built admin panel

A headless CMS **is** that private, login-protected editing endpoint — already built, already
secure, with photo upload, image cropping, and undo history included. We'd be rebuilding all of
that (auth, sessions, an image uploader, a database, a form UI, validation) if we rolled our own,
and then *maintaining* it forever. For a two-person cafe, that maintenance is the trap.

| Approach | What the founders get | Effort / risk |
|---|---|---|
| **Headless CMS (Sanity)** — recommended | Log in at a private URL with their Google account, edit text in plain fields, drag-drop photos, add menu items and events. Changes go live in seconds. | Low ongoing. Free tier covers this easily. No servers to babysit. |
| Git-based CMS (Decap/TinaCMS) | Similar editing UI; content saved as files in this repo. | Low cost, but image uploads and previews are clunkier for non-technical users. |
| **Hand-built admin endpoint** (the original idea) | A custom `/admin` login + our own forms. | High. We build and forever maintain auth, uploads, storage, and security ourselves. Most likely to break or get neglected. |
| Full website builder (Squarespace/Wix) | Easiest editing of all. | Fights the mockups — hard to reproduce this exact minimal, custom design and the cat cursor. |

**Why Sanity specifically:** generous free tier, excellent image handling (they want to upload
lots of photos), a friendly editing app ("Sanity Studio"), Google login so the founders sign in
with `coffeekiddcafe@gmail.com`, and it pairs cleanly with a static site so the public pages stay
fast and match the mockups exactly.

### The editing experience, concretely
- Public site lives at **`coffeekiddcafe.com`**.
- Editing app lives at **`coffeekiddcafe.com/studio`** (or `studio.coffeekiddcafe.com`) — a private
  URL that only shows an editing screen after Google login. Only the founders' emails are allowed in.
- The founders open that URL, see friendly labeled fields ("Hours", "Address", "Menu", "Events",
  "Photos"), type or drag-drop, and hit Publish. The site rebuilds/updates automatically.

---

## 3. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Site framework | **Astro** | Ships mostly static HTML with almost no JS — matches these hand-tuned, inline-styled pages and the "quiet" aesthetic. Great built-in image optimization for founder-uploaded photos. |
| Content / editing | **Sanity** (headless CMS + Studio) | The private editing endpoint, already built. See §2. |
| Styling | Plain CSS from the design tokens | The mockups are inline styles; we lift them into a small shared stylesheet + per-page layout. No framework needed. |
| Forms (mailing list, contact) | **A form/email service** (e.g. Formspree, Buttondown, or a small serverless function) | Founders shouldn't manage a database of signups. See §7. |
| Hosting | **Netlify or Vercel** | Free tier, auto-deploy on content publish, custom domain + HTTPS included. |
| Domain | `coffeekiddcafe.com` (already owned) | Point DNS at the host. |
| Fonts | Google Fonts: Grenze Gotisch, Shippori Mincho | Already used in the mockups. |

> Note: the discovery doc mentions a `Stalemate` / androgynous-gothic font direction, but the
> finalized mockups settled on Grenze Gotisch + Shippori Mincho. We build to the mockups; the font
> is easy to revisit later since it's one CSS variable.

---

## 4. Content model (what lives in the CMS)

These are the editable "documents" the founders see in Studio. This is the heart of the
self-service requirement — every changing piece of the mockups maps to a field here.

- **Site settings** (single document)
  - Wordmark text, tagline ("A space for coffee, tea, matcha and company.")
  - Address + "address posted before opening" toggle
  - Hours (free text now; structured day/time later) + "hours posted before opening" toggle
  - Opening date / "opening late fall 2026" line
  - Contact email, Instagram URL, TikTok URL
  - **Pre-launch toggle**: switches the homepage between "Coming soon" and the full Home page
  - "Now on the walls" (current art) text

- **Pages** (one editable document per page: Home, Story, Contact, Mailing list)
  - Each has titled rich-text blocks matching the copy regions in the mockups
  - Each has its photo slot(s) with caption fields

- **Menu** (list of items)
  - Section (Coffee / Tea / Matcha / Baked goods / Art), name, description, price, seasonal toggle, sort order

- **Events** (list)
  - Title, date, description, photo, "past/upcoming" (auto by date)

- **Photos** are uploaded directly on the document that uses them (drag-drop), with a caption field
  and alt text.

All initial content is pre-filled from the mockups and the discovery doc so the founders start by
*editing*, not filling a blank page.

---

## 5. Pages to build (from the mockups)

| Route | Source mockup | Notes |
|---|---|---|
| `/` (Home) | [`index.html`](ui-mockups/index.html) / [`index.mobile.html`](ui-mockups/index.mobile.html) | Shows "Coming soon" content while the pre-launch toggle is on, full Home after. |
| `/story` | [`story.html`](ui-mockups/story.html) / [`story.mobile.html`](ui-mockups/story.mobile.html) | Founder bios + two portraits. |
| `/menu` | (not yet designed) | Built from the Menu content model; nav currently reads "Menu, soon" and stays muted until items exist. |
| `/events` | (nav link exists, page not designed) | List from Events content; design in the 7a style. |
| `/contact` | [`contact.html`](ui-mockups/contact.html) / [`contact.mobile.html`](ui-mockups/contact.mobile.html) | Contact form → email service. |
| `/mailing-list` | [`mailing-list.html`](ui-mockups/mailing-list.html) / [`mailing-list.mobile.html`](ui-mockups/mailing-list.mobile.html) | Signup form → mailing service. |
| Coming-soon state | [`coming-soon.html`](ui-mockups/coming-soon.html) / [`coming-soon.mobile.html`](ui-mockups/coming-soon.mobile.html) | Rendered by `/` when pre-launch toggle is on. |
| `/studio` | — | The private CMS editing app (§2). |

The mockups ship desktop + mobile as separate files for exactness. In production we build **one
responsive page per route** that collapses to the mobile layout below 760px, per the README.

---

## 6. Build steps

### Phase 0 — Setup (foundation)
1. Initialize an Astro project in this repo; wire up Netlify/Vercel with auto-deploy from `main`.
2. Create a Sanity project; add both founders' Google logins as editors.
3. Add the design tokens as CSS variables and load the two Google Fonts once, globally.
4. Port [`cat-cursor.js`](ui-mockups/cat-cursor.js) as a global script included on every page.

### Phase 1 — Shared layout & design system
5. Build a base layout: paper background, two-column grid (`300px | 1fr`), the left-column
   wordmark + info block + bottom-pinned nav, and the responsive collapse at 760px.
6. Build reusable pieces: the `|`-separated text nav (with current-page underline), the photo
   block (4:3 / 3:4, muted caption), the boxless form field, and the text-link "action" (`→`).
7. Verify pixel parity against the mockups on desktop and mobile before adding content.

### Phase 2 — Content model
8. Define the Sanity schemas from §4 (Site settings, Pages, Menu, Events).
9. Seed all documents with the exact copy from the mockups + discovery doc so founders edit, not
   author from scratch.
10. Wire the site to read from Sanity, with the mockup text as fallback.

### Phase 3 — Build the pages
11. **Home** (`/`) — reads Site settings + Home page content; honors the pre-launch toggle to show
    the Coming-soon layout or the full Home.
12. **Story** (`/story`) — bios + two portrait slots + "What we're into" block.
13. **Contact** (`/contact`) — copy + contact form wired to the email service (§7).
14. **Mailing list** (`/mailing-list`) — signup form wired to the mailing service (§7).
15. **Menu** (`/menu`) — render menu items grouped by section in the 7a style; keep the nav link
    muted as "Menu, soon" until at least one item is published.
16. **Events** (`/events`) — design in-style and render upcoming/past from the Events content.

### Phase 4 — Forms & integrations
17. Hook up mailing-list and contact submissions (email + text options), with a plain in-style
    success state ("You're on the list →"). See §7.
18. Add Instagram/TikTok links from Site settings.

### Phase 5 — Polish, launch, handoff
19. Accessibility & SEO pass: real alt text on founder photos, page titles/descriptions, favicon,
    social share preview, sitemap.
20. Performance pass: optimize uploaded images, confirm minimal JS, test on real phones.
21. Point `coffeekiddcafe.com` DNS at the host; enable HTTPS.
22. **Launch in pre-launch mode** (Coming-soon on `/`, mailing-list live).
23. Write the founder guide (§8) and walk Natalia & Zach through Studio live.
24. On opening day: founders flip the pre-launch toggle, publish hours + address + menu — no
    developer needed.

---

## 7. Forms & integrations

- **Mailing list**: signups (email and/or text, plus their interests) should flow into a tool the
  founders can actually send from — a lightweight newsletter/SMS service (e.g. Buttondown or
  Mailchimp for email; an SMS provider later for text). The founders manage subscribers there, not
  in code.
- **Contact form**: routes messages to `coffeekiddcafe@gmail.com` via a form service (e.g.
  Formspree) or a small serverless function — no database, no spam headaches. Includes the "About"
  topic chips (Just saying hi / Events / Art / I'm a local baker / Press) from the mockup.
- Both use the boxless field style and the text-link submit from the design system, with an
  in-style confirmation instead of a popup.

---

## 8. Founder handoff

Deliverables so the founders are self-sufficient after launch:
- A one-page **"How to update the website"** guide with screenshots: log in, change hours, add a
  menu item, upload a photo, add an event, flip pre-launch → open.
- A short screen-recorded walkthrough.
- Studio field labels written in plain language (no jargon).
- A checklist for opening day (address, hours, first menu items, first event).

---

## 9. Future roadmap (explicitly *not* V1)

From the discovery doc, build the foundation so these slot in later without a rebuild:
- Online ordering / pickup
- Event bookings & private events
- Gift cards, merchandise, packaged coffee
- Loyalty / rewards
- Job applications
- FAQ page
- Instagram/TikTok feed embeds

---

## 10. Rough timeline

| Phase | Est. |
|---|---|
| 0 Setup | ~0.5 week |
| 1 Layout & design system | ~1 week |
| 2 Content model + seed | ~0.5 week |
| 3 Pages | ~1–1.5 weeks |
| 4 Forms & integrations | ~0.5 week |
| 5 Polish, launch, handoff | ~0.5–1 week |

**~4–5 weeks** to a pre-launch site the founders fully control, with Menu and Events ready to fill
in as content firms up.

---

## Open questions for the founders
1. Confirm the editing tool (Sanity Studio) is acceptable, or do you prefer an all-in-one builder
   with less design control?
2. Which email/SMS service do you want to send the mailing list from?
3. Final Instagram/TikTok URLs, and confirm the contact inbox (`coffeekiddcafe@gmail.com`).
4. Any real photos yet, or launch with the placeholder/temporary imagery noted in the mockups?
5. Confirm the wordmark font (mockups use Grenze Gotisch; discovery mentioned a gothic/androgynous
   direction) before launch.
