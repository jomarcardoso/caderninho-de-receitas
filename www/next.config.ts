import type { NextConfig } from 'next';
import path from 'path';

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
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
      {
        domain: 'en.receptabook.com',
        defaultLocale: 'en',
      },
      {
        domain: 'pt.receptabook.com',
        defaultLocale: 'pt',
      },
    ],
  },
};

export default nextConfig;
