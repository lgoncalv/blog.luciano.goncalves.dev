// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const base = process.env.BASE_PATH
  ? (process.env.BASE_PATH.endsWith('/') ? process.env.BASE_PATH : process.env.BASE_PATH + '/')
  : '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.luciano.goncalves.dev',
  base,
  output: 'static',
  integrations: [sitemap()],
});
