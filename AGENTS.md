# AGENTS.md

## Project overview

- This is a static Astro site for PT Konsultan K3 Utama.
- The site uses Astro 7, TypeScript, content collections, and global CSS in `src/layouts/BaseLayout.astro`.
- The configured site URL is `http://situs-smk3-iso.lan` in `astro.config.mjs`.
- The production output is static and is generated in `dist/`.
- Node.js must satisfy the version in `package.json` (`>=22.12.0`).

## Development

Use the project-local Astro executable. When starting the development server, use background mode:

```bash
./node_modules/.bin/astro dev --background
```

Manage it with:

```bash
./node_modules/.bin/astro dev status
./node_modules/.bin/astro dev logs
./node_modules/.bin/astro dev stop
```

If the project dependencies are installed and the executable is on `PATH`, `astro dev --background` is also acceptable.

## Verification

Run the full static build before handing off changes:

```bash
npm run build
```

The build runs `astro build` and then `scripts/fix-sitemap-lastmod.mjs`. A successful build must complete without errors and must regenerate the sitemap output.

Use `git diff --check` before committing. Do not commit generated `dist/` or `.astro/` changes unless the task explicitly requires them.

## Site structure

- Shared document shell, navigation, footer, theme toggle, and global structured data: `src/layouts/BaseLayout.astro`
- Article shell: `src/layouts/ArticleLayout.astro`
- Main routes: `src/pages/index.astro`, `layanan/`, `artikel/`, `tentang/`, and `sitemap/`
- Service detail routes live under `layanan/` (`layanan/smk3/`, `layanan/iso-45001/`, and `layanan/audit-internal/`). Reference pages live under `artikel/` (`artikel/smk3/` and `artikel/iso-45001/`). Do not recreate root-level `/smk3/` or `/iso-45001/` routes.
- Reusable UI: `src/components/`
- Site/business data and environment defaults: `src/data/site.ts`
- Article and page content: `src/content/`
- City landing-page data: `src/data/cities.ts` and `src/data/jasa-smk3/`

## Navigation and responsive behavior

- The desktop navigation is `.desktop-nav`.
- The mobile menu is a direct child of `<body>` and uses a viewport-level fixed layer.
- `.site-header` must remain above the mobile menu so the hamburger button remains usable.
- Do not restore a broad `header` selector: page hero elements also use the `<header>` element.
- Preserve the mobile menu behavior: `aria-expanded`, Escape-to-close, link-to-close, outside-click close, resize cleanup, and body scroll locking.
- Test menu behavior at both desktop and mobile viewport widths whenever navigation or global layout CSS changes.

## Structured data and SEO

- `BaseLayout.astro` emits global JSON-LD for the site organization and website, plus breadcrumbs when provided by a page.
- The organization is also represented as `LocalBusiness` and must include a crawlable absolute `image`/`logo` URL.
- The organization logo is `public/assets/images/organization-logo.svg`; keep references to it rooted at `/assets/images/organization-logo.svg`.
- Organization address fields are maintained in `src/data/site.ts`, including `addressLocality`, `addressRegion`, and `postalCode`.
- `FAQ.astro` emits `FAQPage` JSON-LD only when it receives non-empty FAQ items. Keep every marked-up question and answer visible in the page content.
- Article images used in JSON-LD must resolve to absolute URLs from `Astro.site`/`Astro.url`.
- After schema changes, inspect the generated HTML in `dist/` and verify the expected `@type`, required properties, and absolute image URLs.

## Content and components

- Use `Card.astro` for article/service-style repeated cards.
- Use `FAQ.astro` for visible question-and-answer sections.
- Use `WhyChooseUs.astro` for the “Mengapa Memilih Kami?” numbered value proposition. It is currently used on the homepage; add it to service-focused pages only when the content will not be repetitive.
- Keep Indonesian copy, accessible headings, meaningful image `alt` text, and semantic landmarks.
- Every service, menu item that represents a destination, page, and content entry must have its own contextual image asset; do not reuse one generic image across different services or articles.
- Keep service and content imagery in SVG format unless there is an explicit requirement for another format. Each image must have an `alt` attribute that names the subject and context specifically (for example, `Pendampingan sistem manajemen mutu ISO 9001:2015`), never a generic label such as `icon ISO`.
- When adding a service or content entry, add its dedicated SVG asset, reference it in the data/frontmatter and structured data, and verify the generated asset URL exists in `dist/`.

## SVG Image Guidelines

- All SVG files in `public/assets/images/` must be valid XML.
- **Never use unescaped `&` characters** in SVG text content — they cause `xmlParseEntityRef: no name` errors.
- Replace `&` with `dan` (Indonesian for "and") in all text labels, or escape as `&` if the literal character is required.
- Example: `<text>Area Muat & CCTV</text>` → `<text>Area Muat dan CCTV</text>` or `<text>Area Muat & CCTV</text>`
- After adding/modifying SVG files, verify with `npm run build` — the build will fail if XML is invalid.
- All 55 article images must have unique SVG assets; no duplicate images across articles.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
