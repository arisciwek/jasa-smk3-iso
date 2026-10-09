import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const FILE = 'dist/sitemap-0.xml';
const FILE_INDEX = 'dist/sitemap-index.xml';
const XSL_PI = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';

if (existsSync(FILE)) {
  let xml = readFileSync(FILE, 'utf8');

  const getPageFile = (pathname) => {
    const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
    return cleanPath ? path.join('dist', cleanPath, 'index.html') : path.join('dist', 'index.html');
  };

  const getDateModified = (pathname) => {
    const pageFile = getPageFile(pathname);
    if (!existsSync(pageFile)) return null;
    const html = readFileSync(pageFile, 'utf8');
    const matches = [...html.matchAll(/"dateModified":"(\d{4}-\d{2}-\d{2})"/g)];
    return matches.at(-1)?.[1] ?? null;
  };

  // Tambahkan lastmod hanya jika dateModified nyata tersedia di halaman hasil build.
  xml = xml.replace(/<url>([\s\S]*?)<\/url>/g, (urlBlock, inner) => {
    const locMatch = inner.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch || inner.includes('<lastmod>')) return urlBlock;

    const pathname = new URL(locMatch[1]).pathname;
    const dateModified = getDateModified(pathname);
    return dateModified
      ? `<url>${inner.replace('</loc>', `</loc><lastmod>${dateModified}</lastmod>`)}</url>`
      : urlBlock;
  });

  // Pastikan sitemap memiliki stylesheet style XSLT
  if (!xml.includes('xml-stylesheet')) {
    xml = xml.replace(/^<\?xml[^>]*\?>/, (pi) => `${pi}${XSL_PI}`);
  }

  writeFileSync(FILE, xml);
  console.log('✓ sitemap-0.xml: stylesheet diperiksa & lastmod disinkronkan dari dateModified');
} else {
  console.warn('sitemap-0.xml tidak ditemukan!');
}

if (existsSync(FILE_INDEX)) {
  let idx = readFileSync(FILE_INDEX, 'utf8');
  if (!idx.includes('xml-stylesheet')) {
    idx = idx.replace(/^<\?xml[^>]*\?>/, (pi) => `${pi}${XSL_PI}`);
  }
  writeFileSync(FILE_INDEX, idx);
  console.log('✓ sitemap-index.xml: stylesheet disisipkan');
}
