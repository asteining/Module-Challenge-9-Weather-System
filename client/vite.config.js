import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname), // Ensure the root is set to the client directory
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Specify the correct entry point
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
