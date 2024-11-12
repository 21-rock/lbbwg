<script setup lang="ts">
import { SearchHelpItem } from '@/api/help'
import { getImageUrl } from '@/assets'
const img = getImageUrl('earn-2.jpg')

withDefaults(
  defineProps<{
    data: SearchHelpItem[]
    title: string
  }>(),
  {
    data: () => [] as SearchHelpItem[],
    title: ''
  }
)
</script>

<template>
  <ul class="grid grid-cols-4 gap-6 text-white">
    <li v-for="item in data" :key="item.id">
      <RouterLink
        :to="`/article/learn/${item.id}?title=${title}`"
        class="block bg-[hsla(0,0%,40%,.2)] border border-[#333] rounded-[8px] overflow-hidden h-[315px]"
      >
        <img
          data-v-67212e94=""
          :src="item.cover || img"
          class="block w-full h-[156px]"
        />
        <div class="p-4">
          <h3 class="text-[18px] font-bold">{{ item.title }}</h3>
          <p class="h-[66px] text-sm/[22px] text-gray-400 ellipsis-3 my-2"></p>
          <p class="text-xs text-gray-400">{{ item.create_time }}</p>
        </div>
      </RouterLink>
    </li>
  </ul>
</template>
