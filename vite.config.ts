import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
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
        }
      ]
  }
})
