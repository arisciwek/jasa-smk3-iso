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
const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
let updated = false;

for (const [slug, data] of Object.entries(serviceLastmodData)) {
  if (!data.lastmod || new Date(data.lastmod) < new Date(now)) {
    serviceLastmodData[slug].lastmod = now;
    updated = true;
    console.log(`Service lastmod diupdate: ${slug} -> ${now}`);
  }
}

if (updated) {
  writeFileSync(serviceLastmodPath, `${JSON.stringify(serviceLastmodData, null, 2)}\n`);
  console.log('Semua service lastmod telah diupdate ke hari ini');
} else {
  console.log('Semua service lastmod sudah terkini');
}