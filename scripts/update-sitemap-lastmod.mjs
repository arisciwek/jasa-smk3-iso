import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

// Publish Worker — sinkronisasi sitemap TARGETED.
// Hanya mengubah entri <lastmod> dan <image:image> yang nilainya berbeda dari
// sumber kebenaran (frontmatter artikel / service-lastmod.json / data kota).
// Entri lain TIDAK disentuh.
//
// Pemakaian (setelah astro build):
//   node scripts/update-sitemap-lastmod.mjs

const FILE = 'dist/sitemap-0.xml';
const SITE_URL = 'http://situs-smk3-iso.lan';

// --- Sumber kebenaran: frontmatter artikel ---
const articlesDir = 'src/content/articles';
const articleData = {};
if (existsSync(articlesDir)) {
  for (const file of readdirSync(articlesDir).filter((f) => f.endsWith('.md'))) {
    const content = readFileSync(path.join(articlesDir, file), 'utf8');
    const fm = content.match(/^---\n([\s\S]*?)\n---/)?.[1];
    if (!fm) continue;
    const slug = file.replace('.md', '');
    articleData[slug] = {
      date:     fm.match(/date:\s*"([^"]*)"/)?.[1] ?? null,
      lastmod:  fm.match(/lastmod:\s*"([^"]*)"/)?.[1] ?? null,
      category: fm.match(/category:\s*"([^"]*)"/)?.[1] ?? null,
      image:    fm.match(/image:\s*"([^"]*)"/)?.[1] ?? null,
    };
  }
}

// --- Sumber kebenaran: service-lastmod.json ---
const serviceLastmod = existsSync('src/data/service-lastmod.json')
  ? JSON.parse(readFileSync('src/data/service-lastmod.json', 'utf8'))
  : {};

// --- Sumber kebenaran: data kota ---
const cityLastmod = {};
for (const [prefix, dir] of [['jasa-smk3', 'src/data/jasa-smk3'], ['jasa-iso', 'src/data/jasa-iso']]) {
  if (existsSync(dir)) {
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
      const data = JSON.parse(readFileSync(path.join(dir, file), 'utf8'));
      const citySlug = file.replace('.json', '');
      if (data.lastmod) {
        cityLastmod[`${prefix}-${citySlug}`] = /^\d{4}-\d{2}-\d{2}$/.test(data.lastmod)
          ? `${data.lastmod}T00:00:00Z`
          : data.lastmod;
      }
    }
  }
}

// --- Sumber kebenaran: service images ---
const serviceImages = {};
if (existsSync('src/data/services.ts')) {
  const content = readFileSync('src/data/services.ts', 'utf8');
  for (const match of content.matchAll(/slug:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'/g)) {
    serviceImages[match[1]] = match[2];
  }
}

// --- Sumber kebenaran: city slugs ---
const citySlugs = [];
if (existsSync('src/data/cities.ts')) {
  for (const match of readFileSync('src/data/cities.ts', 'utf8').matchAll(/slug:\s*'([^']+)'/g)) {
    citySlugs.push(match[1]);
  }
}

// --- Helper: normalisasi nama kategori -> slug URL (sama persis dengan Astro) ---
const categorySlug = (name) => (name || '')
  .toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-');

const articleDate = (data) => data.lastmod || data.date;

const latestArticleDate = () => {
  let latest = null;
  for (const [, data] of Object.entries(articleData)) {
    const d = articleDate(data);
    if (d && (!latest || d > latest)) latest = d;
  }
  return latest;
};

const latestCategoryDate = (category) => {
  let latest = null;
  for (const [, data] of Object.entries(articleData)) {
    if (categorySlug(data.category) !== category) continue;
    const d = articleDate(data);
    if (d && (!latest || d > latest)) latest = d;
  }
  return latest;
};

const latestServiceDate = () => {
  let latest = null;
  for (const [, data] of Object.entries(serviceLastmod)) {
    if (data.lastmod && (!latest || data.lastmod > latest)) latest = data.lastmod;
  }
  return latest;
};

// --- lastmod yang benar untuk sebuah pathname ---
const correctLastmodFor = (pathname) => {
  if (pathname.startsWith('/layanan/')) {
    const serviceSlug = pathname.replace('/layanan/', '').replace('/', '');
    if (serviceLastmod[serviceSlug]?.lastmod) return serviceLastmod[serviceSlug].lastmod;
  }
  if (pathname === '/layanan/') return latestServiceDate();

  if (pathname.startsWith('/artikel/') && !pathname.includes('/kategori/') &&
      !['/artikel/', '/artikel/smk3/', '/artikel/iso-45001/'].includes(pathname)) {
    const slug = pathname.replace('/artikel/', '').replace('/', '');
    if (cityLastmod[slug]) return cityLastmod[slug];
    if (articleData[slug]) return articleDate(articleData[slug]);
  }

  if (pathname.includes('/kategori/')) {
    return latestCategoryDate(pathname.split('/').filter(Boolean).pop());
  }

  if (pathname === '/' || pathname === '' || pathname === '/artikel/' ||
      pathname === '/artikel/smk3/' || pathname === '/artikel/iso-45001/') {
    return latestArticleDate();
  }

  return null;
};

