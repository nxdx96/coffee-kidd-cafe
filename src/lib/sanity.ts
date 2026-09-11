/**
 * Sanity client — created only when the project is configured via env vars.
 *
 * Until the founders' project exists (see SETUP.md), this is `null` and the site
 * runs entirely on the baked-in fallback copy, so builds never break.
 *
 * Env (in .env locally / host env settings — never committed):
 *   SANITY_PROJECT_ID   required to go live
 *   SANITY_DATASET      defaults to "production"
 *   SANITY_API_VERSION  defaults to a pinned date
 */
import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.SANITY_DATASET as string | undefined) ?? 'production';
const apiVersion = (import.meta.env.SANITY_API_VERSION as string | undefined) ?? '2024-06-01';

export const isSanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
