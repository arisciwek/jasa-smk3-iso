# Standar SEO Website PT. PEI Sinergi Indonesia

SEO (*Search Engine Optimization*) adalah serangkaian teknik untuk meningkatkan visibilitas website di mesin pencari seperti Google agar halaman lebih mudah ditemukan oleh pengguna yang mencari informasi, produk, atau jasa tertentu.

SEO yang baik tidak hanya berfokus pada penempatan kata kunci, tetapi juga mencakup kualitas konten, struktur halaman, optimasi teknis, pengalaman pengguna, dan kredibilitas website.

Dokumen ini adalah standar editorial dan teknis SEO untuk situs PT. PEI Sinergi Indonesia. Terapkan bersama struktur proyek Astro, data perusahaan di `src/data/site.ts`, dan instruksi proyek pada `AGENTS.md`.

Contoh, klaim, URL, dan nama layanan dalam dokumen ini harus disesuaikan dengan halaman yang benar-benar tersedia. Jangan menyalin contoh dari perusahaan atau industri lain ke halaman produksi.

## 1. Rules SEO untuk Struktur Artikel

### 1.1. Gunakan Satu H1 sebagai Judul Utama

* Setiap halaman sebaiknya memiliki satu judul utama yang ditandai dengan tag `<h1>`.
* H1 harus menjelaskan topik utama halaman.
* Masukkan kata kunci utama secara alami.
* Hindari judul yang terlalu panjang dan berulang-ulang.
* Pastikan judul sesuai dengan isi halaman.

Contoh:

```html
<h1>NDT Ultrasonic Testing: Pengertian, Fungsi, dan Prosedur</h1>
```

**Catatan:** Satu H1 merupakan praktik struktur yang baik, bukan persyaratan mutlak Google. Yang terpenting adalah hierarki judul yang jelas dan mudah dipahami.

### 1.2. Susun Heading secara Hierarkis

Gunakan heading sesuai hierarki pembahasan:

* **H1:** Judul utama halaman.
* **H2:** Bagian utama pembahasan.
* **H3:** Subbagian dari H2.
* **H4:** Subbagian dari H3 jika diperlukan.

Contoh:

```html
<h1>NDT Ultrasonic Testing</h1>

<h2>Pengertian NDT Ultrasonic Testing</h2>
<p>Penjelasan mengenai pengujian ultrasonik...</p>

<h2>Fungsi Ultrasonic Testing</h2>

<h3>Deteksi Cacat Internal</h3>
<p>Penjelasan mengenai deteksi cacat...</p>

<h3>Pengukuran Ketebalan Material</h3>
<p>Penjelasan mengenai pengukuran ketebalan...</p>

<h2>Prosedur Ultrasonic Testing</h2>
<p>Penjelasan mengenai prosedur pengujian...</p>
```

Jangan memilih H2 atau H3 hanya karena ukuran hurufnya terlihat bagus. Gunakan CSS untuk mengatur tampilan, sedangkan tag heading digunakan untuk menunjukkan struktur konten.

### 1.3. Gunakan Kata Kunci Utama secara Alami

Kata kunci utama sebaiknya muncul pada bagian yang relevan, misalnya:

* Judul H1.
* Paragraf pembuka.
* Judul SEO (*title tag*).
* URL halaman jika sesuai.
* Salah satu heading jika relevan.
* Isi artikel.
* Meta description jika sesuai.

Contoh kata kunci utama: `NDT Ultrasonic Testing`.

Contoh pembukaan:

> NDT Ultrasonic Testing adalah metode pengujian non-destruktif yang menggunakan gelombang ultrasonik untuk mendeteksi cacat internal pada material tanpa merusak komponen yang diperiksa.

Hindari mengulang kata kunci secara berlebihan hanya untuk meningkatkan peringkat. Praktik tersebut dikenal sebagai *keyword stuffing* dan dapat merusak kualitas konten.

### 1.4. Setiap Heading Harus Memiliki Isi yang Relevan

Setiap H2 sebaiknya diikuti penjelasan yang memperkenalkan topik pada bagian tersebut.

Setelah itu, H3 dapat digunakan untuk menjelaskan aspek yang lebih spesifik.

Contoh struktur yang baik:

```text
H2: Kelebihan dan Kekurangan Ultrasonic Testing
    Paragraf pengantar tentang kelebihan dan kekurangan metode.

    H3: Kelebihan Ultrasonic Testing
        Penjelasan terperinci.

    H3: Kekurangan Ultrasonic Testing
        Penjelasan terperinci.
```

Hindari membuat heading tanpa isi yang memadai atau menambahkan subjudul hanya untuk memperbanyak jumlah kata.

### 1.5. Jangan Terpaku pada Jumlah Kata

Tidak ada jumlah kata minimum universal yang menjamin artikel mendapatkan peringkat tinggi di Google.

Sebagai pedoman praktis:

* Artikel definisi sederhana: jawab pertanyaan secara langsung dan lengkap.
* Artikel edukasi teknis: jelaskan konsep, fungsi, metode, kelebihan, keterbatasan, dan prosedur yang relevan.
* Artikel layanan: jelaskan layanan, manfaat, proses kerja, cakupan, dan cara menghubungi penyedia.
* Artikel panduan: susun langkah-langkah yang benar-benar membantu pembaca menyelesaikan masalahnya.

