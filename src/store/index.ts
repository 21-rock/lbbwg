import { createPinia } from 'pinia'

const pinia = createPinia()
// vue3持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

export { default as useNoticeStore } from './noticeStore'
export { default as useAuthStore } from './authStore'
export { default as useRouteStore } from './routeStore'
export { default as useLocaleStore } from './localeStore'
export { default as useWebSocketStore } from './webSocketStore'
export { default as useUserStore } from './userStore'

// 默认导出给main.ts使用
export default pinia
