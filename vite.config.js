import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["three"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js", // Optional: For global test setup
  },
  build: {
    // Example build options
    chunkSizeWarningLimit: 1000, // Increase the size limit to avoid warnings for large chunks (in KB)
    rollupOptions: {
      output: {
        manualChunks: {
          // Example of manually splitting out large libraries (adjust as needed)
          vendor: ["three", "react", "react-dom"],
        },
      },
    },
  },
});
