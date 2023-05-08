/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vitest/config" />

import { defineConfig, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
let options: UserConfigExport = {
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
            }
        ]
    }
}
const env = process.env.NODE_ENV
const resolve = {
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
        }
    ]
}

/**
 * 不知道为啥在开发模式下修改Buffer的依赖路径会报错，
 * 所以只能在构建的时候加上
 */
if (env === 'production') {
    resolve.alias.push({
        find: 'buffer',
        replacement:'node_modules/buffer/index.js'
    })
}

options.resolve = resolve
export default defineConfig(options)
