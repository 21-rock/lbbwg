import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import('@/views/agreement/index.vue'),
    meta: {
      title: 'Agreement',
      desc: '',
      hideInMenu: true
    }
  }
] as RouteRecordRaw[]
