import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

function resolveSrc(_path) {
  return path.resolve(__dirname, _path);
}

export default defineConfig({
  resolve: {
    alias: {
      "@components": resolveSrc("src/components"),
      "@assets": resolveSrc("src/assets"),
      "@store": resolveSrc("src/store"),
      "@global": resolveSrc("src/global"),
      "@class": resolveSrc("src/class"),
      "@template": resolveSrc("src/template"),
      "@src": resolveSrc("src"),
    },
  },
  plugins: [
    vue(),
    VitePWA({ injectRegister: null, filename: "service-worker.js" }),
  ],
});
