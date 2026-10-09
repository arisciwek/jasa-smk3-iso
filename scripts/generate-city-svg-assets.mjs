import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const citiesSource = fs.readFileSync(path.join(root, 'src/data/cities.ts'), 'utf8');

// Extract city rows from raw array: ['Name', 'Region']
const cityRows = [...citiesSource.matchAll(/\['([^']+)', '([^']+)'\]/g)].map((match) => ({
  name: match[1],
  region: match[2],
  slug: match[1].toLowerCase().replace(/\s+/g, '-'),
}));

if (cityRows.length === 0) throw new Error('Daftar city tidak ditemukan dari src/data/cities.ts.');

const outputDir = path.join(root, 'public/assets/images');
fs.mkdirSync(outputDir, { recursive: true });

const regionColors = {
  'Banten': '#f59e0b',
  'Jakarta & Sekitarnya': '#3b82f6',
  'Jawa Barat': '#8b5cf6',
  'Jawa Tengah': '#10b981',
  'DI Yogyakarta': '#ef4444',
  'Jawa Timur': '#f97316',
};

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildCitySvg(city) {
  const name = escapeXml(city.name);
  const region = escapeXml(city.region);
  const color = regionColors[city.region] || '#10b981';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 96" role="img"><title>Ilustrasi layanan SMK3 onsite di ${name}, ${region}</title><rect width="160" height="96" rx="8" fill="#141519" stroke="rgba(255,255,255,0.08)"/><path d="M80 16c-18 0-32 14-32 32 0 22 32 40 32 40s32-18 32-40c0-18-14-32-32-32Z" fill="none" stroke="${color}" stroke-width="6"/><circle cx="80" cy="48" r="10" fill="none" stroke="${color}" stroke-width="5"/><path d="M18 80h34m56 0h34" stroke="${color}" stroke-width="5" stroke-linecap="round"/><text x="80" y="90" font-family="monospace" font-size="7" fill="#8a8f98" text-anchor="middle">${name} · ${region}</text></svg>`;
}

let count = 0;
for (const city of cityRows) {
  const fileName = `jasa-smk3-${city.slug}.svg`;
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, buildCitySvg(city) + '\n');
  count++;
}

console.log(`SVG aset kota generate: ${count} file di public/assets/images/`);