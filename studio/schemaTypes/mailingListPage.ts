import { defineType, defineField } from 'sanity';

/** Mailing list page — copy, the reach-by/interest options, and a photo. */
export const mailingListPage = defineType({
  name: 'mailingListPage',
  title: 'Mailing list page',
  type: 'document',
  fields: [
    defineField({
      name: 'sidebarNotes',
      title: 'Left-column notes (one per row)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'reachBy',
      title: '“Reach me by” options',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'interests',
      title: '“Mostly here for” options',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'photo',
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer note',
      type: 'string',
    }),
  ],
  preview: { prepare: () => ({ title: 'Mailing list page' }) },
});
