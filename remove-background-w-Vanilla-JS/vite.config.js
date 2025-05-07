import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Asegura que las rutas sean relativas
  build: {
    outDir: 'dist', // Carpeta de salida para los archivos compilados
    rollupOptions: {
      input: '/home/sites/remove_background/remove-background-w-Vanilla-JS/index.html', // Archivo de entrada principal
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '', // Puedes agregar variables globales aquí si es necesario
      },
    },
  },
});