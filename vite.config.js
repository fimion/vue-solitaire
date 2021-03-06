import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'
const alias = require('./aliases.config.js').vite

export default defineConfig({
  resolve:{
    alias,
  },
  plugins:[vue(),VitePWA({injectRegister:null,filename:'service-worker.js'})],
})