**Prinsip utamanya:** artikel harus cukup lengkap untuk memenuhi kebutuhan pembaca, bukan sengaja diperpanjang demi mengejar jumlah kata.

## 2. Rules SEO untuk Title Tag dan Meta Description

Keduanya membantu mesin pencari memahami halaman dan dapat memengaruhi bagaimana halaman ditampilkan dalam hasil pencarian. ([Google for Developers][1])

### 2.1. Buat Title Tag yang Unik

Setiap halaman penting sebaiknya memiliki title tag yang berbeda dan menggambarkan isi halaman secara akurat.

Contoh:

```html
<title>NDT Ultrasonic Testing: Fungsi dan Prosedur</title>
```

Rules yang perlu diperhatikan:

* Letakkan topik utama secara alami dalam judul.
* Buat judul spesifik dan mudah dipahami.
* Hindari judul yang sama untuk banyak halaman.
* Jangan mengulang kata kunci secara berlebihan.
* Jangan menjanjikan sesuatu yang tidak dibahas dalam konten.
* Nama perusahaan dapat ditambahkan jika relevan.

Contoh untuk halaman layanan:

```html
<title>Jasa SMK3 PP 50/2012 | PT. PEI Sinergi Indonesia</title>
```

Tidak ada batas karakter yang menjamin title tag akan tampil sepenuhnya. Google dapat memotong atau membuat ulang judul yang ditampilkan sesuai perangkat dan konteks pencarian.

### 2.2. Tulis Meta Description yang Relevan

Meta description adalah ringkasan singkat mengenai isi halaman.

Contoh:

```html
<meta name="description" content="Pelajari metode NDT Ultrasonic Testing, fungsi, prosedur pemeriksaan, serta penerapannya untuk mendeteksi cacat internal pada material.">
```

Rules:

* Buat deskripsi yang unik untuk setiap halaman penting.
* Jelaskan isi halaman dengan akurat.
* Masukkan kata kunci jika sesuai secara alami.
* Tonjolkan manfaat yang benar-benar ditawarkan.
* Hindari menyalin deskripsi yang sama ke seluruh halaman.
* Jangan memenuhi deskripsi dengan daftar kata kunci.

Google terkadang menggunakan meta description untuk membuat snippet, tetapi juga dapat mengambil teks dari isi halaman. Jadi, meta description yang bagus tidak menjamin teks tersebut selalu ditampilkan. ([Google for Developers][1])

## 3. Rules SEO untuk Kata Kunci

### 3.1. Tentukan Satu Kata Kunci Utama untuk Setiap Halaman

Sebagai aturan kerja editorial, tentukan satu topik atau kata kunci utama untuk setiap halaman. Kata kunci tambahan boleh digunakan untuk menjelaskan variasi pencarian dan subtopik yang masih berkaitan.

Contoh:

| Elemen               | Contoh                          |
| -------------------- | ------------------------------- |
| Kata kunci utama     | NDT Ultrasonic Testing          |
| Kata kunci pendukung | Ultrasonic Test                 |
| Kata kunci pendukung | Pengujian ultrasonik            |
| Kata kunci pendukung | Ultrasonic Testing pada welding |
| Kata kunci pendukung | Prosedur Ultrasonic Testing     |

Ini bukan berarti satu halaman hanya boleh memiliki satu kata kunci. Satu halaman dapat muncul untuk banyak variasi pencarian yang memiliki maksud serupa.

### 3.2. Pahami Search Intent

*Search intent* adalah tujuan pengguna ketika melakukan pencarian.

Secara praktis, maksud pencarian dapat dikelompokkan menjadi empat jenis:

| Jenis         | Tujuan pengguna                  | Contoh kata kunci               |
| ------------- | -------------------------------- | ------------------------------- |
| Informasional | Mencari pengetahuan              | Apa itu Ultrasonic Testing      |
| Komersial     | Membandingkan pilihan            | Jasa Ultrasonic Testing terbaik |
| Transaksional | Menggunakan atau membeli layanan | Sewa Water Bag Load Test        |
| Navigasional  | Mencari situs tertentu           | PT. PEI Sinergi Indonesia       |

Sebelum menulis artikel, tentukan apa yang sebenarnya ingin diketahui atau dilakukan pengguna.

Misalnya, halaman dengan kata kunci *NDT Ultrasonic Testing adalah* sebaiknya berfokus pada definisi, fungsi, prinsip kerja, dan penerapan metode tersebut.

Sebaliknya, halaman *Jasa Ultrasonic Testing* perlu menjelaskan layanan, cakupan pemeriksaan, kompetensi penyedia, proses pemesanan, dan cara menghubungi perusahaan.

**Jangan membuat artikel yang hanya mengejar kata kunci tetapi tidak menjawab kebutuhan pencari.**

### 3.3. Hindari Keyword Stuffing

Contoh yang kurang baik:

> Jasa Ultrasonic Testing adalah jasa Ultrasonic Testing terbaik untuk kebutuhan jasa Ultrasonic Testing dengan layanan Ultrasonic Testing profesional.

Contoh yang lebih baik:

> Ultrasonic Testing merupakan metode pengujian non-destruktif untuk mendeteksi indikasi cacat di dalam material. Pemeriksaan ini dapat diterapkan pada berbagai komponen, termasuk sambungan las, sesuai prosedur dan kebutuhan inspeksi.

