/* =====================================================================
 * JDIH Kota Jayapura — penyimpanan data prototype
 * ---------------------------------------------------------------------
 * Semua data (kategori, dokumen, pengaturan kontak) disimpan di
 * localStorage browser sehingga perubahan dari dasbor admin langsung
 * terlihat di halaman publik. Ini SIMULASI — belum ada backend/database.
 * Data kontak berasal dari situs lama dan masih placeholder.
 * ===================================================================== */
(function () {
  const DB_KEY   = 'jdih_db_v2'; // v2: data dokumen asli (naikkan versi bila struktur seed berubah)
  const AUTH_KEY = 'jdih_auth_v1';

  // Peran pengguna: admin = semua menu; operator = kelola dokumen saja
  const ROLES = {
    admin:    { label: 'Admin',    desc: 'Akses penuh: dokumen, kategori, pengguna, pengaturan' },
    operator: { label: 'Operator', desc: 'Mengelola dokumen (tambah, ubah, hapus)' },
  };

  // Akun simulasi (prototype saja — kata sandi disimpan apa adanya di browser, JANGAN dipakai di produksi)
  const SEED_USERS = [
    { id: 'u-admin',    name: 'Administrator JDIH',    username: 'admin',    password: 'jdih2026',     role: 'admin',    active: true },
    { id: 'u-operator', name: 'Operator Bagian Hukum', username: 'operator', password: 'operator2026', role: 'operator', active: true },
  ];

  const SEED = {
    settings: {
      phone:   '(0967) 123456',
      email:   'jdih@jayapurakota.go.id',
      address: 'Jl. Raya Abepura, Jayapura',
    },
    categories: [
      { code: 'PERDA',   name: 'Peraturan Daerah' },
      { code: 'PERWALI', name: 'Peraturan Walikota' },
      { code: 'KEPWALI', name: 'Keputusan Walikota' },
      { code: 'SE',      name: 'Surat Edaran' },
      { code: 'MONO',    name: 'Monografi Hukum' },
    ],
    // Dokumen: lihat assets/js/data-dokumen.js (Perda & Perwali asli dari JDIH BPK + contoh)
    docs: window.JDIH_DOCS || [],
    users: SEED_USERS,
  };

  const STATUSES = ['Berlaku', 'Diubah', 'Dicabut'];
  const MONTHS = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

  const clone = (o) => JSON.parse(JSON.stringify(o));
  let memoryDb = null; // cadangan bila localStorage diblokir

  function load() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      if (raw) {
        const db = JSON.parse(raw);
        if (!Array.isArray(db.users)) db.users = clone(SEED_USERS); // migrasi data lama tanpa daftar pengguna
        return db;
      }
    } catch (e) { /* abaikan, pakai data contoh */ }
    return memoryDb ? clone(memoryDb) : clone(SEED);
  }

  function save(db) {
    memoryDb = clone(db);
    try { localStorage.setItem(DB_KEY, JSON.stringify(db)); return true; }
    catch (e) { return false; }
  }

  function reset() {
    memoryDb = null;
    try { localStorage.removeItem(DB_KEY); } catch (e) {}
    return clone(SEED);
  }

  // ---------- Otentikasi simulasi ----------
  // Hasil: { user } jika berhasil, { error } jika gagal
  function login(username, password) {
    const u = load().users.find((x) => x.username.toLowerCase() === username.trim().toLowerCase());
    if (!u || u.password !== password) return { error: 'Nama pengguna atau kata sandi salah.' };
    if (!u.active) return { error: 'Akun ini dinonaktifkan. Hubungi admin.' };
    const session = { id: u.id, at: new Date().toISOString() };
    try { localStorage.setItem(AUTH_KEY, JSON.stringify(session)); } catch (e) {}
    return { user: u };
  }
  function logout() { try { localStorage.removeItem(AUTH_KEY); } catch (e) {} }
  // Sesi selalu dicocokkan ke daftar pengguna: akun yang dihapus/dinonaktifkan otomatis keluar
  function currentUser() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(AUTH_KEY)); } catch (e) {}
    if (!s || !s.id) return null;
    const u = load().users.find((x) => x.id === s.id && x.active);
    if (!u) { logout(); return null; }
    return { id: u.id, name: u.name, username: u.username, role: u.role, roleLabel: (ROLES[u.role] || {}).label || u.role };
  }

  // ---------- Utilitas ----------
  function formatDate(iso) {
    if (!iso) return '-';
    const [y, m, d] = iso.split('-').map(Number);
    return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`;
  }
  const formatSize = (b) => !b ? '-' : b < 1048576 ? Math.round(b / 1024) + ' KB' : (b / 1048576).toFixed(1).replace('.', ',') + ' MB';
  const formatNumber = (n) => Number(n || 0).toLocaleString('id-ID');
  const param = (name) => new URLSearchParams(location.search).get(name);
  const byDateDesc = (a, b) => (b.date || '').localeCompare(a.date || '');
  const uid = () => 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  window.JDIH = {
    load, save, reset, login, logout, currentUser,
    formatDate, formatNumber, formatSize, param, byDateDesc, uid, escapeHtml,
    STATUSES, ROLES,
    // Kredensial simulasi untuk tombol "isi otomatis" di halaman login
    DEMO_USERS: SEED_USERS.map((u) => ({ role: u.role, label: ROLES[u.role].label, username: u.username, password: u.password })),
  };
})();
