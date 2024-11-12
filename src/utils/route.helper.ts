import { VueElement } from 'vue'
import { RouteRecordRaw } from 'vue-router'

// 路由排序
export const handleRoutesSort = (routes: RouteRecordRaw[]) => {
  routes.sort((a, b) => {
    return (a.meta?.sort ?? 9999999) - (b.meta?.sort ?? 9999999)
  })
  routes.forEach((item) => {
    if (item.children) {
      handleRoutesSort(item.children)
    }
  })
}

// 如果设置了hideInMenu为true,那就说明不要再导航栏显示
export const filterHideInMenu = (routes: RouteRecordRaw[]) => {
  return routes.filter((item) => {
    if (!item.meta?.hideInMenu) {
      return true
    }
    if (item.children && item.children.length > 0) {
      filterHideInMenu(item.children)
    }
    return false
  })
}

export interface MenusItem {
  title?: string
  icon?: string | VueElement
  sort?: number
  desc?: string
  path?: string
  children?: MenusItem[]
}
/**
 * 把系统配置的路由处理成一个可用的顶部导航菜单
 * @param routes 路由列表
 * @returns
 */
export const handleMenus = (
  routes: RouteRecordRaw[],
  parentPath?: string
): MenusItem[] => {
  return routes.reduce((result, next) => {
    let children: MenusItem[] = []
    const path = parentPath ? parentPath + '/' + next.path : next.path
    if (!next.meta?.hideInMenu) {
      if (next.children && next.children.length > 0) {
        children = handleMenus(next.children, path)
      }
      const { title, icon, desc, sort } = next.meta!
      return [
        ...result,
        {
          title,
          icon,
          desc,
          path,
          sort,
          children
        }
      ]
    }
    return result
  }, [] as MenusItem[])
}

export const handleMenusSort = (menus: MenusItem[]) => {
  menus.sort((a, b) => {
    return (a.sort ?? 9999999) - (b.sort ?? 9999999)
  })
  /* menus.forEach((item) => {
    if (item.children) {
      handleMenusSort(item.children)
    }
  }) */
}
