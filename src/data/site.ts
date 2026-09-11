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
}

/**
 * The primary nav. The Menu item is special-cased in Nav.astro: it shows as a
 * muted, unlinked "Menu, soon" until the founders publish menu items, then
 * becomes a normal "Menu" link.
 */
export const navItems: NavItem[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'story', label: 'Story', href: '/story' },
  { key: 'menu', label: 'Menu', href: '/menu' },
  { key: 'events', label: 'Events', href: '/events' },
  { key: 'mailing', label: 'Mailing list', href: '/mailing-list' },
];
