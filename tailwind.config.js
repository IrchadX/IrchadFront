/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#2B7A78",
        black: "#17252A",
        secondary: "#3AAFA9",
        white: "#FCFFFE",
        border: "rgba(224, 225, 226, 0.3)",
      },
      fontFamily: {
        futura: "var(--font-futura)",
        montserrat: "var(--font-montserrat)",
      },
    },
  },
  plugins: [],
};
