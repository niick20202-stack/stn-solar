import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: false, // faster builds
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion'
          }
          if (id.includes('node_modules/lenis')) {
            return 'lenis'
          }
          // Split fontsource into its own chunk — large but cached separately
          if (id.includes('node_modules/@fontsource') || id.includes('node_modules/material-symbols')) {
            return 'fonts'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
