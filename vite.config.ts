import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
      styles: { configFile: "src/scss/variables.scss" },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@pos": fileURLToPath(new URL("./src/modules/pos", import.meta.url)),
      "@dashboard": fileURLToPath(
        new URL("./src/modules/dashboard", import.meta.url)
      ),
      "@auth": fileURLToPath(new URL("./src/modules/auth", import.meta.url)),
    },
  },
});
