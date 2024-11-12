<script lang="ts" setup>
import { getImageUrl } from '@/assets'
import { TimeLine } from '@/components'
import { useInjectIsLogin } from '@/hooks/useIsLogin'

const image6 = getImageUrl('index-6.png')

const isLogin = useInjectIsLogin()
</script>

<template>
  <div class="mt-[100px]">
    <h2 class="text-5xl text-center">
      <span class="tracking-widest title-gradient"> 新人专享 </span>
    </h2>
    <p class="mt-6 mb-12 text-xl font-normal text-center text-white">
      注册UZX账户，邀请好友，有机会享受终身返佣
    </p>
    <div class="w-[1124px] mx-auto clearfix">
      <div
        class="w-[50%] h-[532px] float-left flex justify-center items-center"
      >
        <TimeLine v-if="!isLogin">
          <div class="text-white">
            <p class="text-xl/[32px] font-medium">注册UZX账户</p>
            <p class="text-base text-gray-500">解锁UZX！体验匿名的力量</p>
            <div class="py-[60px]">
              <RouterLink
                to="/register"
                class="flex items-center justify-center h-[40px] btn w-[120px] rounded-[20px]"
                >注册</RouterLink
              >
            </div>
          </div>
          <div class="text-white mb-[50px]">
            <p class="text-base text-gray-500">邀请好友加入UZX</p>
          </div>
          <div class="text-white">
            <p class="text-base text-gray-500">邀请好友加入UZX</p>
          </div>
        </TimeLine>

        <TimeLine v-else>
          <div class="text-white mb-[50px]">
            <p class="text-base text-gray-500">注册UZX账户</p>
          </div>
          <div class="text-white">
            <p class="text-xl/[32px] font-medium">邀请好友加入UZX</p>
            <p class="text-base text-gray-500">邀请好友，赢取盲盒！</p>
            <div class="py-[60px]">
              <RouterLink
                to="/register"
                class="flex items-center justify-center h-[40px] btn w-[120px] rounded-[20px]"
                >邀请用户</RouterLink
              >
            </div>
          </div>
          <div class="text-white">
            <p class="text-base text-gray-500">邀请好友加入UZX</p>
          </div>
        </TimeLine>
      </div>
      <div class="w-[50%] float-right flex justify-center items-center">
        <img :src="image6" alt="" class="w-[462px] h-auto" />
      </div>
    </div>
  </div>
</template>
