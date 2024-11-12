<script setup lang="ts">
import {
  getHelpCategoryListApi,
  HelpCateItem,
  searchHelpListApi
} from '@/api/help'
import { useRequestByPage } from '@/hooks/useRequest'
import { RightOutlined } from '@ant-design/icons-vue'

const cateList = ref<HelpCateItem[]>([])
const active = ref<number>()

const { pagination, data, run } = useRequestByPage(searchHelpListApi)

onMounted(() => {
  getHelpCategoryListApi().then((res) => {
    if (res.code === 1 && res.data.length > 0) {
      cateList.value = res.data
      active.value = res.data[0].id
    }
    console.log(res)
  })
})
const onCateChange = (id: number) => {
  active.value = id
}
watch(
  () => active.value,
  (cur) => {
    if (cur) {
      pagination.current = 1
      run({
        category: cur,
        page: pagination.current,
        pageSize: pagination.pageSize
      })
    }
  }
)
</script>

<template>
  <div class="w-[1200px] mx-auto">
    <h1 class="text-[28px] font-bold my-[36px]">常见问题</h1>
    <div class="flex">
      <div class="w-[400px] flex-[0 0 400px]">
        <ul>
          <li
            v-for="item in cateList"
            :key="item.id"
            class="flex items-center justify-between h-[68px] px-6 rounded-[8px] mb-[10px] cursor-pointer hover:bg-gray-100"
            :class="active === item.id ? 'bg-gray-100' : ''"
            @click="onCateChange(item.id)"
          >
            <span class="flex-1 block text-xl font-medium ellipsis">
              {{ item.title }}
            </span>
            <RightOutlined />
          </li>
        </ul>
      </div>
      <div class="flex-1 ml-[60px]">
        <ul>
          <li
            v-for="item in data"
            :key="item.id"
            class="border-b border-gray-300"
          >
            <RouterLink
              :to="`/article/helpCenter/${item.id}?title=常见问题`"
              class="block text-[18px]/[68px] h-[68px] px-6 cursor-pointer hover:bg-gray-100"
            >
              {{ item.title }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
