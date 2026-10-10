import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

const FILE = 'dist/sitemap-0.xml';
const FILE_INDEX = 'dist/sitemap-index.xml';
// XSLT stylesheet removed - deprecated in browsers

const SITE_URL = 'http://situs-smk3-iso.lan';

// Load service lastmod data
const serviceLastmodPath = 'src/data/service-lastmod.json';
const serviceLastmod = existsSync(serviceLastmodPath) 
  ? JSON.parse(readFileSync(serviceLastmodPath, 'utf8')) 
  : {};

// Load service images from services.ts
const servicesPath = 'src/data/services.ts';
const serviceImages = {};
if (existsSync(servicesPath)) {
  const content = readFileSync(servicesPath, 'utf8');
  const imageMatches = content.matchAll(/slug:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'/g);
  for (const match of imageMatches) {
    serviceImages[match[1]] = match[2];
  }
}

// Load article dates and images from frontmatter
const articlesDir = 'src/content/articles';
const articleData = {};
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
      const imageMatch = fm.match(/image:\s*"([^"]*)"/);
      const serviceSlugsMatch = fm.match(/serviceSlugs:\s*\[([^\]]*)\]/);
      let serviceSlugs = [];
      if (serviceSlugsMatch) {
        try {
          serviceSlugs = JSON.parse(`[${serviceSlugsMatch[1]}]`);
        } catch (e) {
          serviceSlugs = serviceSlugsMatch[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        }
      }
      articleData[slug] = {
        date: dateMatch ? dateMatch[1] : null,
        lastmod: lastmodMatch ? lastmodMatch[1] : null,
        image: imageMatch ? imageMatch[1] : null,
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
    if (articleData[slug]?.lastmod) {
      return articleData[slug].lastmod;
    }
    if (articleData[slug]?.date) {
      return articleData[slug].date;
    }
  }

  // 3. Category pages: find latest article in category
  if (pathname.includes('/kategori/')) {
    let latestDate = null;
    for (const [, data] of Object.entries(articleData)) {
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
    for (const [, data] of Object.entries(articleData)) {
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
    for (const [, data] of Object.entries(articleData)) {
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
    for (const [, data] of Object.entries(articleData)) {
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

// Load city data for city page images
const citiesPath = 'src/data/cities.ts';
const citySlugs = [];
if (existsSync(citiesPath)) {
  const content = readFileSync(citiesPath, 'utf8');
  const slugMatches = content.matchAll(/slug:\s*'([^']+)'/g);
  for (const match of slugMatches) {
    citySlugs.push(match[1]);
  }
}

const getImageForPath = (pathname) => {
  // 1. Service pages
  if (pathname.startsWith('/layanan/')) {
    const serviceSlug = pathname.replace('/layanan/', '').replace('/', '');
    if (serviceImages[serviceSlug]) {
      return SITE_URL + serviceImages[serviceSlug];
    }
    // Special case: audit-internal
    if (serviceSlug === 'audit-internal') {
      return SITE_URL + '/assets/images/service-audit-internal.svg';
    }
  }

  // 2. Article pages (regular articles)
  if (pathname.startsWith('/artikel/') && !pathname.includes('/kategori/') && 
      !['/artikel/', '/artikel/smk3/', '/artikel/iso-45001/'].includes(pathname)) {
    const slug = pathname.replace('/artikel/', '').replace('/', '');
    if (articleData[slug]?.image) {
      return SITE_URL + articleData[slug].image;
    }
    // 3. City pages (jasa-iso-* and jasa-smk3-*)
    if (slug.startsWith('jasa-iso-')) {
      const citySlug = slug.replace('jasa-iso-', '');
      if (citySlugs.includes(citySlug)) {
        return SITE_URL + `/assets/images/jasa-iso/jasa-iso-${citySlug}.svg`;
      }
    }
    if (slug.startsWith('jasa-smk3-')) {
      const citySlug = slug.replace('jasa-smk3-', '');
      if (citySlugs.includes(citySlug)) {
        return SITE_URL + `/assets/images/jasa-smk3/jasa-smk3-${citySlug}.svg`;
      }
    }
    // Fallback for city pages without specific image
    if (slug.startsWith('jasa-iso-') || slug.startsWith('jasa-smk3-')) {
      return SITE_URL + '/assets/images/article-lokasi-smk3.svg';
    }
  }

  // 4. Homepage - use organization logo
  if (pathname === '/' || pathname === '') {
    return SITE_URL + '/assets/images/organization-logo.svg';
  }

  // 5. Service index page
  if (pathname === '/layanan/') {
    return SITE_URL + '/assets/images/service-smk3.svg';
  }

  // 6. Article index page
  if (pathname === '/artikel/') {
    return SITE_URL + '/assets/images/article-smk3.svg';
  }

  // 7. Reference pages
  if (pathname === '/artikel/smk3/') {
    return SITE_URL + '/assets/images/article-smk3.svg';
  }
  if (pathname === '/artikel/iso-45001/') {
    return SITE_URL + '/assets/images/article-iso-45001.svg';
  }

  // 8. Category pages - use first article image in category
  if (pathname.includes('/kategori/')) {
    for (const [, data] of Object.entries(articleData)) {
      if (data.image) {
        return SITE_URL + data.image;
      }
    }
  }

  // 9. About/Contact pages
  if (pathname === '/tentang/' || pathname === '/tentang/kontak/') {
    return SITE_URL + '/assets/images/organization-logo.svg';
  }

  // 10. Sitemap page
  if (pathname === '/sitemap/') {
    return SITE_URL + '/assets/images/page-sitemap.svg';
  }

  return null;
};

if (existsSync(FILE)) {
  let xml = readFileSync(FILE, 'utf8');

  // Tambahkan lastmod dan image untuk SEMUA URL
  // Split by <url> to handle single-line XML
  const urlRegex = /<url>(.*?)<\/url>/g;
  let matchCount = 0;
  xml = xml.replace(urlRegex, (urlBlock, inner) => {
    matchCount++;
    const locMatch = inner.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) return urlBlock;

    const pathname = new URL(locMatch[1]).pathname;
    
    // Add lastmod if missing
    let result = inner;
    if (!inner.includes('<lastmod>')) {
      const lastmod = getLastmodForPath(pathname);
      result = result.replace('</loc>', `</loc><lastmod>${lastmod}</lastmod>`);
    }

    // Add image if missing
    if (!inner.includes('<image:image>')) {
      const imageUrl = getImageForPath(pathname);
      if (imageUrl) {
        // Extract title from pathname for image title
        const title = pathname.split('/').filter(Boolean).pop() || 'Homepage';
        const imageEntry = `<image:image><image:loc>${imageUrl}</image:loc><image:title>${title}</image:title></image:image>`;
        // Append image entry to inner content (before closing </url> which is added by wrapper)
        result = result + imageEntry;
      }
    }

    return `<url>${result}</url>`;
  });

  writeFileSync(FILE, xml);
  console.log(`✓ sitemap-0.xml: lastmod & image disinkronkan untuk ${matchCount} halaman`);
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
