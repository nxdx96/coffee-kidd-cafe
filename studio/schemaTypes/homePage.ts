import { defineType, defineField } from 'sanity';

/** Home page — the photo, the intro paragraphs, and the signup labels. */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'photo',
    }),
    defineField({
      name: 'body',
      title: 'Intro paragraphs (one per row)',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
    }),
    defineField({
      name: 'signupTitle',
      title: 'Signup heading',
      type: 'string',
    }),
    defineField({
      name: 'signupNote',
      title: 'Signup note (muted, under the field)',
      type: 'string',
    }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
});
