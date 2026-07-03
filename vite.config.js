import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/official-landing-page/',
  server: {
    allowedHosts: ['.loca.lt'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        galeria: resolve(__dirname, 'galeria.html'),
        en: resolve(__dirname, 'en/index.html'),
        en_galeria: resolve(__dirname, 'en/galeria.html'),
        es: resolve(__dirname, 'es/index.html'),
        es_galeria: resolve(__dirname, 'es/galeria.html'),
        obrigado: resolve(__dirname, 'obrigado.html'),
        thank_you: resolve(__dirname, 'en/thank-you.html'),
        gracias: resolve(__dirname, 'es/gracias.html'),
      },
    },
    cssMinify: true,
    sourcemap: false,
  },
})
