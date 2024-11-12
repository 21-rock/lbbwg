<script lang="ts" setup>
import { getIconUrl } from '@/assets'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { Dropdown, Space } from 'ant-design-vue'
const items = [
  {
    title: '我的资产',
    icon: getIconUrl('assets-icon-7.png'),
    path: '/manage?activeKey=1'
  },
  {
    title: '充币',
    icon: getIconUrl('assets-icon-8.png'),
    path: '/recharge'
  },
  {
    title: '提币',
    icon: getIconUrl('assets-icon-9.png'),
    path: '/withdraw'
  },
  {
    title: '资金划转',
    icon: getIconUrl('assets-icon-4.png'),
    path: '/transfer'
  },
  // {
  //   title: '资产分析',
  //   icon: getIconUrl('assets-icon-5.png'),
  //   path: ''
  // },
  {
    title: '订单中心',
    icon: getIconUrl('assets-icon-6.png'),
    path: '/manage?activeKey=4'
  }
]
</script>

<template>
  <Dropdown>
    <a class="block leading-[24px]" @click.prevent>
      <Space :gutter="[0]">
        <span>资产管理</span>
        <CaretDownOutlined class="text-xs" />
      </Space>
    </a>
    <template #overlay>
      <div class="bg-white w-[240px] p-3 rounded-[8px]">
        <ul>
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
      </div>
    </template>
  </Dropdown>
</template>
