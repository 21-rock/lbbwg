<script setup lang="ts">
import { SafetyVerModal } from './components'
import { useModal } from './hooks'
import { useProvideIsLogin } from './hooks/useIsLogin'
import { BasicLayout } from './layout'
import { routes } from './router'
import { useNoticeStore } from './store'
import useRouteStore from './store/routeStore'
import { useWebSocketStore, useUserStore } from './store'

const routeStore = useRouteStore()
const route = useRoute()
const userStore = useUserStore()
const timer = ref<NodeJS.Timeout | null>(null)
const isLogin = computed(() => userStore.isLogin)
useProvideIsLogin(isLogin)
const { modalVisible, onModalOpen, onModalClose } = useModal()
const webSocket = useWebSocketStore()
const { getUnreadNotificationCount } = useNoticeStore()
const initWebSokect = () => {
  if (import.meta.env.VITE_WEB_SOCKET_ROOT) {
    webSocket.webSocketInit(import.meta.env.VITE_WEB_SOCKET_ROOT)
  }
}
initWebSokect()
onMounted(() => {
  routeStore.setMenus(routes)
})

watchEffect(() => {
  if (userStore.userInfo?.isSetPwd === 0 && route.path === '/withdraw') {
    onModalOpen()
  } else {
    onModalClose()
  }
  if (isLogin.value) {
    getUnreadNotificationCount()
    if (timer.value === null) {
      timer.value = setInterval(
        () => {
          getUnreadNotificationCount()
        },
        2 * 60 * 1000
      )
    }
  } else {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }
})
</script>

<template>
  <BasicLayout></BasicLayout>
  <SafetyVerModal v-model:open="modalVisible" @cancel="onModalClose">
  </SafetyVerModal>
</template>

<style scoped lang="scss"></style>
