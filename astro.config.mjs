import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'http://situs-smk3-iso.lan',
  outDir: './dist',
  integrations: [
    sitemap({
      serialize(item) {
        // Ganti domain .lan ke domain produksi jika perlu, tetapi biarkan konsisten untuk sitemap local Nginx
        // Pastikan url berakhir dengan trailing slash '/' untuk konsistensi SEO
        if (!item.url.endsWith('/')) {
          item.url = item.url + '/';
        }
        return {
          ...item,
        };
      },
    }),
  ],
});
