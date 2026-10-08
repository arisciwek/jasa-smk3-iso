# PLANS.md — Mengurangi Kesan AI Slop

Tujuan: menjadikan situs ini terasa seperti situs konsultan K3 yang nyata, jelas,
dan dapat dipercaya—bukan kumpulan pola landing page generik.

## Prinsip desain

- Utamakan bukti, konteks, dan bahasa yang spesifik daripada slogan promosi.
- Satu halaman memiliki satu tugas utama dan satu CTA utama.
- Gunakan kartu hanya ketika membantu membandingkan atau memindai informasi.
- Pertahankan gaya teknis/textmode sebagai identitas, bukan sebagai dekorasi.
- Pastikan layout tetap tenang, terbaca, dan usable pada mobile.

## Rencana eksekusi

### 1. Beranda sebagai editorial brief ✅

- [x] Ganti headline generik dengan proposisi yang lebih konkret.
- [x] Jelaskan siapa yang dibantu dan masalah yang diselesaikan.
- [x] Tambahkan alur kerja ringkas agar layanan terasa nyata.
- [x] Kurangi ketergantungan pada tiga kartu kategori yang seragam.
- [x] Gunakan CTA yang membedakan konsultasi dari membaca rujukan.

### 2. Kepercayaan dan bukti

- [ ] Ganti data fallback perusahaan, telepon, alamat, dan email dengan data resmi.
- [ ] Tambahkan profil konsultan, pengalaman proyek, sertifikasi, atau studi kasus yang dapat diverifikasi.
- [ ] Tulis ulang artikel dan deskripsi layanan berdasarkan pengalaman nyata, bukan klaim umum.

### 3. Sistem visual

- [ ] Kurangi inline style pada halaman dan pindahkan pola berulang ke class/layout.
- [ ] Tetapkan skala spacing, heading, border, dan CTA yang konsisten.
- [ ] Tambahkan state focus keyboard dan target sentuh minimum yang nyaman.

### 4. Validasi

- [ ] Uji navigasi desktop, mobile, keyboard, dan prefers-reduced-motion.
- [ ] Jalankan build, rsync ke situs LAN, lalu push ke `main` untuk preview Vercel.

## Definition of done tahap pertama

- Beranda punya pesan yang spesifik dalam lima detik pertama.
- Tidak ada klaim pengalaman atau kredensial yang tidak memiliki sumber.
- CTA utama jelas dan tidak bersaing dengan terlalu banyak kartu.
- Semua perubahan lolos `npm run build`.
