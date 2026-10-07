import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const FILE = 'dist/sitemap-0.xml';
const FILE_INDEX = 'dist/sitemap-index.xml';
const XSL_PI = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';

if (existsSync(FILE)) {
  let xml = readFileSync(FILE, 'utf8');
  
  // Format lastmod ke ISO 8601 bersih dengan offset +07:00 (Jakarta) tanpa milidetik
  const lastmodStr = new Date().toISOString().split('.')[0] + '+07:00';
  
  // Ganti semua tag lastmod di sitemap-0.xml
  xml = xml.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${lastmodStr}</lastmod>`);
  
  // Pastikan sitemap memiliki stylesheet style XSLT
  if (!xml.includes('xml-stylesheet')) {
    xml = xml.replace(/^<\?xml[^>]*\?>/, (pi) => `${pi}${XSL_PI}`);
  }
  
  writeFileSync(FILE, xml);
  console.log(`✓ sitemap-0.xml: stylesheet disisipkan & lastmod disamakan (${lastmodStr})`);
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
