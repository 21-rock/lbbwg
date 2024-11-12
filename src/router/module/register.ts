import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
    meta: {
      title: 'Register',
      hideInMenu: true
    }
  }
] as RouteRecordRaw[]
