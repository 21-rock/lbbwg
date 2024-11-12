export default [
  {
    path: '/announcement',
    component: () => import('@/views/announcement/index.vue'),
    name: 'Announcement',
    meta: {
      title: 'announcement',
      sort: 7
    }
  }
]
