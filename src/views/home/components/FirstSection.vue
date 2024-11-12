<script lang="ts" setup>
import { getImageUrl } from '@/assets'
import { Carousel } from '@/components'
import { useInjectIsLogin } from '@/hooks/useIsLogin'
import { Input } from 'ant-design-vue'
import { Autoplay } from 'swiper/modules'
import { RouterLink } from 'vue-router'

const carouselNodes = [
  getImageUrl('index-1.gif'),
  getImageUrl('index-2.gif'),
  getImageUrl('index-3.gif')
]

const isLogin = useInjectIsLogin()
const modules = [Autoplay]
const inputValue = ref<string>(undefined)
</script>

<template>
  <div class="flex items-center justify-between">
    <template v-if="!isLogin">
      <div>
        <h2 class="title-gradient text-[56px] tracking-widest">
          探索UZX独特宇宙
        </h2>
        <p class="text-[36px] text-gray-400 mt-3">机制透明，安全无忧</p>
        <div class="w-[496px] h-[64px] relative mt-20">
          <Input
            v-model:value="inputValue"
            placeholder="注册"
            class="w-full h-[64px] px-4 border-2 border-[#2ab3d7] border-solid rounded-[32px] bg-inherit text-base placeholder:text-white focus:text-white"
          />
          <RouterLink
            :to="`register?email=${inputValue}`"
            class="btn h-[64px] w-[118px] rounded-[32px] absolute top-0 right-0"
          >
            注册
          </RouterLink>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        <h2 class="title-gradient text-[56px] tracking-widest">欢迎来到UZX!</h2>
        <p class="text-[36px] text-gray-400 mt-3">开启全新交易之旅</p>
        <div class="w-[496px] h-[64px] relative mt-20">
          <RouterLink
            to="/recharge"
            class="btn w-[196px] h-[68px] text-[20px] rounded-[34px]"
          >
            充值数字货币
          </RouterLink>
        </div>
      </div>
    </template>

    <div
      class="w-[247px] h-[539px] border border-solid border-white rounded-[16px] overflow-hidden mr-20"
    >
      <Carousel :nodes="carouselNodes" autoplay :modules="modules"> </Carousel>
    </div>
  </div>
</template>
