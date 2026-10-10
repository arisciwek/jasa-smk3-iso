import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const source = readFileSync(join(root, 'src/data/cities.ts'), 'utf8');
const contentDir = join(root, 'src/data/jasa-smk3');
const lastmod = process.env.CONTENT_LASTMOD || '2026-10-09';

const cities = [...source.matchAll(/\['([^']+)', '([^']+)'\]/g)].map((match) => ({
  name: match[1],
  region: match[2],
  slug: match[1].toLowerCase().replace(/\s+/g, '-'),
}));

const focuses = [
  'pemetaan aktivitas kerja dan titik keputusan yang berisiko',
  'kesiapan dokumen, rekaman, dan bukti penerapan yang sudah tersedia',
  'pembagian tanggung jawab antara manajemen, pengawas, dan pekerja',
  'kesiapan konsultasi onsite, akses lokasi, dan penanggung jawab lapangan',
  'pengendalian pekerjaan rutin, nonrutin, dan perubahan kondisi operasi',
  'koordinasi perusahaan dengan kontraktor atau pihak lain di lokasi kerja',
  'pemeriksaan hasil inspeksi, pelaporan bahaya, dan tindak lanjutnya',
  'penyusunan prioritas perbaikan berdasarkan risiko, bukan urutan dokumen',
  'kesiapan audit internal dan cara memastikan temuan memiliki pemilik',
  'keterhubungan antara HIRADC, prosedur kerja, pelatihan, dan pengawasan',
  'kesiapan komunikasi K3 bagi tim yang bekerja dalam pola dan lokasi berbeda',
  'pengukuran kemajuan penerapan agar rencana kerja dapat diperiksa kembali',
];

const approaches = [
  'mulai dari data yang dapat diperiksa dan hindari asumsi tentang sektor usaha setempat',
  'gunakan informasi yang diberikan perusahaan dan tandai hal yang masih perlu diverifikasi',
  'pisahkan kebutuhan umum sistem K3 dari kebutuhan yang hanya berlaku pada proses tertentu',
  'tetapkan keluaran konsultasi sebelum menentukan bentuk kunjungan atau pendampingan',
  'hubungkan setiap rekomendasi dengan pemilik tindakan dan bukti penyelesaiannya',
  'bandingkan dokumen dengan praktik lapangan sebelum menyimpulkan adanya kesenjangan',
  'dokumentasikan batasan informasi agar rencana kerja tetap realistis dan dapat dipertanggungjawabkan',
  'utamakan pengendalian yang paling berdampak terhadap risiko utama organisasi',
  'jadikan hasil pembahasan sebagai dasar agenda tindak lanjut, bukan sekadar catatan pertemuan',
  'tinjau ulang informasi ketika proses, personel, peralatan, atau area kerja berubah',
  'gunakan bahasa yang dapat dipahami pekerja dan tidak hanya memenuhi istilah dokumen',
  'pastikan kesimpulan dapat ditelusuri kembali ke bukti yang dikumpulkan',
];

mkdirSync(contentDir, { recursive: true });

for (const [index, city] of cities.entries()) {
  const file = join(contentDir, `${city.slug}.json`);
  if (existsSync(file)) {
    const current = JSON.parse(readFileSync(file, 'utf8'));
    if (current.paragraphs?.length >= 3 && current.lastmod) continue;
  }

  const focus = focuses[index % focuses.length];
  const approach = approaches[index % approaches.length];
  const nextFocus = focuses[(index + 3) % focuses.length];
  const data = {
    slug: city.slug,
    lastmod,
    nextTopic: 'editorial-review',
    completedTopics: ['baseline-jasa-smk3'],
    paragraphs: [
      {
        topic: 'konteks-lokal',
        text: `Halaman layanan SMK3 untuk organisasi di ${city.name}, ${city.region}, menggunakan lokasi sebagai titik awal percakapan, bukan sebagai klaim tentang jenis industri tertentu. Pembahasan perlu memeriksa ${focus} agar cakupan pendampingan sesuai dengan kondisi perusahaan yang meminta layanan.`,
      },
      {
        topic: 'kesiapan-perusahaan',
        text: `Sebelum meminta pendampingan di ${city.name}, perusahaan sebaiknya menyiapkan ringkasan aktivitas kerja, jumlah pekerja, area yang akan dibahas, dokumen K3, dan target penilaian. Pendekatan yang aman adalah ${approach}.`,
      },
      {
        topic: 'rencana-tindak-lanjut',
        text: `Rencana kerja untuk organisasi di ${city.name} dapat diarahkan pada ${nextFocus}. Hasil awal perlu diterjemahkan menjadi prioritas, penanggung jawab, batas waktu, dan bukti penerapan sehingga pendampingan onsite maupun jarak jauh dapat ditinjau secara objektif.`,
      },
    ],
  };
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Konten Jasa SMK3 disiapkan: ${city.name}`);
}

console.log(`Konten Jasa SMK3 coverage: ${cities.length} kota diperiksa.`);
