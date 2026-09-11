import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { structure, singletonTypes } from './structure';

/**
 * Sanity Studio — the founders' private editing app.
 *
 * Set SANITY_STUDIO_PROJECT_ID (from sanity.io, see ../SETUP.md) in studio/.env
 * before running `npm run dev` / `npm run deploy`.
 */
export default defineConfig({
  name: 'coffee-kidd-cafe',
  title: 'Coffee Kidd Cafe',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
    // Hide the "create new" action for one-of-a-kind documents.
    templates: (templates) => templates.filter((t) => !singletonTypes.has(t.schemaType)),
  },

  document: {
    // Remove delete/duplicate actions on singletons so they can't be removed.
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter((a) => !['unpublish', 'delete', 'duplicate'].includes(a.action ?? ''))
        : actions,
  },
});
