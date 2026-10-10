# Arsitektur Orchestrator dan Worker Konten

Dokumen ini menetapkan workflow pembuatan, pembaruan, validasi, dan publikasi konten untuk situs PT. PEI Sinergi Indonesia.

Tujuan utama arsitektur ini adalah:

* memisahkan tugas berdasarkan jenis konten;
* mencegah dua proses mengubah target yang sama secara bersamaan;
* menjaga konsistensi metadata SEO;
* memastikan `dateModified`, `lastmod`, dan sitemap mewakili perubahan yang benar-benar terjadi;
* menyediakan jejak audit untuk setiap perubahan.

## 1. Model Komponen

```text
                         +----------------------+
                         |      Orchestrator     |
                         | schedule, queue, lock |
                         +----------+-----------+
                                    |
          +-------------------------+-------------------------+
          |                         |                         |
          v                         v                         v
 +------------------+      +------------------+      +------------------+
 | Article Worker   |      | City Worker      |      | Service Worker   |
 | artikel Markdown |      | halaman kota     |      | halaman layanan  |
 +------------------+      +------------------+      +------------------+
          |                         |                         |
          +-------------------------+-------------------------+
                                    v
                         +----------------------+
                         |   SEO Validator      |
                         | schema, link, content|
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Review / Approval    |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Publish Worker       |
                         | build, sitemap, test |
                         +----------------------+
```

## 2. Tanggung Jawab Orchestrator

Orchestrator adalah satu-satunya komponen yang mengatur urutan workflow. Orchestrator tidak menulis isi konten secara langsung.

Tanggung jawabnya:

1. Menerima pemicu jadwal, permintaan manual, atau perubahan data.
2. Membuat job dengan `jobId` yang unik.
3. Menentukan worker berdasarkan `contentType`.
4. Memastikan target tidak sedang dikunci oleh job lain.
5. Menjalankan dependency secara berurutan.
6. Mengirim job ke validator setelah worker selesai.
7. Menahan publikasi jika validasi atau approval gagal.
8. Menjalankan publish hanya setelah seluruh pekerjaan dalam batch siap.
9. Menyimpan status, percobaan, error, dan hasil setiap job.

Contoh job:

```json
{
  "jobId": "article-update-pp-50-2012-20261008-001",
  "contentType": "article",
  "operation": "update",
  "target": "update-pp-50-2012",
  "sourcePath": "src/content/articles/update-pp-50-2012.md",
  "requestedAt": "2026-10-08T09:00:00+07:00",
  "status": "queued"
}
```

## 3. Worker Berdasarkan Jenis Konten

### 3.1. Article Worker

Target utama:

```text
src/content/articles/*.md
```

Tugas:

* membuat atau memperbarui artikel;
* menetapkan `title`, `description`, `date`, `lastmod`, `author`, `category`, dan `image`;
* memastikan satu topik utama dan search intent yang jelas;
* memastikan heading, internal link, CTA, dan referensi teknis sesuai;
* memperbarui `lastmod` hanya jika isi utama atau metadata SEO penting berubah;
* menyiapkan data yang akan menghasilkan `dateModified` pada schema `Article`.

### 3.2. City Worker

Target utama:

```text
src/data/cities.ts
src/data/jasa-smk3/*.json
src/pages/artikel/jasa-smk3-[slug].astro
```

Tugas:

* membuat atau memperbarui konten kota;
* memastikan kota benar-benar termasuk area layanan;
* menambahkan konteks lokal yang substantif;
* mencegah halaman kota hanya mengganti nama kota pada template yang sama;
* menetapkan `lastmod` pada data kota jika konten lokal berubah;
* memastikan `dateModified` pada schema halaman kota menggunakan tanggal yang sama;
* memastikan FAQ lokal benar-benar terlihat pada halaman.

Worker ini tidak boleh membuat halaman kota massal tanpa konteks lokal yang dapat diverifikasi.

### 3.3. Service Worker

Target utama:

```text
src/data/services.ts
src/pages/layanan/
public/assets/images/service-*.svg
```

Tugas:

* membuat atau memperbarui halaman layanan;
* menetapkan metadata halaman dan tanggal pembaruan;
* memastikan schema `Service` sesuai dengan isi halaman;
* memastikan setiap layanan memiliki aset gambar khusus;
* memeriksa cakupan, proses, manfaat, batasan, CTA, dan kontak;
* memperbarui `lastmod` hanya ketika informasi layanan benar-benar berubah.

