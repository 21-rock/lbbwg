import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('@/views/learn/index.vue'),
    meta: {
      title: '新手社区',
      desc: '',
      sort: 5
    }
  },
  {
    path: '/glossary',
    name: 'Glossary',
    component: () => import('@/views/learn/glossary.vue'),
    meta: {
      title: '区块链词典',
      desc: '',
      sort: 5,
      hideInMenu: true
    }
  },
  {
    path: '/beginner',
    name: 'Beginner',
    component: () => import('@/views/learn/beginner.vue'),
    meta: {
      title: '区块链词典',
      desc: '',
      sort: 5,
      hideInMenu: true
    }
  },
  {
    path: '/topic',
    name: 'Topic',
    component: () => import('@/views/learn/topic.vue'),
    meta: {
      title: '主题课堂',
      desc: '',
      sort: 5,
      hideInMenu: true
    }
  }
] as RouteRecordRaw[]
