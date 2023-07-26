import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from '@moonlight-labs/vite-plugin-dts'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import autoExternal from "rollup-plugin-auto-external"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
    react(),
    visualizer({ open: true }),
  ],
  build: {
    lib: {
      // entry: resolve(__dirname, "lib/main.js"),
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'], // UMD
      name: 'CORE-BASE',
      // the proper extensions will be added
      fileName: 'core-base',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      plugins: [autoExternal()],
      external: ['react/jsx-runtime', 'dayjs/plugin/relativeTime', 'dayjs/plugin/localizedFormat'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          // "react-copy-to-clipboard": "react-copy-to-clipboard",
          //  vue: 'Vue'
        },
      },
    },
  },
})
