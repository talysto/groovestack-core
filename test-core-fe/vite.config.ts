import { defineConfig } from 'vite'
// import { rollupPluginHTML as html } from '@web/rollup-plugin-html'
import { visualizer } from 'rollup-plugin-visualizer'
// import analyze from 'rollup-plugin-analyzer'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ open: false }), tsconfigPaths()],

  build: {
    manifest: true,
    target: 'esnext',
    rollupOptions: {
      external: ['@faker-js/faker'],
      // input: 'src/index.html',
      // output: {
      //   dir: 'dist',
      // },
      // plugins: [html()],
    },
  },
})
