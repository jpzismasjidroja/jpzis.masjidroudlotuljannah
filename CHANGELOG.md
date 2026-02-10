# Changelog

Semua perubahan penting pada project ini akan didokumentasikan di file ini.

## [1.2.0] - 2026-02-10
### Added
- **Realtime Updates**: Donasi yang masuk kini langsung muncul di halaman beranda tanpa perlu refresh halaman (menggunakan Supabase Realtime).
- **SEO Optimization**: Penambahan meta tags dinamis (Open Graph, Twitter Cards) di seluruh halaman untuk meningkatkan visibilitas di search engine dan media sosial.
- **Auto-Refresh**: Fitur auto-refresh data saat tab browser kembali aktif.

### Changed
- **Codebase Cleanup**: Pembersihan komentar-komentar sisa development dan file SQL sementara untuk kode yang lebih rapi.
- **Home UI**: Perbaikan layout grid dan struktur HTML pada halaman Beranda untuk tampilan yang lebih presisi.
- **Donation Logic**: Penyempurnaan logika validasi input dan upload bukti transfer pada form donasi.

### Fixed
- **Syntax Errors**: Perbaikan `</div>` tags yang tidak valid di `HomePage.jsx` yang menyebabkan layout bergeser.
- **Performance**: Optimasi rendering komponen React untuk load time yang lebih cepat.

## [1.1.0] - 2026-02-08
### Added
- **QRIS Integration**: Integrasi metode pembayaran QRIS via BagiBagi.co untuk kemudahan donasi.
- **Turnstile Security**: Penambahan Cloudflare Turnstile pada form donasi untuk mencegah spam bot.
- **Admin Dashboard Features**: Fitur "Refresh Data" manual di dashboard admin.

### Changed
- **Zakat Calculator**: Update nisab dan logika perhitungan zakat maal & profesi.

## [1.0.0] - 2026-01-30
### Added
- **Initial Release**: Peluncuran perdana website JPZIS Masjid Jami' Roudlatul Jannah.
- Fitur dasar: Landing page, Profil Masjid, Laporan Keuangan Transparan, dan Galeri Kegiatan.
- Manajemen Admin dasar (CRUD Artikel & Galeri).
