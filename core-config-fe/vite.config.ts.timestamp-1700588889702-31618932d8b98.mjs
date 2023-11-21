// vite.config.ts
import react from "file:///Users/maxschridde/dev/talysto/groovestack-core/node_modules/.pnpm/@vitejs+plugin-react@4.0.3_vite@4.4.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import autoExternal from "file:///Users/maxschridde/dev/talysto/groovestack-core/node_modules/.pnpm/rollup-plugin-auto-external@2.0.0_rollup@4.4.0/node_modules/rollup-plugin-auto-external/index.js";
import { visualizer } from "file:///Users/maxschridde/dev/talysto/groovestack-core/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2_rollup@4.4.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { defineConfig } from "file:///Users/maxschridde/dev/talysto/groovestack-core/node_modules/.pnpm/vite@4.4.4_@types+node@20.4.2/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/maxschridde/dev/talysto/groovestack-core/node_modules/.pnpm/vite-plugin-dts@3.6.3_@types+node@20.4.2_rollup@4.4.0_typescript@5.1.6_vite@4.4.4/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/maxschridde/dev/talysto/groovestack-core/core-config-fe";
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
    sourcemap: true,
    lib: {
      entry: {
        index: resolve(__vite_injected_original_dirname, "src/core-config/index.ts")
        // mock: resolve(__dirname, 'src/core-config/mock.ts'),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWF4c2NocmlkZGUvZGV2L3RhbHlzdG8vZ3Jvb3Zlc3RhY2stY29yZS9jb3JlLWNvbmZpZy1mZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21heHNjaHJpZGRlL2Rldi90YWx5c3RvL2dyb292ZXN0YWNrLWNvcmUvY29yZS1jb25maWctZmUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21heHNjaHJpZGRlL2Rldi90YWx5c3RvL2dyb292ZXN0YWNrLWNvcmUvY29yZS1jb25maWctZmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBhdXRvRXh0ZXJuYWwgZnJvbSAncm9sbHVwLXBsdWdpbi1hdXRvLWV4dGVybmFsJ1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBkdHMoe1xuICAgICAgcm9sbHVwVHlwZXM6IHRydWUsXG4gICAgICByb2xsdXBDb25maWc6IHtcbiAgICAgICAgZG9jTW9kZWw6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIGFwaUpzb25GaWxlUGF0aDogJy4uL2RvY3MvbWV0YS88dW5zY29wZWRQYWNrYWdlTmFtZT4uYXBpLmpzb24nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICByZWFjdCgpLFxuICAgIHZpc3VhbGl6ZXIoeyBvcGVuOiBmYWxzZSB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29yZS1jb25maWcvaW5kZXgudHMnKSxcbiAgICAgICAgLy8gbW9jazogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29yZS1jb25maWcvbW9jay50cycpLFxuICAgICAgfSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnXSwgLy8gVU1EXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAvLyBtYWtlIHN1cmUgdG8gZXh0ZXJuYWxpemUgZGVwcyB0aGF0IHNob3VsZG4ndCBiZSBidW5kbGVkXG4gICAgICAvLyBpbnRvIHlvdXIgbGlicmFyeVxuICAgICAgcGx1Z2luczogW2F1dG9FeHRlcm5hbCgpXSxcbiAgICAgIGV4dGVybmFsOiBbL0BtdWkvLCAncmVhY3QvanN4LXJ1bnRpbWUnLCAnQGZha2VyLWpzL2Zha2VyJ10sXG5cbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBQcm92aWRlIGdsb2JhbCB2YXJpYWJsZXMgdG8gdXNlIGluIHRoZSBVTUQgYnVpbGRcbiAgICAgICAgLy8gZm9yIGV4dGVybmFsaXplZCBkZXBzXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAvLyBcInJlYWN0LWNvcHktdG8tY2xpcGJvYXJkXCI6IFwicmVhY3QtY29weS10by1jbGlwYm9hcmRcIixcbiAgICAgICAgICAvLyAgdnVlOiAnVnVlJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFcsT0FBTyxXQUFXO0FBQzlYLFNBQVMsZUFBZTtBQUN4QixPQUFPLGtCQUFrQjtBQUN6QixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFMaEIsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLFFBQ1osVUFBVTtBQUFBLFVBQ1IsU0FBUztBQUFBLFVBQ1QsaUJBQWlCO0FBQUEsUUFDbkI7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsSUFDTixXQUFXLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFBQSxFQUM1QjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsV0FBVztBQUFBLElBQ1gsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLGtDQUFXLDBCQUEwQjtBQUFBO0FBQUEsTUFFdEQ7QUFBQSxNQUNBLFNBQVMsQ0FBQyxJQUFJO0FBQUE7QUFBQSxJQUNoQjtBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUE7QUFBQSxNQUdiLFNBQVMsQ0FBQyxhQUFhLENBQUM7QUFBQSxNQUN4QixVQUFVLENBQUMsUUFBUSxxQkFBcUIsaUJBQWlCO0FBQUEsTUFFekQsUUFBUTtBQUFBO0FBQUE7QUFBQSxRQUdOLFNBQVM7QUFBQTtBQUFBO0FBQUEsUUFHVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
