/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,ts,jsx,tsx,mdx}",
  ],  
  theme: {
    extend: {
      colors: {
        main: '#2B7A78',
        black: '#17252A',
        secondary: '#3AAFA9',
        white: '#FCFFFE',
      },
    },
  },
  plugins: [],
}