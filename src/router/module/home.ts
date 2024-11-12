import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/index',
    component: () => import('@/views/home/index.vue'),
    name: 'Home',
    meta: {
      title: 'Home',
      sort: 0,
      hideInMenu: true
    }
  }
] as RouteRecordRaw[]
