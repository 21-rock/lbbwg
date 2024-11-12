<script setup lang="ts">
import { Logo, ToggleLocale } from '@/components'
import NavBars from './PcNavBars.vue'
import { RouterLink, useRouter } from 'vue-router'
import { useInjectIsLogin } from '@/hooks/useIsLogin'
import UserInfoDropdown from './UserInfoDropdown.vue'
import Assets from './Assets.vue'
import Notice from './Notice.vue'

const router = useRouter()
const goIndex = () => {
  router.push('/index')
}
const isLogin = useInjectIsLogin()
</script>

<template>
  <!-- 适配电脑端 -->
  <header class="clearfix min-w-[1200px] pl-10 pr-10 bg-black pc-header">
    <div class="float-left h-20">
      <Logo class="w-auto h-10 mt-3 cursor-pointer" @click="goIndex" />
    </div>
    <div class="float-left h-20 ml-10">
      <NavBars />
    </div>

    <div
      v-if="!isLogin"
      class="flex items-center float-right h-20 gap-8 text-base text-white leading-20"
    >
      <RouterLink to="/login">登录</RouterLink>
      <RouterLink to="/register">注册</RouterLink>
      <ToggleLocale />
    </div>
    <div
      v-else
      class="flex items-center float-right h-20 gap-8 text-base text-white leading-20"
    >
      <Assets />
      <UserInfoDropdown />
      <!-- <Divider type="vertical" /> -->
      <span class="border-l-[1px] border-[#393939] h-[26px]"></span>
      <Notice />
      <ToggleLocale />
    </div>
  </header>
</template>

<style lang="scss">
.pc-header {
  .float-right {
    svg {
      display: block;
    }
  }
}
</style>
