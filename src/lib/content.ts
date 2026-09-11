/**
 * Content layer — the single source the pages read from.
 *
 * Each getter returns live Sanity data when the project is configured and the
 * document exists, otherwise the baked-in fallback copy. Live fields are merged
 * onto the fallback so a blank field in the CMS never wipes a page — the mockup
 * copy shows through until the founders replace it.
 *
 * GROQ note: photos project `image.asset->url` so we get a plain URL without an
 * extra image-builder dependency. Ratio is a layout concern and stays in fallback.
 */
import { sanityClient } from './sanity';
import * as fallback from '../data/fallback';
import type {
  SiteSettings,
  HomePage,
  StoryPage,
  ContactPage,
  MailingListPage,
  MenuItem,
  CafeEvent,
  PhotoContent,
} from '../types/content';

/** Shallow-merge live fields onto a fallback, dropping null/undefined from live. */
function merge<T extends object>(base: T, live: Partial<T> | null | undefined): T {
  if (!live) return base;
  const out = { ...base };
  for (const [k, v] of Object.entries(live)) {
    if (v !== null && v !== undefined) (out as Record<string, unknown>)[k] = v;
  }
  return out;
}

const photoProjection = `{ "src": image.asset->url, alt, caption, placeholder }`;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityClient) return fallback.siteSettings;
  const doc = await sanityClient.fetch<Partial<SiteSettings>>(
    `*[_type == "siteSettings"][0]{
      tagline, addressLines, addressNote, hoursNote, hoursLines,
      openingLine, nowOnWalls, email, instagram, tiktok, preLaunch
    }`,
  );
  return merge(fallback.siteSettings, doc);
}

export async function getHomePage(): Promise<HomePage> {
  if (!sanityClient) return fallback.homePage;
  const doc = await sanityClient.fetch<Partial<HomePage>>(
    `*[_type == "homePage"][0]{
      photo${photoProjection}, body, signupTitle, signupNote
    }`,
  );
  const merged = merge(fallback.homePage, doc);
  merged.photo = merge(fallback.homePage.photo, doc?.photo as Partial<PhotoContent>);
  return merged;
}

export async function getStoryPage(): Promise<StoryPage> {
  if (!sanityClient) return fallback.storyPage;
  const doc = await sanityClient.fetch<Partial<StoryPage>>(
    `*[_type == "storyPage"][0]{
      info, body, intoTitle, intoText,
      portraits[]${photoProjection}
    }`,
  );
  const merged = merge(fallback.storyPage, doc);
  // Keep fallback ratios/captions for any portrait slot the CMS hasn't filled.
  merged.portraits = (doc?.portraits?.length ? doc.portraits : fallback.storyPage.portraits).map(
    (p, i) => merge(fallback.storyPage.portraits[i] ?? {}, p),
  );
  return merged;
}

export async function getContactPage(): Promise<ContactPage> {
  if (!sanityClient) return fallback.contactPage;
  const doc = await sanityClient.fetch<Partial<ContactPage>>(
    `*[_type == "contactPage"][0]{ intro, topics }`,
  );
  return merge(fallback.contactPage, doc);
}

export async function getMailingListPage(): Promise<MailingListPage> {
  if (!sanityClient) return fallback.mailingListPage;
  const doc = await sanityClient.fetch<Partial<MailingListPage>>(
    `*[_type == "mailingListPage"][0]{
      sidebarNotes, intro, reachBy, interests, footerNote,
      photo${photoProjection}
    }`,
  );
  const merged = merge(fallback.mailingListPage, doc);
  merged.photo = merge(fallback.mailingListPage.photo, doc?.photo as Partial<PhotoContent>);
  return merged;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  if (!sanityClient) return fallback.menuItems;
  const items = await sanityClient.fetch<MenuItem[]>(
    `*[_type == "menuItem"] | order(order asc, name asc){
      section, name, description, price, seasonal, order
    }`,
  );
  return items ?? fallback.menuItems;
}

export async function getEvents(): Promise<CafeEvent[]> {
  if (!sanityClient) return fallback.events;
  const items = await sanityClient.fetch<CafeEvent[]>(
    `*[_type == "event"] | order(date desc){
      title, date, description, photo${photoProjection}
    }`,
  );
  return items ?? fallback.events;
}
