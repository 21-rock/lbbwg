import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/earn',
    name: 'Earn',
    component: () => import('@/views/earn/index.vue'),
    meta: {
      title: '质押生息',
      desc: '',
      sort: 3,
      isAuth: true
    }
  },
  {
    path: '/earn-order',
    name: 'EarnOrder',
    component: () => import('@/views/earn/earn-order.vue'),
    meta: {
      title: '质押生息订单列表',
      desc: '',
      sort: 4,
      hideInMenu: true,
      isAuth: true
    }
  }
] as RouteRecordRaw[]
