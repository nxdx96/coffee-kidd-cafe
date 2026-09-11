// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://coffeekiddcafe.com',
  // Static output — the public site is fast, quiet HTML that matches the mockups.
  // (When Sanity + forms land, we can switch specific routes to on-demand rendering.)
  output: 'static',
});
