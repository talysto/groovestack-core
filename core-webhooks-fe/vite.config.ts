import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from '@moonlight-labs/vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
    react(),
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
      // plugins: [autoExternal()],

      // external: [/node_modules/],
      external: [
        '@mui/icons-material',
        '@mui/material',
        'react',
        'react/jsx-runtime',
        'react-admin',
        'react-dom',
        'react-hook-form',
        '@faker-js/faker',
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
