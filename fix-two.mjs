import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesDir = path.join(__dirname, 'src/content/articles');

const fixes = {
  'strategi-pemeliharaan-berbasis-risiko-rcm-fmea-untuk-aset-kritis.md': '2026-10-01T07:00:00Z',
  'riset-ketertelusuran-traceability-mock-recall-prosedur-target-waktu.md': '2026-10-06T07:00:00Z',
};

for (const [filename, utcDate] of Object.entries(fixes)) {
  const filePath = path.join(articlesDir, filename);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const updated = content.replace(/^date:\s*.*$/m, `date: "${utcDate}"`);
    fs.writeFileSync(filePath, updated, 'utf-8');
    console.log(`✓ ${filename} → ${utcDate}`);
  } else {
    console.log(`✗ NOT FOUND: ${filename}`);
  }
}