Google tidak menggunakan meta tag `keywords` untuk menentukan peringkat pencarian web. Karena itu, Anda tidak perlu mengisi tag tersebut dengan daftar kata kunci. ([Google for Developers][2])

## 4. Rules SEO untuk URL

URL yang baik membantu pengguna memahami isi halaman sebelum membukanya.

Contoh yang baik:

```text
https://example.com/jasa-ultrasonic-testing/
https://example.com/sewa-water-bag/
https://example.com/load-test-crane/
```

Contoh yang kurang informatif:

```text
https://example.com/page?id=12345
```

Terapkan aturan berikut:

1. Gunakan URL yang singkat dan deskriptif.
2. Pisahkan kata dengan tanda hubung (`-`).
3. Hindari parameter yang tidak diperlukan.
4. Gunakan pola URL yang konsisten.
5. Hindari mengubah URL yang sudah memiliki trafik tanpa perencanaan pengalihan.
6. Pastikan URL utama setiap halaman konsisten.

Contoh:

```text
/jasa-ultrasonic-testing/
```

Hindari membuat banyak URL untuk halaman yang sebenarnya memiliki konten sama.

Jika konten yang sama dapat diakses melalui beberapa URL, gunakan pengalihan permanen atau `rel="canonical"` sesuai situasi untuk membantu menentukan URL utama. ([Google for Developers][3])

## 5. Rules SEO untuk Kualitas Konten

Bagian ini merupakan salah satu aspek terpenting dalam SEO.

### 5.1. Buat Konten yang Bermanfaat bagi Pembaca

Artikel sebaiknya dibuat untuk membantu pembaca, bukan sekadar memenuhi target produksi konten atau mengejar peringkat.

Pastikan konten:

* Menjawab pertanyaan utama secara langsung.
* Memiliki penjelasan yang cukup mendalam.
* Tidak berisi pengulangan yang tidak diperlukan.
* Menggunakan bahasa yang mudah dipahami.
* Menyertakan contoh jika membantu pemahaman.
* Menghindari klaim tanpa dasar.
* Diperbarui jika informasi penting berubah.

Google menganjurkan konten yang bermanfaat, dapat dipercaya, dan mengutamakan manusia. Konten orisinal dengan informasi yang bernilai lebih baik daripada sekadar mengulang materi yang sudah tersedia di situs lain. ([Google for Developers][4])

### 5.2. Jangan Menyalin Artikel dari Website Lain

Menyalin artikel secara utuh dari kompetitor bukan strategi konten yang baik.

Untuk website jasa teknik, tambahkan nilai yang berasal dari pengetahuan dan pengalaman nyata, misalnya:

* Penjelasan proses pemeriksaan.
* Contoh penerapan di lapangan.
* Foto kegiatan inspeksi yang benar-benar dilakukan.
* Penjelasan peralatan yang digunakan.
* Batasan metode pengujian.
* Standar atau regulasi yang relevan.
* Informasi layanan perusahaan yang dapat diverifikasi.

Konten yang membahas topik sama tidak otomatis dianggap duplikat hanya karena menggunakan istilah teknis serupa. Yang perlu dihindari adalah produksi halaman yang tidak memberikan nilai tambahan atau hanya dibuat untuk memanipulasi hasil pencarian.

### 5.3. Pastikan Informasi Teknis Akurat

Untuk topik seperti K3, NDT, bejana tekan, boiler, crane, dan riksa uji lingkungan kerja, akurasi lebih penting daripada sekadar panjang artikel.

Contohnya, artikel mengenai Ultrasonic Testing perlu membedakan:

* Prinsip kerja pengujian.
* Jenis material dan komponen yang dapat diperiksa.
* Kemampuan serta keterbatasan metode.
* Kualifikasi personel jika relevan.
* Prosedur dan standar pemeriksaan yang berlaku.

Jangan mencantumkan standar, sertifikasi, atau klaim kompetensi perusahaan jika tidak dapat dibuktikan.

### 5.4. Gunakan Informasi Penulis dan Perusahaan yang Jelas

Untuk artikel teknis, kredibilitas dapat diperkuat melalui informasi yang transparan, seperti:

* Nama penulis atau penanggung jawab teknis.
* Profil perusahaan.
* Pengalaman atau kompetensi yang relevan.
* Referensi standar dan sumber resmi.
* Tanggal publikasi dan pembaruan jika bermakna.
* Informasi kontak yang dapat diverifikasi.

Informasi ini membantu pembaca menilai keandalan konten. Namun, tidak ada jaminan bahwa penambahan elemen tersebut secara langsung akan menaikkan peringkat.

## 6. Rules SEO untuk Internal Linking

Internal linking adalah tautan yang menghubungkan satu halaman dengan halaman lain dalam website yang sama.

Contoh untuk website PT. PEI Sinergi Indonesia:

```text
Artikel: NDT Ultrasonic Testing
    ↓
Jasa Pengujian Non-Destruktif
    ↓
PJK3 Riksa Uji
    ↓
Halaman Kontak
```

### 6.1. Hubungkan Artikel yang Relevan

Misalnya, dalam artikel *NDT Ultrasonic Testing*, Anda dapat memberikan tautan menuju halaman yang membahas jasa Pengujian Non-Destruktif.

Contoh HTML:

