/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), visualizer()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: true,
        coverage: {
            provider: 'c8'
        }
    },
    server: {
        port: 8080,
        host: "0.0.0.0"
    },
    preview: {
        port: 8080
    },
    resolve: {
        alias:[
            {
                find: 'wagmi/dist',
                replacement:'wagmi/dist'
            },
            {
                find: './dist/connectors/walletConnect',
                replacement:'wagmi/dist/connectors/walletConnect.js'
            },
            {
                find: 'bn.js',
                replacement:'node_modules/bn.js/lib/bn.js'
            },
            {
                find: 'buffer',
                replacement:'node_modules/buffer/index.js'
            }
        ]
    }
})
