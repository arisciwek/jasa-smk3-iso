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
