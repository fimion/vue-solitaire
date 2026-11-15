import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";

function resolveSrc(_path: string) {
  return path.resolve(__dirname, _path);
}

export default defineConfig({
  resolve: {
    alias: {
      "@components": resolveSrc("src/components"),
      "@assets": resolveSrc("src/assets"),
      "@stores": resolveSrc("src/stores"),
      "@global": resolveSrc("src/global"),
      "@class": resolveSrc("src/class"),
      "@template": resolveSrc("src/template"),
      "@src": resolveSrc("src"),
    },
  },
  plugins: [
    vue(),
    VitePWA({ injectRegister: null, filename: "service-worker.js", registerType: "autoUpdate" }),
  ],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
});
