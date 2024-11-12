<script setup lang="ts">
const items = [
  {
    title: '新手总攻略（Web端）'
  },
  {
    title: '资金划转(APP/Web端)'
  },
  {
    title: ' 币币交易（APP/Web端） '
  },
  {
    title: ' 新手总攻略（App端） '
  },
  {
    title: ' 新手总攻略（App端） '
  }
]
</script>

<template>
  <div class="w-full">
    <div class="h-[40px] flex justify-between items-center">
      <h3 class="text-[32px] text-white">新手必读</h3>
      <router-link to="/" class="block text-base text-[#0075ff]">
        更多
      </router-link>
    </div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <RouterLink to="/" class="block text-base text-white py-[8px]">
          {{ item.title }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
