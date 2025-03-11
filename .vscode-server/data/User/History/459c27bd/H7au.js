import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        target: 'esnext', // Ensures modern compatibility
        rollupOptions: {
            external: ['fs'] // Prevents Vite from bundling `fs` (Node.js-only)
        }
    },
    optimizeDeps: {
        exclude: ['@shadcn/ui'] // Ensures Vite doesn't incorrectly bundle the CLI parts
    },
    ssr: {
        noExternal: ['@shadcn/ui'] // Ensures SSR builds skip these
    },
    define: {
        'process.env': {}, // Mock Node.js `process.env`
    },
    server: {
        watch: {
            usePolling: true // Ensures file updates are detected reliably
        }
    }
});
