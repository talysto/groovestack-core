// vite.config.ts
import react from "file:///Users/maxschridde/dev/moonlight-labs/core/node_modules/.pnpm/@vitejs+plugin-react@4.0.3_vite@4.4.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import autoExternal from "file:///Users/maxschridde/dev/moonlight-labs/core/node_modules/.pnpm/rollup-plugin-auto-external@2.0.0_rollup@3.29.4/node_modules/rollup-plugin-auto-external/index.js";
import { visualizer } from "file:///Users/maxschridde/dev/moonlight-labs/core/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2_rollup@3.29.4/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { defineConfig } from "file:///Users/maxschridde/dev/moonlight-labs/core/node_modules/.pnpm/vite@4.4.4_@types+node@20.4.2/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/maxschridde/dev/moonlight-labs/core/node_modules/.pnpm/vite-plugin-dts@3.5.0_@types+node@20.4.2_rollup@3.29.4_typescript@5.1.6_vite@4.4.4/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/maxschridde/dev/moonlight-labs/core/core-base-fe";
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
    lib: {
      // entry: resolve(__dirname, "lib/main.js"),
      entry: {
        index: resolve(__vite_injected_original_dirname, "src/index.ts")
      },
      formats: ["es"]
      // UMD
      // name: 'CORE-BASE',
      // the proper extensions will be added
      // fileName: 'core-base',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      plugins: [autoExternal()],
      external: [
        "react/jsx-runtime",
        "dayjs/plugin/relativeTime",
        "dayjs/plugin/localizedFormat"
      ],
      output: {
        // Some utils have minimal CSS deps
        intro: 'import "./style.css";',
        // Provide global variables to use in the UMD build for externalized deps
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWF4c2NocmlkZGUvZGV2L21vb25saWdodC1sYWJzL2NvcmUvY29yZS1iYXNlLWZlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWF4c2NocmlkZGUvZGV2L21vb25saWdodC1sYWJzL2NvcmUvY29yZS1iYXNlLWZlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYXhzY2hyaWRkZS9kZXYvbW9vbmxpZ2h0LWxhYnMvY29yZS9jb3JlLWJhc2UtZmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBhdXRvRXh0ZXJuYWwgZnJvbSAncm9sbHVwLXBsdWdpbi1hdXRvLWV4dGVybmFsJ1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBkdHMoe1xuICAgICAgcm9sbHVwVHlwZXM6IHRydWUsXG4gICAgICByb2xsdXBDb25maWc6IHtcbiAgICAgICAgZG9jTW9kZWw6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIGFwaUpzb25GaWxlUGF0aDogJy4uL2RvY3MvbWV0YS88dW5zY29wZWRQYWNrYWdlTmFtZT4uYXBpLmpzb24nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICByZWFjdCgpLFxuICAgIHZpc3VhbGl6ZXIoeyBvcGVuOiBmYWxzZSB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIC8vIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJsaWIvbWFpbi5qc1wiKSxcbiAgICAgIGVudHJ5OiB7XG4gICAgICAgIGluZGV4OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgfSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnXSwgLy8gVU1EXG4gICAgICAvLyBuYW1lOiAnQ09SRS1CQVNFJyxcbiAgICAgIC8vIHRoZSBwcm9wZXIgZXh0ZW5zaW9ucyB3aWxsIGJlIGFkZGVkXG4gICAgICAvLyBmaWxlTmFtZTogJ2NvcmUtYmFzZScsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAvLyBtYWtlIHN1cmUgdG8gZXh0ZXJuYWxpemUgZGVwcyB0aGF0IHNob3VsZG4ndCBiZSBidW5kbGVkXG4gICAgICAvLyBpbnRvIHlvdXIgbGlicmFyeVxuICAgICAgcGx1Z2luczogW2F1dG9FeHRlcm5hbCgpXSxcbiAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgICdyZWFjdC9qc3gtcnVudGltZScsXG4gICAgICAgICdkYXlqcy9wbHVnaW4vcmVsYXRpdmVUaW1lJyxcbiAgICAgICAgJ2RheWpzL3BsdWdpbi9sb2NhbGl6ZWRGb3JtYXQnLFxuICAgICAgXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBTb21lIHV0aWxzIGhhdmUgbWluaW1hbCBDU1MgZGVwc1xuICAgICAgICBpbnRybzogJ2ltcG9ydCBcIi4vc3R5bGUuY3NzXCI7JyxcbiAgICAgICAgLy8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkIGZvciBleHRlcm5hbGl6ZWQgZGVwc1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgLy8gXCJyZWFjdC1jb3B5LXRvLWNsaXBib2FyZFwiOiBcInJlYWN0LWNvcHktdG8tY2xpcGJvYXJkXCIsXG4gICAgICAgICAgLy8gIHZ1ZTogJ1Z1ZSdcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVWLE9BQU8sV0FBVztBQUN6VyxTQUFTLGVBQWU7QUFDeEIsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBTGhCLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxRQUNaLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULGlCQUFpQjtBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLElBQ04sV0FBVyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQUEsRUFDNUI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQTtBQUFBLE1BRUgsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUMxQztBQUFBLE1BQ0EsU0FBUyxDQUFDLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBSWhCO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQTtBQUFBLE1BR2IsU0FBUyxDQUFDLGFBQWEsQ0FBQztBQUFBLE1BQ3hCLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUE7QUFBQSxRQUVOLE9BQU87QUFBQTtBQUFBLFFBRVAsU0FBUztBQUFBO0FBQUE7QUFBQSxRQUdUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
