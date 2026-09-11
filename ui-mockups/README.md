# Coffee Kidd Cafe — website handoff

Finalized direction: **7a "Plain page — paper"** (mockups 7a, 8a–8d in `Coffee Kidd Cafe.dc.html`).
Minimalist, text-first, in the spirit of 27 Cafe / Sey / Gem Home: mostly blank page, small type, plain text links, address and hours first, one photo per page.

## Files

| Page | Desktop | Mobile |
|---|---|---|
| Home | `index.html` | `index.mobile.html` |
| Story | `story.html` | `story.mobile.html` |
| Contact | `contact.html` | `contact.mobile.html` |
| Mailing list | `mailing-list.html` | `mailing-list.mobile.html` |
| Coming soon (pre-launch home) | `coming-soon.html` | `coming-soon.mobile.html` |

`cat-cursor.js` — the pixel cat cursor; include with `<script src="cat-cursor.js" defer>` on every page.

Each HTML file is a static, inline-styled reference. Desktop and mobile are separate files here so the mockup is exact; in production build one responsive page per route (breakpoint suggestion below).

## Design tokens

Colors
- Paper (page background): `#f4f2ed`
- Ink (text, rules, active link underline): `#1c1b1a`
- Muted (secondary text, captions, footer): `#77736c`
- Placeholder text in fields: `#a5a19a`
- Photo placeholder stripes: `#e6e3dc` / `#dedbd3` (replace with real photos)
- No accent color. Link hover: ink → muted.

Type (Google Fonts)
- Wordmark: `Grenze Gotisch` 400 — 26px desktop, 24px mobile, line-height 1. The only gothic element.
- Everything else: `Shippori Mincho` 400 — 15px, line-height 1.7. Captions and footer 13px.
- No bold, no uppercase, no letterspacing. Hierarchy is done with color (ink vs muted) and whitespace only.

Spacing
- Desktop page: padding 36px 40px; two columns `300px | 1fr`, gap 60px; min-height 1100px so the nav sits at the bottom of the left column.
- Left column: wordmark, then page info paragraphs (22px apart); text nav pinned to the bottom (`justify-content:space-between`).
- Right column: content blocks 40px apart; prose max-width 560px; photo grid max-width 760px; footer line pushed to bottom with `margin-top:auto`.
- Mobile page: padding 28px 22px 32px, single column, blocks 18–26px apart, nav at the end.
- Suggested breakpoint: collapse to the mobile layout below 760px.

Elements
- Nav: text links separated by `|` (8px gaps). Current page gets `border-bottom:1px solid #1c1b1a`. "Menu, soon" is muted and not a link.
- Photos: 4:3 for room shots, 3:4 for portraits, no radius, no border; caption 13px muted, 8px below.
- Form fields: no boxes. Label 13px muted, then a 1px ink bottom rule with 8px padding; placeholder text in `#a5a19a`. Submit is a plain text link with an arrow (`Sign up →`, `Send →`, `Keep me in the loop →`).
- Choice groups (contact topic, reach-me-by, interests): rendered as the same `|`-separated text links; selected one is underlined.
- Buttons: none. Every action is a text link.

## Cat cursor
`cat-cursor.js` draws a 14×14-cell pixel cat on a canvas at 2px per cell (28px), cream outline so it reads on any ground, and sets it as the page cursor. It cycles idle frames (sit / blink / tail flick) every 450ms and swaps to a pounce pose over `a`, `button`, `[role=button]`, `input[type=submit]`. Hotspot is 4,4. If you'd rather not swap cursors at runtime, export the three frames as `.png`/`.cur` and use `cursor: url(cat.png) 4 4, auto`.

## Content still to come (from the discovery doc)
- Street address, hours, opening date confirmation
- Real photos: room, Natalia, Zach, a cup on the counter
- Menu page (link is present as "Menu, soon")
- Events page (nav link exists; page not designed yet)
- Instagram / TikTok URLs
- Founders should be able to edit hours, copy, events, and photos without a developer — keep all copy in a CMS or a single content file.

## Pages and copy
All body copy is taken from the discovery questionnaire verbatim where it existed; short connective lines ("A space for coffee, tea, matcha and company.", "Honestly, the best way to reach us is to come in.") are drafts the founders can edit.
