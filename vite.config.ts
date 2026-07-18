import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Check if we are running on Vercel
  const isVercel = process.env.VERCEL === '1';
  // Check if we are running a local dev server (npm run dev)
  const isDev = command === 'serve';

  // Base path logic:
  // - Vercel / Local dev: '/'
  // - GitHub Pages (production build outside Vercel): '/LedzePlus/'
  const basePath = isVercel || isDev ? '/' : '/LedzePlus/';

  return {
    plugins: [react()],
    base: basePath,
    build: {
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 2,
          toplevel: true,
          unused: true,
          dead_code: true,
        },
        mangle: {
          safari10: true,
        }
      },
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'framer-motion': ['framer-motion'],
            'lucide-icons': ['lucide-react']
          },
        },
      },
    },
  };
})