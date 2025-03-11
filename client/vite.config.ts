/** Utilities*/
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

/** Plugins */
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import checker from 'vite-plugin-checker';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [vue(), vueJsx(), checker({ typescript: true }), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue', '.d.ts'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    // mimeTypes: {
    //   'application/javascript': ['js', 'mjs'],
    // },

    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     ws: true,
    //   },
    // },
    // cors: {
    //   origin: ['*'],
    // },
  },
});
