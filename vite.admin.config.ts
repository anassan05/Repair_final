import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 5175,
  },
  plugins: [
    react(),
    {
      name: "admin-html",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (
            req.url &&
            !req.url.includes(".") &&
            !req.url.startsWith("/@") &&
            !req.url.startsWith("/src") &&
            !req.url.startsWith("/node_modules")
          ) {
            req.url = "/admin.html";
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist-admin",
    rollupOptions: {
      input: path.resolve(__dirname, "admin.html"),
    },
  },
});
