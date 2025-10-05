import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Caderninho de Receitas',
        short_name: 'Caderninho',
        start_url: '/',
        background_color: '#f8f8f8',
        theme_color: '#87695e',
        display: 'standalone',
        icons: [
          {
            src: 'images/logo.png', // você pode mover isso para `public/images/logo.png`
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src/assets/images'),
    },
  },
});
