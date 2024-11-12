import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/help',
    name: 'Help',
    meta: {
      title: '帮助',
      sort: 6
    },
    redirect: '/help/helpCenter',
    children: [
      {
        path: 'helpCenter',
        component: () => import('@/views/help/helpCenter/index.vue'),
        name: 'HelpCenter',
        meta: {
          title: '帮助中心',
          desc: '全面了解数字货币交易',
          icon: 'icon-12.png',
          sort: 1
        }
      },
      {
        path: 'community',
        component: () => import('@/views/help/community/index.vue'),
        name: 'Community',
        meta: {
          title: '社群',
          desc: '加入UZX社群，实时互动',
          icon: 'icon-13.png',
          sort: 2
        }
      },
      {
        path: 'search-result/:keyword',
        component: () => import('@/views/help/searchResult/index.vue'),
        name: 'SearchResult',
        meta: {
          title: 'SearchResult',
          sort: 3,
          hideInMenu: true
        }
      },
      {
        path: 'feedback',
        component: () => import('@/views/help/feedback/index.vue'),
        name: 'Feedback',
        meta: {
          title: 'Feedback',
          sort: 3,
          hideInMenu: true
        }
      },
      {
        path: 'faq',
        component: () => import('@/views/help/faq/index.vue'),
        name: 'FAQ',
        meta: {
          title: 'FAQ',
          sort: 4,
          hideInMenu: true
        }
      }
    ]
  }
] as RouteRecordRaw[]
