import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = []
const modules = import.meta.glob('./module/*.ts', { eager: true }) as any
Object.keys(modules).forEach((routePath) => {
  const fileModule = modules[routePath].default || modules[routePath]
  routes.push(...fileModule)
})

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/index',
      meta: {
        hideInMenu: true
      }
    },
    ...routes
  ]
})

export { routes }

export default router
