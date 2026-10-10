import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesDir = path.join(__dirname, 'src/content/articles');

const filePath = path.join(articlesDir, 'strategi-pemeliharan-berbasis-risiko-rcm-fmea-untuk-aset-kritis.md');
if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const updated = content.replace(/^date:\s*.*$/m, `date: "2026-10-01T07:00:00Z"`);
  fs.writeFileSync(filePath, updated, 'utf-8');
  console.log('✓ Fixed');
} else {
  console.log('✗ NOT FOUND');
}
