<script setup lang="ts">
import { getImageUrl } from '@/assets'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const router = useRouter()

const nodes = [
  {
    icon: getImageUrl('help-1.png'),
    text: '修改登录密码',
    path: '/person-center/alter-pass'
  },
  {
    icon: getImageUrl('help-2.png'),
    text: userStore.userInfo?.isSetPwd ? '修改资金密码' : '设置资金密码',
    path: userStore.userInfo?.isSetPwd
      ? '/alter-security-pass'
      : '/set-security-pass'
  },
  {
    icon: getImageUrl('help-3.png'),
    text: userStore.userInfo?.email
  }
]

const jump = (path?: string) => {
  if (path) {
    router.push(path)
  }
}
</script>

<template>
  <div class="grid grid-cols-3 gap-8">
    <div
      v-for="(item, index) in nodes"
      :key="index"
      class="h-[144px] flex flex-col items-center justify-center border-[1px] border-[hsla(0,0%,100%,.2)] bg-[#131313] rounded-[8px] cursor-pointer"
      @click="jump(item.path)"
    >
      <img :src="item.icon" alt="" />
      <p class="mt-3 text-white font-base">{{ item.text }}</p>
    </div>
  </div>
</template>
