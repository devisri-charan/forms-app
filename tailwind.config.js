/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        citrus: '#F36B1D',
        midnight: '#000000',
        shadow: '#262626',
        pearl: '#F2F2F2',
        frost: '#FFFFFF',
      },
    },
  },
  plugins: [],
}