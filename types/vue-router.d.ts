import { VueElement } from 'vue'

export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /* 路由标题 */
    title?: string
    /* 描述内容 */
    desc?: string
    /* assets/icons */
    icon?: string | VueElement
    /* 排序 */
    sort?: number
    /* 是否缓存 */
    isCache?: boolean
    /* 是否在菜单栏隐藏, 例如详情页 */
    hideInMenu?: boolean
    /* 总是显示在二级菜单，哪怕二级菜单只有一条 */
    alwayShowChildInMenu?: boolean
    /* 为true时，不会出现在标签栏中 */
    hideInTags?: boolean
    /* 为true时， 一直显示在标签栏中 */
    affixInTags?: boolean
    /* 是否是白名单, true表示需要登录才能进去查看 */
    isAuth?: boolean
  }
}
