import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Article Worker — operasi UPDATE.
// Memperbarui isi artikel dan menetapkan `lastmod` pada frontmatter (sumber kebenaran).
// Tidak menyentuh sitemap; Publish Worker (update-sitemap-lastmod.mjs) yang menulis sitemap.
//
// Pemakaian:
//   node scripts/update-article-content.mjs --slug=<nama-file-tanpa-.md> [--append="<teks>"] [--content-file=<path>]
//
// - --append: menambahkan teks ke akhir isi artikel.
// - --content-file: mengganti seluruh isi artikel dengan isi file tersebut.
// - Tanpa keduanya: hanya memperbarui `lastmod` (mis. untuk perubahan metadata).

const root = process.cwd();
const articlesDir = join(root, 'src/content/articles');

const arg = (name) => {
  const prefix = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(prefix));
  return found ? found.slice(prefix.length) : undefined;
};

const slug = arg('slug') || process.env.ARTICLE_SLUG;
const appendText = arg('append');
const contentFile = arg('content-file');

if (!slug) {
  console.error('Gunakan: node scripts/update-article-content.mjs --slug=<nama-file-tanpa-.md>');
  process.exit(1);
}

const articlePath = join(articlesDir, `${slug}.md`);
if (!existsSync(articlePath)) {
  console.error(`Artikel tidak ditemukan: ${articlePath}`);
  process.exit(1);
}

const original = readFileSync(articlePath, 'utf8');
const frontmatterMatch = original.match(/^---\n([\s\S]*?)\n---/);
if (!frontmatterMatch) {
  console.error(`Frontmatter tidak valid pada ${slug}.md`);
  process.exit(1);
}

const fm = frontmatterMatch[1];
const body = original.slice(frontmatterMatch[0].length).trim();

// --- 1. Perbarui isi artikel (jika diminta) ---
let newBody = body;
if (contentFile) {
  const filePath = join(root, contentFile);
  if (!existsSync(filePath)) {
    console.error(`File konten tidak ditemukan: ${filePath}`);
    process.exit(1);
  }
  newBody = readFileSync(filePath, 'utf8').trim();
} else if (appendText) {
  newBody = `${body}\n\n${appendText.trim()}`;
}

// --- 2. Tetapkan lastmod faktual saat edit (UTC ISO 8601 penuh) ---
const lastmod = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

let newFm = fm;
if (/lastmod:\s*"[^"]*"/.test(fm)) {
  newFm = fm.replace(/lastmod:\s*"[^"]*"/, `lastmod: "${lastmod}"`);
} else {
  const dateMatch = fm.match(/date:\s*"[^"]*"/);
  newFm = dateMatch
    ? fm.replace(dateMatch[0], `${dateMatch[0]}\nlastmod: "${lastmod}"`)
    : `lastmod: "${lastmod}"\n${fm}`;
}

const updated = `---\n${newFm}\n---\n\n${newBody}\n`;
writeFileSync(articlePath, updated);

// --- 3. Sinkronkan service-lastmod.json jika artikel terkait layanan ---
const serviceSlugsMatch = fm.match(/serviceSlugs:\s*\[([^\]]*)\]/);
let serviceSlugs = [];
if (serviceSlugsMatch) {
  try {
    serviceSlugs = JSON.parse(`[${serviceSlugsMatch[1]}]`);
  } catch {
    serviceSlugs = serviceSlugsMatch[1].split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''));
  }
}

const serviceLastmodPath = join(root, 'src/data/service-lastmod.json');
if (serviceSlugs.length > 0 && existsSync(serviceLastmodPath)) {
  const serviceLastmodData = JSON.parse(readFileSync(serviceLastmodPath, 'utf8'));
  let updatedService = false;
  for (const serviceSlug of serviceSlugs) {
    if (serviceLastmodData[serviceSlug] && serviceLastmodData[serviceSlug].lastmod < lastmod) {
      serviceLastmodData[serviceSlug].lastmod = lastmod;
      updatedService = true;
      console.log(`Service lastmod diupdate: ${serviceSlug} -> ${lastmod}`);
    }
  }
  if (updatedService) {
    writeFileSync(serviceLastmodPath, `${JSON.stringify(serviceLastmodData, null, 2)}\n`);
  }
}

// --- 4. Output untuk Publish Worker ---
mkdirSync(join(root, 'automation-output', 'src/content/articles'), { recursive: true });
copyFileSync(articlePath, join(root, 'automation-output', 'src/content/articles', `${slug}.md`));

console.log(`Artikel diperbarui: ${slug}`);
console.log(`lastmod: ${lastmod}`);