```html
<p>
  Untuk kebutuhan pemeriksaan material, pelajari juga
  <a href="/jasa-pengujian-non-destruktif/">
    jasa Pengujian Non-Destruktif
  </a>
  yang tersedia.
</p>
```

### 6.2. Gunakan Anchor Text yang Deskriptif

Anchor text adalah teks yang dapat diklik pada sebuah tautan.

Contoh yang baik:

```html
<a href="/jasa-ultrasonic-testing/">
  Jasa Ultrasonic Testing
</a>
```

Contoh yang kurang informatif:

```html
<a href="/jasa-ultrasonic-testing/">
  Klik di sini
</a>
```

Anchor text sebaiknya menjelaskan isi halaman tujuan secara alami.

### 6.3. Hindari Internal Linking Berlebihan

Jangan menautkan setiap kemunculan kata kunci ke URL yang sama. Tambahkan tautan ketika memang membantu pembaca menemukan informasi lanjutan.

Google menggunakan tautan untuk menemukan halaman dan memahami hubungan antarkonten. Karena itu, pastikan halaman penting dapat dijangkau melalui tautan yang dapat dirayapi oleh mesin pencari. ([Google for Developers][4])

## 7. Rules SEO untuk Gambar

Gambar membantu menjelaskan informasi sekaligus memberikan peluang agar konten ditemukan melalui Google Images.

### 7.1. Gunakan Nama File yang Deskriptif

Contoh:

```text
ultrasonic-testing-welding.jpg
water-bag-load-test-crane.jpg
riksa-uji-lingkungan-kerja.jpg
```

Hindari nama file generik seperti:

```text
IMG_001.jpg
image123.jpg
photo-final-new.jpg
```

### 7.2. Gunakan Alt Text yang Relevan

Alt text adalah deskripsi gambar yang ditulis dalam atribut `alt`.

Contoh:

```html
<img
  src="/images/water-bag-load-test-crane.jpg"
  alt="Pengujian beban crane menggunakan water bag"
  width="1200"
  height="800"
  loading="lazy"
>
```

Rules:

* Jelaskan isi gambar secara akurat.
* Gunakan kata kunci hanya jika sesuai dengan gambar.
* Jangan mengisi alt text dengan daftar kata kunci.
* Gunakan `alt=""` untuk gambar dekoratif yang tidak memberikan informasi tambahan.
* Pastikan gambar ditempatkan dekat dengan teks yang menjelaskannya.

**Penting:** jangan menggunakan alt text yang tidak sesuai dengan gambar hanya demi SEO.

Google menyarankan penggunaan gambar yang berkualitas, relevan, dan disertai deskripsi yang membantu memahami konteksnya. ([Google for Developers][5])

## 8. Rules SEO Teknis

SEO tidak hanya berkaitan dengan artikel. Website juga harus dapat diakses, dirayapi, dan diindeks dengan benar.

### 8.1. Pastikan Website Dapat Diindeks

Periksa beberapa hal berikut:

* Halaman dapat diakses oleh Googlebot.
* Tidak ada `noindex` yang tidak disengaja.
* Robots.txt tidak menghalangi perayapan halaman penting.
* Halaman tidak membutuhkan autentikasi untuk dibaca jika memang ditujukan bagi publik.
* URL yang ingin muncul di Google mengembalikan respons yang sesuai.
* Konten utama dapat dibaca dan dipahami mesin pencari.

Perlu dibedakan antara *crawling*, *indexing*, dan *ranking*. Halaman yang dapat dirayapi belum tentu diindeks, dan halaman yang sudah diindeks belum tentu mendapatkan posisi tinggi.

### 8.2. Buat XML Sitemap

XML sitemap membantu mesin pencari menemukan URL penting di website.

Contoh:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://example.com/</loc>
  </url>

  <url>
    <loc>https://example.com/jasa-ultrasonic-testing/</loc>
  </url>

  <url>
    <loc>https://example.com/sewa-water-bag/</loc>
  </url>

