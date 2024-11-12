<script setup lang="ts">
const items = [
  {
    title: '为什么提币不到账？'
  },
  {
    title: '充值未到账怎么办？'
  },
  {
    title: '充值未到账怎么办？'
  },
  {
    title: '充值未到账怎么办？'
  },
  {
    title: '充值未到账怎么办？'
  }
]
</script>

<template>
  <div class="w-full">
    <div class="h-[40px] flex justify-between items-center">
      <h3 class="text-[32px] text-white">热门问题</h3>
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
