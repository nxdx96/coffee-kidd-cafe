import { defineType, defineField } from 'sanity';

/** Story page — the founders' story, two portraits, and "What we're into". */
export const storyPage = defineType({
  name: 'storyPage',
  title: 'Story page',
  type: 'document',
  fields: [
    defineField({
      name: 'info',
      title: 'Left-column lines (names, city, three words)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Story paragraphs (one per row)',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
    }),
    defineField({
      name: 'portraits',
      title: 'Portraits (Natalia, Zach)',
      type: 'array',
      of: [{ type: 'photo' }],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: 'intoTitle',
      title: '“What we’re into” heading',
      type: 'string',
    }),
    defineField({
      name: 'intoText',
      title: '“What we’re into” text',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: { prepare: () => ({ title: 'Story page' }) },
});
