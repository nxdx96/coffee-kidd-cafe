import { defineType, defineField } from 'sanity';

/**
 * Site settings — the details that show on every page: tagline, address, hours,
 * contact, socials, and the pre-launch switch. There is only one of these.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'contact', title: 'Contact & social' },
    { name: 'launch', title: 'Launch' },
  ],
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'basics',
      description: 'The one-line description under the wordmark.',
    }),
    defineField({
      name: 'addressLines',
      title: 'Address (one line per row)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'basics',
    }),
    defineField({
      name: 'addressNote',
      title: 'Address note (muted, e.g. “Address posted before opening”)',
      type: 'string',
      group: 'basics',
    }),
    defineField({
      name: 'hoursLines',
      title: 'Hours (one line per row — fill this in when you open)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'basics',
    }),
    defineField({
      name: 'hoursNote',
      title: 'Hours note (muted, shown until hours are posted)',
      type: 'string',
      group: 'basics',
    }),
    defineField({
      name: 'nowOnWalls',
      title: 'Now on the walls (current art)',
      type: 'string',
      group: 'basics',
    }),
    defineField({
      name: 'email',
      title: 'Contact email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'openingLine',
      title: 'Opening line (e.g. “Opening late fall 2026.”)',
      type: 'string',
      group: 'launch',
    }),
    defineField({
      name: 'preLaunch',
      title: 'Pre-launch mode',
      type: 'boolean',
      group: 'launch',
      description:
        'ON: the homepage shows the “Coming soon” page. Turn OFF on opening day to show the full site.',
      initialValue: true,
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
