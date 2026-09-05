import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    reporters: ["default"],
    setupFiles: ["tests/setup.ts"],
  },
});
