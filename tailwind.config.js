/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Only scan your source files
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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