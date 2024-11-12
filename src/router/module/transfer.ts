import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/transfer',
    name: 'Transfer',
    component: () => import('@/views/transfer/index.vue'),
    meta: {
      title: 'Transfer',
      desc: '',
      sort: 20,
      hideInMenu: true,
      isAuth: true
    }
  }
] as RouteRecordRaw[]