</urlset>
```

Contoh tersebut merupakan struktur dasar. Untuk website sebenarnya, masukkan URL kanonis yang ingin diindeks dan pastikan tidak memasukkan halaman yang tidak relevan, halaman privat, atau URL yang dialihkan.

Setelah itu, daftarkan sitemap melalui Google Search Console.

Sitemap membantu proses penemuan URL, tetapi tidak menjamin semua URL akan diindeks. ([Google for Developers][3])

`lastmod` bersifat opsional, tetapi aturan penggunaannya harus dibedakan dengan jelas:

* Jika halaman sudah memiliki tanggal pembaruan yang valid, pertahankan tanggal tersebut sampai terjadi perubahan signifikan berikutnya.
* Jika halaman diperbarui secara signifikan, ubah `lastmod` ke tanggal pembaruan baru dan sinkronkan dengan `dateModified` jika schema halaman memilikinya.
* Jika halaman belum pernah memiliki tanggal pembaruan yang dapat dipercaya, tag `<lastmod>` boleh tidak dicantumkan.
* Jangan menghapus `lastmod` lama hanya karena build berjalan, dan jangan menggantinya dengan waktu build.

### 8.3. Optimalkan Kecepatan Website

Periksa performa website menggunakan PageSpeed Insights dan laporan Core Web Vitals.

Hal yang perlu diperhatikan:

* Ukuran gambar terlalu besar.
* JavaScript yang memblokir rendering.
* CSS yang tidak diperlukan.
* Waktu respons server.
* Pemakaian font web.
* Pemrosesan halaman yang terlalu berat.
* Pergeseran tata letak saat halaman dimuat.

Sebagai target praktis Core Web Vitals, gunakan nilai berikut:

| Metrik                            | Target yang baik |
| --------------------------------- | ---------------: |
| LCP (*Largest Contentful Paint*)  |      ≤ 2,5 detik |
| INP (*Interaction to Next Paint*) |  ≤ 200 milidetik |
| CLS (*Cumulative Layout Shift*)   |            ≤ 0,1 |

Nilai tersebut dievaluasi pada persentil ke-75 pengalaman pengguna, bukan sekadar hasil satu kali pengujian di komputer pengembang.

Kecepatan bukan satu-satunya faktor penentu peringkat. Namun, performa yang baik membantu memberikan pengalaman penggunaan yang lebih baik.

### 8.4. Pastikan Website Mobile-Friendly

Website harus nyaman digunakan pada ponsel maupun komputer.

Periksa:

* Teks mudah dibaca tanpa memperbesar layar.
* Menu navigasi berfungsi.
* Tombol dapat digunakan dengan mudah.
* Konten utama tersedia pada versi mobile.
* Gambar menyesuaikan ukuran layar.
* Tidak ada elemen yang keluar dari batas layar.

Google menggunakan versi mobile sebagai dasar utama pengindeksan website. ([Google for Developers][6])

### 8.5. Gunakan Canonical URL dengan Benar

Canonical membantu menunjukkan URL utama ketika konten yang sama atau sangat mirip tersedia melalui beberapa URL.

Contoh:

```html
<link
  rel="canonical"
  href="https://example.com/jasa-ultrasonic-testing/"
>
```

Gunakan URL kanonis yang benar-benar mewakili halaman tersebut. Jangan mengarahkan seluruh halaman ke satu canonical hanya demi mengonsolidasikan SEO karena tindakan itu dapat menyebabkan halaman lain dianggap bukan versi utama.

### 8.6. Pastikan Status HTTP dan Lingkungan Deployment Benar

Sebelum halaman dipublikasikan, periksa hal-hal berikut:

* Halaman utama dan halaman penting mengembalikan status `200`.
* URL lama yang dipindahkan menggunakan redirect permanen `301` dan tidak membentuk redirect chain.
* Halaman yang benar-benar dihapus mengembalikan `404` atau `410` yang sesuai.
* Canonical, sitemap, Open Graph, dan structured data memakai domain produksi yang sama.
* Tidak ada mixed content atau URL `.lan` pada output produksi.
* Link internal menggunakan elemen `<a href>` yang dapat dirayapi.
* Konten penting tersedia pada HTML hasil render dan tidak bergantung pada klik atau scroll JavaScript.
* Halaman kategori atau arsip yang kosong/tipis tidak dipaksakan masuk indeks.

Lingkungan development boleh memblokir crawling melalui `robots.txt`, tetapi aturan tersebut wajib ditinjau ulang saat rilis. `robots.txt` tidak boleh menjadi satu-satunya mekanisme untuk mencegah indeksasi URL; gunakan `noindex` jika diperlukan.

## 9. Rules SEO untuk Structured Data

Structured data adalah data terstruktur yang membantu mesin pencari memahami informasi pada sebuah halaman.

Untuk website perusahaan, jenis yang mungkin relevan antara lain:

* `Organization` untuk informasi organisasi.
* `LocalBusiness` jika sesuai dengan jenis dan karakteristik bisnis.
* `BreadcrumbList` untuk struktur navigasi.
* `Article` atau `BlogPosting` untuk artikel.
* `Product` untuk halaman produk yang memenuhi persyaratan terkait.

Pemetaan yang digunakan pada proyek ini:

| Jenis halaman | Markup yang dapat digunakan | Syarat utama |
| --- | --- | --- |
| Semua halaman | `WebSite` dan identitas `Organization`/`LocalBusiness` | Informasi perusahaan nyata dan konsisten |
| Halaman layanan | `Service` | Layanan benar-benar dijelaskan pada halaman |
| Artikel | `Article` atau `BlogPosting` | Penulis, tanggal, judul, gambar, dan isi terlihat |
| Halaman bertingkat | `BreadcrumbList` | Breadcrumb terlihat dan URL-nya benar |
| FAQ | `FAQPage` | Semua pertanyaan dan jawaban terlihat di halaman |

`FAQPage` boleh dipakai untuk membantu pemahaman mesin pencari, tetapi jangan menjanjikan FAQ rich result. Google membatasi tampilan FAQ rich result terutama pada situs pemerintah dan kesehatan yang berotoritas.

Contoh sederhana untuk identitas perusahaan:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PT. PEI Sinergi Indonesia",
  "url": "https://example.com/"
}
</script>
```

Ganti `https://example.com/` dengan domain resmi perusahaan dan tambahkan properti lainnya hanya jika informasinya benar.

Rules:

1. Data terstruktur harus sesuai dengan informasi halaman.
2. Jangan mencantumkan informasi palsu.
3. Gunakan tipe schema yang sesuai.
4. Validasi implementasinya.
5. Jangan menganggap structured data sebagai jaminan mendapatkan rich results.

