/**
 * Fallback content — the mockup/discovery copy, baked in.
 *
 * The site renders this whenever Sanity isn't configured (no env vars) or a
 * document hasn't been created yet, so the pages always look right. Once the
 * founders publish in Studio, live content takes over (see src/lib/content.ts).
 *
 * Keep this in sync with studio/seed.ndjson — both start from the same copy.
 */
import type {
  SiteSettings,
  HomePage,
  StoryPage,
  ContactPage,
  MailingListPage,
  MenuItem,
  CafeEvent,
} from '../types/content';

export const siteSettings: SiteSettings = {
  tagline: 'A space for coffee, tea, matcha and company.',
  addressLines: ['McGinley Square', 'Jersey City, NJ'],
  addressNote: 'Address posted before opening',
  hoursNote: 'Posted before opening. Opening late fall 2026.',
  openingLine: 'Opening late fall 2026.',
  nowOnWalls: 'to be announced',
  email: 'coffeekiddcafe@gmail.com',
  instagram: 'https://instagram.com/',
  tiktok: 'https://tiktok.com/',
  // Launch in pre-launch mode: "/" shows Coming-soon until the founders flip
  // this off in Site settings on opening day. Matches studio/seed.ndjson.
  preLaunch: true,
};

export const homePage: HomePage = {
  photo: {
    ratio: '4 / 3',
    placeholder: 'photo: the room, daylight, one table',
    caption: 'The room, before we moved in.',
  },
  body: [
    'Coffee Kidd was born from the friendship of two inseparable best friends, Natalia Amaya and Zachary Kidd, who spent the past three years working side by side and dreaming up something of their own. Natalia, a lifelong Jersey City resident, and Zach, who dropped into Jersey City all the way from Idaho, bring a combined 20 years of hospitality experience to the shop.',
    'A warm, welcoming neighborhood space centered around great coffee, genuine connection, and community. A place to meet, create, and unwind. Art shows, food drives, local bakers, the occasional late night.',
  ],
  signupTitle: 'Hear about opening day first',
  signupNote: 'Email or text. Openings and events only.',
};

export const storyPage: StoryPage = {
  identity: ['Natalia Amaya', 'Zachary Kidd', 'Jersey City, NJ'],
  words: 'Inclusive. Eclectic. Curated.',
  body: [
    "Coffee Kidd was born from the friendship of two inseparable best friends, Natalia Amaya and Zachary Kidd, who spent the past three years working side by side and dreaming up something of their own. Natalia, a lifelong Jersey City resident, and Zach, who dropped into Jersey City all the way from Idaho, bring a combined 20 years of hospitality experience to the shop. Zach as an experienced barista and Natalia as a seasoned server.",
    'After years of working in hospitality, they knew exactly what they wanted to create: a warm, welcoming neighborhood space centered around great coffee, genuine connection, and community. Coffee Kidd is their take on the perfect third space, a place to meet, create, and unwind.',
    "The name is Zach's last name. It doesn't mean anyone owns it more than the other. Natalia rings you up, Zach makes the drink.",
  ],
  portraits: [
    {
      ratio: '3 / 4',
      placeholder: 'photo: Natalia',
      caption:
        'Natalia. Ten years serving and bartending in Jersey City and NYC. Grew up around McGinley Square.',
    },
    {
      ratio: '3 / 4',
      placeholder: 'photo: Zach',
      caption: 'Zach. Ten years behind bars and espresso machines, eight of them as a barista. By way of Idaho.',
    },
  ],
  intoTitle: "What we're into",
  intoText:
    "The knowledge of a serious coffee bar. Rooms that are airy and open, with music that's a little funky. Large communal tables. Coffee that's allowed to be experimental. Baked goods from local bakers. Art from the neighborhood, for sale.",
};

export const contactPage: ContactPage = {
  intro: [
    "Honestly, the best way to reach us is to come in. We'd rather talk over a coffee.",
    "If it can't wait, or we're not open yet, leave a note below. We read everything and reply when we're not on bar. Private events, artist submissions and hiring aren't open yet; the mailing list will say when they are.",
  ],
  topics: ['Just saying hi', 'Events', 'Art', "I'm a local baker", 'Press'],
};

export const mailingListPage: MailingListPage = {
  sidebarNotes: [
    "Opening day. Art shows. Late nights. That's it, that's the list.",
    'Never more than a couple a month. Unsubscribe any time.',
  ],
  intro:
    "One note when the doors open. Then only when something's actually happening: a new show on the walls, a food drive, a late night.",
  reachBy: ['Email', 'Text', 'Both'],
  interests: ['Opening day', 'Art shows', 'Events & late nights', 'Food drives'],
  photo: { ratio: '4 / 3', placeholder: 'photo: a cup on the counter' },
  footerNote: "We won't sell your info, we're a cafe.",
};

/** Empty until the founders add items — nav keeps "Menu, soon" muted meanwhile. */
export const menuItems: MenuItem[] = [];

/** Empty until the founders add events. */
export const events: CafeEvent[] = [];
