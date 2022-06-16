import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
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
