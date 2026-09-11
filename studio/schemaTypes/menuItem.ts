import { defineType, defineField } from 'sanity';

/**
 * Menu item — one drink or food item. Add these when the menu is ready; the nav
 * shows "Menu, soon" until the first item exists.
 */
export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: ['Coffee', 'Tea', 'Matcha', 'Baked goods', 'Art'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'price',
      title: 'Price (e.g. “5”)',
      type: 'string',
    }),
    defineField({
      name: 'seasonal',
      title: 'Seasonal',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Sort order (lower shows first)',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'section' },
  },
});
