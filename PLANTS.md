# PLANTS.md — Plan & Roadmap

## Phase 1: Riset Konten ✅ DONE
- [x] Analisis kemnaker.go.id (Angular SPA): menu, footer, struktur
- [x] Analisis BSN.go.id sitemap (minimal statis)
- [x] Identifikasi situs SMK3 Indonesia lain (mostly down)
- [x] Referensi ISO 45001 / ILO (Cloudflare blocked, pakai struktur standar)
- [x] **Output: KONTEN.md** — 34 halaman statis + sistem artikel dinamis, struktur menu, sitemap target

## Phase 2: Desain Aesthetic ✅ DONE
- [x] Tentukan palet warna textmode (dark bg, monospace, ANSI accents)
- [x] Buat 3 varian HTML untuk dievaluasi di `/home/aapanel/situs-smk3-iso/design-variants/`:
  - `v1-conservative.html` (Vercel dark style + safety green accent) ← **DIPILIH**
  - `v2-strong-fit.html` (Linear dark precision + safety green accent)
  - `v3-divergent.html` (xAI brutalist textmode/monospace + no shadows)
- [x] Review Workflow:
  1. Generate 3 file HTML varian
  2. Deploy ke `/www/wwwroot/situs-smk3-iso.lan/` via Nginx
  3. Buka browser lokal untuk perbandingan
  4. **Hasil: v1-conservative dipilih**
- [x] Light mode + toggle button (dynamic label, localStorage persist)
- [x] Terapkan v1-conservative ke `index.html` produksi
- [x] Mobile-responsive checklist (CSS clamp, grid auto-fit, 640px breakpoint)

## Phase 3: Build Astro
- [ ] `astro init` di project root
- [ ] Setup content collections (Astro v5: `src/content/`)
  - [ ] Collection: `pages` (34 halaman statis)
  - [ ] Collection: `articles` (dynamic, Markdown + frontmatter)
- [ ] Visual Assets:
  - Generator SVG otomatis (`scripts/generate-svg-assets.mjs`):
    - 1 SVG banner/diagram untuk setiap halaman & artikel
    - 1 SVG icon untuk setiap menu navigasi
    - Atribut SEO `alt="..."` kaya kata kunci di seluruh komponen `<img>` & Astro image components
- [ ] Config & Data Terpusat:
  - File `.env` & `.env.example` (`PUBLIC_COMPANY_NAME`, `PUBLIC_PHONE`, `PUBLIC_EMAIL`, `PUBLIC_ADDRESS`, `PUBLIC_WA_NUMBER`, `PUBLIC_SITE_NAME`)
  - File `src/data/site.ts` yang membaca `.env` dengan fallback default untuk dipakai di seluruh halaman, header, footer, kontak, & artikel
- [ ] Artikel Lokal SEO:
  - Artikel Utama: `/artikel/jasa-smk3-terdekat/` (dengan auto-detect HP/Mobile JS + CTA konsultasi)
  - Artikel Kota: `/artikel/jasa-smk3-{slug}/` (mis: Bandung, Jakarta Barat, Semarang) dengan tombol/link ke `/artikel/jasa-smk3-terdekat/`
- [ ] Buat 34 halaman statis dari KONTEN.md
- [ ] Sistem artikel: index, detail, kategori, tag, pagination
- [ ] Layout utama + navigasi keyboard-style
- [ ] Build & test locally

## Phase 4: Polish & Deploy
- [ ] SEO dasar (meta tags, Open Graph, JSON-LD Article)
- [ ] Accessibility checklist
- [ ] Form kontak (Vercel/Netlify Forms)
- [ ] Sitemap & Feed (pola `jualdolkenkayu`):
  - `@astrojs/sitemap` integration di `astro.config.mjs` (dengan `serialize` lastmod)
  - Post-build script `fix-sitemap-lastmod.mjs` untuk sisip `sitemap.xsl` & sync lastmod git
  - `public/sitemap.xsl` untuk tampilan XML sitemap rapi di browser
  - `src/pages/sitemap.astro` untuk sitemap HTML manusia
- [ ] RSS feed untuk artikel
- [ ] Deploy ke Vercel

## Success Criteria
- [ ] 34 halaman statis render benar
- [ ] Sistem artikel: index, detail, kategori, tag, pagination jalan
- [ ] Navigasi sidebar/keyboard berfungsi
- [ ] Mobile-friendly (640px breakpoint)
- [ ] Build tanpa error (`npm run build`)
- [ ] Lighthouse > 90 (Performance, Accessibility, SEO)
- [ ] Form kontak terkirim
- [ ] Sitemap.xml & RSS feed valid