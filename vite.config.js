import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Same-origin in dev: requests to /api are proxied to the backend,
      // so the browser sees one origin and CORS never comes into play.
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // WebSocket (chat) — scoped to the active workspace.
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true,
        changeOrigin: true,
      },
    },
  },
})
