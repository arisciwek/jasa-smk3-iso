import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesDir = path.join(__dirname, 'src/content/articles');

const dateMap = {
  'hirarki-pengendalian-risiko.md': '2026-09-01T07:00:00Z',
  'hiradc-dasar.md': '2026-09-02T07:00:00Z',
  'membangun-budaya-lapor-bahaya.md': '2026-09-03T07:00:00Z',
  'studi-kasus-komunikasi-k3.md': '2026-09-04T07:00:00Z',
  'studi-kasus-temuan-audit.md': '2026-09-05T07:00:00Z',
  'membaca-kewajiban-smk3.md': '2026-09-06T07:00:00Z',
  'kesiapan-konsultasi-onsite.md': '2026-09-07T07:00:00Z',
  'update-pp-50-2012.md': '2026-09-08T07:00:00Z',
  'jasa-smk3-berdasarkan-kota.md': '2026-09-09T07:00:00Z',
  'cara-menyusun-hiradc.md': '2026-09-10T07:00:00Z',
  'dokumen-wajib-smk3.md': '2026-09-11T07:00:00Z',
  'audit-internal-vs-eksternal-smk3.md': '2026-09-12T07:00:00Z',
  'checklist-audit-internal-k3.md': '2026-09-13T07:00:00Z',
  'mengelola-ketidaksesuaian-ncr-agar-bukan-sekadar-arsip.md': '2026-09-14T07:00:00Z',
  'pemetaan-proses-berbasis-risiko-dari-flowchart-ke-risk-based-thinking.md': '2026-09-15T07:00:00Z',
  'analisis-konteks-organisasi-klausul-41-42-untuk-iso-45001.md': '2026-09-16T07:00:00Z',
  'iso-45001-vs-smk3-pp-50-2012-mana-yang-dulu-bisa-bersamaan.md': '2026-09-17T07:00:00Z',
  'audit-internal-iso-9001-yang-menemukan-masalah-nyata-bukan-ceklis.md': '2026-09-18T07:00:00Z',
  'identifikasi-aspek-dampak-lingkungan-metode-praktis-untuk-pabrik-kantor.md': '2026-09-19T07:00:00Z',
  'studi-kasus-efisiensi-energi-reduksi-limbah-sebagai-hasil-iso-14001.md': '2026-09-20T07:00:00Z',
  'kepatuhan-hukum-lingkungan-membangun-legal-register-yang-hidup.md': '2026-09-21T07:00:00Z',
  'kontrol-annex-a-2022-perubahan-dari-2013-implementasi-praktis.md': '2026-09-22T07:00:00Z',
  'persiapan-audit-sertifikasi-iso-27001-bukti-yang-harus-siap.md': '2026-09-23T07:00:00Z',
  'inventarisasi-aset-informasi-penilaian-risiko-fondasi-isms.md': '2026-09-24T07:00:00Z',
  'inventarisasi-klasifikasi-aset-hierarki-aset-yang-mendukung-keputusan.md': '2026-09-25T07:00:00Z',
  'membangun-budaya-anti-suap-dari-kebijakan-ke-perilaku-harian.md': '2026-09-26T07:00:00Z',
  'penilaian-risiko-penyuapan-metode-contoh-untuk-perusahaan-konstruksi-proyek.md': '2026-09-27T07:00:00Z',
  'uji-tuntas-due-diligence-mitra-bisnis-checklist-praktis.md': '2026-09-28T07:00:00Z',
  'audit-internal-organisasi-pendidikan-mengukur-efektivitas-sistem.md': '2026-09-29T07:00:00Z',
  'kepatuhan-regulasi-pendidikan-membangun-sistem-yang-selalu-sesuai.md': '2026-09-30T07:00:00Z',
  'strategi-pemeliharan-berbasis-risiko-rcm-fmea-untuk-aset-kritis.md': '2026-10-01T07:00:00Z',
  'manajemen-siklus-hidup-aset-dari-perencanaan-hingga-penghapusan.md': '2026-10-02T07:00:00Z',
  'penilaian-risiko-keamanan-rantai-pasok-dari-pabrik-ke-pelanggan.md': '2026-10-03T07:00:00Z',
  'keamanan-fisik-akses-kontrol-gudang-area-muat-transportasi.md': '2026-10-04T07:00:00Z',
  'kesiapsiagaan-pemulihan-gangguan-rantai-pasok-business-continuity.md': '2026-10-05T07:00:00Z',
  'riset-ketertelusuran-traceability-mock-recall-prosedur-target-waktu.md': '2026-10-06T07:00:00Z',
  'haccp-vs-iso-22000-integrasi-prp-oprp-dan-ccp-dalam-satu-sistem.md': '2026-10-07T07:00:00Z',
  'studi-kasus-penarikan-produk-kontaminasi-allergen-dan-perbaikan-sistem.md': '2026-10-08T07:00:00Z',
  'penetapan-batas-kritis-critical-limbs-berbasis-data-bukan-asumsi.md': '2026-10-09T07:00:00Z',
  'verifikasi-validasi-haccp-audit-internal-tinjauan-manajemen-yang-efektif.md': '2026-10-09T07:00:00Z',
  '7-prinsip-haccp-panduan-langkah-demi-langkah-untuk-pabrik-makanan-kecil-menengah.md': '2026-10-09T07:00:00Z',
  'validasi-proses-produksi-sterilisasi-kalibrasi-dan-pengujian.md': '2026-10-10T07:00:00Z',
  'validasi-metode-pengujian-standarisasi-prosedur-laboratorium.md': '2026-10-10T07:00:00Z',
  'persiapan-audit-laboratorium-standar-iso-17025-checklist-dan-strategi.md': '2026-10-10T07:00:00Z',
  'kualifikasi-pemasok-untuk-perangkat-medis-standar-yang-lebih-tinggi.md': '2026-10-10T07:00:00Z',
  'manajemen-kalibrasi-alat-ukur-sistem-yang-mendukung-keandalan-data.md': '2026-10-10T07:00:00Z',
  'manajemen-pasca-pasar-pelaporan-kecelakaan-kepatuhan-regulasi.md': '2026-10-10T07:00:00Z',
  'manajemen-supplier-migas-standar-yang-lebih-tinggi.md': '2026-10-10T07:00:00Z',
  'manajemen-supplier-otomotif-standar-yang-lebih-tinggi.md': '2026-10-10T07:00:00Z',
  'persiapan-audit-sertifikasi-api-q1-checklist-dan-strategi.md': '2026-10-10T07:00:00Z',
  'persiapan-audit-sertifikasi-api-q2-checklist-dan-strategi.md': '2026-10-10T07:00:00Z',
  'persiapan-audit-sertifikasi-iatf-16949-checklist-dan-strategi.md': '2026-10-10T07:00:00Z',
  'manajemen-kepuasan-pelanggan-pendidikan-umpan-balik-yang-berdampak.md': '2026-10-10T07:00:00Z',
};

function updateLastmod(filePath, newDate) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Update lastmod field
  const updated = content.replace(/^lastmod:\s*.*$/m, `lastmod: "${newDate}"`);
  if (content === updated) {
    console.log(`  ⚠ No lastmod field found in ${path.basename(filePath)}`);
  } else {
    fs.writeFileSync(filePath, updated, 'utf-8');
    console.log(`  ✓ ${path.basename(filePath)} lastmod → ${newDate}`);
  }
}

console.log('Updating article lastmod...');
let count = 0;
for (const [filename, utcDate] of Object.entries(dateMap)) {
  const filePath = path.join(articlesDir, filename);
  if (fs.existsSync(filePath)) {
    updateLastmod(filePath, utcDate);
    count++;
  } else {
    console.log(`  ✗ NOT FOUND: ${filename}`);
  }
}
console.log(`\nUpdated ${count} articles.`);
