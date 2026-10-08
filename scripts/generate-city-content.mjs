import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const plan = JSON.parse(readFileSync(join(root, 'content-plan.json'), 'utf8'));
const citiesSource = readFileSync(join(root, 'src/data/cities.ts'), 'utf8');
const contentDir = join(root, 'src/data/city-content');
const apiKey = process.env.AI_API_KEY;
const baseUrl = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
const model = process.env.AI_MODEL || 'gpt-4o-mini';

if (!apiKey) throw new Error('AI_API_KEY belum tersedia.');

const cityRows = [...citiesSource.matchAll(/\['([^']+)', '([^']+)'\]/g)].map((match) => ({
  name: match[1],
  region: match[2],
  slug: match[1].toLowerCase().replace(/\s+/g, '-'),
}));

if (cityRows.length === 0) throw new Error('Daftar city tidak ditemukan dari src/data/cities.ts.');

const files = new Map(
  readdirSync(contentDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const path = join(contentDir, file);
      return [file.replace(/\.json$/, ''), { path, data: JSON.parse(readFileSync(path, 'utf8')) }];
    }),
);

const stateFor = (city) => files.get(city.slug)?.data || {
  slug: city.slug,
  lastmod: null,
  nextTopic: plan.cityTopics[0].id,
  completedTopics: [],
  paragraphs: [],
};

const candidates = cityRows
  .map((city, index) => ({ city, index, state: stateFor(city) }))
  .sort((a, b) => {
    const dateA = a.state.lastmod || '0000-00-00';
    const dateB = b.state.lastmod || '0000-00-00';
    return dateA.localeCompare(dateB) || a.index - b.index;
  });

const selected = candidates[0];
const topicIndex = Math.max(0, plan.cityTopics.findIndex((topic) => topic.id === selected.state.nextTopic));
const topic = plan.cityTopics[topicIndex] || plan.cityTopics[0];
const existing = selected.state.paragraphs.map((paragraph) => paragraph.text).join('\n');
const facts = [`Nama kota: ${selected.city.name}`, `Wilayah administratif yang tercatat: ${selected.city.region}`].join('\n');

const prompt = `
Anda adalah editor konten lokal berbahasa Indonesia. Buat tepat satu paragraf baru untuk halaman layanan lokal kota.

Kota: ${selected.city.name}
Wilayah: ${selected.city.region}
Topik: ${topic.label}
Instruksi: ${topic.instruction}
Fakta yang tersedia:
${facts}

Paragraf lama (jangan diulang):
${existing || '(belum ada)'}

Aturan ketat:
- keluarkan hanya satu paragraf teks biasa, tanpa judul, markdown, bullet, atau awalan angka;
- 60-${topic.maxWords} kata;
- fokus pada konteks kota, bukan penjelasan umum SMK3, ISO, HIRADC, atau regulasi;
- jangan mengarang kawasan industri, perusahaan, jarak, waktu tempuh, jumlah industri, atau fakta lokal lain;
- jika fakta tidak cukup untuk membuat klaim spesifik, gunakan bahasa yang hati-hati dan umum;
- jangan mengulang kalimat atau ide dari paragraf lama.
`.trim();

const response = await fetch(`${baseUrl}/chat/completions`, {
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

const today = new Date().toISOString().slice(0, 10);
const nextTopic = plan.cityTopics[(topicIndex + 1) % plan.cityTopics.length].id;
const updated = {
  ...selected.state,
  slug: selected.city.slug,
  lastmod: today,
  lastUpdatedTopic: topic.id,
  nextTopic,
  completedTopics: [...new Set([...selected.state.completedTopics, topic.id])],
  paragraphs: [...selected.state.paragraphs, { topic: topic.id, text }],
};

mkdirSync(contentDir, { recursive: true });
writeFileSync(join(contentDir, `${selected.city.slug}.json`), `${JSON.stringify(updated, null, 2)}\n`);
console.log(`City diperbarui: ${selected.city.name} | topik: ${topic.id}`);