Jika halaman layanan belum memiliki penyimpanan tanggal khusus, worker wajib menambahkannya melalui sumber data yang disepakati sebelum publikasi.

### 3.4. SEO Validator Worker

Validator tidak membuat konten baru. Validator memeriksa hasil worker berdasarkan aturan SEO.

Pemeriksaan minimum:

* title dan description unik;
* H1 dan struktur heading valid;
* canonical benar;
* URL tidak duplikat;
* gambar tersedia dan alt text sesuai;
* internal link tidak rusak;
* structured data valid;
* `dateModified` dan `lastmod` sinkron;
* halaman tidak menghasilkan klaim regulasi tanpa sumber;
* halaman kota memiliki perbedaan substantif;
* tidak ada placeholder, domain `.lan`, atau contoh perusahaan yang tertinggal.

### 3.5. Publish Worker

Publish Worker adalah satu-satunya worker yang boleh menjalankan publikasi final.

Tugas:

1. Menggabungkan perubahan yang sudah disetujui.
2. Menjalankan `npm run build`.
3. Membaca tanggal pembaruan dari output halaman.
4. Menulis `<lastmod>` ke sitemap hanya untuk URL dengan tanggal valid.
5. Memastikan `<lastmod>` sama dengan `dateModified` halaman terkait.
6. Memeriksa canonical, schema, aset, sitemap, dan status output.
7. Menghentikan publikasi jika pemeriksaan gagal.

Worker ini tidak boleh menetapkan semua tanggal ke waktu build.

## 4. Aturan `dateModified` dan `lastmod`

### 4.1. Satu Sumber Kebenaran

Setiap jenis konten harus memiliki satu sumber tanggal pembaruan yang jelas:

| Jenis konten | Sumber tanggal |
| --- | --- |
| Artikel | `lastmod` pada frontmatter Markdown |
| Kota | `lastmod` pada data kota JSON atau sumber data yang ditetapkan |
| Layanan | `lastmod` pada data layanan atau frontmatter halaman |
| Halaman agregasi | tanggal perubahan konten agregasi yang benar-benar terjadi |

Worker menetapkan tanggal pada sumber konten. Template Astro menggunakannya untuk `dateModified`. Publish Worker menggunakannya untuk sitemap `<lastmod>`.

Dengan pola ini, tidak ada beberapa worker yang menetapkan tanggal berbeda untuk halaman yang sama.

### 4.2. Kapan Tanggal Harus Diubah

`lastmod` dan `dateModified` harus diperbarui jika terjadi perubahan signifikan, misalnya:

* isi utama ditambah, dikoreksi, atau ditulis ulang;
* regulasi atau standar yang dirujuk berubah;
* structured data penting diperbaiki;
* internal link penting berubah;
* layanan, cakupan, proses, atau CTA berubah secara substantif.

Tanggal tidak boleh diubah untuk:

* build ulang tanpa perubahan konten;
* perubahan cache atau aset build;
* perubahan copyright tahunan saja;
* perubahan format internal yang tidak terlihat pengguna.

### 4.3. Sinkronisasi Wajib

Untuk halaman yang memiliki tanggal pembaruan:

```text
source.lastmod
        =
schema.dateModified
        =
sitemap.lastmod
```

Jika tanggal pembaruan belum tersedia atau tidak dapat dipercaya, worker harus menghentikan publikasi atau menggunakan kebijakan halaman tanpa `<lastmod>`. Worker tidak boleh membuat tanggal pengganti berdasarkan waktu saat job dijalankan.

## 5. Pencegahan Race Condition

### 5.1. Lock Berdasarkan Target

Lock menggunakan kunci yang spesifik terhadap target:

```text
article:update-pp-50-2012
city:jakarta-barat
service:smk3
shared:site-data
shared:base-layout
```

Aturan:

* satu target hanya boleh memiliki satu job aktif;
* job berbeda boleh berjalan paralel jika targetnya tidak beririsan;
* lock memiliki TTL dan mekanisme recovery;
* job yang gagal harus melepas lock;
* retry menggunakan `jobId` yang sama atau idempotency key yang sama.

### 5.2. File Bersama Harus Serial

