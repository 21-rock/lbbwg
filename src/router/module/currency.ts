import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/currency-subscript',
    name: 'CurrencySubscript',
    component: () => import('@/views/currency-subscript/index.vue'),
    meta: {
      title: '新币申购',
      desc: '',
      isAuth: true,
      sort: 13
    }
  },
  {
    path: '/currency-subscript-form',
    name: 'CurrencySubscriptForm',
    component: () => import('@/views/currency-subscript/form.vue'),
    meta: {
      title: '新币申购',
      desc: '',
      isAuth: true,
      sort: 13,
      hideInMenu: true
    }
  }
] as RouteRecordRaw[]
