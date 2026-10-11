import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const plan = JSON.parse(readFileSync(join(root, 'content-plan.json'), 'utf8'));
const citiesSource = readFileSync(join(root, 'src/data/cities.ts'), 'utf8');
const contentDir = join(root, 'src/data/jasa-smk3');
const apiKey = process.env.AI_API_KEY;
if (!apiKey) throw new Error('AI_API_KEY belum tersedia.');

const baseUrl = process.env.AI_BASE_URL;
if (!baseUrl) throw new Error('AI_BASE_URL belum tersedia.');
const baseUrlClean = baseUrl.replace(/\/$/, '');

const model = process.env.AI_MODEL;
if (!model) throw new Error('AI_MODEL belum tersedia.');

if (!apiKey) throw new Error('AI_API_KEY belum tersedia.');

const cityRows = [...citiesSource.matchAll(/\['([^']+)', '([^']+)'\]/g)].map((match) => ({
  name: match[1],
  region: match[2],
  slug: match[1].toLowerCase().replace(/\s+/g, '-'),
}));

if (cityRows.length === 0) throw new Error('Daftar kota tidak ditemukan dari src/data/cities.ts.');

// Find cities without JSON files yet
const existingFiles = readdirSync(contentDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.replace(/\.json$/, ''));

const missingCities = cityRows.filter((city) => !existingFiles.includes(city.slug));

if (missingCities.length === 0) {
  mkdirSync(join(root, 'automation-output'), { recursive: true });
  writeFileSync(join(root, 'automation-output', '.empty'), 'all-cities-exist\n');
  console.log('Semua kota sudah memiliki file JSON.');
  process.exit(0);
}

// Pick first missing city
const selectedCity = missingCities[0];

const prompt = `
Anda adalah editor konten lokal berbahasa Indonesia. Buat halaman layanan SMK3 baru untuk kota yang belum memiliki halaman.

Kota: ${selectedCity.name}
Wilayah: ${selectedCity.region}
Topik awal: ${plan.cityTopics[0].label}
Instruksi: ${plan.cityTopics[0].instruction}
Fakta yang tersedia:
- Nama kota: ${selectedCity.name}
- Wilayah administratif yang tercatat: ${selectedCity.region}

Aturan ketat:
- keluarkan hanya satu paragraf teks biasa, tanpa judul, markdown, bullet, atau awalan angka;
- 60-${plan.cityTopics[0].maxWords} kata;
- fokus pada konteks kota, bukan penjelasan umum SMK3, ISO, HIRADC, atau regulasi;
- jangan mengarang kawasan industri, perusahaan, jarak, waktu tempuh, jumlah industri, atau fakta lokal lain;
- jika fakta tidak cukup untuk membuat klaim spesifik, gunakan bahasa yang hati-hati dan umum.
`.trim();

const response = await fetch(`${baseUrlClean}`, {
  method: 'POST',
  headers: {
    authorization: `Bearer ${apiKey}`,
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model,
    temperature: 0.45,
    messages: [
      { role: 'system', content: 'Tulis konten lokal yang faktual, ringkas, dan tidak berlebihan.' },
      { role: 'user', content: prompt },
    ],
  }),
});

if (!response.ok) throw new Error(`AI API gagal: ${response.status} ${await response.text()}`);

const result = await response.json();
const text = result.choices?.[0]?.message?.content?.trim().replace(/^['"]|['"]$/g, '');

if (!text || text.split(/\s+/).length < 20 || text.includes('\n')) {
  throw new Error('AI tidak menghasilkan tepat satu paragraf yang valid.');
}

const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
const second = String(Math.floor(Math.random() * 60)).padStart(2, '0');
const now = new Date().toISOString().split('T')[0] + `T${hour}:${minute}:${second}Z`;
const today = now.slice(0, 10);
const nextTopic = plan.cityTopics[1]?.id || plan.cityTopics[0].id;

const newCityData = {
  slug: selectedCity.slug,
  lastmod: now,
  lastUpdatedTopic: plan.cityTopics[0].id,
  nextTopic,
  completedTopics: [plan.cityTopics[0].id],
  paragraphs: [{ topic: plan.cityTopics[0].id, text }],
};

mkdirSync(contentDir, { recursive: true });
writeFileSync(join(contentDir, `${selectedCity.slug}.json`), `${JSON.stringify(newCityData, null, 2)}\n`);
mkdirSync(join(root, 'automation-output', 'src/data/jasa-smk3'), { recursive: true });
copyFileSync(
  join(contentDir, `${selectedCity.slug}.json`),
  join(root, 'automation-output', 'src/data/jasa-smk3', `${selectedCity.slug}.json`),
);

console.log(`Jasa SMK3 dibuat: ${selectedCity.name} | topik: ${plan.cityTopics[0].id}`);