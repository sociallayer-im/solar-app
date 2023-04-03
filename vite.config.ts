import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: '0.0.0.0'
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
