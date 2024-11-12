import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/coin-rank',
    name: 'CoinRank',
    component: () => import('@/views/coin-rank/index.vue'),
    meta: {
      title: 'CoinRank',
      desc: '',
      sort: 3,
      hideInMenu: true
    }
  }
] as RouteRecordRaw[]
