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

if (cityRows.length === 0) throw new Error('Daftar kota tidak ditemukan dari src/data/cities.ts.');

const outputDir = path.join(root, 'public/assets/images/jasa-smk3');
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

// Deterministic hash from slug: returns 0-100
function hashFromSlug(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h % 101;
}

function buildCitySvg(city) {
  const name = escapeXml(city.name);
  const region = escapeXml(city.region);
  const color = regionColors[city.region] || '#10b981';
  const h = hashFromSlug(city.slug);

  // Pin position: x in [35, 125], y in [25, 50]
  const pinX = 35 + Math.round((h / 100) * 90);
  const pinY = 25 + Math.round(((h * 37) % 100) / 100 * 25);

  // Road lines: 2-4 segments with varying lengths
  const roadCount = 2 + (h % 3);
  let roadPaths = '';
  for (let i = 0; i < roadCount; i++) {
    const ry = 72 + i * 4;
    const rw = 12 + ((h * (i + 1)) % 55);
    const rx = 8 + ((h * (i + 7)) % 70);
    roadPaths += `M${rx} ${ry}h${rw}m${40 - rw} 0h${rw} `;
  }

  // Small decorative dots: 2-4 dots with varying positions
  const dotCount = 2 + (h % 3);
  let dots = '';
  for (let i = 0; i < dotCount; i++) {
    const dx = 10 + ((h * (i + 3)) % 140);
    const dy = 30 + ((h * (i + 11)) % 50);
    dots += `<circle cx="${dx}" cy="${dy}" r="1.5" fill="${color}" opacity="0.3"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 96" role="img"><title>Ilustrasi layanan SMK3 onsite di ${name}, ${region}</title><rect width="160" height="96" rx="8" fill="#141519" stroke="rgba(255,255,255,0.08)"/>${dots}<path d="M${pinX} ${pinY - 24}c-18 0-32 14-32 32 0 22 32 40 32 40s32-18 32-40c0-18-14-32-32-32Z" fill="none" stroke="${color}" stroke-width="6"/><circle cx="${pinX}" cy="${pinY}" r="10" fill="none" stroke="${color}" stroke-width="5"/><path d="${roadPaths}" stroke="${color}" stroke-width="5" stroke-linecap="round"/><text x="80" y="90" font-family="monospace" font-size="7" fill="#8a8f98" text-anchor="middle">${name} · ${region}</text></svg>`;
}

let count = 0;
for (const city of cityRows) {
  const fileName = `jasa-smk3-${city.slug}.svg`;
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, buildCitySvg(city) + '\n');
  count++;
}

console.log(`SVG aset Jasa SMK3 generate: ${count} file di public/assets/images/jasa-smk3/`);