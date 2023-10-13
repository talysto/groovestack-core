// vite.config.ts
import react from "file:///Users/maxschridde/dev/moonlight-labs/core/node_modules/.pnpm/@vitejs+plugin-react@4.0.3_vite@4.4.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import autoExternal from "file:///Users/maxschridde/dev/moonlight-labs/core/node_modules/.pnpm/rollup-plugin-auto-external@2.0.0_rollup@3.29.4/node_modules/rollup-plugin-auto-external/index.js";
import { defineConfig } from "file:///Users/maxschridde/dev/moonlight-labs/core/node_modules/.pnpm/vite@4.4.4_@types+node@20.4.2/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/maxschridde/dev/moonlight-labs/core/node_modules/.pnpm/vite-plugin-dts@3.5.0_@types+node@20.4.2_rollup@3.29.4_typescript@5.1.6_vite@4.4.4/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe";
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
    react()
    // visualizer({ open: false }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: {
        index: resolve(__vite_injected_original_dirname, "src/core-jobs/index.ts"),
        mock: resolve(__vite_injected_original_dirname, "src/core-jobs/mock.ts")
      },
      formats: ["es"]
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      plugins: [autoExternal()],
      external: [
        /@mui/,
        "react/jsx-runtime",
        "@faker-js/faker",
        "react-copy-to-clipboard",
        "lodash"
      ],
      // // plugins: [autoExternal()],
      // external: ["dayjs", "react-copy-to-clipboard", "@mui/icons-material", "@mui/material", "react", "react/jsx-runtime", "react-admin", "react-dom", "react-hook-form", "@faker-js/faker", "react-google-charts"],
      // external: [/node_modules/],
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWF4c2NocmlkZGUvZGV2L21vb25saWdodC1sYWJzL2NvcmUvY29yZS1qb2JzLWZlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWF4c2NocmlkZGUvZGV2L21vb25saWdodC1sYWJzL2NvcmUvY29yZS1qb2JzLWZlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYXhzY2hyaWRkZS9kZXYvbW9vbmxpZ2h0LWxhYnMvY29yZS9jb3JlLWpvYnMtZmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBhdXRvRXh0ZXJuYWwgZnJvbSAncm9sbHVwLXBsdWdpbi1hdXRvLWV4dGVybmFsJ1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbi8vIFRMQSBSZXZpZXdcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBkdHMoe1xuICAgICAgcm9sbHVwVHlwZXM6IHRydWUsXG4gICAgICByb2xsdXBDb25maWc6IHtcbiAgICAgICAgZG9jTW9kZWw6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIGFwaUpzb25GaWxlUGF0aDogJy4uL2RvY3MvbWV0YS88dW5zY29wZWRQYWNrYWdlTmFtZT4uYXBpLmpzb24nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICByZWFjdCgpLFxuICAgIC8vIHZpc3VhbGl6ZXIoeyBvcGVuOiBmYWxzZSB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29yZS1qb2JzL2luZGV4LnRzJyksXG4gICAgICAgIG1vY2s6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvcmUtam9icy9tb2NrLnRzJyksXG4gICAgICB9LFxuICAgICAgZm9ybWF0czogWydlcyddLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gbWFrZSBzdXJlIHRvIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGRuJ3QgYmUgYnVuZGxlZFxuICAgICAgLy8gaW50byB5b3VyIGxpYnJhcnlcbiAgICAgIHBsdWdpbnM6IFthdXRvRXh0ZXJuYWwoKV0sXG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICAvQG11aS8sXG4gICAgICAgICdyZWFjdC9qc3gtcnVudGltZScsXG4gICAgICAgICdAZmFrZXItanMvZmFrZXInLFxuICAgICAgICAncmVhY3QtY29weS10by1jbGlwYm9hcmQnLFxuICAgICAgICAnbG9kYXNoJ1xuICAgICAgXSxcbiAgICAgIC8vIC8vIHBsdWdpbnM6IFthdXRvRXh0ZXJuYWwoKV0sXG5cbiAgICAgIC8vIGV4dGVybmFsOiBbXCJkYXlqc1wiLCBcInJlYWN0LWNvcHktdG8tY2xpcGJvYXJkXCIsIFwiQG11aS9pY29ucy1tYXRlcmlhbFwiLCBcIkBtdWkvbWF0ZXJpYWxcIiwgXCJyZWFjdFwiLCBcInJlYWN0L2pzeC1ydW50aW1lXCIsIFwicmVhY3QtYWRtaW5cIiwgXCJyZWFjdC1kb21cIiwgXCJyZWFjdC1ob29rLWZvcm1cIiwgXCJAZmFrZXItanMvZmFrZXJcIiwgXCJyZWFjdC1nb29nbGUtY2hhcnRzXCJdLFxuICAgICAgLy8gZXh0ZXJuYWw6IFsvbm9kZV9tb2R1bGVzL10sXG5cbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBQcm92aWRlIGdsb2JhbCB2YXJpYWJsZXMgdG8gdXNlIGluIHRoZSBVTUQgYnVpbGRcbiAgICAgICAgLy8gZm9yIGV4dGVybmFsaXplZCBkZXBzXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAvLyBcInJlYWN0LWNvcHktdG8tY2xpcGJvYXJkXCI6IFwicmVhY3QtY29weS10by1jbGlwYm9hcmRcIixcbiAgICAgICAgICAvLyAgdnVlOiAnVnVlJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSlcblxuLy8ge1xuLy8gICAvLyBwYXRoIHRvIHlvdXIgZGVjbGFyYXRpb24gZmlsZXMgcm9vdFxuLy8gICBpbnB1dDogJy4vZGlzdC9kdHMvaW5kZXguZC50cycsXG4vLyAgIG91dHB1dDogW3sgZmlsZTogJ2Rpc3QvaW5kZXguZC50cycsIGZvcm1hdDogJ2VzJyB9XSxcbi8vICAgcGx1Z2luczogW2R0cygpXSxcbi8vIH0sXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVWLE9BQU8sV0FBVztBQUN6VyxTQUFTLGVBQWU7QUFDeEIsT0FBTyxrQkFBa0I7QUFFekIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBTGhCLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxRQUNaLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULGlCQUFpQjtBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBO0FBQUEsRUFFUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsV0FBVztBQUFBLElBQ1gsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLGtDQUFXLHdCQUF3QjtBQUFBLFFBQ2xELE1BQU0sUUFBUSxrQ0FBVyx1QkFBdUI7QUFBQSxNQUNsRDtBQUFBLE1BQ0EsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUE7QUFBQSxNQUdiLFNBQVMsQ0FBQyxhQUFhLENBQUM7QUFBQSxNQUN4QixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFNQSxRQUFRO0FBQUE7QUFBQTtBQUFBLFFBR04sU0FBUztBQUFBO0FBQUE7QUFBQSxRQUdUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
