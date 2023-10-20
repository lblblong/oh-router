import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      fileName: 'index',
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'oh',
      formats: ['umd'],
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
})
