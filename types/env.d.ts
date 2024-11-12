/// <reference types="vite/client" />
interface ImportMetaEnv {
  // Auto generate by env-parse
  /**
   * 项目名称
   */
  readonly VITE_GLOB_APP_TITLE: string
  /**
   * 后端接口地址
   */
  readonly VITE_PUBLIC_PATH: string
  /**
   * 接口访问前缀，用于vite代理过滤
   */
  readonly VITE_BASE_API: string
  /**
   * 是否移除console.log等调试代码
   */
  readonly VITE_DROP_CONSOLE: boolean
  /**
   * 接口
   */
  readonly VITE_API_URL: string
  /**
   * webSokect接口
   * VITE_WEB_SOCKET_ROOT = 'wss://server.fxtmus.com/wss'
   * VITE_WEB_SOCKET_ROOT = 'wss://server.xtbglobals.net/wss'
   */
  readonly VITE_WEB_SOCKET_ROOT: string
}
