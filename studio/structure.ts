import type { StructureResolver } from 'sanity/structure';

/**
 * Studio sidebar structure — presents the one-of-a-kind documents (site settings
 * and each page) as single editable items instead of lists, and keeps Menu and
 * Events as normal lists. Keeps the editing screen simple for the founders.
 */
const SINGLETONS: { type: string; title: string }[] = [
  { type: 'siteSettings', title: 'Site settings' },
  { type: 'homePage', title: 'Home page' },
  { type: 'storyPage', title: 'Story page' },
  { type: 'contactPage', title: 'Contact page' },
  { type: 'mailingListPage', title: 'Mailing list page' },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Coffee Kidd Cafe')
    .items([
      ...SINGLETONS.map(({ type, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      S.documentTypeListItem('menuItem').title('Menu items'),
      S.documentTypeListItem('event').title('Events'),
    ]);

/** Document types that should never be created more than once. */
export const singletonTypes = new Set(SINGLETONS.map((s) => s.type));
