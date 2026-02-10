<div align="center">
  <img src="public/logo-masjid.png" alt="Logo Masjid Jami' Roudlatul Jannah" width="120" height="120" />

  # 🕌 JPZIS Masjid Jami' Roudlatul Jannah
  
  **Website Resmi Jaringan Pengelola Zakat, Infaq, dan Sedekah (JPZIS)**
  
  [![Status](https://img.shields.io/badge/Status-Live%20Production-success?style=for-the-badge&logo=vercel)](https://jpzis.masjidroja.com)
  [![License](https://img.shields.io/badge/License-Proprietary-blue?style=for-the-badge)](https://img.shields.io/badge/License-Proprietary-blue?style=for-the-badge)
  [![Last Commit](https://img.shields.io/github/last-commit/jpzismasjidroja/jpzis.masjidroudlotuljannah?style=for-the-badge&color=orange)](https://github.com/jpzismasjidroja/jpzis.masjidroudlotuljannah)

  <p align="center">
    Portal digital modern untuk manajemen donasi, transparansi keuangan umat, dan syiar dakwah Islam berbasis teknologi terkini.
    <br />
    <a href="https://jpzis.masjidroja.com"><strong>Lihat Website »</strong></a>
    <br />
    <br />
    <a href="#-fitur-unggulan">Fitur</a>
    ·
    <a href="#-teknologi">Teknologi</a>
    ·
    <a href="#-instalasi">Instalasi</a>
  </p>
</div>

</div>

---

## 📢 Rilis Terbaru
**Versi Saat Ini: v1.2.0**

Lihat catatan perubahan lengkap dan riwayat update di [**CHANGELOG.md**](./CHANGELOG.md).

---

## 🌟 Tentang Project

Website ini dibangun untuk memfasilitasi jamaah dalam menunaikan Zakat, Infaq, dan Sedekah secara mudah, transparan, dan akuntabel. Dilengkapi dengan sistem manajemen konten (CMS) yang powerful, pengurus masjid dapat dengan mudah mengelola artikel, galeri kegiatan, hingga laporan keuangan secara *real-time*.

## 🛠 Teknologi

Dibangun dengan stack teknologi modern untuk performa, keamanan, dan *user experience* terbaik.

### Core Framework & Library
<div align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
</div>

### Styling & UI
<div align="center">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Lucide_Icons-F05032?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide React" />
  <img src="https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Recharts" />
</div>

### Backend & Database (BaaS)
<div align="center">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</div>

### Security & Deployment
<div align="center">
  <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Pages" />
  <img src="https://img.shields.io/badge/Cloudflare_Turnstile-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Turnstile" />
</div>

---

## 🚀 Fitur Unggulan

### 🌍 Untuk Jamaah (Public)
*   **Donasi & Zakat Online**: Integrasi pembayaran QRIS & Transfer Bank yang mudah.
*   **Kalkulator Zakat Cerdas**: Hitung kewajiban zakat maal dan profesi secara otomatis.
*   **Realtime Update**: Notifikasi donasi masuk secara langsung (*Live*).
*   **Transparansi Dana**: Laporan keuangan terbuka yang dapat diakses publik.
*   **Pusat Informasi**: Jadwal sholat, artikel kajian, dan galeri kegiatan masjid.

### 🛡️ Untuk Pengurus (Admin CMS)
*   **Dashboard Statistik**: Visualisasi data donasi dan pengunjung via grafik interaktif.
*   **Manajemen Donasi**: Verifikasi bukti transfer dan pencatatan manual/otomatis.
*   **Content Management**: Editor artikel *Rich Text* dan upload galeri foto kegiatan.
*   **Manajemen SDM**: Kelola struktur kepengurusan DKM dan *role* admin.
*   **Security First**: Sistem login aman dengan proteksi *Brute Force* dan *Bot*.

---

## 📦 Instalasi & Pengembangan

Ikuti langkah berikut untuk menjalankan project di komputer lokal Anda:

### Prasyarat
*   [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru)
*   [Git](https://git-scm.com/)

### Langkah Instalasi

1.  **Clone Repository**
    ```bash
    git clone https://github.com/jpzismasjidroja/jpzis.masjidroudlotuljannah.git
    cd jpzis.masjidroudlotuljannah
    ```

2.  **Install Dependencies**
    Karena menggunakan React 19, gunakan flag legacy peer dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Konfigurasi Environment**
    Buat file `.env` di root folder dan tambahkan kredensial berikut:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
    ```

4.  **Jalankan Server Lokal**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:5173](http://localhost:5173) di browser Anda.

---

## �️ Struktur Database

Database dibangun di atas **PostgreSQL** via Supabase dengan fitur keamanan **Row Level Security (RLS)**.

| Tabel | Deskripsi |
| :--- | :--- |
| `articles` | Menyimpan konten blog, berita, dan kajian Islami. |
| `donations` | Mencatat transaksi donasi harian (Zakat, Infaq, Sedekah). |
| `gallery` | Menyimpan dokumentasi foto kegiatan masjid. |
| `beneficiaries` | Data statistik penerima manfaat program sosial. |
| `pengurus` | Data struktur organisasi DKM Masjid. |
| `admin_roles` | Hak akses dan peran administrator sistem. |

---

## 🤝 Kontribusi

Kontribusi sangat diterima untuk pengembangan syiar dakwah digital ini. Silakan buat *Pull Request* atau *Issue* jika menemukan *bug* atau memiliki ide fitur baru.

1.  Fork Project
2.  Buat Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push ke Branch (`git push origin feature/AmazingFeature`)
5.  Open Pull Request

---

## 📝 Lisensi

Hak Cipta © 2026 **JPZIS Masjid Jami' Roudlatul Jannah**.
Project ini dibuat khusus untuk operasional masjid dan dakwah.

<div align="center">
  <p>Dibuat dengan ❤️ untuk Umat</p>
</div>