Worker konten tidak boleh mengubah file bersama secara bersamaan:

```text
src/data/site.ts
src/data/services.ts
src/layouts/BaseLayout.astro
astro.config.mjs
docs/seo-rules.md
```

Perubahan file tersebut harus masuk antrean `shared-maintenance` dan dieksekusi satu per satu.

### 5.3. Isolasi Perubahan

Worker idealnya menghasilkan patch atau branch terisolasi. Orchestrator melakukan merge setelah validator menyatakan perubahan aman. Worker tidak boleh menimpa perubahan worker lain secara langsung.

## 6. Status Job

```text
queued
  → running
  → draft
  → validated
  → awaiting-approval
  → approved
  → publishing
  → published
```

Status kegagalan:

```text
validation-failed
approval-rejected
publish-failed
blocked
```

Konten regulasi, klaim sertifikasi, klaim akreditasi, dan klaim kompetensi wajib melewati `awaiting-approval` sebelum `approved`.

## 7. Batch dan Urutan Eksekusi

Urutan standar satu batch:

1. Orchestrator memilih pekerjaan yang jatuh tempo.
2. Worker konten membuat atau memperbarui sumber konten.
3. Worker menetapkan `lastmod` hanya jika ada perubahan signifikan.
4. SEO Validator memeriksa konten dan metadata.
5. Reviewer menyetujui konten yang membutuhkan pemeriksaan manusia.
6. Publish Worker menjalankan build sekali untuk batch yang disetujui.
7. Publish Worker menyinkronkan sitemap.
8. Orchestrator mencatat hasil dan melepaskan semua lock.

Build tidak dijalankan oleh setiap worker konten secara bersamaan. Hal ini mencegah hasil `dist/` dan sitemap saling menimpa.

## 7.1. Jadwal Workflow

Workflow berkala tidak memakai satu jam tetap. GitHub Actions memeriksa antrean pada window 08.00–20.00 WIB, sedangkan `scripts/decide-content.mjs` memilih satu slot target yang berbeda secara pseudo-acak setiap hari.

Model ini memberikan jitter operasional tanpa mengorbankan idempotency:

* job tidak selalu berjalan pada jam yang sama;
* retry pada hari yang sama tetap mengenali slot target yang sama;
* hanya satu batch yang dijalankan per hari;
* jika belum mencapai slot target, workflow selesai tanpa mengubah konten;
* `workflow_dispatch` dapat menjalankan proses manual tanpa menunggu slot.

Jadwal berkala bukan alasan untuk memaksa perubahan. Jika worker tidak menemukan perubahan yang valid, tidak boleh ada perubahan pada `lastmod`, `dateModified`, sitemap, atau commit konten.

Selain jadwal berkala, event berikut boleh menjalankan workflow segera:

* permintaan manual;
* perubahan regulasi atau sumber resmi yang harus ditinjau;
* permintaan pembaruan artikel, kota, atau layanan;
* kegagalan validasi atau publikasi sebelumnya.

Randomisasi digunakan untuk distribusi beban dan variasi waktu eksekusi, bukan untuk menyamarkan spam atau menghindari kebijakan mesin pencari.

## 8. Aturan Retry dan Audit

Setiap job harus menyimpan:

* `jobId`;
* jenis worker;
* target dan source path;
* waktu mulai dan selesai;
* perubahan yang dibuat;
* nilai `lastmod` sebelum dan sesudah;
* hasil validasi;
* identitas reviewer jika diperlukan;
* hasil build dan publish;
* pesan error jika gagal.

Retry hanya boleh mengulang pekerjaan yang idempotent. Jika sumber konten telah berubah sejak job dibuat, orchestrator harus membuat job baru atau meminta worker melakukan rebase; jangan menimpa perubahan terbaru.

## 9. Prinsip Operasional

* Worker boleh spesifik, tetapi sumber tanggal harus tunggal.
* Worker tidak boleh menerbitkan konten langsung.
* Orchestrator mengatur jadwal, lock, dependency, dan retry.
* Validator dapat menolak hasil worker.
* Publish Worker adalah satu-satunya jalur ke build dan sitemap final.
* Tidak ada tanggal SEO yang dibuat dari waktu eksekusi job.
* Konten regulasi K3 memerlukan validasi sumber dan approval manusia.
