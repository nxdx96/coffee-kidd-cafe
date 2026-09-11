import { defineType, defineField } from 'sanity';

/**
 * Photo — a reusable image with a caption. Used across pages and events.
 * Founders drag-drop an image; until they do, the site shows the placeholder note.
 */
export const photo = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Drag a photo here. Landscape for rooms, portrait for people.',
    }),
    defineField({
      name: 'alt',
      title: 'Photo description (for screen readers)',
      type: 'string',
      description: 'A short description of what’s in the photo. Helps people using screen readers.',
    }),
    defineField({
      name: 'caption',
      title: 'Caption (shown under the photo)',
      type: 'string',
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder note (shown until you add an image)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'caption', subtitle: 'placeholder', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({ title: title || 'Photo', subtitle, media }),
  },
});
