// vite.config.ts
import dts from "file:///Users/darren/Code/moonlight-labs/core/node_modules/.pnpm/@moonlight-labs+vite-plugin-dts@3.3.1_@types+node@20.4.2_rollup@3.26.3_typescript@5.1.6_vite@4.4.4/node_modules/@moonlight-labs/vite-plugin-dts/dist/index.mjs";
import react from "file:///Users/darren/Code/moonlight-labs/core/node_modules/.pnpm/@vitejs+plugin-react@4.0.3_vite@4.4.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import autoExternal from "file:///Users/darren/Code/moonlight-labs/core/node_modules/.pnpm/rollup-plugin-auto-external@2.0.0_rollup@3.26.3/node_modules/rollup-plugin-auto-external/index.js";
import { visualizer } from "file:///Users/darren/Code/moonlight-labs/core/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2_rollup@3.26.3/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { defineConfig } from "file:///Users/darren/Code/moonlight-labs/core/node_modules/.pnpm/vite@4.4.4_@types+node@20.4.2/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/Users/darren/Code/moonlight-labs/core/core-accounting-fe";
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
      entry: resolve(__vite_injected_original_dirname, "src/core-accounting/index.ts"),
      formats: ["es"],
      // UMD
      name: "CORE-ACCOUNTING",
      // the proper extensions will be added
      fileName: "core-accounting"
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      plugins: [autoExternal()],
      external: [
        /@mui/,
        "react/jsx-runtime",
        "@faker-js/faker",
        "react-copy-to-clipboard"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGFycmVuL0NvZGUvbW9vbmxpZ2h0LWxhYnMvY29yZS9jb3JlLWFjY291bnRpbmctZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kYXJyZW4vQ29kZS9tb29ubGlnaHQtbGFicy9jb3JlL2NvcmUtYWNjb3VudGluZy1mZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGFycmVuL0NvZGUvbW9vbmxpZ2h0LWxhYnMvY29yZS9jb3JlLWFjY291bnRpbmctZmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgZHRzIGZyb20gJ0Btb29ubGlnaHQtbGFicy92aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBhdXRvRXh0ZXJuYWwgZnJvbSAncm9sbHVwLXBsdWdpbi1hdXRvLWV4dGVybmFsJ1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZHRzKHtcbiAgICAgIHJvbGx1cFR5cGVzOiB0cnVlLFxuICAgIH0pLFxuICAgIHJlYWN0KCksXG4gICAgdmlzdWFsaXplcih7IG9wZW46IGZhbHNlIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgLy8gZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcImxpYi9tYWluLmpzXCIpLFxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvcmUtYWNjb3VudGluZy9pbmRleC50cycpLFxuICAgICAgZm9ybWF0czogWydlcyddLCAvLyBVTURcbiAgICAgIG5hbWU6ICdDT1JFLUFDQ09VTlRJTkcnLFxuICAgICAgLy8gdGhlIHByb3BlciBleHRlbnNpb25zIHdpbGwgYmUgYWRkZWRcbiAgICAgIGZpbGVOYW1lOiAnY29yZS1hY2NvdW50aW5nJyxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIG1ha2Ugc3VyZSB0byBleHRlcm5hbGl6ZSBkZXBzIHRoYXQgc2hvdWxkbid0IGJlIGJ1bmRsZWRcbiAgICAgIC8vIGludG8geW91ciBsaWJyYXJ5XG4gICAgICBwbHVnaW5zOiBbYXV0b0V4dGVybmFsKCldLFxuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgL0BtdWkvLFxuICAgICAgICAncmVhY3QvanN4LXJ1bnRpbWUnLFxuICAgICAgICAnQGZha2VyLWpzL2Zha2VyJyxcbiAgICAgICAgJ3JlYWN0LWNvcHktdG8tY2xpcGJvYXJkJyxcbiAgICAgIF0sXG5cbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBQcm92aWRlIGdsb2JhbCB2YXJpYWJsZXMgdG8gdXNlIGluIHRoZSBVTUQgYnVpbGRcbiAgICAgICAgLy8gZm9yIGV4dGVybmFsaXplZCBkZXBzXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAvLyBcInJlYWN0LWNvcHktdG8tY2xpcGJvYXJkXCI6IFwicmVhY3QtY29weS10by1jbGlwYm9hcmRcIixcbiAgICAgICAgICAvLyAgdnVlOiAnVnVlJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSlcblxuLy8ge1xuLy8gICAvLyBwYXRoIHRvIHlvdXIgZGVjbGFyYXRpb24gZmlsZXMgcm9vdFxuLy8gICBpbnB1dDogJy4vZGlzdC9kdHMvaW5kZXguZC50cycsXG4vLyAgIG91dHB1dDogW3sgZmlsZTogJ2Rpc3QvaW5kZXguZC50cycsIGZvcm1hdDogJ2VzJyB9XSxcbi8vICAgcGx1Z2luczogW2R0cygpXSxcbi8vIH0sXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZWLE9BQU8sU0FBUztBQUM3VyxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sa0JBQWtCO0FBQ3pCLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsb0JBQW9CO0FBTDdCLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxJQUNOLFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUFBLEVBQzVCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU8sUUFBUSxrQ0FBVyw4QkFBOEI7QUFBQSxNQUN4RCxTQUFTLENBQUMsSUFBSTtBQUFBO0FBQUEsTUFDZCxNQUFNO0FBQUE7QUFBQSxNQUVOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQTtBQUFBLE1BR2IsU0FBUyxDQUFDLGFBQWEsQ0FBQztBQUFBLE1BQ3hCLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BRUEsUUFBUTtBQUFBO0FBQUE7QUFBQSxRQUdOLFNBQVM7QUFBQTtBQUFBO0FBQUEsUUFHVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
