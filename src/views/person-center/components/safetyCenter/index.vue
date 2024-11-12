<script setup lang="ts">
import { getIconUrl } from '@/assets'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const nodes = computed(() => [
  {
    title: '绑定邮箱',
    desc: '匿名用户可通过绑定邮箱找回账号',
    icon: 'icon-29.png',
    isBind: true,
    btnText: '绑定',
    bindText: '已绑定',
    path: '/bind-email'
  },
  // {
  //   title: 'Google验证器',
  //   desc: '请绑定Google验证器',
  //   icon: 'icon-27.png',
  //   isBind: false,
  //   btnText: '绑定',
  //   path: ''
  // },
  {
    title: '资金密码',
    desc: '账户资金变动时，需先验证资金密码',
    icon: 'icon-28.png',
    isBind: userStore.userInfo?.isSetPwd === 1,
    hideCenter: true,
    btnText: '设置',
    bindText: '修改密码',
    path: '/set-security-pass',
    bindPath: '/alter-security-pass'
  }
])
</script>

<template>
  <div class="w-[1200px] mx-auto pb-[70px]">
    <h2 class="text-[32px] font-bold py-[70px]">安全中心</h2>
    <article>
      <!-- 绑定邮箱 -->
      <section
        v-for="item in nodes"
        :key="item.title"
        class="flex justify-between items-center h-[114px] border-b-[1px] border-gray-100"
      >
        <div class="flex items-center gap-2 w-[40%]">
          <img :src="getIconUrl(item.icon)" class="w-[34px] h-[34px]" alt="" />
          <div>
            <p class="text-[18px]">{{ item.title }}</p>
            <p class="mt-0 text-sm text-gray-400">
              {{ item.desc }}
            </p>
          </div>
        </div>
        <!-- <div class="flex items-center gap-2 w-[30%]">
          <img :src="getIconUrl('icon-30.png')" width="24" height="24" alt="" />
          <span>xiaobu9876@gmail.com</span>
        </div> -->
        <template v-if="!item.hideCenter">
          <div class="flex items-center gap-2 w-[33.33%]" v-if="!item.isBind">
            <img
              :src="getIconUrl('icon-31.png')"
              width="24"
              height="24"
              alt=""
            />
            <span>未绑定</span>
          </div>
          <div class="flex justify-center w-[33.33%]" v-else>
            <p>已绑定</p>
          </div>
        </template>
        <div class="flex justify-end w-[33.33%]">
          <router-link
            v-if="!item.isBind"
            :to="item.path"
            class="block px-6 leading-[34px] border-[1px] border-black rounded-[18px]"
          >
            {{ item.btnText }}
          </router-link>
          <router-link
            v-else-if="item.bindPath"
            :to="item.bindPath"
            class="block px-6 leading-[34px] border-[1px] border-black rounded-[18px]"
          >
            {{ item.bindText }}
          </router-link>
          <span
            v-else
            class="block px-6 leading-[34px] border-[1px] border-black rounded-[18px]"
          >
            {{ item.bindText }}
          </span>
        </div>
      </section>
    </article>
  </div>
</template>
