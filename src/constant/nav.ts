import { getIconUrl } from '@/assets'

interface NavItem {
  title: string
  desc?: string
  icon?: string
  path?: string
  children?: NavItem[]
}
export const NAV_ITEMS: NavItem[] = [
  {
    title: 'nav.hq',
    children: [
      {
        title: '市场',
        desc: '数字货币最新行情',
        icon: getIconUrl('icon-1.png'),
        path: '/demo1'
      },
      {
        title: '机会',
        desc: '币种榜单，发觉机会',
        icon: getIconUrl('icon-2.png'),
        path: '/demo2'
      }
    ]
  },
  {
    title: 'nav.jy',
    children: [
      {
        title: '闪兑',
        desc: '一件完成交易',
        icon: getIconUrl('icon-3.png'),
        path: '/demo3'
      },
      {
        title: '币币',
        desc: '支持多币种，轻松完成交易',
        icon: getIconUrl('icon-4.png'),
        path: '/demo4'
      },
      {
        title: '秒合约',
        desc: '秒市场波动',
        icon: getIconUrl('icon-8.png'),
        path: '/demo4'
      }
    ]
  },
  {
    title: '质押声息'
  },
  {
    title: 'UZX DAO'
  },
  {
    title: '新手社区'
  },
  {
    title: '帮助',
    children: [
      {
        title: '帮助中心',
        desc: '全面了解数字货币交易',
        icon: getIconUrl('icon-12.png'),
        path: '/demo3'
      },
      {
        title: '社群',
        desc: '加入UZX社群，实时互动',
        icon: getIconUrl('icon-13.png'),
        path: '/demo4'
      }
    ]
  }
]

export const FOOT_NAV_ITEMS = [
  {
    title: '关于UZX',
    children: [
      { title: '关于我们', route: '' },
      { title: '联系我们', route: '' },
      { title: '服务条款', route: '' },
      { title: '隐私政策', route: '' },
      { title: '免责声明', route: '' },
      { title: '廉政举报', route: '' },
      { title: '执法请求', route: '' }
    ]
  },
  {
    title: '产品',
    children: [
      { title: '闪兑', route: '' },
      { title: '币币交易', route: '' },
      { title: '秒合约', route: '' },
      { title: '存币生息', route: '' }
    ]
  },
  {
    title: '用户支持',
    children: [
      { title: '新币申购', route: '' },
      { title: '帮助中心', route: '' }
    ]
  },
  {
    title: '交易',
    children: [
      { title: 'BTC/USDT', route: '' },
      { title: 'ETH/USDT', route: '' },
      { title: 'XRP/USDT', route: '' },
      { title: 'TRX/USDT', route: '' },
      { title: 'LTC/USDT', route: '' },
      { title: 'BNB/USDT', route: '' },
      { title: 'EOS/USDT', route: '' },
      { title: 'ARB/USDT', route: '' }
    ]
  }
]
