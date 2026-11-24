import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://emmanuelplougoulm.github.io',
  // Anglais à la racine, français sous /fr/ (voir src/i18n).
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
});
