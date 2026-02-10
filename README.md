# JPZIS Website - Masjid Jami' Roudlatul Jannah

Website resmi untuk JPZIS (Jaringan Pengelola Zakat, Infaq, dan Sedekah) Masjid Jami' Roudlatul Jannah. Website ini berfungsi sebagai portal informasi, donasi online, galeri kegiatan, dan manajemen konten (CMS) bagi pengurus masjid.

> **Status**: Live Production
> **Domain**: [jpzis.masjidroja.com](https://jpzis.masjidroja.com)

## 🚀 Fitur Utama

### Pengunjung (Public)
- **Donasi Online**: Integrasi QRIS & Transfer Bank dengan fitur upload bukti pembayaran.
- **Kalkulator Zakat**: Hitung zakat mall dan penghasilan secara otomatis.
- **Artikel & Kajian**: Blog untuk membagikan info kajian, berita, dan artikel Islami.
- **Galeri Foto**: Dokumentasi kegiatan masjid yang terintegrasi.
- **Transparansi**: Laporan pemasukan dan pengeluaran donasi.
- **Jadwal Sholat**: Informasi waktu sholat terkini.

### Admin Dashboard (CMS)
- **Manajemen Artikel**: Buat, edit, dan hapus artikel dengan Rich Text Editor.
- **Manajemen Galeri**: Upload dan kelola foto kegiatan.
- **Monitoring Donasi**: Verifikasi donasi masuk dan bukti pembayaran.
- **Manajemen Pengurus**: Kelola daftar pengurus dan struktur organisasi.
- **Statistik**: Dashboard visual untuk ringkasan data donasi dan pengunjung.

### Keamanan & Optimasi
- **Cloudflare Turnstile**: Proteksi anti-bot pada form Login, Donasi, dan Kontak.
- **SEO Optimized**: Meta tag dinamis, Open Graph, dan JSON-LD untuk setiap halaman.
- **Image Optimization**: Kompresi gambar otomatis saat upload.
- **Supabase Auth**: Sistem login aman untuk administrator.

## 🛠️ Teknologi yang Digunakan

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), Lucide React (Icons)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL, Storage, Auth, Realtime)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Lainnya**: Recharts (Grafik), React Quill (Editor), React Helmet Async (SEO)

## 📦 Instalasi & Menjalankan Lokal

Pastikan Anda sudah menginstall [Node.js](https://nodejs.org/) (versi 18+).

1.  **Clone Repository**
    ```bash
    git clone https://github.com/jpzismasjidroja/jpzis.masjidroudlotuljannah.git
    cd jpzis.masjidroudlotuljannah
    ```

2.  **Install Dependencies**
    Karena menggunakan React 19 dengan beberapa library lama, gunakan legacy peer deps:
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Setup Environment Variables**
    Buat file `.env` di root folder dan isi konfigurasi berikut (minta akses ke admin jika belum punya):
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
    ```

4.  **Jalankan Development Server**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:5173](http://localhost:5173) di browser.

## 🚀 Deployment ke Cloudflare Pages

Project ini dikonfigurasi untuk deploy otomatis via Cloudflare Pages.

1.  Connect repository GitHub ke Cloudflare Pages.
2.  Set **Build Command**:
    ```bash
    npm install --legacy-peer-deps && npm run build
    ```
3.  Set **Output Directory**: `dist`
4.  Tambahkan **Environment Variables** di dashboard Cloudflare (sama seperti di `.env`).

> **Catatan**: File `.npmrc` dengan `legacy-peer-deps=true` sudah disertakan untuk memastikan `npm install` berjalan lancar di CI/CD.

## 🗄️ Database Schema

Database menggunakan Supabase (PostgreSQL) dengan tabel utama:
- `articles`: Konten blog/berita.
- `donations`: Data donasi masuk.
- `gallery`: Foto-foto kegiatan.
- `beneficiaries`: Data statistik penerima manfaat.
- `pengurus`: Data struktur organisasi.
- `admin_roles`: Manajemen hak akses admin/superadmin.

Semua tabel dilindungi dengan **Row Level Security (RLS)**.

## 📝 Lisensi

Hak Cipta © 2026 **Masjid Jami' Roudlatul Jannah**.
Dibuat untuk kepentingan operasional dan dakwah masjid.
