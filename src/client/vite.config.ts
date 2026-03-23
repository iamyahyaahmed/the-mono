import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // @ maps to src/client — import from '@/components/Button'
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 4000,
    proxy: {
      // Forward /graphql to Express in dev — no CORS issues
      '/graphql': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})