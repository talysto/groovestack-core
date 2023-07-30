import dts from '@moonlight-labs/vite-plugin-dts'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import autoExternal from 'rollup-plugin-auto-external'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
    react(),
    visualizer({ open: false }),
  ],
  build: {
    lib: {
      // entry: resolve(__dirname, "lib/main.js"),
      entry: resolve(__dirname, 'src/core-webhooks/index.ts'),
      formats: ['es'], // UMD
      name: 'CORE-WEBHOOKS',
      // the proper extensions will be added
      fileName: 'core-webhooks',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      plugins: [autoExternal()],
      external: [
        /@mui/,
        'react/jsx-runtime',
        '@faker-js/faker',
        'react-copy-to-clipboard',
      ],
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
