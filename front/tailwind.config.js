/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./src/**/*.{js,vue,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'primary': {
          DEFAULT: '#f97015',
          dark: '#e06010',
          light: '#fb8c3c',
        },
        'accent': {
          DEFAULT: '#f97015',
          dark: '#e06010',
          light: '#fb8c3c',
        },
        'dark': {
          DEFAULT: '#111317',
          light: '#1a1d23',
          lighter: '#24272e',
        },
        'surface': {
          DEFAULT: '#1a1d23',
          light: '#24272e',
          border: '#2a2d35',
        },
        'text': {
          DEFAULT: '#f0f2f5',
          muted: '#9ca3af',
          dim: '#6b7280',
        },
        'warm': {
          DEFAULT: '#2f221f',
          light: '#3d2e2a',
        },
      }
    },
  },
  plugins: [],
}
