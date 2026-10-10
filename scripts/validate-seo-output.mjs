import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const failures = [];

function walk(directory) {
  const files = [];
  for (const name of readdirSync(directory)) {
    const file = join(directory, name);
    if (statSync(file).isDirectory()) files.push(...walk(file));
    else if (name === 'index.html') files.push(file);
  }
  return files;
}

const pages = walk(join(root, 'dist'));
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const route = `/${relative(join(root, 'dist'), file).replace(/index\.html$/, '')}`;
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) failures.push(`${route}: expected 1 H1, found ${h1Count}`);
  if (!html.includes('<title>')) failures.push(`${route}: missing title`);
  if (!html.includes('<meta name="description"')) failures.push(`${route}: missing description`);
  if (!html.includes('<link rel="canonical"')) failures.push(`${route}: missing canonical`);
  if (!html.includes('property="og:image"')) failures.push(`${route}: missing og:image`);
  if (!html.includes('property="og:image:alt"')) failures.push(`${route}: missing og:image:alt`);
  if (!html.includes('property="og:image:width"')) failures.push(`${route}: missing og:image:width`);
  if (!html.includes('property="og:image:height"')) failures.push(`${route}: missing og:image:height`);
  if (!html.includes('property="og:image:type"')) failures.push(`${route}: missing og:image:type`);
  const isCityServicePage = route.startsWith('/artikel/jasa-smk3-') || route.startsWith('/artikel/jasa-iso-');
  if (route.startsWith('/artikel/') && !isCityServicePage && !route.includes('/kategori/') && !['/artikel/', '/artikel/smk3/', '/artikel/iso-45001/'].includes(route) && !html.includes('property="og:type" content="article"')) {
    failures.push(`${route}: article page must use og:type=article`);
  }
  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(image[0])) failures.push(`${route}: image without alt`);
  }
}

const citySource = readFileSync(join(root, 'src/data/cities.ts'), 'utf8');
const cities = [...citySource.matchAll(/\['([^']+)', '([^']+)'\]/g)].map((match) => match[1].toLowerCase().replace(/\s+/g, '-'));
for (const slug of cities) {
  const fileSmk3 = join(root, 'src/data/jasa-smk3', `${slug}.json`);
  if (!existsSync(fileSmk3)) {
    failures.push(`city/${slug}: missing jasa-smk3 content file`);
    continue;
  }
  const dataSmk3 = JSON.parse(readFileSync(fileSmk3, 'utf8'));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataSmk3.lastmod || '')) failures.push(`city/${slug}: invalid jasa-smk3 lastmod`);
  if (!Array.isArray(dataSmk3.paragraphs) || dataSmk3.paragraphs.length < 3) failures.push(`city/${slug}: fewer than 3 jasa-smk3 paragraphs`);
  if ((dataSmk3.paragraphs || []).some((paragraph) => typeof paragraph.text !== 'string' || paragraph.text.trim().length < 120)) {
    failures.push(`city/${slug}: jasa-smk3 paragraph is too short`);
  }

  const fileIso = join(root, 'src/data/jasa-iso', `${slug}.json`);
  if (!existsSync(fileIso)) {
    failures.push(`city/${slug}: missing jasa-iso content file`);
    continue;
  }
  const dataIso = JSON.parse(readFileSync(fileIso, 'utf8'));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataIso.lastmod || '')) failures.push(`city/${slug}: invalid jasa-iso lastmod`);
  if (!Array.isArray(dataIso.paragraphs) || dataIso.paragraphs.length < 3) failures.push(`city/${slug}: fewer than 3 jasa-iso paragraphs`);
  if ((dataIso.paragraphs || []).some((paragraph) => typeof paragraph.text !== 'string' || paragraph.text.trim().length < 120)) {
    failures.push(`city/${slug}: jasa-iso paragraph is too short`);
  }
}

if (failures.length > 0) {
  console.error(`SEO validation failed (${failures.length} issue(s)):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO validation passed: ${pages.length} pages and ${cities.length} city data files.`);
