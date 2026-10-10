import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

const FILE = 'dist/sitemap-0.xml';
const FILE_INDEX = 'dist/sitemap-index.xml';
// XSLT stylesheet removed - deprecated in browsers

// Load service lastmod data
const serviceLastmodPath = 'src/data/service-lastmod.json';
const serviceLastmod = existsSync(serviceLastmodPath) 
  ? JSON.parse(readFileSync(serviceLastmodPath, 'utf8')) 
  : {};

// Load article dates from frontmatter
const articlesDir = 'src/content/articles';
const articleDates = {};
if (existsSync(articlesDir)) {
  const articleFiles = readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  for (const file of articleFiles) {
    const content = readFileSync(path.join(articlesDir, file), 'utf8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const fm = frontmatterMatch[1];
      const slug = file.replace('.md', '');
      const dateMatch = fm.match(/date:\s*"([^"]*)"/);
      const lastmodMatch = fm.match(/lastmod:\s*"([^"]*)"/);
      const serviceSlugsMatch = fm.match(/serviceSlugs:\s*\[([^\]]*)\]/);
      let serviceSlugs = [];
      if (serviceSlugsMatch) {
        try {
          serviceSlugs = JSON.parse(`[${serviceSlugsMatch[1]}]`);
        } catch (e) {
          serviceSlugs = serviceSlugsMatch[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        }
      }
      articleDates[slug] = {
        date: dateMatch ? dateMatch[1] : null,
        lastmod: lastmodMatch ? lastmodMatch[1] : null,
        serviceSlugs
      };
    }
  }
}

// Default fallback date (today) - full UTC ISO 8601
const DEFAULT_DATE = '2026-10-10T07:00:00Z';

const getPageFile = (pathname) => {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  return cleanPath ? path.join('dist', cleanPath, 'index.html') : path.join('dist', 'index.html');
};

const getDateModified = (pathname) => {
  const pageFile = getPageFile(pathname);
  if (!existsSync(pageFile)) return null;
  const html = readFileSync(pageFile, 'utf8');
  const matches = [...html.matchAll(/"dateModified":"(\d{4}-\d{2}-\d{2})(?:T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z?)?"/g)];
  return matches.at(-1)?.[1] ?? null;
};

const getLastmodForPath = (pathname) => {
  // 1. Service pages: use service-lastmod.json (full UTC ISO 8601)
  if (pathname.startsWith('/layanan/')) {
    const serviceSlug = pathname.replace('/layanan/', '').replace('/', '');
    if (serviceLastmod[serviceSlug]?.lastmod) {
      return serviceLastmod[serviceSlug].lastmod;
    }
  }

  // 2. Article pages: use article frontmatter (full UTC ISO 8601)
  if (pathname.startsWith('/artikel/') && !pathname.includes('/kategori/') && 
      !['/artikel/', '/artikel/smk3/', '/artikel/iso-45001/'].includes(pathname)) {
    const slug = pathname.replace('/artikel/', '').replace('/', '');
    if (articleDates[slug]?.lastmod) {
      return articleDates[slug].lastmod;
    }
    if (articleDates[slug]?.date) {
      return articleDates[slug].date;
    }
  }

  // 3. Category pages: find latest article in category
  if (pathname.includes('/kategori/')) {
    let latestDate = null;
    for (const [, data] of Object.entries(articleDates)) {
      const articleDate = data.lastmod || data.date;
      if (articleDate && (!latestDate || articleDate > latestDate)) {
        latestDate = articleDate;
      }
    }
    if (latestDate) return latestDate;
  }

  // 4. Homepage: latest article overall
  if (pathname === '/' || pathname === '') {
    let latestDate = null;
    for (const [, data] of Object.entries(articleDates)) {
      const articleDate = data.lastmod || data.date;
      if (articleDate && (!latestDate || articleDate > latestDate)) {
        latestDate = articleDate;
      }
    }
    if (latestDate) return latestDate;
  }

  // 5. Service index page
  if (pathname === '/layanan/') {
    let latestDate = null;
    for (const [, data] of Object.entries(serviceLastmod)) {
      if (data.lastmod && (!latestDate || data.lastmod > latestDate)) {
        latestDate = data.lastmod;
      }
    }
    if (latestDate) return latestDate;
  }

  // 6. Article index page
  if (pathname === '/artikel/') {
    let latestDate = null;
    for (const [, data] of Object.entries(articleDates)) {
      const articleDate = data.lastmod || data.date;
      if (articleDate && (!latestDate || articleDate > latestDate)) {
        latestDate = articleDate;
      }
    }
    if (latestDate) return latestDate;
  }

  // 7. Reference pages (/artikel/smk3/, /artikel/iso-45001/)
  if (pathname === '/artikel/smk3/' || pathname === '/artikel/iso-45001/') {
    let latestDate = null;
    for (const [, data] of Object.entries(articleDates)) {
      const articleDate = data.lastmod || data.date;
      if (articleDate && (!latestDate || articleDate > latestDate)) {
        latestDate = articleDate;
      }
    }
    if (latestDate) return latestDate;
  }

  // 8. Default fallback - full UTC ISO 8601
  return '2026-10-10T07:00:00Z';
};

if (existsSync(FILE)) {
  let xml = readFileSync(FILE, 'utf8');

  // Tambahkan lastmod untuk SEMUA URL
  xml = xml.replace(/<url>([\s\S]*?)<\/url>/g, (urlBlock, inner) => {
    const locMatch = inner.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch || inner.includes('<lastmod>')) return urlBlock;

    const pathname = new URL(locMatch[1]).pathname;
    const lastmod = getLastmodForPath(pathname);
    return `<url>${inner.replace('</loc>', `</loc><lastmod>${lastmod}</lastmod>`)}</url>`;
  });

  writeFileSync(FILE, xml);
  console.log('✓ sitemap-0.xml: lastmod disinkronkan untuk SEMUA halaman');
} else {
  console.warn('sitemap-0.xml tidak ditemukan!');
}

if (existsSync(FILE_INDEX)) {
  let idx = readFileSync(FILE_INDEX, 'utf8');
  // Remove any existing XSLT stylesheet reference
  if (idx.includes('xml-stylesheet')) {
    idx = idx.replace(/<\?xml-stylesheet[^>]*\?>\s*/, '');
  }
  writeFileSync(FILE_INDEX, idx);
  console.log('✓ sitemap-index.xml: lastmod disinkronkan');
}
