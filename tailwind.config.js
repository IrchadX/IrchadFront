/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Only scan your source files
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#2B7A78",
        black: "#17252A",
        secondary: "#3AAFA9",
        white: "#FCFFFE",
        border: "rgba(224, 225, 226, 0.3)",
        "black-5": "rgba(43, 122, 120, 0.05)",
        "black-10": "rgba(43, 122, 120, 0.10)",
        "main-5": "rgba(43, 122, 120, 0.05)",
        "black-30": "rgba(23, 37, 42, 0.30)",
      },
      fontFamily: {
        futura: "var(--font-futura)",
        montserrat: "var(--font-montserrat)",
      },
    },
  },
  plugins: [],
};
