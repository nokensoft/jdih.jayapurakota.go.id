/* =====================================================================
 * Mode terang/gelap — dimuat SINKRON di <head> setiap halaman agar tema
 * diterapkan sebelum halaman tampil (tanpa kedip).
 * - Pilihan pengguna disimpan di localStorage 'jdih_theme' ('light'|'dark').
 * - Jika belum pernah memilih, mengikuti pengaturan sistem perangkat.
 * - Tombol: elemen apa pun dengan onclick="JDIH_THEME.toggle()";
 *   ikon diatur oleh CSS (.theme-icon-sun / .theme-icon-moon) di theme.css.
 * ===================================================================== */
(function () {
  const KEY = 'jdih_theme';
  const root = document.documentElement;
  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  const stored = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const current = () => stored() || (media && media.matches ? 'dark' : 'light');

  function apply(mode) {
    root.classList.toggle('dark', mode === 'dark');
    root.style.colorScheme = mode;
  }

  apply(current());

  // Ikuti perubahan tema sistem selama pengguna belum memilih sendiri
  if (media && media.addEventListener) {
    media.addEventListener('change', () => { if (!stored()) apply(current()); });
  }

  window.JDIH_THEME = {
    get: current,
    toggle() {
      const next = current() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    },
  };
})();
