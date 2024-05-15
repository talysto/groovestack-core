import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import autoExternal from 'rollup-plugin-auto-external'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      rollupConfig: {
        docModel: {
          enabled: true,
          apiJsonFilePath: '../docs/meta/<unscopedPackageName>.api.json',
        },
      },
    }),
    react(),
    visualizer({ open: false }),
  ],
  build: {
    lib: {
      // entry: resolve(__dirname, "lib/main.js"),
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      formats: ['es'], // UMD
      // name: 'CORE-BASE',
      // the proper extensions will be added
      // fileName: 'core-base',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      plugins: [autoExternal()],
      external: [
        // 'react/jsx-runtime',
        // 'dayjs/plugin/relativeTime',
        // 'dayjs/plugin/localizedFormat',
      ],
      // input: Object.fromEntries(
      //   globSync('src/**/*.{ts,tsx}', { ignore: 'src/**/*.stories.*' }),
      // ),
      output: {
        // Some utils have minimal CSS deps
        // intro: 'import "./style.css";',
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          // "react-copy-to-clipboard": "react-copy-to-clipboard",
          //  vue: 'Vue'
        },
      },
    },
  },
})
