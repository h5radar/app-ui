import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  test: {
    environment: "jsdom",
    outputFile: { junit: "./tests/results/junit.xml", html: "./tests/results/index.html" },
    reporters: ["default", "junit", "html"],
    setupFiles: ["./tests/setup.ts", "./tests/mocks.ts"],
    coverage: {
      include: ["src/**"],
      exclude: ["src/ui/**"],
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./tests/coverage",
      thresholds: {
        statements: 25.89,
        branches: 56.59,
        functions: 40.39,
        lines: 25.89,
        autoUpdate: false,
      },
    },
  },
});
