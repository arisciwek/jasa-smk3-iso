export type ServiceCategory = {
  name: string;
  description: string;
  services: Service[];
};

export type Service = {
  slug: string;
  name: string;
  serviceType: string;
  category: string;
  summary: string;
  description: string;
  scope: string[];
  image: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    name: 'K3 dan Keselamatan Kerja',
    description: 'Pendampingan untuk membangun, menerapkan, dan mengevaluasi sistem manajemen K3.',
    services: [
      {
        slug: 'smk3', name: 'SMK3 PP 50/2012', serviceType: 'Pendampingan penerapan SMK3', category: 'K3 dan Keselamatan Kerja',
        summary: 'Struktur, dokumen, penerapan, dan kesiapan penilaian SMK3.',
        description: 'Pendampingan penerapan Sistem Manajemen Keselamatan dan Kesehatan Kerja sesuai PP Nomor 50 Tahun 2012, disesuaikan dengan risiko dan kondisi operasional perusahaan.',
        scope: ['Gap analysis dan pemetaan kondisi awal', 'Penyusunan lima elemen SMK3 dan dokumen pendukung', 'Program kerja K3, pelatihan, inspeksi, dan audit internal', 'Persiapan penilaian dan tindak lanjut temuan'], image: '/assets/images/service-smk3.svg'
      },
      {
        slug: 'iso-45001', name: 'ISO 45001:2018', serviceType: 'Pendampingan sistem manajemen K3 ISO 45001', category: 'K3 dan Keselamatan Kerja',
        summary: 'Sistem manajemen K3 berbasis risiko, konsultasi, dan persiapan sertifikasi.',
        description: 'Pendampingan penerapan ISO 45001:2018 untuk membantu organisasi mengendalikan risiko K3, melibatkan pekerja, dan membangun perbaikan berkelanjutan.',
        scope: ['Analisis konteks, risiko, dan peluang K3', 'Penyusunan atau penyesuaian informasi terdokumentasi', 'Penerapan pengendalian operasional dan kesiapsiagaan darurat', 'Audit internal, tinjauan manajemen, dan persiapan audit sertifikasi'], image: '/assets/images/service-iso-45001.svg'
      },
    ],
  },
  {
    name: 'Sistem Manajemen ISO',
    description: 'Layanan implementasi dan pendampingan sistem manajemen untuk kebutuhan organisasi yang beragam.',
    services: [
      { slug: 'iso-9001', name: 'ISO 9001:2015', serviceType: 'Pendampingan sistem manajemen mutu', category: 'Sistem Manajemen ISO', summary: 'Pengendalian proses, kepuasan pelanggan, dan peningkatan mutu.', description: 'Pendampingan sistem manajemen mutu agar proses organisasi konsisten, terukur, dan terus diperbaiki.', scope: ['Pemetaan proses dan risiko mutu', 'Pengendalian dokumen, pemasok, dan ketidaksesuaian', 'Audit internal dan tinjauan manajemen'], image: '/assets/images/service-iso-9001.svg' },
      { slug: 'iso-14001', name: 'ISO 14001:2015', serviceType: 'Pendampingan sistem manajemen lingkungan', category: 'Sistem Manajemen ISO', summary: 'Pengelolaan aspek lingkungan, limbah, emisi, dan kepatuhan.', description: 'Pendampingan sistem manajemen lingkungan untuk mengendalikan dampak operasional dan meningkatkan kinerja lingkungan.', scope: ['Identifikasi aspek dan dampak lingkungan', 'Pengendalian limbah, emisi, dan keadaan darurat', 'Evaluasi kepatuhan dan program lingkungan'], image: '/assets/images/service-iso-14001.svg' },
      { slug: 'iso-27001', name: 'ISO/IEC 27001:2022', serviceType: 'Pendampingan sistem manajemen keamanan informasi', category: 'Sistem Manajemen ISO', summary: 'Perlindungan kerahasiaan, integritas, dan ketersediaan informasi.', description: 'Pendampingan penerapan sistem manajemen keamanan informasi berbasis risiko untuk melindungi aset informasi organisasi.', scope: ['Inventarisasi aset dan penilaian risiko', 'Penyusunan kontrol keamanan dan prosedur insiden', 'Audit internal dan persiapan sertifikasi'], image: '/assets/images/service-iso-27001.svg' },
      { slug: 'iso-37001', name: 'ISO 37001:2016', serviceType: 'Pendampingan sistem manajemen antisuap', category: 'Sistem Manajemen ISO', summary: 'Kerangka pencegahan, deteksi, dan penanganan risiko penyuapan.', description: 'Pendampingan penerapan sistem manajemen antisuap dengan pengendalian yang sesuai terhadap risiko dan proses bisnis organisasi.', scope: ['Penilaian risiko penyuapan', 'Uji tuntas mitra bisnis dan pengendalian pembayaran', 'Pelaporan, investigasi, audit, dan tindakan koreksi'], image: '/assets/images/service-iso-37001.svg' },
      { slug: 'iso-55001', name: 'ISO 55001:2014', serviceType: 'Pendampingan sistem manajemen aset', category: 'Sistem Manajemen ISO', summary: 'Pengelolaan aset sepanjang siklus hidup berdasarkan biaya, risiko, dan kinerja.', description: 'Pendampingan sistem manajemen aset untuk membantu organisasi menjaga keandalan dan nilai asetnya.', scope: ['Inventarisasi dan klasifikasi aset', 'Penilaian kondisi, risiko, dan kebutuhan pemeliharaan', 'Pemantauan kinerja serta perencanaan investasi'], image: '/assets/images/service-iso-55001.svg' },
      { slug: 'iso-28000', name: 'ISO 28000:2022', serviceType: 'Pendampingan sistem manajemen keamanan rantai pasok', category: 'Sistem Manajemen ISO', summary: 'Pengendalian ancaman terhadap operasi, aset, personel, dan barang.', description: 'Pendampingan sistem manajemen keamanan rantai pasok untuk meningkatkan kesiapsiagaan dan ketahanan operasional.', scope: ['Penilaian risiko keamanan rantai pasok', 'Pengendalian akses, gudang, transportasi, dan mitra', 'Kesiapsiagaan serta pemulihan gangguan'], image: '/assets/images/service-iso-28000.svg' },
    ],
  },
  {
    name: 'Keamanan Pangan',
    description: 'Pendampingan pengendalian bahaya dan sistem keamanan pangan dari hulu hingga hilir.',
    services: [
      { slug: 'iso-22000', name: 'ISO 22000:2018', serviceType: 'Pendampingan sistem manajemen keamanan pangan', category: 'Keamanan Pangan', summary: 'Keamanan pangan sepanjang rantai makanan.', description: 'Pendampingan sistem manajemen keamanan pangan untuk mengendalikan bahaya dari penerimaan bahan hingga distribusi produk.', scope: ['Identifikasi bahaya dan program prasyarat', 'Pengendalian proses, ketertelusuran, dan penarikan produk', 'Audit internal dan peningkatan sistem'], image: '/assets/images/service-iso-22000.svg' },
      { slug: 'haccp', name: 'HACCP', serviceType: 'Pendampingan penerapan HACCP', category: 'Keamanan Pangan', summary: 'Analisis bahaya dan pengendalian titik kritis proses pangan.', description: 'Pendampingan penerapan HACCP untuk mengidentifikasi bahaya keamanan pangan dan menetapkan pengendalian pada titik kritis.', scope: ['Analisis bahaya dan penetapan CCP', 'Batas kritis, pemantauan, dan tindakan koreksi', 'Verifikasi serta pengendalian rekaman'], image: '/assets/images/service-haccp.svg' },
    ],
  },
  {
    name: 'Laboratorium, Pendidikan, dan Alat Kesehatan',
    description: 'Pendampingan untuk organisasi dengan persyaratan kompetensi teknis atau layanan pendidikan khusus.',
    services: [
      { slug: 'iso-13485', name: 'ISO 13485:2016', serviceType: 'Pendampingan sistem manajemen mutu alat kesehatan', category: 'Laboratorium, Pendidikan, dan Alat Kesehatan', summary: 'Mutu dan kepatuhan proses pada organisasi alat kesehatan.', description: 'Pendampingan sistem manajemen mutu untuk organisasi yang mendesain, memproduksi, mendistribusikan, atau melayani alat kesehatan.', scope: ['Pengendalian desain dan proses produksi', 'Ketertelusuran, pemasok, dan validasi proses', 'Keluhan, ketidaksesuaian, dan tindakan koreksi'], image: '/assets/images/service-iso-13485.svg' },
      { slug: 'iso-17025', name: 'ISO/IEC 17025:2017', serviceType: 'Pendampingan akreditasi laboratorium', category: 'Laboratorium, Pendidikan, dan Alat Kesehatan', summary: 'Kompetensi laboratorium pengujian dan kalibrasi.', description: 'Pendampingan kesiapan akreditasi laboratorium untuk membuktikan kompetensi, ketidakberpihakan, dan keabsahan hasil.', scope: ['Kesiapan personel, metode, dan peralatan', 'Ketertelusuran metrologi dan ketidakpastian', 'Pengendalian mutu serta pelaporan hasil'], image: '/assets/images/service-iso-17025.svg' },
      { slug: 'iso-21001', name: 'ISO 21001:2018', serviceType: 'Pendampingan sistem manajemen organisasi pendidikan', category: 'Laboratorium, Pendidikan, dan Alat Kesehatan', summary: 'Mutu layanan pembelajaran dan kepuasan peserta didik.', description: 'Pendampingan sistem manajemen organisasi pendidikan dan pelatihan untuk meningkatkan mutu layanan pembelajaran.', scope: ['Perencanaan dan evaluasi pembelajaran', 'Kompetensi pengajar dan pengelolaan fasilitas', 'Pengukuran hasil serta kepuasan peserta didik'], image: '/assets/images/service-iso-21001.svg' },
    ],
  },
  {
    name: 'Industri Khusus',
    description: 'Pendampingan standar dengan persyaratan khusus untuk sektor otomotif dan minyak dan gas.',
    services: [
      { slug: 'iatf-16949', name: 'IATF 16949', serviceType: 'Pendampingan sistem manajemen mutu otomotif', category: 'Industri Khusus', summary: 'Pengendalian mutu dan risiko pada rantai pasok otomotif.', description: 'Pendampingan penerapan persyaratan mutu khusus industri otomotif yang mengacu pada ISO 9001.', scope: ['Pencegahan cacat dan pengendalian variasi proses', 'APQP, PPAP, FMEA, MSA, dan SPC sesuai kebutuhan', 'Ketertelusuran, perubahan, dan tindakan koreksi'], image: '/assets/images/service-iatf-16949.svg' },
      { slug: 'api-q1', name: 'API Q1', serviceType: 'Pendampingan sistem manajemen mutu produk industri migas', category: 'Industri Khusus', summary: 'Mutu organisasi pemasok produk industri minyak dan gas.', description: 'Pendampingan kesiapan sistem mutu untuk organisasi yang memproduksi produk bagi industri minyak dan gas sesuai skema API.', scope: ['Perencanaan realisasi produk dan pengendalian desain', 'Pengendalian manufaktur, pemasok, dan pengujian', 'Ketertelusuran, perubahan, dan ketidaksesuaian'], image: '/assets/images/service-api-q1.svg' },
      { slug: 'api-q2', name: 'API Q2', serviceType: 'Pendampingan sistem manajemen mutu jasa migas', category: 'Industri Khusus', summary: 'Mutu organisasi penyedia jasa teknis industri minyak dan gas.', description: 'Pendampingan kesiapan sistem mutu bagi penyedia jasa lapangan dan layanan teknis industri minyak dan gas.', scope: ['Perencanaan dan pelaksanaan layanan', 'Kompetensi personel serta kesiapan peralatan', 'Pengendalian risiko, subkontraktor, dan kegagalan layanan'], image: '/assets/images/service-api-q2.svg' },
    ],
  },
];

export const services = serviceCategories.flatMap((category) => category.services);

export const getService = (slug: string) => services.find((service) => service.slug === slug);
