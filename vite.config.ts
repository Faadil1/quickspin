import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "quickspin-runtime-proof",
      generateBundle() {
        const sourceSha =
          process.env.VERCEL_GIT_COMMIT_SHA ??
          process.env.GIT_COMMIT ??
          process.env.COMMIT_SHA ??
          "UNKNOWN";
        const deploymentId =
          process.env.VERCEL_DEPLOYMENT_ID ?? process.env.DEPLOYMENT_ID ?? "UNKNOWN";
        const deploymentUrl = process.env.VERCEL_URL ?? "UNKNOWN";
        this.emitFile({
          type: "asset",
          fileName: "build.json",
          source: JSON.stringify(
            {
              product: "QuickSpin",
              sourceSha,
              deploymentId,
              deploymentUrl,
              environment: process.env.VERCEL_ENV ?? "local",
              generatedAt: new Date().toISOString(),
            },
            null,
            2
          ),
        });
      },
    },
  ],
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist-demo",
    emptyOutDir: true,
  },
});
