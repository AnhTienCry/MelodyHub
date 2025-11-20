/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1db954',
        dark: '#0a0a0a',
        'dark-light': '#1a1a1a',
        'dark-lighter': '#282828',
      },
    },
  },
  plugins: [],
}
