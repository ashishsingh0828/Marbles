// site-australia -> port 3001 (India runs on 3000, admin on 3002, API on 5050)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3001,
    strictPort: true,
    allowedHosts: true,
    proxy: {
      "/api": "http://localhost:5050",
      "/uploads": "http://localhost:5050",
    },
  },
});
