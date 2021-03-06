import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'
import path from 'path'
import requireContext from 'rollup-plugin-require-context'

function makePath(...args){
  return path.join(path.resolve(__dirname),...args)
}



export default defineConfig({
  resolve:{
    alias:[
      {find:/@components/, replacement: makePath('src','components')},
      {find:/@assets/, replacement: makePath('src','assets')},
      {find:/@store/, replacement: makePath('src','store')},
      {find:/@global/, replacement: makePath('src','global')},
      {find:/@class/, replacement: makePath('src','class')},
      {find:/@template/, replacement: makePath('src','template')},
      {find: /@src/, replacement:makePath('src')},
    ],
  },
  plugins:[requireContext(),vue(),VitePWA()],
})
