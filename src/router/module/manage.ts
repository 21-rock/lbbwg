import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/manage',
    name: 'Manage',
    component: () => import('@/views/manage/index.vue'),
    meta: {
      title: 'Manage',
      desc: '',
      isAuth: true,
      hideInMenu: true
    }
  }
] as RouteRecordRaw[]
