export const site = {
  name: import.meta.env.PUBLIC_SITE_NAME || 'SMK3 & ISO 45001 Indonesia',
  company: import.meta.env.PUBLIC_COMPANY_NAME || 'PT. PEI Sinergi Indonesia',
  phone: import.meta.env.PUBLIC_PHONE || '+62 81183396807',
  wa: import.meta.env.PUBLIC_WA_NUMBER || import.meta.env.PUBLIC_PHONE?.replace(/\D/g, '') || '6281183396807',
  email: import.meta.env.PUBLIC_EMAIL || 'info@smk3-iso.com',
  address: import.meta.env.PUBLIC_ADDRESS || 'Apatmenen Taman Semanan Indah; Blok Anggrek Lt. 2 Unit 3 (ANG 2.3); Jl. Taman Semanan Raya, Duri Kosambi, Kec. Cengkareng, Jakarta Barat',
  addressLocality: import.meta.env.PUBLIC_ADDRESS_LOCALITY || 'Cengkareng',
  addressRegion: import.meta.env.PUBLIC_ADDRESS_REGION || 'DKI Jakarta',
  postalCode: import.meta.env.PUBLIC_POSTAL_CODE || '11750',
  waLink: (text = 'Halo, saya ingin konsultasi Jasa SMK3') =>
    `https://wa.me/${site.wa}?text=${encodeURIComponent(text)}`
};
