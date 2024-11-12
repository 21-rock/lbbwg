import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('@/views/discover/index.vue'),
    meta: {
      title: '行情',
      sort: 1
    }
    // redirect: '/discover/market',
    /* children: [
      {
        path: 'market',
        name: 'Market',
        component: () => import('@/views/discover/market/index.vue'),
        meta: {
          title: '市场',
          sort: 1,
          icon: 'icon-1.png',
          desc: '数字货币最新行情'
        }
      },
      {
        path: 'chance',
        name: 'Chance',
        component: () => import('@/views/discover/chance/index.vue'),
        meta: {
          title: '机会',
          desc: '币种榜单，发觉机会',
          icon: 'icon-2.png',
          sort: 2
        }
      }
    ] */
  }
] as RouteRecordRaw[]
