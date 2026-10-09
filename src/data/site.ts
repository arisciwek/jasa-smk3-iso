export const site = {
  name: import.meta.env.PUBLIC_SITE_NAME || 'SMK3 & ISO 45001 Indonesia',
  company: import.meta.env.PUBLIC_COMPANY_NAME || 'PT. PEI Sinergi Indonesia',
  phone: import.meta.env.PUBLIC_PHONE || '+62 21 555 1234',
  wa: import.meta.env.PUBLIC_WA_NUMBER || '6281234567890',
  email: import.meta.env.PUBLIC_EMAIL || 'info@smk3-iso.com',
  address: import.meta.env.PUBLIC_ADDRESS || 'Jl. Jendral Sudirman No. 88, Jakarta Selatan',
  addressLocality: import.meta.env.PUBLIC_ADDRESS_LOCALITY || 'Jakarta Selatan',
  addressRegion: import.meta.env.PUBLIC_ADDRESS_REGION || 'DKI Jakarta',
  postalCode: import.meta.env.PUBLIC_POSTAL_CODE || '12190',
  waLink: (text = 'Halo, saya ingin konsultasi Jasa SMK3') => 
    `https://wa.me/${site.wa || '6281234567890'}?text=${encodeURIComponent(text)}`
};
