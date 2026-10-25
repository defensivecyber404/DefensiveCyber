import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './backend',
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5005',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://127.0.0.1:5005',
        changeOrigin: true,
      }
    }
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Never put jodit in initial/manual vendor chunks so it stays strictly dynamic
            if (id.includes('jodit')) {
              return undefined;
            }
            if (
              id.includes('/react/') || 
              id.includes('/react-dom/') || 
              id.includes('/scheduler/') ||
              id.includes('\\react\\') || 
              id.includes('\\react-dom\\') || 
              id.includes('\\scheduler\\')
            ) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('react-router') || id.includes('react-helmet')) {
              return 'vendor-router';
            }
          }
        }
      }
    }
  }
})
