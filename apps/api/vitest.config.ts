import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    reporters: ["tap-flat"],
    setupFiles: ["tests/setup.ts"],
  },
});
