import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// vue 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'
// 用于解析环境变量，使得import.meta.env能够有提示
import { envParse } from 'vite-plugin-env-parse'
import { wrapperEnv } from './build/getEnv'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  console.log('--mode--', mode)
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  console.log(111, viteEnv.VITE_BASE_API)

  return {
    plugins: [
      vue(),
      vueJsx(),
      envParse({
        dtsPath: 'types/env.d.ts'
      }),
      AutoImport({
        // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
        dts: 'types/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core'
          // '@vueuse/components'
        ],
        // 解决eslint报错问题
        eslintrc: {
          enabled: true
        }
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        comps: path.resolve(__dirname, 'src/components'),
        '#': path.resolve(__dirname, 'type')
      }
    },
    server: {
      host: '0.0.0.0',
      // https: true,
      port: 5173,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://www.huajinzhenquan.net',
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
          // secure: false
        }
      }
    }
  }
})
