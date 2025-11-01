import type { NextConfig } from 'next';
import path from 'path';
import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV !== 'production';

// Configuração do PWA
const withPWAConfig = withPWA({
  dest: 'public',
  disable: isDev, // desativa o PWA em modo dev
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      // Cache das chamadas à API
      urlPattern: /^https:\/\/api\.receptabook\.com\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'recepta-api-cache',
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60, // 1 hora
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      // Cache de imagens externas (CDN)
      urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 dia
        },
      },
    },
    {
      // Cache de arquivos estáticos (JS, CSS, fontes)
      urlPattern: /^https:\/\/.*\/_next\/static\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets-cache',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 dias
        },
      },
    },
  ],
});

// Configuração principal do Next.js
const nextConfig: NextConfig = withPWAConfig({
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@common'] = path.resolve(__dirname, '../common/src');
    config.resolve.alias['services'] = path.resolve(
      __dirname,
      '../common/src/services',
    );
    return config;
  },
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
    domains: [
      { domain: 'en.receptabook.com', defaultLocale: 'en' },
      { domain: 'pt.receptabook.com', defaultLocale: 'pt' },
    ],
  },
});

export default nextConfig;
