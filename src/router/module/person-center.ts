import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/person-center',
    name: 'PersonCenter',
    component: () => import('@/views/person-center/index.vue'),
    meta: {
      title: 'PersonCenter',
      desc: '',
      isAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/set-security-pass',
    name: 'AssetsPassSetting',
    component: () => import('@/views/person-center/set-security-pass.vue'),
    meta: {
      title: 'AssetsPassSetting',
      desc: '',
      isAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/person-center/alter-pass',
    name: 'AlterPass',
    component: () => import('@/views/person-center/alter-pass.vue'),
    meta: {
      title: 'AlterPass',
      desc: '',
      isAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/alter-security-pass',
    name: 'AlterPassSetting',
    component: () => import('@/views/person-center/alter-security-pass.vue'),
    meta: {
      title: 'AlterPassSetting',
      desc: '',
      isAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/forgot-security-pass',
    name: 'ForgotPassSetting',
    component: () => import('@/views/person-center/forgot-security-pass.vue'),
    meta: {
      title: 'ForgotPassSetting',
      desc: '',
      isAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/bind-email',
    name: 'BindEmail',
    component: () => import('@/views/person-center/bind-email.vue'),
    meta: {
      title: 'BindEmail',
      desc: '',
      isAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: () => import('@/views/recharge/index.vue'),
    meta: {
      title: 'Recharge', // 充币
      desc: '',
      isAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    component: () => import('@/views/withdraw/index.vue'),
    meta: {
      title: 'Withdraw', // 提币
      desc: '',
      isAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/withdraw-address',
    name: 'WithdrawAddress',
    component: () => import('@/views/withdraw/withdraw-address.vue'),
    meta: {
      title: 'WithdrawAddress', // 提币地址管理
      desc: '',
      isAuth: true,
      hideInMenu: true
    }
  }
] as RouteRecordRaw[]
