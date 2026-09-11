/**
 * Site-wide constants and navigation.
 *
 * Phase 1 placeholder: these values are hard-coded from the mockups today. In
 * Phase 2 they move into Sanity (Site settings) so the founders edit them
 * themselves — the shape here mirrors the planned content model.
 */

export const site = {
  email: 'coffeekiddcafe@gmail.com',
  instagram: 'https://instagram.com/',
  tiktok: 'https://tiktok.com/',
  copyright: '© 2026',
} as const;

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
