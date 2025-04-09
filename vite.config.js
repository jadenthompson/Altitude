import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175, // optional
  },
  build: {
    outDir: 'dist',
  },
  // 👇 Add this to enable SPA fallback on Vercel
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
