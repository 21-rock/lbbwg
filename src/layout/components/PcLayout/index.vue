<script setup lang="ts">
import PcHeader from './PcHeader.vue'
import PcFooter from './PcFooter.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// 某些页面会隐藏footer
const hiddenFooterRoutes = [
  '/login',
  '/login/index',
  '/register',
  '/register/index'
]
const hiddenFooter = computed(() => hiddenFooterRoutes.includes(route.path))

/* watchEffect(() => {
  console.log(131, route.path, hiddenFooterRoutes.includes(route.path))
}) */
</script>

<template>
  <div class="flex flex-col h-[calc(100vh)] layout-pc-container" id="container">
    <PcHeader />
    <div class="flex-1 w-full">
      <router-view />
    </div>
    <PcFooter v-if="!hiddenFooter" />
  </div>
</template>

<style lang="scss" scoped>
.layout-mb-container {
  height: calc(100vh);
  overflow: auto;
}
</style>
