<script setup lang="ts">
import { getAnnounceListApi } from '@/api/announcement'
import { useRequestByPage } from '@/hooks/useRequest'

const { data } = useRequestByPage(getAnnounceListApi)
</script>

<template>
  <div class="w-full border-[1px] border-gray-300 rounded-[20px] p-6">
    <div
      class="flex justify-between items-center pb-6 border-b-[1px] border-gray-100"
    >
      <h3 class="text-[18px] text-black font-bold">公告</h3>
      <RouterLink to="/announcement" class="text-sm text-blue">更多</RouterLink>
    </div>
    <ul>
      <li
        class="border-b-[1px] border-gray-100 py-4 cursor-pointer"
        v-for="item in data"
        :key="item.id"
      >
        <RouterLink :to="`article/announcement/${item.id}`">
          <p class="h-6 text-base leading-6 text-black ellipsis">
            {{ item.notice_title }}
          </p>
          <p class="mt-3 text-xs text-gray-400">{{ item.create_time }}</p>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
