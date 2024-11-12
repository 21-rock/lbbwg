<script setup lang="ts">
import { useRoute } from 'vue-router'
import MbHeader from './MbHeader.vue'
import MbFooter from './MbFooter.vue'

const route = useRoute()

// 某些页面会隐藏footer
const hiddenFooterRoutes = [
  '/login',
  '/login/index',
  '/register',
  '/register/index'
]
const hiddenFooter = computed(() => hiddenFooterRoutes.includes(route.path))
</script>

<template>
  <div class="flex flex-col bg-black layout-mb-container">
    <MbHeader />
    <div class="flex-1 w-full">
      <router-view />
    </div>
    <MbFooter v-if="!hiddenFooter" />
  </div>
</template>

<style lang="scss" scoped>
.layout-mb-container {
  height: calc(100vh);
  overflow: auto;
}
</style>
