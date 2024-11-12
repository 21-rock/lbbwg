import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: 'Login',
      hideInMenu: true
    }
  }
] as RouteRecordRaw[]
