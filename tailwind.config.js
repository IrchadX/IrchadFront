/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Only scan your source files
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: "#2B7A78",
          500: "#3A8C8A",
          600: "#1E6A68",
          700: "#125A58",
          800: "#0A4A48",
        },
        gray: {
          700: "#374151",
          800: "#1F2937",
        },
        black: "#17252A",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        white: "#FCFFFE",
        border: "hsl(var(--border))",
        "black-5": "rgba(43, 122, 120, 0.05)",
        "black-10": "rgba(43, 122, 120, 0.10)",
        "main-5": "rgba(43, 122, 120, 0.05)",
        "main-40": "rgba(43, 122, 120, 0.4)",
        "main-20": "rgba(43, 122, 120, 0.2)",
        "black-30": "rgba(23, 37, 42, 0.30)",
        "black-5": "#f8f9fa",
        "black-10": "#e9ecef",
        "black-20": "#dee2e6",
        "black-30": "#ced4da",
        "black-40": "#adb5bd",
        "black-50": "#6c757d",
        "black-60": "#495057",
        "black-70": "#343a40",
        "black-80": "#212529",
        "black-90": "#000000",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        futura: "var(--font-futura)",
        montserrat: "var(--font-montserrat)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
