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
        drive: {
          "0%": { left: "-16%" },
          "100%": { left: "106%" },
        },
        "wheel-spin": {
          to: { transform: "rotate(360deg)" },
        },
        "road-scroll": {
          to: { backgroundPosition: "-48px 0" },
        },
        "eq-bounce": {
          "0%, 100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "1" },
        },
        "bird-fly": {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "truck-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        "dust-puff": {
          "0%": { transform: "translateY(0) scale(0.4)", opacity: "0.55" },
          "100%": { transform: "translateY(-12px) scale(1.6)", opacity: "0" },
        },
        "note-float": {
          "0%": { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: "0" },
          "15%": { opacity: "1" },
          "100%": { transform: "translateY(-58px) translateX(var(--drift, 12px)) rotate(20deg)", opacity: "0" },
        },
        "tassel-sway": {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
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
        drive: "drive 16s linear infinite",
        "wheel-spin": "wheel-spin 0.7s linear infinite",
        "road-scroll": "road-scroll 0.7s linear infinite",
        "eq-bounce": "eq-bounce 0.9s ease-in-out infinite",
        marquee: "marquee 9s linear infinite",
        twinkle: "twinkle 2.4s ease-in-out infinite",
        "bird-fly": "bird-fly 22s linear infinite",
        "truck-bounce": "truck-bounce 0.35s ease-in-out infinite",
        "dust-puff": "dust-puff 0.9s ease-out infinite",
        "note-float": "note-float 3s ease-in infinite",
        "tassel-sway": "tassel-sway 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
