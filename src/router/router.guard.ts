import { useUserStore } from '@/store'
import router from '.'
// import useRouteStore from '@/store/routeStore'

/**
 * @description 📚 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 * */

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const LOGIN_URL = '/login'
  // const { whiteList } = useRouteStore()

  // 动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

  // 判断是否有 Token，没有重定向到 login 页面
  if (!userStore.token) {
    // 判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
    if (!to.meta.isAuth) return next()
    return next({
      path: LOGIN_URL,
      replace: true,
      query: {
        redirect: to.path === '/person-center/alter-pass' ? '/' : to.path,
        ...to.query,
        t: new Date().getTime().toString()
      }
    })
  } else if (!userStore.userInfo) {
    // 没有用户信息，线获取用户信息
    await userStore.getUserInfo()
    // 判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
    if (to.path.toLocaleLowerCase() === LOGIN_URL) {
      return next(from.fullPath)
    }
  }
  // 6.正常访问页面
  next()
})

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  console.warn('路由错误', error.message)
})

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {})
