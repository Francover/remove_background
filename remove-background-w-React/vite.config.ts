import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '', // Puedes agregar variables globales aquí si es necesario
      },
    },
  },
})