Untuk artikel, jangan menghasilkan properti kosong atau fiktif. `datePublished`, `dateModified`, `author`, `publisher`, dan `image` harus berasal dari data yang benar; URL gambar dan URL halaman harus absolut pada output produksi. Setelah perubahan schema, periksa HTML di `dist/` dan gunakan Rich Results Test serta URL Inspection.

Structured data membantu Google memahami konten dan dapat membuat halaman memenuhi syarat untuk tampilan hasil pencarian tertentu. Namun, Google tidak menjamin tampilan khusus tersebut akan muncul. ([Google for Developers][6])

## 10. Rules SEO untuk Backlink

Backlink adalah tautan dari website lain yang mengarah ke website Anda.

Backlink dapat membantu penemuan halaman dan menjadi salah satu sinyal yang digunakan dalam sistem pencarian. Namun, jumlah backlink saja tidak cukup untuk menentukan kualitas profil tautan.

### Praktik yang Disarankan

* Dapatkan tautan dari website yang relevan.
* Buat konten yang layak dijadikan referensi.
* Bangun hubungan dengan organisasi atau komunitas industri.
* Publikasikan studi kasus yang dapat diverifikasi.
* Pastikan profil perusahaan tercantum secara konsisten di sumber yang tepercaya.

### Praktik yang Perlu Dihindari

* Membeli backlink secara massal untuk memanipulasi peringkat.
* Menggunakan jaringan website berkualitas rendah untuk membangun tautan.
* Membuat komentar spam dengan tautan.
* Mengulang anchor text kata kunci secara tidak wajar.
* Membuat artikel tidak berkualitas hanya untuk menanam backlink.

Tujuannya bukan sekadar mendapatkan sebanyak mungkin tautan, melainkan membangun reputasi dan referensi yang wajar serta relevan.

## 11. Rules SEO untuk Menghindari Spam

Google memiliki kebijakan spam yang perlu diperhatikan saat membuat konten dan mengelola website.

Hindari praktik seperti:

* **Keyword stuffing:** mengulang kata kunci secara berlebihan.
* **Cloaking:** menampilkan konten berbeda kepada mesin pencari dan pengguna untuk memanipulasi hasil pencarian.
* **Doorway pages:** membuat banyak halaman yang menargetkan variasi kata kunci serupa untuk mengarahkan pengguna ke tujuan yang sama.
* **Link spam:** membuat tautan untuk memanipulasi peringkat.
* **Scaled content abuse:** memproduksi konten dalam skala besar tanpa nilai tambah yang memadai untuk memanipulasi peringkat, termasuk ketika menggunakan AI.
* **Scraped content:** mengambil konten pihak lain tanpa memberikan nilai tambah yang berarti.
* **Hidden text:** menyembunyikan kata kunci atau tautan dengan tujuan memanipulasi mesin pencari.

Menggunakan AI untuk menulis artikel bukan otomatis pelanggaran. Yang menjadi masalah adalah penggunaan otomatisasi untuk menghasilkan banyak halaman tanpa nilai yang memadai, terutama ketika tujuan utamanya memanipulasi hasil pencarian.

