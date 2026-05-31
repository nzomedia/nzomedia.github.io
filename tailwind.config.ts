import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E"
        },
        cta: {
          500: "#F97316",
          600: "#EA580C"
        }
      },
      fontFamily: {
        heading: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Work Sans", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 132, 199, 0.18)",
        ring: "0 0 0 6px rgba(14, 165, 233, 0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;

