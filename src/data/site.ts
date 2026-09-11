/**
 * Navigation structure.
 *
 * The nav's shape is static (defined here); the editable values it pairs with —
 * email, Instagram/TikTok URLs, etc. — come from the content layer
 * (`src/lib/content.ts` → Site settings in Sanity).
 */

export type NavKey = 'home' | 'story' | 'menu' | 'events' | 'mailing' | 'contact';

export interface NavItem {
  key: NavKey;
  label: string;
  href: string;
  /** Rendered as muted, non-link text (e.g. "Menu, soon" until items exist). */
  muted?: boolean;
}

/**
 * The primary nav. "Menu, soon" stays muted and unlinked until the founders
 * publish menu items (flip `muted` off in Phase 3/CMS).
 */
export const navItems: NavItem[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'story', label: 'Story', href: '/story' },
  { key: 'menu', label: 'Menu, soon', href: '/menu', muted: true },
  { key: 'events', label: 'Events', href: '/events' },
  { key: 'mailing', label: 'Mailing list', href: '/mailing-list' },
];
