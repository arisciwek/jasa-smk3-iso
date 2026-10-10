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

const outputDir = path.join(root, 'public/assets/images/jasa-iso');
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

function buildIsoSvg(city) {
  const name = escapeXml(city.name);
  const region = escapeXml(city.region);
  const color = regionColors[city.region] || '#10b981';
  const h = hashFromSlug(city.slug);

  // Badge position: centered, x in [40, 120], y in [20, 45]
  const bx = 40 + Math.round((h / 100) * 80);
  const by = 20 + Math.round(((h * 37) % 100) / 100 * 25);

  // Gear teeth: 6-10 segments
  const toothCount = 6 + (h % 5);
  let teeth = '';
  for (let i = 0; i < toothCount; i++) {
    const angle = (i / toothCount) * Math.PI * 2;
    const tx = 80 + Math.round(Math.cos(angle) * 18);
    const ty = 48 + Math.round(Math.sin(angle) * 18);
    teeth += `<circle cx="${tx}" cy="${ty}" r="2" fill="${color}" opacity="0.5"/>`;
  }

  // Scale bars: 2-4 horizontal lines
  const scaleCount = 2 + (h % 3);
  let scales = '';
  for (let i = 0; i < scaleCount; i++) {
    const sy = 72 + i * 4;
    const sw = 12 + ((h * (i + 1)) % 55);
    const sx = 8 + ((h * (i + 7)) % 70);
    scales += `M${sx} ${sy}h${sw}m${40 - sw} 0h${sw} `;
  }

  // Small decorative dots
  const dotCount = 2 + (h % 3);
  let dots = '';
  for (let i = 0; i < dotCount; i++) {
    const dx = 10 + ((h * (i + 3)) % 140);
    const dy = 30 + ((h * (i + 11)) % 50);
    dots += `<circle cx="${dx}" cy="${dy}" r="1.5" fill="${color}" opacity="0.3"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 96" role="img"><title>Ilustrasi layanan sertifikasi ISO onsite di ${name}, ${region}</title><rect width="160" height="96" rx="8" fill="#141519" stroke="rgba(255,255,255,0.08)"/>${dots}<rect x="${bx - 16}" y="${by - 12}" width="32" height="24" rx="3" fill="none" stroke="${color}" stroke-width="4"/><path d="M${bx - 6} ${by}h12M${bx} ${by - 6}v12" stroke="${color}" stroke-width="3" stroke-linecap="round"/>${teeth}<path d="${scales}" stroke="${color}" stroke-width="4" stroke-linecap="round"/><text x="80" y="90" font-family="monospace" font-size="7" fill="#8a8f98" text-anchor="middle">${name} · ${region}</text></svg>`;
}

let generated = 0;
let skipped = 0;
for (const city of cityRows) {
  const fileName = `jasa-iso-${city.slug}.svg`;
  const filePath = path.join(outputDir, fileName);
  const expected = buildIsoSvg(city) + '\n';

  if (fs.existsSync(filePath)) {
    const current = fs.readFileSync(filePath, 'utf8');
    if (current === expected) {
      skipped++;
      continue;
    }
  }

  fs.writeFileSync(filePath, expected);
  generated++;
}

console.log(`SVG aset Jasa ISO: ${generated} di-generate, ${skipped} di-skip (sudah ada) di public/assets/images/jasa-iso/`);