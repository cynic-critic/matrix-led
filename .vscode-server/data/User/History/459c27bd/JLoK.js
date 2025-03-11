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
    resolve: {
        alias: {
            "node:url": false,
            "node:process": false,
            "node:path": false
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
