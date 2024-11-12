import { handleMenus, handleMenusSort, MenusItem } from '@/utils/route.helper'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

const useRouteStore = defineStore('route', () => {
  const menus = ref<MenusItem[]>([])
  const router = useRouter()

  const setMenus = (routes: RouteRecordRaw[]) => {
    const items = handleMenus(routes)
    handleMenusSort(items)
    menus.value = items
  }
  const routes = router.getRoutes()
  const whiteList = routes
    ? routes.filter((item) => !item.meta.isAuth).map((item) => item.path)
    : []
  return {
    menus,
    setMenus,
    whiteList
  }
})

export default useRouteStore
