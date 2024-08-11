// https://vitejs.dev/config/
// Import defineConfig from vite.
import { defineConfig } from "vite";
// Import react from vite-plugin-react to use React with Vite.
import react from "@vitejs/plugin-react";
// Export the configuration.
export default defineConfig({
  // Add the react plugin to the plugins array.
  plugins: [react()],
  // Add the server configuration, set the port to 3000, and open the browser.
  server: {
    port: 3000,
    open: true,
    // Add the proxy configuration to forward requests to the server running on port 3001.
    proxy: {
      "/graphql": {
        target: "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  // Add the build configuration for testing with happy-dom.
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
