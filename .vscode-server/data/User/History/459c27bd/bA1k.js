import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        target: 'esnext' // Ensures modern compatibility
    },
    optimizeDeps: {
        exclude: ['npm-run-path'], // Ignore Node-only modules in the frontend
    },
    resolve: {
        alias: {
            "node:url": "url",  
            "node:process": "process",  
            "node:path": "path"  // Ensures path references are skipped
        }
    },
    server: {
        watch: {
            usePolling: true  // Ensures file updates are detected reliably
        }
    }
});
