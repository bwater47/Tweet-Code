// https://vitejs.dev/config/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const uri =
  `https://ithinkididit--tweettweetcode.netlify.app/graphql`;
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    target: uri,
    // Add the proxy configuration to forward requests to the server running on port 3001.
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
