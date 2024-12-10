import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // Ensure this matches your server's port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
