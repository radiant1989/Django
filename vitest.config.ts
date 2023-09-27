import { fileURLToPath, URL } from "url";
import { defineConfig } from "vitest/config";
import svgLoader from "vite-svg-loader";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src/", import.meta.url)),
      "@": fileURLToPath(new URL("./src/", import.meta.url)),
      "~~": fileURLToPath(new URL("./", import.meta.url)),
      "@@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  plugins: [
    svgLoader(),
    vue(),
    AutoImport({
      imports: ["vue"],
      dirs: [],
      vueTemplate: true,
      dts: false,
    }),
  ],
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "happy-dom",
  },
});
