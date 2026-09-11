/**
 * Content types — the shape of everything the founders edit.
 *
 * These mirror the Sanity schemas in `studio/schemaTypes/`. The site reads this
 * shape through `src/lib/content.ts`, which returns live CMS data when Sanity is
 * configured and the baked-in `src/data/fallback.ts` copy otherwise.
 */

export interface PhotoContent {
  /** Uploaded image URL. When absent, the striped placeholder shows. */
  src?: string;
  alt?: string;
  /** Note shown before a real photo exists, e.g. "photo: Natalia". */
  placeholder?: string;
  caption?: string;
  /** Aspect ratio, e.g. "4 / 3" (rooms) or "3 / 4" (portraits). */
  ratio?: string;
}

export interface SiteSettings {
  tagline: string;
  addressLines: string[];
  /** Muted note under the address until it's confirmed. */
  addressNote?: string;
  /** Muted note under "Hours" until they're posted. */
  hoursNote?: string;
  /** Structured hours (used once posted; overrides hoursNote when present). */
  hoursLines?: string[];
  openingLine: string;
  /** "Now on the walls" current-art line. */
  nowOnWalls?: string;
  email: string;
  instagram: string;
  tiktok: string;
  /** When true, "/" shows the Coming-soon layout instead of the full Home. */
  preLaunch: boolean;
}

export interface HomePage {
  photo: PhotoContent;
  body: string[];
  signupTitle: string;
  signupNote: string;
}

export interface StoryPage {
  info: string[];
  body: string[];
  portraits: PhotoContent[];
  intoTitle: string;
  intoText: string;
}

export interface ContactPage {
  intro: string[];
  /** "About" topic chips. */
  topics: string[];
}

export interface MailingListPage {
  sidebarNotes: string[];
  intro: string;
  reachBy: string[];
  interests: string[];
  photo: PhotoContent;
  footerNote: string;
}

export interface MenuItem {
  section: string;
  name: string;
  description?: string;
  price?: string;
  seasonal?: boolean;
  order?: number;
}

export interface CafeEvent {
  title: string;
  /** ISO date string. */
  date: string;
  description?: string;
  photo?: PhotoContent;
}