// --- image yang benar untuk sebuah pathname ---
const getImageForPath = (pathname) => {
  if (pathname.startsWith('/layanan/')) {
    const serviceSlug = pathname.replace('/layanan/', '').replace('/', '');
    if (serviceImages[serviceSlug]) return SITE_URL + serviceImages[serviceSlug];
    if (serviceSlug === 'audit-internal') return SITE_URL + '/assets/images/service-audit-internal.svg';
  }

  if (pathname.startsWith('/artikel/') && !pathname.includes('/kategori/') &&
      !['/artikel/', '/artikel/smk3/', '/artikel/iso-45001/'].includes(pathname)) {
    const slug = pathname.replace('/artikel/', '').replace('/', '');
    if (slug.startsWith('jasa-iso-')) {
      const citySlug = slug.replace('jasa-iso-', '');
      if (citySlugs.includes(citySlug)) return SITE_URL + `/assets/images/jasa-iso/jasa-iso-${citySlug}.svg`;
      return SITE_URL + '/assets/images/article-lokasi-smk3.svg';
    }
    if (slug.startsWith('jasa-smk3-')) {
      const citySlug = slug.replace('jasa-smk3-', '');
      if (citySlugs.includes(citySlug)) return SITE_URL + `/assets/images/jasa-smk3/jasa-smk3-${citySlug}.svg`;
      return SITE_URL + '/assets/images/article-lokasi-smk3.svg';
    }
    const slugData = articleData[slug];
    if (slugData?.image) return SITE_URL + slugData.image;
  }

  if (pathname === '/' || pathname === '') return SITE_URL + '/assets/images/organization-logo.svg';
  if (pathname === '/layanan/') return SITE_URL + '/assets/images/service-smk3.svg';
  if (pathname === '/artikel/') return SITE_URL + '/assets/images/article-smk3.svg';
  if (pathname === '/artikel/smk3/') return SITE_URL + '/assets/images/article-smk3.svg';
  if (pathname === '/artikel/iso-45001/') return SITE_URL + '/assets/images/article-iso-45001.svg';
  if (pathname.includes('/kategori/')) {
    for (const [, data] of Object.entries(articleData)) {
      if (data.image) return SITE_URL + data.image;
    }
  }
  if (pathname === '/tentang/' || pathname === '/tentang/kontak/') return SITE_URL + '/assets/images/organization-logo.svg';
  if (pathname === '/sitemap/') return SITE_URL + '/assets/images/page-sitemap.svg';
  return null;
};

// --- Proses sitemap ---
if (!existsSync(FILE)) {
  console.warn('sitemap-0.xml tidak ditemukan!');
  process.exit(0);
}

let xml = readFileSync(FILE, 'utf8');
let lastmodChanged = 0;
let imageAdded = 0;
let checked = 0;

xml = xml.replace(/<url>(.*?)<\/url>/gs, (urlBlock, inner) => {
  const locMatch = inner.match(/<loc>([^<]+)<\/loc>/);
  if (!locMatch) return urlBlock;
  checked++;

  const pathname = new URL(locMatch[1]).pathname;
  const correctLastmod = correctLastmodFor(pathname);
  const lastmodMatch = inner.match(/<lastmod>([^<]+)<\/lastmod>/);
  const currentLastmod = lastmodMatch ? lastmodMatch[1] : null;

  let result = inner;
  let changed = false;

  // Perbarui lastmod jika berbeda
  if (correctLastmod && currentLastmod !== correctLastmod) {
    if (lastmodMatch) {
      result = result.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${correctLastmod}</lastmod>`);
    } else {
      result = result.replace('</loc>', `</loc><lastmod>${correctLastmod}</lastmod>`);
    }
    lastmodChanged++;
    console.log(`lastmod ${pathname}: ${currentLastmod || '(kosong)'} -> ${correctLastmod}`);
    changed = true;
  }

  // Tambahkan image jika belum ada
  if (!result.includes('<image:image>')) {
    const imageUrl = getImageForPath(pathname);
    if (imageUrl) {
      const title = pathname.split('/').filter(Boolean).pop() || 'Homepage';
      result = result + `<image:image><image:loc>${imageUrl}</image:loc><image:title>${title}</image:title></image:image>`;
      imageAdded++;
      changed = true;
    }
  }

  return changed ? `<url>${result}</url>` : urlBlock;
});

writeFileSync(FILE, xml);
console.log(`✓ sitemap-0.xml: ${lastmodChanged} lastmod diubah, ${imageAdded} image ditambahkan (dari ${checked} entri)`);
