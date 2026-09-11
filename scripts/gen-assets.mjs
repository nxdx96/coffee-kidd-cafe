// Generate brand assets from the pixel cat: favicon (SVG + PNG fallbacks) and a
// social-share OG image. Run with `npm run gen:assets` (uses sharp, bundled by
// Astro). Commit the outputs in public/ — this doesn't run during the site build.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFileSync } from 'node:fs';

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// Design tokens (from ui-mockups/README.md + cat-cursor.js)
const PAPER = '#f4f2ed';
const INK = '#1c1b1a';
const MUTED = '#77736c';
const CAT_INK = '#1a1518';
const CAT_EYE = '#a3f28f';

// Pixel cat — the "sit" frame (12×12 grid). '#' ink, 'G' eye, '.' empty.
const CAT = [
  '..#......#..',
  '..##....##..',
  '..########..',
  '..#G####G#..',
  '..########..',
  '...######...',
  '...######...',
  '..########.#',
  '..########.#',
  '..#########.',
  '..##..##....',
  '............',
];

/** SVG <rect> markup for the cat, cells of size `s` at origin (ox, oy). */
function catRects(s, ox, oy) {
  let out = '';
  CAT.forEach((row, r) => {
    [...row].forEach((ch, c) => {
      if (ch === '.') return;
      const fill = ch === 'G' ? CAT_EYE : CAT_INK;
      out += `<rect x="${ox + c * s}" y="${oy + r * s}" width="${s}" height="${s}" fill="${fill}"/>`;
    });
  });
  return out;
}

// --- Favicon: cat on paper, 48×48 viewBox ---
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
<rect width="48" height="48" fill="${PAPER}"/>
${catRects(3, 6, 6)}
</svg>`;
writeFileSync(join(publicDir, 'favicon.svg'), faviconSvg);

// --- OG / social card: 1200×630 ---
const catBig = catRects(20, 120, 96);
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${PAPER}"/>
${catBig}
<text x="120" y="470" font-family="Georgia, 'Times New Roman', serif" font-size="88" fill="${INK}">Coffee Kidd Cafe</text>
<text x="120" y="524" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="${MUTED}">A space for coffee, tea, matcha and company.</text>
<text x="120" y="566" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="${MUTED}">McGinley Square · Jersey City · Opening late fall 2026</text>
</svg>`;

const jobs = [
  sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(join(publicDir, 'favicon-32.png')),
  sharp(Buffer.from(faviconSvg))
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png')),
  sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, 'og.png')),
];

await Promise.all(jobs);
console.log('Generated: favicon.svg, favicon-32.png, apple-touch-icon.png, og.png');
