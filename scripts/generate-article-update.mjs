import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const planPath = join(root, 'content-plan.json');
const plan = JSON.parse(readFileSync(planPath, 'utf8'));
const articlesDir = join(root, 'src/content/articles');
const apiKey = process.env.AI_API_KEY;
const baseUrl = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
const model = process.env.AI_MODEL || 'gpt-4o-mini';

mkdirSync(join(root, 'automation-output'), { recursive: true });

if (!apiKey) throw new Error('AI_API_KEY belum tersedia.');

// Find published articles that can be updated
const publishedArticles = plan.articleIdeas.filter((item) => item.status === 'published' && item.slug);

if (publishedArticles.length === 0) {
  writeFileSync(join(root, 'automation-output', '.empty'), 'no-published-articles-to-update\n');
  console.log('Tidak ada artikel published untuk di-update.');
  process.exit(0);
}

// Pick the oldest updated article (by lastmod in frontmatter)
let oldestArticle = null;
let oldestTime = Infinity;

for (const article of publishedArticles) {
  const articlePath = join(articlesDir, `${article.slug}.md`);
  if (!existsSync(articlePath)) continue;
  const content = readFileSync(articlePath, 'utf8');
  const fm = content.match(/^---\n([\s\S]*?)\n---/)?.[1];
  if (!fm) continue;
  const lastmodMatch = fm.match(/lastmod:\s*"([^"]*)"/);
  if (lastmodMatch) {
    const time = new Date(lastmodMatch[1]).getTime();
    if (time < oldestTime) {
      oldestTime = time;
      oldestArticle = article;
    }
  }
}

if (!oldestArticle) {
  writeFileSync(join(root, 'automation-output', '.empty'), 'no-valid-articles-to-update\n');
  console.log('Tidak ada artikel valid untuk di-update.');
  process.exit(0);
}

const articlePath = join(articlesDir, `${oldestArticle.slug}.md`);
const existingContent = readFileSync(articlePath, 'utf8');
const existingBody = existingContent.split('\n---\n')[2]?.trim() || '';

const prompt = `
Anda adalah editor senior konten K3 berbahasa Indonesia. Perbarui artikel yang sudah ada dengan menambahkan konten baru yang relevan.

Judul: ${oldestArticle.title}
Kategori: ${oldestArticle.category}
Keyword: ${oldestArticle.keywords.join(', ')}
Konten lama (ringkasan): ${existingBody.slice(0, 500)}...

Aturan editorial:
- gunakan bahasa Indonesia yang natural, spesifik, dan tidak terasa seperti teks AI;
- tambahkan 1-2 subjudul baru dengan konten yang memperkaya artikel;
- panjang tambahan sekitar 200–400 kata;
- jangan memakai kata "blog";
- jangan membuat klaim hukum, angka, statistik, atau fakta teknis yang tidak dapat dipastikan;
- jika membahas regulasi atau standar, jelaskan secara hati-hati dan jangan mengarang nomor pasal;
- jangan menulis frontmatter, judul H1, catatan editor, atau penjelasan tentang proses AI;
- keluarkan hanya isi tambahan Markdown (subjudul + paragraf).
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
      { role: 'system', content: 'Tambahkan konten baru yang relevan ke artikel existing. Keluarkan hanya subjudul dan paragraf baru.' },
      { role: 'user', content: prompt },
    ],
  }),
});

if (!response.ok) throw new Error(`AI API gagal: ${response.status} ${await response.text()}`);

const result = await response.json();
const newContent = result.choices?.[0]?.message?.content?.trim();

if (!newContent || newContent.split(/\s+/).length < 100 || newContent.startsWith('---') || newContent.includes('```')) {
  throw new Error('AI tidak menghasilkan konten tambahan yang valid.');
}

// Append new content to existing article
const updatedContent = existingContent.trim() + '\n\n' + newContent + '\n';

// Update frontmatter lastmod
const baseDate = new Date().toISOString().split('T')[0];
const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
const second = String(Math.floor(Math.random() * 60)).padStart(2, '0');
const now = `${baseDate}T${hour}:${minute}:${second}Z`;

const updatedWithLastmod = updatedContent.replace(
  /lastmod:\s*"[^"]*"/,
  `lastmod: "${now}"`
);

writeFileSync(articlePath, updatedWithLastmod);

// Update plan
oldestArticle.lastmod = now;
writeFileSync(planPath, `${JSON.stringify(plan, null, 2)}\n`);

// Copy to automation-output
mkdirSync(join(root, 'automation-output', 'src/content/articles'), { recursive: true });
copyFileSync(planPath, join(root, 'automation-output', 'content-plan.json'));
copyFileSync(articlePath, join(root, 'automation-output', 'src/content/articles', `${oldestArticle.slug}.md`));

console.log(`Artikel diperbarui: ${oldestArticle.slug}`);