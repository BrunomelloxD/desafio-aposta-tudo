/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      /**
       * Font Family Configuration
       * 
       * Plus Jakarta Sans - Fonte principal do APOSTATUDO
       * Fallback stack garante boa experiência em todos os dispositivos
       * 
       * Hierarquia de fallback:
       * 1. Plus Jakarta Sans (Google Fonts)
       * 2. system-ui (Fonte do SO)
       * 3. -apple-system (macOS/iOS)
       * 4. BlinkMacSystemFont (Apple fallback)
       * 5. Segoe UI (Windows)
       * 6. Roboto (Android)
       * 7. sans-serif (Generic fallback)
       */
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      /**
       * Color Palette - APOSTATUDO Brand
       * 
       * Primary: Azul (#0606ad) - Navegação, ações principais
       * Accent: Laranja (#ff450c) - CTAs, destaques
       * Dark: Background escuro (#020716) - Tema principal
       */
      colors: {
        'primary': {
          DEFAULT: '#0606ad',
          dark: '#050590',
          light: '#0808c9',
        },
        'accent': {
          DEFAULT: '#ff450c',
          dark: '#e63d0a',
          light: '#ff5a24',
        },
        'dark': {
          DEFAULT: '#020716',
          light: '#0a0f2c',
          lighter: '#131a3f',
        }
      }
    },
  },
  plugins: [],
}
