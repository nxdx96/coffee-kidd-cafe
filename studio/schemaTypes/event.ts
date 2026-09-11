import { defineType, defineField } from 'sanity';

/** Event — an art show, food drive, or late night. Upcoming/past is by date. */
export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'MMMM D, YYYY' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'photo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date' },
  },
});
