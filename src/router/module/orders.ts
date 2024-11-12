import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/orders/index.vue'),
    meta: {
      title: 'Orders',
      desc: '',
      sort: 5,
      hideInMenu: true,
      isAuth: true
    }
  }
] as RouteRecordRaw[]
