import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        target: 'esnext' // Ensures modern compatibility
    },
    optimizeDeps: {
        exclude: ['npm-run-path'], // Prevents Vite from bundling Node.js libraries
    },
    resolve: {
      alias: {
          "node:url": "url",  // Ensures `fileURLToPath` isn't bundled incorrectly
      }
    },  
    server: {
        watch: {
            usePolling: true // Ensures file updates are detected reliably
        }
    }
});
