# 🕌 Technical Documentation: JPZIS Masjid Jami' Roudlatul Jannah

Dokumentasi ini memberikan gambaran teknis mendalam mengenai arsitektur, fitur, dan pengelolaan website JPZIS Masjid Jami' Roudlatul Jannah.

---

## 1. Arsitektur Sistem (System Architecture)

Website ini menggunakan arsitektur modern berbasis **Serverless** dengan **React** sebagai frontend dan **Supabase** sebagai Backend-as-a-Service (BaaS).

### Tech Stack Utama:
- **Frontend Framework**: React 19 (Vite)
- **Backend & Database**: Supabase (PostgreSQL, Realtime, Auth, Storage)
- **Global State Management**: React Context API
- **Styling**: Tailwind CSS & Framer Motion (Animations)
- **UI Components**: Lucide React (Icons), Recharts (Charts)
- **Deployment**: Cloudflare Pages

### Alur Data (Data Flow):
1. **Supabase Client**: Menghubungkan aplikasi ke database melalui kunci API anonim namun terlindungi oleh RLS (Row Level Security).
2. **Custom Hooks**: Seperti `useAuth`, `useDonations`, dan `useArticles` menangani logika fetching data dan mutasi (insert/update).
3. **Global Provider**: `GlobalContext.jsx` membungkus seluruh aplikasi dan menyatukan data dari semua hooks agar tersedia di setiap komponen tanpa *prop-drilling*.
4. **Realtime Engine**: Menggunakan Supabase Channels untuk mendengarkan perubahan pada database (misalnya, donasi yang baru masuk akan langsung tampil di halaman depan tanpa refresh).

---

## 2. Dokumentasi Fitur Utama (Core Functionality)

### 📈 Kalkulator Zakat Cerdas
Terletak di komponen `ZakatCalculator.jsx`, fitur ini menghitung kewajiban zakat berdasarkan:
- **Zakat Profesi**: Dihitung bulanan dengan Nisab senilai 1/12 dari 85 gram emas per tahun.
- **Zakat Maal**: Dihitung tahunan dengan Nisab 85 gram emas.
- **Logika**: Jika total harta bersih melebihi Nisab, sistem menghitung 2.5% dari harta tersebut.

### 💰 Sistem Donasi & Transparansi
- **Pencatatan**: Donasi disimpan ke tabel `donations`. 
- **Tipe Donasi**: Mendukung berbagai kategori (Zakat, Infaq, Sedekah, Wakaf).
- **Update Otomatis**: Real-time update di halaman Transparansi untuk meningkatkan kepercayaan jamaah.

### 🛡️ Admin Dashboard (CMS)
Dashboard yang kuat bagi pengurus untuk mengelola:
- **Artikel**: Editor artikel lengkap untuk syiar dan berita.
- **Laporan Keuangan**: Visualisasi grafik donasi masuk vs distribusi manfaat.
- **Manajemen Galeri**: Dokumentasi kegiatan masjid.

---

## 3. Schema Database & Keamanan

### Tabel Utama (PostgreSQL):
| Tabel | Kolom Utama | Fungsi |
| :--- | :--- | :--- |
| `articles` | `id, title, content, image, category, date` | Konten dakwah & berita |
| `donations` | `id, donor_name, amount, category, created_at` | Catatan keuangan |
| `gallery` | `id, image_url, title, description` | Media kegiatan |
| `beneficiaries`| `id, category, amount, description` | Statistik manfaat |

### Keamanan (Security):
- **Row Level Security (RLS)**: Tabel disetel agar publik hanya bisa membaca (`SELECT`), sedangkan operasi tulis (`INSERT`, `UPDATE`) hanya diizinkan bagi pengguna terautentikasi (Admin).
- **Supabase Auth**: Mengelola sesi login admin dengan aman.
- **Cloudflare Turnstile**: Digunakan pada form donasi dan kontak untuk mencegah spam bot.

---

## 4. Panduan Pengembangan (Developer Guide)

### Lokasi File Penting:
- **Logika API**: `src/supabaseClient.js`
- **Hooks Data**: `src/hooks/`
- **Konfigurasi Global**: `src/context/GlobalContext.jsx`
- **Halaman Utama**: `src/pages/`
- **Komponen UI**: `src/components/`

### Standar Penulisan Kode:
- Gunakan **Tailwind CSS** untuk semua styling (hindari inline CSS berlebihan).
- Gunakan **Framer Motion** untuk transisi halaman di komponen `AnimatedPage.jsx`.
- Pastikan setiap form menggunakan `TurnstileWidget.jsx` untuk proteksi bot.

### Optimasi Performa:
- **Lazy Loading**: Semua halaman utama di-load secara *asynchronous* menggunakan `React.lazy` dan `Suspense` untuk mempercepat load awal aplikasi.
- **Image Optimization**: Aset gambar disarankan menggunakan format WebP dan di-hosting melalui Supabase Storage atau Cloudflare Images untuk kompresi otomatis.

### Cara Menambahkan Halaman Baru:
1. Buat file `.jsx` baru di `src/pages/`.
2. Daftarkan rute di `src/App.jsx` menggunakan `react-router-dom`.
3. Gunakan `AnimatedPage` sebagai pembungkus konten utama agar konsisten dengan transisi aplikasi.

---

## 5. Deployment & Pemeliharaan

### Langkah Deployment ke Cloudflare:
1. Jalankan `npm run build` untuk menghasilkan folder `dist`.
2. Hubungkan repository GitHub ke Cloudflare Pages.
3. Atur Environment Variables di dashboard Cloudflare:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_TURNSTILE_SITE_KEY`

### Update Data Rutin:
Admin disarankan untuk secara rutin mengunggah artikel kajian dan melakukan verifikasi donasi melalui menu **Admin Dashboard** untuk menjaga situs tetap dinamis dan kredibel.

---
*Dibuat untuk JPZIS Masjid Jami' Roudlatul Jannah.*
