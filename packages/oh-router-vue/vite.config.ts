import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), jsx(), dts()],
  build: {
    lib: {
      fileName: 'index',
      name: 'OhRouterVue',
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'history', 'oh-router', 'oh-router-shared'],
    },
  },
})
