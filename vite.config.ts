import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src/", import.meta.url)),
      "@": fileURLToPath(new URL("./src/", import.meta.url)),
      "~~": fileURLToPath(new URL("./", import.meta.url)),
      "@@": fileURLToPath(new URL("./", import.meta.url)),
    },
  }
});
