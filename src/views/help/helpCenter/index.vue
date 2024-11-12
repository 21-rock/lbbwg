<script setup lang="ts">
import {
  HelpCard,
  SearchBar,
  // HotIssues,
  // RequiredBeginners,
  FAQ,
  Feedback
} from './components'

import { getHelpListApi, searchHelpListApi } from '@/api/help'
import { useInjectIsLogin } from '@/hooks/useIsLogin'
import { useMountedRequest } from '@/hooks/useRequest'

const isLogin = useInjectIsLogin()

const { data } = useMountedRequest(getHelpListApi)

onMounted(() => {
  searchHelpListApi({}).then((res) => {
    console.log(res)
  })
})
</script>

<template>
  <div class="bg-black">
    <div class="w-[1200px] mx-auto">
      <SearchBar />
    </div>
    <div v-if="isLogin" class="w-[1200px] mx-auto mb-[72px]">
      <HelpCard />
    </div>
    <!-- <div class="w-[1200px] mx-auto grid grid-cols-2 gap-[100px] mb-[72px]"> -->
    <!-- 热门问题 -->
    <!-- <HotIssues /> -->
    <!-- 新手必读 -->
    <!-- <RequiredBeginners /> -->
    <!-- </div> -->
    <div class="w-[1200px] mx-auto mb-[72px]">
      <div class="h-[40px] flex justify-between items-center mb-[20px]">
        <h3 class="text-[32px] text-white">常见问题</h3>
        <router-link to="/help/faq" class="block text-base text-[#0075ff]">
          更多
        </router-link>
      </div>
      <FAQ :data="data" />
    </div>
    <div class="bg-[#1c1c1c] h-[400px] p-6 flex-center">
      <div class="w-[1200px] mx-auto">
        <Feedback />
      </div>
    </div>
  </div>
</template>
