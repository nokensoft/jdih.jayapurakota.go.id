/* =====================================================================
 * Layout bersama halaman publik: topbar, header, navigasi kategori,
 * footer, dan toast. Dimuat SEBELUM Alpine (Alpine di-defer) supaya
 * atribut Alpine di dalam HTML yang disisipkan tetap aktif.
 *
 * Pemakaian di halaman:
 *   <div id="site-header" data-active="PERDA"></div>  ... konten ...
 *   <div id="site-footer"></div>
 *   <script src="assets/js/layout.js"></script>
 * ===================================================================== */
(function () {
  const db = JDIH.load();
  const s = db.settings;
  const e = JDIH.escapeHtml;
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  // Menu aktif: data-active di placeholder, atau ?kategori= di URL
  const active = (headerEl && headerEl.dataset.active) || JDIH.param('kategori') || '';
  const tel = 'tel:' + (s.phone || '').replace(/[^0-9+]/g, '');
  const user = JDIH.currentUser();

  const navItem = (c, mobile) => {
    const on = c.code === active;
    const href = `dokumen.html?kategori=${encodeURIComponent(c.code)}`;
    return mobile
      ? `<li><a href="${href}" class="block px-3 py-3 rounded ${on ? 'bg-navy-900' : ''}">${e(c.name)}</a></li>`
      : `<li><a href="${href}" class="block px-5 py-4 transition-colors ${on ? 'bg-navy-900' : 'hover:bg-navy-900'}">${e(c.name)}</a></li>`;
  };

  if (headerEl) {
    headerEl.outerHTML = `
    <div x-data="{ mobileMenu: false }">
      <!-- TOPBAR -->
      <div class="bg-navy-950 text-white text-xs sm:text-sm">
        <div class="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-center sm:justify-between gap-4">
          <p class="hidden sm:block">Jaringan Dokumentasi dan Informasi Hukum</p>
          <div class="flex items-center gap-3">
            <a href="${tel}" class="hover:text-orange-400"><i class="fa-solid fa-phone text-orange-400 mr-1.5"></i>${e(s.phone)}</a>
            <span class="opacity-50 hidden md:inline">|</span>
            <a href="mailto:${e(s.email)}" class="hover:text-orange-400 hidden md:inline"><i class="fa-solid fa-envelope text-orange-400 mr-1.5"></i>${e(s.email)}</a>
            <span class="opacity-50">|</span>
            ${user
              ? `<a href="admin.html" class="hover:text-orange-400"><i class="fa-solid fa-gauge text-orange-400 mr-1.5"></i>Dasbor</a>`
              : `<a href="login.html" class="hover:text-orange-400"><i class="fa-solid fa-right-to-bracket text-orange-400 mr-1.5"></i>Masuk</a>`}
            <span class="opacity-50">|</span>
            <button type="button" onclick="JDIH_THEME.toggle()" class="hover:text-orange-400" title="Ganti mode terang/gelap" aria-label="Ganti mode terang/gelap">
              <span class="theme-icon-moon"><i class="fa-solid fa-moon text-orange-400"></i></span>
              <span class="theme-icon-sun"><i class="fa-solid fa-sun text-orange-400"></i></span>
            </button>
          </div>
        </div>
      </div>

      <!-- HEADER -->
      <header class="bg-white">
        <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <a href="index.html" class="flex items-center gap-4 min-w-0">
            <img src="assets/kotajayapura-logo.png" alt="Logo Kota Jayapura" class="h-14 sm:h-16 w-auto">
            <span class="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-700">JDIH Kota Jayapura</span>
          </a>
          <button class="lg:hidden w-10 h-10 shrink-0 rounded border border-slate-200 text-navy-700 grid place-items-center"
                  @click="mobileMenu=!mobileMenu; $dispatch('toggle-menu')" aria-label="Menu">
            <span x-show="!mobileMenu"><i class="fa-solid fa-bars"></i></span>
            <span x-show="mobileMenu" x-cloak><i class="fa-solid fa-xmark"></i></span>
          </button>
        </div>
      </header>
    </div>

    <!-- NAVIGASI (kategori dokumen) -->
    <nav class="sticky top-0 z-40 bg-navy-700 text-white shadow" x-data="{ open: false }"
         @toggle-menu.window="open = !open">
      <div class="max-w-6xl mx-auto px-4">
        <ul class="hidden lg:flex font-bold text-[15px]">${db.categories.map((c) => navItem(c, false)).join('')}</ul>
        <ul x-show="open" x-cloak x-transition class="lg:hidden flex flex-col py-2 font-bold">${db.categories.map((c) => navItem(c, true)).join('')}</ul>
      </div>
    </nav>`;
  }

  if (footerEl) {
    footerEl.outerHTML = `
    <footer class="bg-footer text-slate-300 mt-8">
      <div class="max-w-6xl mx-auto px-4 pt-14 pb-8">
        <div class="grid md:grid-cols-4 gap-10">
          <div class="md:col-span-2">
            <div class="flex items-center gap-3">
              <img src="assets/kotajayapura-logo.png" alt="" class="h-10 w-auto">
              <h4 class="text-lg font-extrabold text-white">JDIH Kota Jayapura</h4>
            </div>
            <p class="mt-4 max-w-md leading-relaxed">
              Jaringan Dokumentasi dan Informasi Hukum Pemerintah Kota Jayapura. Wadah pendayagunaan bersama atas dokumen
              peraturan perundang-undangan yang ditata dan diintegrasikan secara sistematis.
            </p>
          </div>
          <div>
            <h4 class="text-lg font-extrabold text-white">Tautan Cepat</h4>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><a href="index.html" class="hover:text-orange-400">Beranda</a></li>
              <li><a href="dokumen.html" class="hover:text-orange-400">Semua Dokumen</a></li>
              <li><a href="tentang.html" class="hover:text-orange-400">Tentang JDIH</a></li>
              <li><a href="tentang.html#faq" class="hover:text-orange-400">Bantuan / FAQ</a></li>
              <li><a href="login.html" class="hover:text-orange-400">Login Petugas</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-extrabold text-white">Kontak Kami</h4>
            <ul class="mt-4 space-y-3 text-sm">
              <li class="flex items-center gap-3">
                <span class="w-8 h-8 shrink-0 rounded-full bg-white/10 text-orange-400 grid place-items-center"><i class="fa-solid fa-location-dot"></i></span>
                ${e(s.address)}
              </li>
              <li class="flex items-center gap-3">
                <span class="w-8 h-8 shrink-0 rounded-full bg-white/10 text-orange-400 grid place-items-center"><i class="fa-solid fa-phone"></i></span>
                <a href="${tel}" class="hover:text-orange-400">${e(s.phone)}</a>
              </li>
              <li class="flex items-center gap-3">
                <span class="w-8 h-8 shrink-0 rounded-full bg-white/10 text-orange-400 grid place-items-center"><i class="fa-solid fa-envelope"></i></span>
                <a href="mailto:${e(s.email)}" class="hover:text-orange-400 break-all">${e(s.email)}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-6 border-t border-slate-600 text-center text-sm space-y-2">
          <p class="flex flex-wrap justify-center gap-x-5 gap-y-1 pb-2">
            <a href="prasyarat.html" class="hover:text-orange-400">Prasyarat Penggunaan</a>
            <a href="privasi.html" class="hover:text-orange-400">Kebijakan Privasi</a>
            <a href="status.html" class="hover:text-orange-400 inline-flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>Status Sistem
            </a>
          </p>
          <p>&copy; ${new Date().getFullYear()} JDIH Pemerintah Kota Jayapura. All rights reserved.</p>
          <p class="flex items-center justify-center gap-1.5 text-slate-400">
            Powered by
            <a href="https://nokensoft.com" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 font-bold text-slate-300 hover:text-orange-400">
              <img src="assets/nokensoft-logo.png" alt="Logo Nokensoft" class="h-5 w-auto">Nokensoft.com
            </a>
          </p>
        </div>
      </div>
    </footer>

    <!-- TOAST -->
    <div x-data="{ show:false, msg:'', t:null }"
         @toast.window="msg=$event.detail; show=true; clearTimeout(t); t=setTimeout(()=>show=false, 3500)"
         x-show="show" x-cloak x-transition
         class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm px-5 py-3 rounded-lg shadow-lg max-w-[90vw]"
         x-text="msg"></div>`;
  }

  // Unduh: tambah hitungan unduhan; berkas asli diunduh, dokumen contoh hanya disimulasikan
  window.JDIH.download = function (id) {
    const d = JDIH.load();
    const doc = d.docs.find((x) => x.id === id);
    if (!doc) return 0;
    doc.downloads = (doc.downloads || 0) + 1;
    JDIH.save(d);
    if (doc.file && /^dokumen\//.test(doc.file)) {
      // target _blank: di server web berkas terunduh; saat dibuka via file:// browser membukanya di tab baru
      const a = Object.assign(document.createElement('a'), { href: doc.file, download: doc.file.split('/').pop(), target: '_blank', rel: 'noopener' });
      document.body.appendChild(a); a.click(); a.remove();
      window.dispatchEvent(new CustomEvent('toast', { detail: `Mengunduh ${doc.file.split('/').pop()}` }));
    } else {
      window.dispatchEvent(new CustomEvent('toast', { detail: 'Berkas belum tersedia — dokumen ini masih contoh (simulasi).' }));
    }
    return doc.downloads;
  };
})();
