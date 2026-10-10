import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'src/data/cities.ts'), 'utf8');
const contentDir = path.join(root, 'src/data/jasa-iso');
const lastmod = process.env.CONTENT_LASTMOD || '2026-10-09';

const cities = [...source.matchAll(/\['([^']+)', '([^']+)'\]/g)].map((match) => ({
  name: match[1],
  region: match[2],
  slug: match[1].toLowerCase().replace(/\s+/g, '-'),
}));

const focuses = [
  'pemetaan proses, risiko, dan peluang organisasi',
  'kesiapan dokumen sistem, rekaman, dan bukti penerapan yang sudah tersedia',
  'keterlibatan pekerja dan komunikasi dalam sistem manajemen',
  'kesiapan konsultasi onsite, akses lokasi, dan penanggung jawab lapangan',
  'pengendalian proses, pemantauan, dan tindakan koreksi',
  'koordinasi dengan pemasok, kontraktor, dan pihak terkait lainnya',
  'evaluasi kepatuhan, audit internal, dan tindakan perbaikan',
  'penyusunan indikator kinerja dan pelaporan manajemen',
  'keterhubungan antara dokumen sistem, pelatihan, dan praktik lapangan',
  'kesiapan komunikasi dan koordinasi tim lintas fungsi',
  'pengukuran kemajuan penerapan agar rencana kerja dapat diperiksa kembali',
  'kesiapan persiapan audit sertifikasi eksternal',
];

const approaches = [
  'mulai dari data yang dapat diperiksa dan hindari asumsi tentang sektor usaha setempat',
  'gunakan informasi yang diberikan perusahaan dan tandai hal yang masih perlu diverifikasi',
  'pisahkan kebutuhan umum sistem manajemen dari kebutuhan yang hanya berlaku pada proses tertentu',
  'tetapkan keluaran konsultasi sebelum menentukan bentuk kunjungan atau pendampingan',
  'hubungkan setiap rekomendasi dengan pemilik tindakan dan bukti penyelesaian',
  'bandingkan dokumen sistem dengan praktik lapangan sebelum menyimpulkan adanya kesenjangan',
  'dokumentasikan batasan informasi agar rencana kerja tetap realistis dan dapat dipertanggungjawabkan',
  'utamakan pengendalian yang paling berdampak terhadap risiko utama organisasi',
  'jadikan hasil pembahasan sebagai dasar agenda tindak lanjut, bukan sekadar catatan pertemuan',
  'tinjau ulang informasi ketika proses, personel, peralatan, atau area kerja berubah',
  ' gunakan bahasa yang dapat dipahami pekerja dan tidak hanya memenuhi istilah dokumen',
  'pastikan kesimpulan dapat ditelusuri kembali ke bukti yang dikumpulkan',
];

fs.mkdirSync(contentDir, { recursive: true });

for (const [index, city] of cities.entries()) {
  const file = path.join(contentDir, `${city.slug}.json`);
  if (fs.existsSync(file)) {
    const current = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (current.paragraphs?.length >= 3 && current.lastmod) continue;
  }

  const focus = focuses[index % focuses.length];
  const approach = approaches[index % approaches.length];
  const nextFocus = focuses[(index + 3) % focuses.length];
  const data = {
    slug: city.slug,
    lastmod,
    nextTopic: 'editorial-review',
    completedTopics: ['baseline-jasa-iso'],
    paragraphs: [
      {
        topic: 'konteks-lokal',
        text: `Halaman layanan sertifikasi ISO untuk organisasi di ${city.name}, ${city.region}, menggunakan lokasi sebagai titik awal percakapan, bukan sebagai klaim tentang jenis industri tertentu. Pembahasan perlu memeriksa ${focus} agar cakupan pendampingan sesuai dengan kondisi perusahaan yang meminta layanan sertifikasi.`,
      },
      {
        topic: 'kesiapan-perusahaan',
        text: `Sebelum meminta pendampingan sertifikasi ISO di ${city.name}, perusahaan sebaiknya menyiapkan ringkasan proses, struktur organisasi, dokumen sistem yang sudah tersedia, serta catatan audit atau temuan sebelumnya. Pendekatan yang aman adalah ${approach}.`,
      },
      {
        topic: 'rencana-tindak-lanjut',
        text: `Rencana kerja sertifikasi untuk organisasi di ${city.name} dapat diarahkan pada ${nextFocus}. Hasil awal perlu diterjemahkan menjadi prioritas, penanggung jawab, batas waktu, dan bukti penerapan sehingga pendampingan onsite maupun jarak jauh dapat ditinjau secara objektif sebelum audit sertifikasi eksternal dilaksanakan.`,
      },
    ],
  };
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Konten Jasa ISO disiapkan: ${city.name}`);
}

console.log(`Konten Jasa ISO coverage: ${cities.length} kota diperiksa.`);