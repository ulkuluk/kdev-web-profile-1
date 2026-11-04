import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const src = (p: string) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@\/content$/, replacement: src("content/index.ts") },
      { find: /^@\/content\//, replacement: src("content/") },
      { find: /^@\/components\//, replacement: src("components/") },
      { find: /^@\/lib\//, replacement: src("lib/") },
    ],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
