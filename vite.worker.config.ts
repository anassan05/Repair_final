import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 5174,
  },
  plugins: [
    react(),
    // Serve worker.html instead of index.html for dev server
    {
      name: "worker-html",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          // Rewrite all non-asset requests to worker.html
          if (req.url && !req.url.includes(".") && !req.url.startsWith("/@") && !req.url.startsWith("/src") && !req.url.startsWith("/node_modules")) {
            req.url = "/worker.html";
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
    outDir: "dist-worker",
    rollupOptions: {
      input: path.resolve(__dirname, "worker.html"),
    },
  },
});
