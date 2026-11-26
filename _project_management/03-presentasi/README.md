# Presentasi Fitur Utama

`presentasi-fitur-utama.html` — 13 slide (16:9) tentang fitur utama prototype website JDIH Kota Jayapura,
untuk dipresentasikan kepada Bagian Hukum Setda Kota Jayapura.

## Cara memakai

- **Tinjau:** buka file HTML di Chrome/Edge (butuh internet untuk ikon Font Awesome).
- **Presentasi:** klik **Mode Presentasi** (atau tekan `F`), pindah slide dengan `←` `→`, keluar dengan `Esc`.
- **PDF:** klik **Simpan PDF** → tujuan "Simpan sebagai PDF", ukuran kertas sudah 13,33 × 7,5 inci per slide.

## Siap export ke PPTX

HTML disusun agar bisa dipetakan 1:1 ke PowerPoint (pptxgenjs, `LAYOUT_WIDE` 13,333" × 7,5"):

| HTML | PPTX |
|---|---|
| `<section class="slide">` 1280 × 720 px | 1 slide |
| `left/top/width/height` dalam px | inci = px ÷ 96 |
| `font-size` dalam px | pt = px × 0,75 (judul 48px = 36pt, isi 20px = 15pt) |
| `.dark` (latar `#08245C`) | slide sampul & penutup |
| `.card` (latar `#E8F1FD`, sudut 14px) | `ROUNDED_RECTANGLE` |
| `.icon` (lingkaran oranye/navy) | lingkaran + ikon Font Awesome dirender PNG |
| `.shot` (gambar dari `aset/`) | `addImage` + bayangan |
| `.footer` / `.ft-pic` / `.ft-logo` / `.ft-brand` / `.pageno` | layout: judul dek, PIC + "Powered by" logo Nokensoft.com, nomor slide (di semua slide) |
| `<aside class="notes">` | catatan pembicara (`slide.addNotes`) |

Palet: navy `#0D47A1` / `#08245C`, oranye `#FF9800`, teks `#1E293B` / `#5B6B82`. Font: Calibri.

## Aset (`aset/`)

Tangkapan layar diambil dari prototype (1280 × 800, mode terang kecuali `mode-gelap.jpg`; `ponsel.jpg` 390 px @2x).
Ambil ulang bila tampilan situs berubah agar slide tetap sesuai.
