/* eslint-disable */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'
import path from 'path'
import fs from 'fs'

const wasmContentTypePlugin = {
  name: 'wasm-content-type-plugin',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm');
        const newPath = req.url.replace('deps', 'dist');
        const targetPath = path.join(__dirname, newPath);
        const wasmContent = fs.readFileSync(targetPath);
        return res.end(wasmContent);
      }
      next();
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    build: {
      target: 'esnext',
      rollupOptions: {
        external: ['@aztec/bb.js']
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      },
      exclude: ['@noir-lang/noir_wasm'],
    },
    plugins: [
      copy({
        targets: [{ src: 'node_modules/**/*.wasm', dest: 'node_modules/.vite/dist' }],
        copySync: true,
        hook: 'buildStart',
      }),
      command === 'serve' ? wasmContentTypePlugin : [],
      react()
    ],
    server: {
      fs: {
        strict: false,
      },
    },
  }
})
