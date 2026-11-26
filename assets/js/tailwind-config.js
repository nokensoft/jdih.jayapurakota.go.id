// Konfigurasi Tailwind bersama untuk semua halaman (dimuat tepat setelah cdn.tailwindcss.com)
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy:   { 700:'#0d47a1', 800:'#0b3a8c', 900:'#0a2a6b', 950:'#08245c' },
        brand:  { 50:'#e8f1fd', 600:'#0d47a1' },
        orange: { 400:'#ffa726', 500:'#ff9800', 600:'#f08c00' },
        footer: '#1e293b'
      },
      fontFamily: { sans: ['Nunito Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'] }
    }
  }
};
