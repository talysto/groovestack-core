// vite.config.ts
import { defineConfig } from "file:///Users/darren/Code/moonlight-labs/core/node_modules/.pnpm/vite@4.4.4_@types+node@20.4.2/node_modules/vite/dist/node/index.js";
import react from "file:///Users/darren/Code/moonlight-labs/core/node_modules/.pnpm/@vitejs+plugin-react@4.0.3_vite@4.4.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///Users/darren/Code/moonlight-labs/core/node_modules/.pnpm/@moonlight-labs+vite-plugin-dts@3.3.1_@types+node@20.4.2_rollup@3.26.3_typescript@5.1.6_vite@4.4.4/node_modules/@moonlight-labs/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
import { visualizer } from "file:///Users/darren/Code/moonlight-labs/core/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2_rollup@3.26.3/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import autoExternal from "file:///Users/darren/Code/moonlight-labs/core/node_modules/.pnpm/rollup-plugin-auto-external@2.0.0_rollup@3.26.3/node_modules/rollup-plugin-auto-external/index.js";
var __vite_injected_original_dirname = "/Users/darren/Code/moonlight-labs/core/core-base-fe";
var vite_config_default = defineConfig({
  plugins: [
    dts({
      rollupTypes: true
    }),
    react(),
    visualizer({ open: false })
  ],
  build: {
    lib: {
      // entry: resolve(__dirname, "lib/main.js"),
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es"],
      // UMD
      name: "CORE-BASE",
      // the proper extensions will be added
      fileName: "core-base"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGFycmVuL0NvZGUvbW9vbmxpZ2h0LWxhYnMvY29yZS9jb3JlLWJhc2UtZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kYXJyZW4vQ29kZS9tb29ubGlnaHQtbGFicy9jb3JlL2NvcmUtYmFzZS1mZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGFycmVuL0NvZGUvbW9vbmxpZ2h0LWxhYnMvY29yZS9jb3JlLWJhc2UtZmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGR0cyBmcm9tICdAbW9vbmxpZ2h0LWxhYnMvdml0ZS1wbHVnaW4tZHRzJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuaW1wb3J0IGF1dG9FeHRlcm5hbCBmcm9tICdyb2xsdXAtcGx1Z2luLWF1dG8tZXh0ZXJuYWwnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZHRzKHtcbiAgICAgIHJvbGx1cFR5cGVzOiB0cnVlLFxuICAgIH0pLFxuICAgIHJlYWN0KCksXG4gICAgdmlzdWFsaXplcih7IG9wZW46IGZhbHNlIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgLy8gZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcImxpYi9tYWluLmpzXCIpLFxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICBmb3JtYXRzOiBbJ2VzJ10sIC8vIFVNRFxuICAgICAgbmFtZTogJ0NPUkUtQkFTRScsXG4gICAgICAvLyB0aGUgcHJvcGVyIGV4dGVuc2lvbnMgd2lsbCBiZSBhZGRlZFxuICAgICAgZmlsZU5hbWU6ICdjb3JlLWJhc2UnLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gbWFrZSBzdXJlIHRvIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGRuJ3QgYmUgYnVuZGxlZFxuICAgICAgLy8gaW50byB5b3VyIGxpYnJhcnlcbiAgICAgIHBsdWdpbnM6IFthdXRvRXh0ZXJuYWwoKV0sXG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICAncmVhY3QvanN4LXJ1bnRpbWUnLFxuICAgICAgICAnZGF5anMvcGx1Z2luL3JlbGF0aXZlVGltZScsXG4gICAgICAgICdkYXlqcy9wbHVnaW4vbG9jYWxpemVkRm9ybWF0JyxcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgLy8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkXG4gICAgICAgIC8vIGZvciBleHRlcm5hbGl6ZWQgZGVwc1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgLy8gXCJyZWFjdC1jb3B5LXRvLWNsaXBib2FyZFwiOiBcInJlYWN0LWNvcHktdG8tY2xpcGJvYXJkXCIsXG4gICAgICAgICAgLy8gIHZ1ZTogJ1Z1ZSdcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJVLFNBQVMsb0JBQW9CO0FBQ3hXLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sa0JBQWtCO0FBTHpCLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxJQUNOLFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUFBLEVBQzVCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsU0FBUyxDQUFDLElBQUk7QUFBQTtBQUFBLE1BQ2QsTUFBTTtBQUFBO0FBQUEsTUFFTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUE7QUFBQSxNQUdiLFNBQVMsQ0FBQyxhQUFhLENBQUM7QUFBQSxNQUN4QixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBO0FBQUE7QUFBQSxRQUdOLFNBQVM7QUFBQTtBQUFBO0FBQUEsUUFHVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
