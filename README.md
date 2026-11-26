# JDIH Kota Jayapura

Prototype pembaruan website **Jaringan Dokumentasi dan Informasi Hukum (JDIH) Pemerintah Kota Jayapura**,
dikerjakan oleh [Nokensoft](https://nokensoft.com). Versi tayang direncanakan aktif di subdomain resmi Pemda:
**https://jdih.jayapurakota.go.id**.

> **Status: prototype v.1.0.** Login, penyimpanan data, dan status sistem masih **simulasi** di browser
> (`localStorage`), belum memakai server atau database.

## Menjalankan

Tidak perlu instalasi atau build. Buka `index.html` di Chrome/Edge (perlu internet untuk Tailwind CSS,
Alpine.js, dan Font Awesome dari CDN).

Agar unduhan PDF berjalan seperti di server sungguhan, jalankan server lokal sederhana dari folder ini, misalnya:

```bash
npx serve .
```

### Akun simulasi

| Peran | Nama pengguna | Kata sandi | Akses |
|---|---|---|---|
| Admin | `admin` | `jdih2026` | Semua menu: dokumen, kategori, pengguna, pengaturan |
| Operator | `operator` | `operator2026` | Ringkasan dan kelola dokumen |

Halaman login menyediakan tombol **Isi sebagai Admin** / **Isi sebagai Operator**.

## Fitur

**Situs publik**
- Beranda: pencarian, statistik dokumen otomatis, dokumen terbaru, kategori.
- Navigasi utama hanya kategori dokumen: Peraturan Daerah, Peraturan Walikota, Keputusan Walikota,
  Surat Edaran, Monografi Hukum.
- Daftar dokumen dengan filter tahun, status (Berlaku/Diubah/Dicabut), urutan, dan paginasi.
- Detail dokumen: metadata resmi, abstrak, dasar hukum, relasi peraturan, pratinjau dan unduh PDF.
- Halaman Tentang & FAQ, Prasyarat Penggunaan, Kebijakan Privasi, Status Sistem.
- Mode terang/gelap dan tampilan ponsel.

**Panel pengelola** (`login.html` → `admin.html`)
- Ringkasan statistik, kelola dokumen (tambah, ubah, hapus), kategori & urutan menu,
  kelola pengguna (admin/operator), pengaturan kontak, cadangan data JSON.

## Data dokumen

- **25 dokumen asli** (10 Peraturan Daerah 2023–2024, 15 Peraturan Walikota 2024–2025) beserta PDF-nya,
  diambil dari [JDIH BPK RI](https://peraturan.bpk.go.id/Search?entitas=214). Daftar berkas dan sumbernya
  ada di [`dokumen/README.md`](dokumen/README.md).
- Keputusan Walikota, Surat Edaran, dan Monografi Hukum belum tersedia di sumber publik, jadi masih berupa
  **contoh** (berlabel "Contoh", tanpa berkas) dan perlu diganti dengan dokumen asli dari Bagian Hukum.
- Angka unduhan adalah simulasi. Data kontak di situs masih placeholder dari situs lama.

## Struktur

```
├── index.html, dokumen.html, detail.html     # halaman publik utama
├── tentang.html, prasyarat.html, privasi.html, status.html
├── login.html, admin.html                    # panel pengelola
├── assets/
│   ├── js/data-dokumen.js    # data dokumen (dibuat dari metadata JDIH BPK)
│   ├── js/store.js           # penyimpanan localStorage, pengguna & peran, utilitas
│   ├── js/layout.js          # header, navigasi, footer halaman publik
│   ├── js/theme.js, css/theme.css   # mode terang/gelap
│   └── js/tailwind-config.js # palet warna
├── dokumen/                  # PDF asli: <jenis>/<tahun>/<jenis>-<nomor>-<tahun>.pdf (± 58 MB)
└── _project_management/      # administrasi proyek: anggaran, RAB, presentasi fitur utama
```

Teknologi: HTML + [Tailwind CSS](https://tailwindcss.com) (CDN), [Alpine.js](https://alpinejs.dev) 3.14.1,
[Font Awesome](https://fontawesome.com) 6.5.2. Tanpa npm dan tanpa langkah build.

## Catatan pengembangan

- Data tersimpan per browser dengan kunci `jdih_db_v2`. Naikkan versi kunci di `assets/js/store.js`
  bila struktur data contoh berubah, agar browser memuat data baru.
- Menu **Pengaturan → Kembalikan Data Contoh** di panel admin mengembalikan semua data ke kondisi awal.
- Bila memakai kelas warna Tailwind baru, tambahkan padanannya di `assets/css/theme.css` agar mode gelap ikut menyesuaikan.

## Presentasi

Presentasi fitur utama beserta paket pengembangannya ada di
[`_project_management/03-presentasi/`](_project_management/03-presentasi/) (HTML 16:9, siap diekspor ke PPTX).

---

### Git Commands

```
git add .
git commit -m "message"
git push origin main
```

© 2026 JDIH Pemerintah Kota Jayapura · Powered by [Nokensoft.com](https://nokensoft.com)
