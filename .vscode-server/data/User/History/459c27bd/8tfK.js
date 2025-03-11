import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        target: 'esnext' // Ensures modern compatibility
    },
    optimizeDeps: {
        exclude: ['npm-run-path'], // Excludes this Node-only module
    },
    ssr: {
        noExternal: ['npm-run-path'] // Ensures SSR builds skip this module
    },
    resolve: {
        alias: {
            "node:url": "url",
            "node:process": "process",
            "node:path": "path"
        }
    },
    define: {
        'process.env': {},   // Mock Node environment variables for Vite compatibility
    },
    server: {
        watch: {
            usePolling: true  // Ensures file updates are detected reliably
        }
    }
});
