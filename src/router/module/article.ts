import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/article/:type/:id',
    component: () => import('@/views/article/detail.vue'),
    meta: {
      title: 'ArticleDetail',
      hideInMenu: true
    }
  }
] as RouteRecordRaw[]
