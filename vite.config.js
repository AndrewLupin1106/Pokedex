import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import imagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression(),
    imagemin({
      cache: true,
      imageminOptions: {
        plugins: [
          ['imagemin-mozjpeg', { quality: 80 }],
          ['imagemin-pngquant', { quality: [0.6, 0.8] }],
          ['imagemin-svgo', { plugins: [{ removeViewBox: false }] }]
        ]
      },
      webp: false,
      maxFileSize: 1024 * 10, // 10 KB
      publicPath: '/assets/images/',
      removeOriginal: false,
      header: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  ],
})
