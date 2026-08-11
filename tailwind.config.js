/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 8px 24px -8px rgb(0 0 0 / 0.10)",
        glow: "0 0 0 1px rgb(249 115 22 / 0.35), 0 8px 30px -8px rgb(249 115 22 / 0.45)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "progress-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(220%)" },
        },
        "copy-flash": {
          "0%": { backgroundColor: "rgb(249 115 22 / 0.35)" },
          "100%": { backgroundColor: "rgb(249 115 22 / 0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.25)", opacity: "0" },
          "100%": { transform: "scale(1.25)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-in": "fade-in .35s ease-out both",
        "fade-up": "fade-up .45s cubic-bezier(.16,1,.3,1) both",
        "slide-in-right": "slide-in-right .35s cubic-bezier(.16,1,.3,1) both",
        "scale-in": "scale-in .25s cubic-bezier(.16,1,.3,1) both",
        shimmer: "shimmer 1.6s infinite",
        "progress-sweep": "progress-sweep 1.2s ease-in-out infinite",
        "copy-flash": "copy-flash .9s ease-out",
        "pulse-ring": "pulse-ring 2s cubic-bezier(.24,0,.38,1) infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
