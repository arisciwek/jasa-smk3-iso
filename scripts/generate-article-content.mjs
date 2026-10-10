import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const planPath = join(root, 'content-plan.json');
const plan = JSON.parse(readFileSync(planPath, 'utf8'));
const idea = plan.articleIdeas.find((item) => item.status === 'planned');
const apiKey = process.env.AI_API_KEY;
const baseUrl = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
const model = process.env.AI_MODEL || 'gpt-4o-mini';

mkdirSync(join(root, 'automation-output'), { recursive: true });

if (!idea) {
  writeFileSync(join(root, 'automation-output', '.empty'), 'article-queue-empty\n');
  console.log('Antrean artikel sudah habis; job city tetap berjalan.');
  process.exit(0);
}
if (!apiKey) throw new Error('AI_API_KEY belum tersedia.');

const prompt = `
Anda adalah editor senior konten K3 berbahasa Indonesia. Tulis satu artikel berdasarkan brief berikut.

Judul: ${idea.title}
Kategori: ${idea.category}
Keyword: ${idea.keywords.join(', ')}
Brief: ${idea.brief}

Aturan editorial:
- gunakan bahasa Indonesia yang natural, spesifik, dan tidak terasa seperti teks AI;
- fokus pada isi yang dapat dipakai pembaca, bukan promosi berulang;
- gunakan Markdown dengan 3–5 subjudul dan paragraf yang jelas;
- panjang sekitar 600–900 kata;
- jangan memakai kata "blog";
- jangan membuat klaim hukum, angka, statistik, atau fakta teknis yang tidak dapat dipastikan dari brief;
- jika membahas regulasi atau standar, jelaskan secara hati-hati dan jangan mengarang nomor pasal;
- jangan menulis frontmatter, judul H1, catatan editor, atau penjelasan tentang proses AI;
- keluarkan hanya isi artikel Markdown.
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
      { role: 'system', content: 'Tulis artikel yang informatif, konkret, dan tidak berlebihan.' },
      { role: 'user', content: prompt },
    ],
  }),
});

if (!response.ok) throw new Error(`AI API gagal: ${response.status} ${await response.text()}`);

const result = await response.json();
const body = result.choices?.[0]?.message?.content?.trim();
if (!body || body.split(/\s+/).length < 350 || body.startsWith('---') || body.includes('```')) {
  throw new Error('AI tidak menghasilkan isi artikel Markdown yang valid.');
}

const slug = idea.slug || idea.id;
const today = new Date().toISOString().slice(0, 10);
const wordCount = body.split(/\s+/).length;
const readTime = `${Math.max(3, Math.ceil(wordCount / 180))} menit`;
const frontmatter = [
  '---',
  `title: ${JSON.stringify(idea.title)}`,
  `description: ${JSON.stringify(idea.brief)}`,
  `date: "${today}"`,
  `lastmod: "${today}"`,
  'author: "Admin K3"',
  `category: ${JSON.stringify(idea.category)}`,
  `tags: ${JSON.stringify(idea.keywords)}`,
  `readTime: "${readTime}"`,
  `image: ${JSON.stringify(idea.image)}`,
  `imageAlt: ${JSON.stringify(idea.imageAlt)}`,
  `serviceSlugs: ${JSON.stringify(idea.serviceSlugs || [])}`,
  '---',
  '',
].join('\n');

writeFileSync(join(root, 'src/content/articles', `${slug}.md`), `${frontmatter}${body}\n`);

idea.status = 'published';
idea.publishedAt = today;
idea.slug = slug;
writeFileSync(planPath, `${JSON.stringify(plan, null, 2)}\n`);
mkdirSync(join(root, 'automation-output', 'src/content/articles'), { recursive: true });
copyFileSync(planPath, join(root, 'automation-output', 'content-plan.json'));
copyFileSync(
    join(root, 'src/content/articles', `${slug}.md`),
    join(root, 'automation-output', 'src/content/articles', `${slug}.md`),
  );
  
  // Update service lastmod if article is related to services
  if (idea.serviceSlugs && idea.serviceSlugs.length > 0) {
    const serviceLastmodPath = join(root, 'src/data/service-lastmod.json');
    if (existsSync(serviceLastmodPath)) {
      const serviceLastmodData = JSON.parse(readFileSync(serviceLastmodPath, 'utf8'));
      let updated = false;
      for (const serviceSlug of idea.serviceSlugs) {
        if (serviceLastmodData[serviceSlug] && serviceLastmodData[serviceSlug].lastmod < today) {
          serviceLastmodData[serviceSlug].lastmod = today;
          updated = true;
        }
      }
      if (updated) {
        writeFileSync(serviceLastmodPath, `${JSON.stringify(serviceLastmodData, null, 2)}\n`);
        console.log(`Service lastmod updated for: ${idea.serviceSlugs.join(', ')}`);
      }
    }
  }

  console.log(`Artikel dibuat: ${slug}`);
