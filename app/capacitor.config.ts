import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.receptabook.app',
  appName: 'recepta-book',
  webDir: 'public',
  server: {
    url: 'http://192.168.1.100:5173',
    cleartext: true,
  },
};

export default config;
