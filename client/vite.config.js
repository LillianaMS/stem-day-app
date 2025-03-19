import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/stemday/api': 'http://localhost:8081'
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  }
})