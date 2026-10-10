import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const serviceLastmodPath = join(root, 'src/data/service-lastmod.json');
const servicesPath = join(root, 'src/data/services.ts');

if (!existsSync(serviceLastmodPath)) {
  console.error('service-lastmod.json tidak ditemukan');
  process.exit(1);
}

const serviceLastmodData = JSON.parse(readFileSync(serviceLastmodPath, 'utf8'));
const today = new Date().toISOString().slice(0, 10);
let updated = false;

for (const [slug, data] of Object.entries(serviceLastmodData)) {
  if (!data.lastmod || data.lastmod < today) {
    serviceLastmodData[slug].lastmod = today;
    updated = true;
    console.log(`Service lastmod diupdate: ${slug} -> ${today}`);
  }
}

if (updated) {
  writeFileSync(serviceLastmodPath, `${JSON.stringify(serviceLastmodData, null, 2)}\n`);
  console.log('Semua service lastmod telah diupdate ke hari ini');
} else {
  console.log('Semua service lastmod sudah terkini');
}