Rujukan utama untuk praktik tersebut adalah [Google Search Essentials](https://developers.google.com/search/docs/essentials). ([Google for Developers][7])

## 12. Rules SEO untuk Website Perusahaan Jasa

Untuk website PT. PEI Sinergi Indonesia, SEO sebaiknya tidak hanya mengejar trafik, tetapi juga menghasilkan pengunjung yang membutuhkan layanan perusahaan.

### 12.1. Buat Halaman Layanan yang Spesifik

Jika perusahaan menawarkan beberapa jenis layanan, buat halaman tersendiri untuk setiap layanan utama.

Contoh struktur:

```text
/
├── jasa-riksa-uji/
├── jasa-pjk3-riksa-uji/
├── jasa-pengujian-non-destruktif/
│   ├── ultrasonic-testing/
│   ├── magnetic-particle-testing/
│   └── eddy-current-testing/
├── sewa-water-bag/
├── load-test-crane/
└── kontak/
```

Struktur di atas merupakan contoh pengelompokan, bukan aturan URL yang wajib diikuti.

Pastikan setiap halaman memberikan informasi yang cukup berbeda dan bermanfaat. Jangan membuat banyak halaman yang hanya mengganti nama kota atau kata kunci sementara isinya hampir sama.

### 12.2. Tampilkan Informasi Layanan secara Lengkap

Halaman layanan sebaiknya menjelaskan:

* Apa layanan yang ditawarkan.
* Apa tujuan dan manfaatnya.
* Apa saja cakupan pekerjaan.
* Bagaimana proses pelaksanaannya.
* Apa persyaratan atau batasan yang relevan.
* Bagaimana calon pelanggan menghubungi perusahaan.

Jika perusahaan memiliki dokumentasi yang dapat dipublikasikan, tambahkan foto kegiatan, contoh peralatan, studi kasus, atau penjelasan proses kerja yang nyata.

### 12.3. Gunakan CTA yang Jelas

CTA (*Call to Action*) membantu pengunjung mengambil langkah berikutnya.

Contoh:

> Membutuhkan pendampingan SMK3? Hubungi PT. PEI Sinergi Indonesia untuk mendiskusikan kebutuhan organisasi dan tahapan kerja yang sesuai.

CTA dapat diarahkan ke halaman kontak atau WhatsApp resmi perusahaan.

Jangan membuat klaim seperti *terbaik*, *termurah*, atau *nomor satu* tanpa dasar yang dapat dipertanggungjawabkan.

### 12.4. Jangan Membuat Halaman Kota sebagai Doorway Page

Halaman berdasarkan kota hanya boleh dibuat jika perusahaan benar-benar melayani wilayah tersebut dan halaman memberi konteks lokal yang berguna. Setiap halaman kota harus memiliki perbedaan substantif, misalnya cakupan layanan, konteks industri, proses onsite, atau kebutuhan regulasi setempat. Mengganti nama kota pada template yang sama tanpa nilai tambahan tidak diperbolehkan.

### 12.5. Aturan SEO Lokal dan NAP

Nama perusahaan, alamat, nomor telepon, email, dan area layanan harus konsisten pada halaman kontak, structured data, Google Business Profile, dan profil eksternal yang tepercaya. Jangan menambahkan alamat cabang, kantor, ulasan, atau area layanan yang tidak dapat diverifikasi. `LocalBusiness` hanya boleh merepresentasikan bisnis dan lokasi nyata.

### 12.6. Aturan Konten Regulasi dan K3

Karena situs membahas K3 dan regulasi, setiap artikel yang memuat ketentuan hukum atau standar wajib:

* menyebutkan nama, nomor, dan tahun regulasi secara akurat;
* menggunakan sumber resmi atau referensi primer;
* membedakan kutipan aturan, interpretasi teknis, dan opini;
* mencantumkan tanggal berlaku atau pembaruan jika relevan;
* menjalani pemeriksaan penulis atau reviewer teknis;
* tidak membuat klaim “resmi”, “terakreditasi”, “bersertifikat”, atau “berwenang” tanpa bukti.

Jika informasi regulasi berubah, perbarui isi utama, tanggal pembaruan, dan `lastmod` secara bersamaan.

## 13. Aturan Gambar untuk Proyek Ini

Gunakan aset SVG yang sudah tersedia di `public/assets/images/` untuk ilustrasi layanan, halaman, dan artikel kecuali ada kebutuhan format lain. Setiap tujuan penting harus memiliki aset kontekstualnya sendiri; jangan memakai satu ilustrasi generik untuk semua layanan.

Setiap gambar wajib memiliki:

* nama file yang deskriptif;
* `alt` yang menjelaskan subjek dan konteks, bukan daftar kata kunci;
* `width` dan `height` untuk membantu mencegah layout shift;
* `loading="lazy"` hanya jika gambar tidak berada di area awal yang langsung terlihat;
* URL yang benar-benar ada di output `dist/`.

Gambar dekoratif harus memakai `alt=""`. Gambar hero, logo, dan gambar utama artikel tidak boleh dilazy-load secara otomatis jika hal itu memperlambat konten utama.

---

## 14. Checklist SEO Sebelum Artikel Dipublikasikan

Berikut checklist praktis yang bisa digunakan setiap kali menerbitkan artikel.

| No. | Pemeriksaan                                                   | Status |
| --: | ------------------------------------------------------------- | :----: |
|   1 | Artikel menjawab kebutuhan pencari                            |    ☐   |
|   2 | Memiliki satu topik utama yang jelas                          |    ☐   |
|   3 | H1 menjelaskan isi artikel                                    |    ☐   |
|   4 | Title tag unik dan relevan                                    |    ☐   |
|   5 | Meta description sesuai isi                                   |    ☐   |
|   6 | Kata kunci digunakan secara alami                             |    ☐   |
|   7 | Struktur H2 dan H3 mudah dipahami                             |    ☐   |
|   8 | Setiap bagian heading memiliki penjelasan yang relevan        |    ☐   |
|   9 | Informasi akurat dan dapat dipercaya                          |    ☐   |
|  10 | Tidak menyalin artikel lain                                   |    ☐   |
|  11 | URL deskriptif dan konsisten                                  |    ☐   |
|  12 | Gambar relevan dan memiliki alt text yang sesuai              |    ☐   |
|  13 | Ada internal link yang relevan                                |    ☐   |
|  14 | Tautan eksternal, jika ada, menuju sumber yang tepercaya      |    ☐   |
|  15 | Halaman nyaman digunakan di perangkat mobile                  |    ☐   |
|  16 | Halaman tidak memiliki masalah teknis yang menghalangi indeks |    ☐   |
|  17 | Canonical URL benar jika diperlukan                           |    ☐   |
|  18 | Structured data valid jika digunakan                          |    ☐   |
|  19 | CTA sesuai dengan tujuan halaman                              |    ☐   |
|  20 | URL masuk dalam sitemap jika layak diindeks                   |    ☐   |

Tidak semua poin berlaku untuk setiap jenis halaman. Misalnya, CTA komersial tidak selalu diperlukan untuk artikel informasional, sedangkan structured data bukan persyaratan universal.

## 15. Checklist Rilis Produksi

Sebelum domain produksi dibuka untuk mesin pencari, verifikasi:

| Pemeriksaan | Status |
| --- | :---: |
| Domain produksi dan HTTPS sudah aktif | ☐ |
| `robots.txt` tidak memblokir halaman publik | ☐ |
| Sitemap hanya memuat URL kanonis yang dapat diindeks | ☐ |
| `lastmod` mencerminkan perubahan signifikan, bukan waktu build | ☐ |
| Canonical seluruh halaman mengarah ke domain produksi | ☐ |
| Tidak ada URL `.lan`, staging, atau placeholder pada HTML | ☐ |
| Structured data lolos validasi dan sesuai konten terlihat | ☐ |
| Semua gambar yang dirujuk tersedia dan memiliki alt yang tepat | ☐ |
| URL penting berstatus 200 dan tidak memiliki broken link | ☐ |
| Properti sudah diverifikasi di Google Search Console | ☐ |

## 16. Pantau Hasil SEO Setelah Publikasi

SEO tidak selesai setelah artikel diterbitkan. Performa halaman perlu dipantau untuk mengetahui apakah halaman ditemukan, diindeks, dan menghasilkan kunjungan yang relevan.

Gunakan beberapa alat berikut:

| Alat                  | Kegunaan                                                                           |
| --------------------- | ---------------------------------------------------------------------------------- |
| Google Search Console | Memantau impresi, klik, kueri pencarian, posisi rata-rata, dan status pengindeksan |
| Google Analytics      | Menganalisis kunjungan dan perilaku pengguna                                       |
| PageSpeed Insights    | Memeriksa performa halaman dan Core Web Vitals                                     |
| Rich Results Test     | Menguji kelayakan structured data untuk fitur hasil kaya yang didukung             |

Prioritaskan masalah yang benar-benar menghambat performa, misalnya halaman penting tidak terindeks, pengunjung tidak menemukan informasi yang dibutuhkan, atau halaman layanan mendapatkan impresi tetapi sedikit klik.

Perlu diingat bahwa perubahan SEO biasanya membutuhkan waktu untuk dievaluasi. Tidak ada teknik yang menjamin halaman langsung masuk peringkat pertama. ([Google for Developers][3])

---

## 17. Ringkasan Prioritas SEO

Jika Anda ingin menerapkan SEO secara sistematis, saya menyarankan urutan prioritas berikut.

| Prioritas | Fokus               | Tindakan                                                           |
| --------- | ------------------- | ------------------------------------------------------------------ |
| 1         | Kualitas konten     | Pastikan artikel akurat, orisinal, dan menjawab kebutuhan pengguna |
| 2         | Search intent       | Sesuaikan isi dengan tujuan pencarian                              |
| 3         | Struktur halaman    | Rapikan H1, H2, H3, dan paragraf                                   |
| 4         | On-page SEO         | Optimalkan title tag, meta description, dan URL                    |
| 5         | Internal linking    | Hubungkan artikel dan halaman layanan yang berkaitan               |
| 6         | SEO teknis          | Pastikan crawling, indexing, canonical, dan sitemap berfungsi      |
| 7         | Pengalaman pengguna | Perbaiki kecepatan dan tampilan mobile                             |
| 8         | Kredibilitas        | Tambahkan referensi, informasi perusahaan, dan bukti kompetensi    |
| 9         | Promosi             | Bangun visibilitas dan backlink yang wajar                         |
| 10        | Evaluasi            | Pantau data dan perbaiki halaman berdasarkan hasil                 |

### Saran khusus untuk pola artikel Anda

Karena Anda sering membuat artikel SEO teknis, saya menyarankan agar Anda memiliki **standar editorial SEO yang konsisten** untuk setiap artikel:

1. H1 menjelaskan topik utama dan mengandung kata kunci jika relevan.
2. Paragraf pertama langsung menjawab pertanyaan utama.
3. Setiap H2 memiliki satu paragraf pengantar yang menjelaskan cakupan pembahasan.
4. H3 digunakan untuk memecah topik menjadi subbagian yang relevan.
5. Jumlah paragraf setiap H3 menyesuaikan kebutuhan materi, bukan dipaksakan sama.
6. Kata kunci digunakan secara alami tanpa target kepadatan tertentu.
7. Informasi teknis dilengkapi penjelasan, contoh, atau referensi jika diperlukan.
8. Internal link diarahkan ke halaman yang benar-benar berkaitan.
9. Artikel layanan memuat informasi perusahaan dan CTA yang relevan.
10. Sebelum publikasi, lakukan pemeriksaan kualitas konten dan SEO teknis.

Pola tersebut merupakan standar kerja yang baik untuk menjaga konsistensi produksi konten, bukan formula yang secara otomatis menjamin peringkat Google.

**Hal terpenting:** jangan menjadikan SEO sebagai kegiatan memasukkan kata kunci sebanyak mungkin. Jadikan SEO sebagai proses membuat halaman yang tepat, dengan informasi yang tepat, untuk orang yang tepat, sekaligus memastikan mesin pencari dapat memahami dan mengakses halaman tersebut.

[1]: https://developers.google.com/search/docs/fundamentals/seo-starter-guide "SEO Starter Guide | Google Search Central"
[2]: https://developers.google.com/search/docs/essentials "Google Search Essentials | Google Search Central"
[3]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap "Build and Submit a Sitemap | Google Search Central"
[4]: https://developers.google.com/search/docs/appearance/links "Google Search Central: Links"
[5]: https://developers.google.com/search/docs/appearance/google-images "Image SEO Best Practices | Google Search Central"
[6]: https://developers.google.com/search/docs/fundamentals/get-on-google "Technical Requirements | Google Search Central"
[7]: https://developers.google.com/search/docs/essentials/spam-policies "Spam Policies for Google Web Search | Google Search Central"
