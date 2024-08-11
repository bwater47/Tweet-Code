// https://vitejs.dev/config/
// Import defineConfig from vite.
import { defineConfig } from "vite";
// Import react from vite-plugin-react to use React with Vite.
import react from "@vitejs/plugin-react";
// Export the configuration.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target: "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
