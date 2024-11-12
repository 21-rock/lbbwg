<script setup lang="ts">
import { Logo } from '@/components'
import { Divider, Dropdown, Space } from 'ant-design-vue'
import { MenuOutlined, UserOutlined } from '@ant-design/icons-vue'
import { getIconUrl, getImageUrl } from '@/assets'
import SliderNav from './SliderNav.vue'
const avatar = getImageUrl('defaultavatar.png')

import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const userMenus = [
  {
    title: '总览',
    icon: getIconUrl('icon-25.png'),
    route: '/'
  },
  {
    title: '安全中心',
    icon: getIconUrl('icon-22.png'),
    route: '/'
  },
  {
    title: '偏好设置',
    icon: getIconUrl('icon-23.png'),
    route: '/'
  }
]
const sliderNavVisible = ref(false)

const openSliderNav = () => {
  sliderNavVisible.value = true
}
const closeSliderNav = () => {
  sliderNavVisible.value = false
}

const goIndex = () => {
  router.push('/index')
}
</script>

<template>
  <header class="clearfix w-full h-12 px-5 bg-black">
    <div class="flex items-center float-left h-full">
      <Logo class="w-auto h-7" @click="goIndex" />
    </div>
    <div class="flex items-center float-right h-full text-white">
      <Dropdown trigger="click">
        <a @click.prevent class="block p-3">
          <UserOutlined class="block text-xl/[0] align-middle" />
        </a>
        <template #overlay>
          <div class="w-64 p-4 bg-white rounded-md">
            <div class="flex items-center gap-2">
              <img :src="avatar" class="w-9 h-9" />
              <div>
                <p class="text-base text-black">lvxiaobu</p>
                <p class="text-sm text-gray-400">uuid:12312321</p>
              </div>
            </div>
            <Divider type="horizontal" class="my-4" />
            <ul>
              <li
                v-for="(item, index) in userMenus"
                :key="item.title"
                :class="index === userMenus.length - 1 ? '' : 'mb-4'"
              >
                <RouterLink to="/" class="py-4">
                  <Space>
                    <img :src="item.icon" class="w-auto h-5" />
                    <span class="text-sm text-black">{{ item.title }}</span>
                  </Space>
                </RouterLink>
              </li>
              <Divider type="horizontal" class="my-4" />
              <li>
                <RouterLink to="/">
                  <Space>
                    <img :src="getIconUrl('icon-24.png')" class="w-auto h-5" />
                    <span class="text-sm text-black">退出登录</span>
                  </Space>
                </RouterLink>
              </li>
            </ul>
          </div>
        </template>
      </Dropdown>
      <Divider type="vertical" class="h-4 bg-white" />
      <a @click.prevent="openSliderNav" class="p-3">
        <MenuOutlined class="text-xl/[0] align-middle" />
      </a>
    </div>
    <SliderNav v-model="sliderNavVisible" @close="closeSliderNav" />
  </header>
</template>

<style>
.a {
  line-height: normal;
}
</style>
