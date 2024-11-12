import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/privacy/index.vue'),
    meta: {
      title: 'Privacy',
      hideInMenu: true
    }
  }
] as RouteRecordRaw[]
