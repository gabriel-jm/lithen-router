import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      'lithen-router': resolve(__dirname, 'dev-app', 'build', 'index.js')
    }
  }
})
