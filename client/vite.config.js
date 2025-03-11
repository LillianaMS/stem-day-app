import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': mode === 'production' 
          ? 'http://remoodle.fun/stemday/api' 
          : 'http://localhost:8081'
      }
    },
    base: mode === 'production' ? '/stemday/' : '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  }
})