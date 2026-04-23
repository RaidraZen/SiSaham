import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';

import manifest from './manifest.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', '');
  return {
    plugins: [
      react(),
      crx({ manifest }),
    ],
    define: {
      'import.meta.env.VITE_AZURE_API_KEY': JSON.stringify(env.VITE_AZURE_API_KEY || ''),
      'import.meta.env.VITE_AZURE_SEARCH_URL': JSON.stringify(env.VITE_AZURE_SEARCH_URL || ''),
      'import.meta.env.VITE_AZURE_INDEX_NAME': JSON.stringify(env.VITE_AZURE_INDEX_NAME || ''),
    },
    base: './',
    server: {
      port: 5173,
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  };
});