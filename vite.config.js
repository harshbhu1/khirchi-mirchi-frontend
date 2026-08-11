import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Splitting keeps the spreadsheet parser out of the first paint.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          xlsx: ["xlsx"],
          charts: ["recharts", "html-to-image"],
          motion: ["framer-motion"],
          barcode: ["@zxing/library", "@zxing/browser", "jsqr"],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
});
