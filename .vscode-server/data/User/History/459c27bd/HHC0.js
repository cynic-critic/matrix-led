import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        target: 'esnext' // Ensures modern compatibility
    },
    optimizeDeps: {
        exclude: ['npm-run-path', 'execa'] // Ignore both dependencies
    },
    ssr: {
        noExternal: ['npm-run-path', 'execa'] // Exclude from SSR builds
    },
    build: {
      rollupOptions: {
          external: ['npm-run-path', 'execa'] // Forces Vite to ignore them entirely
      }
    },
    define: {
        'process.env': {}, // Mock Node.js process.env to prevent undefined errors
    },
    server: {
        watch: {
            usePolling: true  // Ensures file updates are detected reliably
        }
    }
});
