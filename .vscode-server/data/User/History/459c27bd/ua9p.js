import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        target: 'esnext', // Ensures modern compatibility
        rollupOptions: {
            external: ['node-fetch', 'npm-run-path', 'execa'] // Ensures Node-only modules are never bundled
        }
    },
    optimizeDeps: {
        exclude: ['node-fetch', 'npm-run-path', 'execa'] // Exclude from frontend bundle
    },
    ssr: {
        noExternal: ['node-fetch', 'npm-run-path', 'execa'] // Prevent SSR issues
    },
    define: {
        'process.env': {}, // Mock Node.js `process.env`
    },
    server: {
        watch: {
            usePolling: true  // Ensures file updates are detected reliably
        }
    }
});
