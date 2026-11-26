# JDIH Kota Jayapura — Nokensoft

Proyek Nokensoft untuk **pemeliharaan & pembaruan website JDIH Kota Jayapura** (https://jdih.jayapurakota.go.id/).
Bahasa komunikasi dan konten: **Bahasa Indonesia**.

## Struktur

```
jdih.jayapurakota.go.id/   # folder ini
├── CLAUDE.md
├── README.md               # Ringkasan proyek: cara menjalankan, akun simulasi, fitur, struktur
├── index.html              # Beranda
├── dokumen.html            # Daftar dokumen (?kategori=, ?q=, ?tahun=) + filter & paginasi
├── detail.html             # Detail dokumen (?id=)
├── tentang.html            # Profil, dasar hukum, FAQ (#faq)
├── prasyarat.html          # Prasyarat Penggunaan + simulasi persetujuan (localStorage jdih_terms_agreed)
├── privasi.html            # Kebijakan Privasi + lihat/hapus preferensi di browser
├── status.html             # Status Sistem (simulasi: cek latensi, riwayat 90 hari, insiden)
├── login.html              # Login simulasi + tombol isi otomatis (admin / jdih2026, operator / operator2026)
├── admin.html              # Dasbor: #ringkasan, #dokumen, #profil, #dokumentasi (admin & operator); #kategori, #pengguna, #pengaturan (admin). Menu akun (profil, sidebar, lihat situs, keluar) = dropdown profil kanan atas
├── dokumen/                # PDF asli: <jenis>/<tahun>/<jenis>-<nomor>-<tahun>.pdf (+ README.md daftar sumber)
├── assets/
│   ├── js/data-dokumen.js      # Data dokumen (window.JDIH_DOCS) — Perda/Perwali asli dari JDIH BPK + contoh
│   ├── js/tailwind-config.js   # Konfigurasi warna Tailwind bersama
│   ├── js/store.js             # Seed (kategori, kontak, docs dari data-dokumen.js) + simpan localStorage + auth simulasi + util (window.JDIH)
│   ├── js/layout.js            # Topbar/header/nav/footer/toast publik (disisipkan sebelum Alpine)
│   ├── js/theme.js             # Mode terang/gelap (dimuat sinkron di <head>, simpan di localStorage jdih_theme)
│   ├── css/theme.css           # Pemetaan warna mode gelap (html.dark) — tambah aturan di sini jika memakai kelas warna baru
│   ├── kotajayapura-logo.png   # Logo utama + favicon
│   ├── nokensoft-logo.png      # Logo "Powered by Nokensoft.com" (footer publik & admin)
│   ├── og-image.jpg            # Gambar pratinjau tautan (Open Graph) 1200×630: logo kota + screenshot beranda, tanpa teks
│   └── mockup-konsep-awal.png  # Acuan warna & tata letak
└── _project_management/    # Administrasi proyek (lihat README.md di dalamnya)
    ├── 00-template/        # Kop surat Nokensoft
    ├── 01-anggaran/        # Pagu & perhitungan pajak dari dinas
    ├── 02-penawaran/       # RAB Penawaran (docx + pdf)
    └── 03-presentasi/      # Presentasi fitur utama: HTML 16:9 siap export PPTX + aset/ tangkapan layar
```

## Prototype website (multi-page, tanpa build)

- Stack via CDN saja: **Tailwind CSS** (`cdn.tailwindcss.com` + `assets/js/tailwind-config.js`),
  **Alpine.js 3.14.1**, **Font Awesome 6.5.2 versi JS** (`all.min.js`). Tidak ada npm/build step.
- Seed data ada di `SEED` dalam `assets/js/store.js`; disimpan di `localStorage` (`jdih_db_v2` — naikkan versi bila seed
  berubah agar browser memuat data baru). Perubahan dari dasbor langsung tampil di halaman publik. Statistik dihitung dari data.
- **Dokumen**: 10 Perda + 15 Perwali **asli** (2023–2025) dari JDIH BPK (peraturan.bpk.go.id, entitas Kota Jayapura = 214),
  PDF di `dokumen/`, metadata (tanggal penetapan/pengundangan, sumber Lembaran/Berita Daerah, subjek, abstrak, dasar hukum)
  di `assets/js/data-dokumen.js`. Abstrak berasal dari OCR BPK (ada salah ketik dari sumber). Angka unduhan = simulasi.
- **Keputusan Walikota, Surat Edaran, Monografi Hukum** Kota Jayapura tidak ada di sumber publik → masih **contoh**
  (`contoh: true`, tanpa berkas, berlabel "Contoh" di situs). Ganti dengan dokumen asli dari Bagian Hukum Setda.
- Halaman publik memakai placeholder `<div id="site-header">` / `<div id="site-footer">` lalu `layout.js`
  (harus dimuat sinkron sebelum Alpine). Menu aktif dari `data-active` atau `?kategori=`.
- Login & dasbor hanya **simulasi** (tanpa backend). Pengguna ada di `db.users` (peran `admin` / `operator`, lihat `JDIH.ROLES`);
  sesi (`jdih_auth_v1`) hanya menyimpan id dan selalu dicocokkan ke daftar pengguna. Pengaman: admin tidak bisa
  menghapus/menurunkan/menonaktifkan diri sendiri dan minimal harus ada satu admin aktif. Kata sandi disimpan apa adanya (simulasi). Unduh PDF membuka berkas asli (dokumen contoh: simulasi);
  unggah berkas di form admin hanya mencatat nama berkas.
- **Konvensi UI panel admin:** formulir tambah/ubah tampil sebagai halaman di dalam tab (menggantikan daftar, ada tombol
  "Kembali ke daftar"), **bukan modal**. Modal hanya untuk konfirmasi lewat `ask(judul, pesan, onOk, label, tone)`
  dengan tone `danger` (hapus), `warning` (buang perubahan/reset), `info` (keluar). Batal pada formulir yang sudah
  diubah selalu meminta konfirmasi.
- **Dokumentasi panel** (`admin.html#dokumentasi`, tautan di footer admin): isi panduan ada di array `guide` di skrip
  admin.html. **Perbarui `guide` setiap kali fitur panel berubah.**
- Topbar memakai teks "Jaringan Dokumentasi dan Informasi Hukum"; jam layanan sengaja tidak ditampilkan.
- Arahan desain yang sudah disepakati — pertahankan kecuali diminta berubah:
  - Warna & tata letak mengikuti `assets/mockup-konsep-awal.png`: topbar navy, header putih, navbar biru,
    hero gradasi biru dengan tombol oranye, konten 2 kolom (statistik + dokumen terbaru | sidebar Kategori Hukum),
    footer gelap 3 kolom.
  - Logo Kota Jayapura dipakai sebagai logo utama dan favicon.
  - Judul header "JDIH Kota Jayapura" besar, **tanpa** tagline di bawahnya; judul hero besar tanpa paragraf keterangan.
  - **Navigasi utama hanya kategori dokumen**: Peraturan Daerah, Peraturan Walikota, Keputusan Walikota,
    Surat Edaran, Monografi Hukum. Klik kategori = filter daftar dokumen.
  - Minimalis: "Sekilas Info" dan kotak "Butuh Bantuan Hukum?" dari mockup sengaja tidak dipakai.
  - Ikon kontak memakai Font Awesome (warna oranye).
- Data kontak (telepon `(0967) 123456`, alamat `Jl. Raya Abepura`) berasal dari situs lama dan kemungkinan
  placeholder — konfirmasi ke klien sebelum dipakai sebagai data riil. (Situs lama sendiri hanya kerangka tanpa dokumen.)

## Dokumen proyek (`_project_management/`)

- **Presentasi** (`03-presentasi/presentasi-fitur-utama.html`): 13 slide 1280×720 px (termasuk paket pengembangan 25/50/100/300 jt) berposisi absolut, Calibri,
  tanpa gradien — dipetakan 1:1 ke pptxgenjs `LAYOUT_WIDE` (inci = px/96, pt = px×0,75). Belum ada file .pptx.

- **Pagu**: Rp 25.000.000 (termasuk PPN), kode rekening 5.1.02.03.002.00410 — Belanja Pemeliharaan
  Komputer-Peralatan Jaringan, sumber dana DAU, "Pemeliharaan Website, Spesifikasi: Website Dinas", 1 Alat/Tahun.
- **Perhitungan pajak (dari dinas, jangan diubah)**:
  DPP = 25.000.000 × 100/111 = 22.522.522 · PPN 11% = 2.477.477 · PPh 23 2% = 450.450 (dipotong bendahara).
  Selisih Rp 1 ke pagu ditampilkan sebagai baris "Pembulatan".
- **RAB penawaran** (`02-penawaran/RAB Penawaran Nokensoft - ...docx`): 1 lembar A4, kop `00-template/nokensoft - kop surat-v.2.png`,
  font **Times New Roman**, total rincian item harus tepat = DPP. Penanda tangan:
  **Michael Janzen Faidiban, S.Kom — Direktur/Project Manager**.
  Rincian item & harga satuan masih estimasi; Tahun Anggaran, instansi tujuan, dan nomor surat belum diisi.
- Dokumen Word dibuat dengan library npm `docx`. Jika file sedang terbuka di Word, penulisan ulang akan gagal (EBUSY) —
  minta pengguna menutupnya dulu.
