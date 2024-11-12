import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/trade',
    name: 'Trade',
    meta: {
      title: '交易',
      sort: 2
    },
    redirect: '/trade/market',
    children: [
      {
        path: 'convert',
        name: 'Convert',
        component: () => import('@/views/trade/convert/index.vue'),
        meta: {
          title: '闪兑',
          desc: '一件完成交易',
          icon: 'icon-3.png',
          sort: 1,
          isAuth: true
        }
      },
      {
        path: 'spot',
        name: 'Spot',
        component: () => import('@/views/trade/spot/index.vue'), // 币币
        meta: {
          title: '币币',
          desc: '支持多币种，轻松完成交易',
          icon: 'icon-4.png',
          sort: 2,
          isAuth: true
        }
      },
      {
        path: 'contract',
        name: 'contract',
        component: () => import('@/views/trade/contract/index.vue'), // 秒合约
        meta: {
          title: '秒合约',
          desc: '秒市场波动',
          icon: 'icon-8.png',
          sort: 3,
          isAuth: true
        }
      },
      {
        path: 'options',
        name: 'Options',
        component: () => import('@/views/trade/options/index.vue'), // 期权
        meta: {
          title: '期权',
          desc: '',
          icon: 'icon-9.png',
          sort: 4,
          isAuth: true
        }
      }
    ]
  }
] as RouteRecordRaw[]
