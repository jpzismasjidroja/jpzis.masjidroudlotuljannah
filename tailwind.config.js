import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#022c22',
        'brand-secondary': '#064e3b',
        'brand-accent': '#d0a237',
        'brand-dark': '#113642',
        'brand-light': '#FFFCF5',
      }
    },
  },
  plugins: [
    typography,
  ],
}