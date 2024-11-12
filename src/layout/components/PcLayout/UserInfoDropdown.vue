<script lang="ts" setup>
import { getIconUrl } from '@/assets'
import { useAuthStore, useUserStore } from '@/store'
import { UserOutlined } from '@ant-design/icons-vue'
import { Dropdown } from 'ant-design-vue'
const { logout } = useAuthStore()
const userStore = useUserStore()
const items = [
  {
    title: '总览',
    icon: getIconUrl('icon-25.png'),
    path: '/person-center?activeKey=1'
  },
  {
    title: '安全中心',
    icon: getIconUrl('icon-22.png'),
    path: '/person-center?activeKey=2'
  },
  {
    title: '偏好设置',
    icon: getIconUrl('icon-23.png'),
    path: '/person-center?activeKey=4'
  },
  {
    title: 'API管理',
    icon: getIconUrl('icon-26.png'),
    path: '/person-center?activeKey=5'
  }
]
</script>

<template>
  <Dropdown>
    <a class="block" @click.prevent>
      <UserOutlined class="block text-xl text-white" />
    </a>
    <template #overlay>
      <div class="bg-white w-[240px] p-3 rounded-[8px]">
        <div
          class="py-[12px] border-b-[1px] border-gray-100 flex items-center gap-2"
        >
          <span class="w-[34px] h-[34px] rounded-[100%] overflow-hidden">
            <img
              :src="userStore.userInfo?.avatar"
              class="w-full h-full"
              alt=""
            />
          </span>
          <div>
            <p class="text-xs">{{ userStore.userInfo?.nickname }}</p>
            <p class="text-xs text-gray-500">
              UID:{{ userStore.userInfo?.id }}
            </p>
          </div>
        </div>
        <ul class="my-3">
          <li
            v-for="item in items"
            :key="item.title"
            class="pl-2 hover:bg-gray-100"
          >
            <RouterLink
              :to="item.path"
              :style="{
                background: `no-repeat url(${item.icon}) left center`,
                backgroundSize: '20px 20px'
              }"
              class="block pl-[30px] py-3 leading-[24px] cursor-pointer hover:text-black"
            >
              {{ item.title }}
            </RouterLink>
          </li>
        </ul>
        <div class="pl-2 border-t-[1px] border-gray-100 hover:bg-gray-100">
          <span
            :style="{
              background: `no-repeat url(${getIconUrl('icon-24.png')}) left center`,
              backgroundSize: '20px 20px'
            }"
            class="block pl-[30px] py-3 leading-[24px] cursor-pointer hover:text-black"
            @click="logout"
          >
            退出登录
          </span>
        </div>
      </div>
    </template>
  </Dropdown>
</template>
