export type FaqItem = {
  question: string;
  answer: string;
};

export function getCityFaqs(cityName: string): FaqItem[] {
  return [
    {
      question: `Apakah tersedia pendampingan SMK3 onsite di ${cityName}?`,
      answer: `Kebutuhan pendampingan onsite di ${cityName} dapat dibahas berdasarkan lokasi, jenis usaha, jumlah tenaga kerja, dan tahapan implementasi SMK3 perusahaan.`,
    },
    {
      question: `Apa yang perlu disiapkan sebelum konsultasi SMK3 di ${cityName}?`,
      answer: `Siapkan gambaran proses kerja, struktur organisasi, dokumen K3 yang sudah tersedia, serta catatan insiden atau temuan audit jika ada.`,
    },
    {
      question: `Apakah konsultasi awal untuk perusahaan di ${cityName} dapat dilakukan secara online?`,
      answer: 'Konsultasi awal dapat dilakukan secara online untuk memahami kebutuhan perusahaan sebelum menentukan bentuk pendampingan berikutnya.',
    },
    {
      question: `Layanan SMK3 apa yang dapat dibahas untuk perusahaan di ${cityName}?`,
      answer: 'Ruang lingkup dapat mencakup gap analysis, penyusunan dokumen, HIRADC, pelatihan, audit internal, dan persiapan penilaian sesuai kebutuhan perusahaan.',
    },
  ];
}

export function getCityIsoFaqs(cityName: string): FaqItem[] {
  return [
    {
      question: `Apakah tersedia pendampingan sertifikasi ISO onsite di ${cityName}?`,
      answer: `Kebutuhan pendampingan onsite sertifikasi ISO di ${cityName} dapat dibahas berdasarkan lokasi, standar yang ditargetkan (ISO 45001, 9001, 14001, 27001, dll), ukuran organisasi, dan tahapan implementasi sistem manajemen.`,
    },
    {
      question: `Apa yang perlu disiapkan sebelum konsultasi sertifikasi ISO di ${cityName}?`,
      answer: `Siapkan gambaran proses bisnis, struktur organisasi, dokumen sistem manajemen yang sudah tersedia, catatan audit internal/eksternal sebelumnya, serta data insiden atau ketidaksesuaian jika ada.`,
    },
    {
      question: `Apakah konsultasi awal sertifikasi ISO untuk perusahaan di ${cityName} dapat dilakukan secara online?`,
      answer: 'Konsultasi awal dapat dilakukan secara online untuk memahami kebutuhan perusahaan, menentukan standar yang relevan, dan merencanakan bentuk pendampingan sebelum kunjungan onsite.',
    },
    {
      question: `Standar ISO apa yang dapat dibahas untuk perusahaan di ${cityName}?`,
      answer: 'Kami mendampingi ISO 45001 (K3), ISO 9001 (Mutu), ISO 14001 (Lingkungan), ISO 27001 (Keamanan Informasi), ISO 22000 (Keamanan Pangan), ISO 37001 (Anti Suap), ISO 55001 (Aset), ISO 28000 (Rantai Pasok), ISO 13485 (Alat Kesehatan), ISO 17025 (Laboratorium), ISO 21001 (Pendidikan), IATF 16949 (Otomotif), API Q1/Q2 (Migas), sesuai kebutuhan organisasi.',
    },
  ];
}
