import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/UZXDao',
    name: 'UZXDao',
    component: () => import('@/views/UZXDao/index.vue'),
    meta: {
      title: 'UZXDao',
      desc: '',
      sort: 4
    }
  }
] as RouteRecordRaw[]
