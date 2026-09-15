import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist-demo",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: "index.html",
        lab: "lab/index.html",
        proof: "proof/index.html",
        sdk: "sdk/index.html",
        judges: "judges/index.html",
      },
    },
  },
});
