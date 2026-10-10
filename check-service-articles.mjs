import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesDir = path.join(__dirname, 'src/content/articles');
const articleFiles = readdirSync(articlesDir).filter(f => f.endsWith('.md'));

const serviceArticles = {};

for (const file of articleFiles) {
  const content = readFileSync(path.join(articlesDir, file), 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const fm = frontmatterMatch[1];
    const slug = file.replace('.md', '');
    const dateMatch = fm.match(/date:\s*"([^"]*)"/);
    const lastmodMatch = fm.match(/lastmod:\s*"([^"]*)"/);
    const serviceSlugsMatch = fm.match(/serviceSlugs:\s*\[([^\]]*)\]/);
    let serviceSlugs = [];
    if (serviceSlugsMatch) {
      try {
        serviceSlugs = JSON.parse(`[${serviceSlugsMatch[1]}]`);
      } catch (e) {
        serviceSlugs = serviceSlugsMatch[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      }
    }
    const articleDate = lastmodMatch ? lastmodMatch[1] : (dateMatch ? dateMatch[1] : null);
    if (articleDate) {
      for (const svc of serviceSlugs) {
        if (!serviceArticles[svc]) serviceArticles[svc] = [];
        serviceArticles[svc].push({ slug, date: articleDate });
      }
    }
  }
}

for (const [svc, articles] of Object.entries(serviceArticles)) {
  const latest = articles.reduce((a, b) => a.date > b.date ? a : b);
  console.log(`${svc}: latest article = ${latest.slug} (${latest.date})`);
}
