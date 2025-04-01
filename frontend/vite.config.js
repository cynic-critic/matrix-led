import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),  // Correct alias setup
        }
    },
    build: {
        target: 'esnext',  // Ensures modern compatibility
        rollupOptions: {
            external: ['npm-run-path', 'execa', 'node-fetch'] // Ensures Node-only modules are never bundled
        }
    },
    optimizeDeps: {
        exclude: ['npm-run-path', 'execa'] // Exclude problematic dependencies
    },
    define: {
        'process.env': {}, // Mocks `process.env` to prevent frontend compatibility issues
    },
    server: {
        host: true,
        port: 5173,
        watch: {
            usePolling: true // Ensures file updates are detected reliably
        }
    }
});
