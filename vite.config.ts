import { defineConfig } from 'vite'
import { resolve } from 'node:path'

console.log({ resolve: resolve(__dirname, 'dev-app', 'build', 'index.js') })

export default defineConfig({
  resolve: {
    alias: {
      'lithen-router': resolve(__dirname, 'dev-app', 'build', 'index.js')
    }
  }
})
