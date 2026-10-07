export interface City {
  slug: string;
  name: string;
  region: Region;
}

export type Region =
  | 'Banten'
  | 'Jakarta & Sekitarnya'
  | 'Jawa Barat'
  | 'Jawa Tengah'
  | 'DI Yogyakarta'
  | 'Jawa Timur';

export const regions: { name: Region; blurb: string }[] = [
  { name: 'Banten', blurb: 'Serang, Cilegon, Pandeglang, Lebak — layanan konsultan K3 onsite & jarak jauh.' },
  { name: 'Jakarta & Sekitarnya', blurb: 'Jakarta, Bogor, Depok, Tangerang, Bekasi — konsultasi SMK3 & ISO 45001 siap 24 jam.' },
  { name: 'Jawa Barat', blurb: 'Bandung, Cikarang, Cirebon, Sukabumi, Tasikmalaya — pendampingan audit & sertifikasi.' },
  { name: 'Jawa Tengah', blurb: 'Semarang, Solo, Purwokerto, Kudus, Salatiga — jasa konsultan K3 terpercaya.' },
  { name: 'DI Yogyakarta', blurb: 'Yogyakarta, Boyolali, Klaten, Sragen — layanan SMK3 & ISO 45001 onsite.' },
  { name: 'Jawa Timur', blurb: 'Surabaya, Malang, Sidoarjo, Mojokerto — konsultasi & pendampingan sertifikasi.' },
];

const raw: [string, Region][] = [
  ['Serang', 'Banten'], ['Anyer', 'Banten'], ['Merak', 'Banten'],
  ['Cilegon', 'Banten'], ['Pandeglang', 'Banten'], ['Lebak', 'Banten'],
  ['Rangkasbitung', 'Banten'], ['Balaraja', 'Banten'],
  ['Jakarta Pusat', 'Jakarta & Sekitarnya'], ['Jakarta Barat', 'Jakarta & Sekitarnya'],
  ['Jakarta Timur', 'Jakarta & Sekitarnya'], ['Jakarta Utara', 'Jakarta & Sekitarnya'],
  ['Jakarta Selatan', 'Jakarta & Sekitarnya'], ['Bogor', 'Jakarta & Sekitarnya'],
  ['Depok', 'Jakarta & Sekitarnya'], ['Tangerang', 'Jakarta & Sekitarnya'],
  ['Bekasi', 'Jakarta & Sekitarnya'],
  ['Cikarang', 'Jawa Barat'], ['Karawang', 'Jawa Barat'], ['Purwakarta', 'Jawa Barat'],
  ['Subang', 'Jawa Barat'], ['Sukabumi', 'Jawa Barat'], ['Bandung', 'Jawa Barat'],
  ['Cianjur', 'Jawa Barat'], ['Ciamis', 'Jawa Barat'], ['Indramayu', 'Jawa Barat'],
  ['Cirebon', 'Jawa Barat'], ['Kuningan', 'Jawa Barat'], ['Garut', 'Jawa Barat'],
  ['Majalengka', 'Jawa Barat'], ['Tasikmalaya', 'Jawa Barat'],
  ['Brebes', 'Jawa Tengah'], ['Tegal', 'Jawa Tengah'], ['Slawi', 'Jawa Tengah'],
  ['Pemalang', 'Jawa Tengah'], ['Pekalongan', 'Jawa Tengah'], ['Batang', 'Jawa Tengah'],
  ['Kendal', 'Jawa Tengah'], ['Semarang', 'Jawa Tengah'], ['Ungaran', 'Jawa Tengah'],
  ['Salatiga', 'Jawa Tengah'], ['Demak', 'Jawa Tengah'], ['Jepara', 'Jawa Tengah'],
  ['Kudus', 'Jawa Tengah'], ['Pati', 'Jawa Tengah'], ['Rembang', 'Jawa Tengah'],
  ['Blora', 'Jawa Tengah'], ['Purwodadi', 'Jawa Tengah'], ['Purwokerto', 'Jawa Tengah'],
  ['Banyumas', 'Jawa Tengah'], ['Purbalingga', 'Jawa Tengah'], ['Banjarnegara', 'Jawa Tengah'],
  ['Cilacap', 'Jawa Tengah'], ['Kebumen', 'Jawa Tengah'], ['Wonosobo', 'Jawa Tengah'],
  ['Temanggung', 'Jawa Tengah'], ['Magelang', 'Jawa Tengah'], ['Purworejo', 'Jawa Tengah'],
  ['Wonogiri', 'Jawa Tengah'], ['Sragen', 'Jawa Tengah'], ['Klaten', 'Jawa Tengah'],
  ['Solo', 'Jawa Tengah'], ['Boyolali', 'Jawa Tengah'],
  ['Yogyakarta', 'DI Yogyakarta'],
  ['Surabaya', 'Jawa Timur'], ['Malang', 'Jawa Timur'], ['Sidoarjo', 'Jawa Timur'],
  ['Mojokerto', 'Jawa Timur'], ['Kediri', 'Jawa Timur'], ['Pasuruan', 'Jawa Timur'],
  ['Probolinggo', 'Jawa Timur'], ['Banyuwangi', 'Jawa Timur'],
];

export const cities: City[] = raw.map(([name, region]) => ({
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  name,
  region,
}));

export function citiesByRegion(region: Region): City[] {
  return cities.filter((c) => c.region === region);
}

export function allRegions(): Region[] {
  return [...new Set(cities.map((c) => c.region))];
}