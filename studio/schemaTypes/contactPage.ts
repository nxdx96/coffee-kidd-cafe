import { defineType, defineField } from 'sanity';

/** Contact page — the intro copy and the "About" topic chips. */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro paragraphs (one per row)',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
    }),
    defineField({
      name: 'topics',
      title: '“About” options (chips)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact page' }) },
});
