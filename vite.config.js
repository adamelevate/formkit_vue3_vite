import { fileURLToPath, URL } from 'node:url'

import path from 'path';

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'url' // or 'raw'
    })
  ],
  resolve: {
    // alias:[
    //   '@root': path.resolve(__dirname, './'),
    //   { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    //   // { find: '#root', replacement: fileURLToPath(new URL('./public',__dirname)) },
    // ]
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
    alias: {
      "#root" : path.resolve(__dirname, './'),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  server:{
    port: 8080,
    cors: { origin: true, headers: { "Access-Control-Allow-Origin": "*" }}
  },
  define: {
    global: {},
  },
})
