// vite.config.ts
import react from "file:///Users/maxschridde/dev/talysto/groovestack-core/node_modules/.pnpm/@vitejs+plugin-react@4.4.1_vite@5.4.19/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import autoExternal from "file:///Users/maxschridde/dev/talysto/groovestack-core/node_modules/.pnpm/rollup-plugin-auto-external@2.0.0_rollup@4.40.2/node_modules/rollup-plugin-auto-external/index.js";
import { visualizer } from "file:///Users/maxschridde/dev/talysto/groovestack-core/node_modules/.pnpm/rollup-plugin-visualizer@5.14.0_rollup@4.40.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { defineConfig } from "file:///Users/maxschridde/dev/talysto/groovestack-core/node_modules/.pnpm/vite@5.4.19_@types+node@20.17.46/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/maxschridde/dev/talysto/groovestack-core/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.17.46_rollup@4.40.2_typescript@5.8.3_vite@5.4.19/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/maxschridde/dev/talysto/groovestack-core/core-versions-fe";
var vite_config_default = defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      rollupConfig: {
        docModel: {
          enabled: true,
          apiJsonFilePath: "../docs/meta/<unscopedPackageName>.api.json"
        }
      }
    }),
    react(),
    visualizer({ open: false })
  ],
  build: {
    // sourcemap: true,
    lib: {
      entry: {
        index: resolve(__vite_injected_original_dirname, "src/core-versions/index.ts"),
        mock: resolve(__vite_injected_original_dirname, "src/core-versions/mock.ts")
      },
      formats: ["es"]
      // UMD
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      plugins: [autoExternal()],
      external: [/@mui/, "react/jsx-runtime", "@faker-js/faker"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          // "react-copy-to-clipboard": "react-copy-to-clipboard",
          //  vue: 'Vue'
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWF4c2NocmlkZGUvZGV2L3RhbHlzdG8vZ3Jvb3Zlc3RhY2stY29yZS9jb3JlLXZlcnNpb25zLWZlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWF4c2NocmlkZGUvZGV2L3RhbHlzdG8vZ3Jvb3Zlc3RhY2stY29yZS9jb3JlLXZlcnNpb25zLWZlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYXhzY2hyaWRkZS9kZXYvdGFseXN0by9ncm9vdmVzdGFjay1jb3JlL2NvcmUtdmVyc2lvbnMtZmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBhdXRvRXh0ZXJuYWwgZnJvbSAncm9sbHVwLXBsdWdpbi1hdXRvLWV4dGVybmFsJ1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBkdHMoe1xuICAgICAgcm9sbHVwVHlwZXM6IHRydWUsXG4gICAgICByb2xsdXBDb25maWc6IHtcbiAgICAgICAgZG9jTW9kZWw6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIGFwaUpzb25GaWxlUGF0aDogJy4uL2RvY3MvbWV0YS88dW5zY29wZWRQYWNrYWdlTmFtZT4uYXBpLmpzb24nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICByZWFjdCgpLFxuICAgIHZpc3VhbGl6ZXIoeyBvcGVuOiBmYWxzZSB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBzb3VyY2VtYXA6IHRydWUsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29yZS12ZXJzaW9ucy9pbmRleC50cycpLFxuICAgICAgICBtb2NrOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb3JlLXZlcnNpb25zL21vY2sudHMnKSxcbiAgICAgIH0sXG4gICAgICBmb3JtYXRzOiBbJ2VzJ10sIC8vIFVNRFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gbWFrZSBzdXJlIHRvIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGRuJ3QgYmUgYnVuZGxlZFxuICAgICAgLy8gaW50byB5b3VyIGxpYnJhcnlcbiAgICAgIHBsdWdpbnM6IFthdXRvRXh0ZXJuYWwoKV0sXG4gICAgICBleHRlcm5hbDogWy9AbXVpLywgJ3JlYWN0L2pzeC1ydW50aW1lJywgJ0BmYWtlci1qcy9mYWtlciddLFxuXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgLy8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkXG4gICAgICAgIC8vIGZvciBleHRlcm5hbGl6ZWQgZGVwc1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgLy8gXCJyZWFjdC1jb3B5LXRvLWNsaXBib2FyZFwiOiBcInJlYWN0LWNvcHktdG8tY2xpcGJvYXJkXCIsXG4gICAgICAgICAgLy8gIHZ1ZTogJ1Z1ZSdcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtYLE9BQU8sV0FBVztBQUNwWSxTQUFTLGVBQWU7QUFDeEIsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBTGhCLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxRQUNaLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULGlCQUFpQjtBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLElBQ04sV0FBVyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQUEsRUFDNUI7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBLElBRUwsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLGtDQUFXLDRCQUE0QjtBQUFBLFFBQ3RELE1BQU0sUUFBUSxrQ0FBVywyQkFBMkI7QUFBQSxNQUN0RDtBQUFBLE1BQ0EsU0FBUyxDQUFDLElBQUk7QUFBQTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQTtBQUFBLE1BR2IsU0FBUyxDQUFDLGFBQWEsQ0FBQztBQUFBLE1BQ3hCLFVBQVUsQ0FBQyxRQUFRLHFCQUFxQixpQkFBaUI7QUFBQSxNQUV6RCxRQUFRO0FBQUE7QUFBQTtBQUFBLFFBR04sU0FBUztBQUFBO0FBQUE7QUFBQSxRQUdUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
