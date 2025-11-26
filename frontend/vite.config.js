import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Ensure proper asset handling
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Ensure images are properly copied
  publicDir: 'public',
})
