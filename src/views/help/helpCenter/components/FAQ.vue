<script setup lang="ts">
import { HelpListItem } from '@/api/help'
interface Props {
  data: HelpListItem[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

props.data.map((item) => item.content)
</script>

<template>
  <div class="grid grid-cols-3 gap-8">
    <div
      v-for="item in data"
      :key="item.cate"
      class="h-[332px] border-[1px] border-[hsla(0,0%,100%,.2)] bg-[#131313] rounded-[8px] p-[20px]"
    >
      <h3 class="border-b-[1px] border-[hsla(0,0%,100%,.2)] pb-[16px]">
        <span
          class="text-[18px]/[24px] text-white pl-[30px]"
          :style="{
            // background: `no-repeat url('${item.icon}') left center`,
            backgroundSize: '20px 20px'
          }"
          >{{ item.cateTitle }}</span
        >
      </h3>
      <ul>
        <li v-for="listItem in item.content" :key="listItem.id">
          <RouterLink
            :to="`/article/helpCenter/${listItem.id}?title=${item.cateTitle}`"
            class="block text-base text-white py-[13px]"
          >
            {{ listItem.title }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
