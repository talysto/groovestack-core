import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const certPath = resolve('.', "local.groovestack-demo.com.pem");
const keyPath = resolve('.', "local.groovestack-demo.com-key.pem");
const https = existsSync(certPath) ? { key: readFileSync(keyPath), cert: readFileSync(certPath) } : {};

export default defineConfig({
  plugins: [
    RubyPlugin(),
  ],
  server: {
    host: 'local.groovestack-demo.com',
    https
  },
})
