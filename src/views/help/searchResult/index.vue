<script setup lang="ts">
import { searchHelpListApi } from '@/api/help'
import { useRequestByPage } from '@/hooks/useRequest'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Breadcrumb, Input } from 'ant-design-vue'

const routes = [
  {
    path: '/help/helpCenter',
    breadcrumbName: '帮助中心'
  },
  {
    path: '/helpCenter/search-result',
    breadcrumbName: '搜索结果'
  }
]
const route = useRoute()
const kw = route.params.keyword as string
const keyword = ref(kw)
const { data, run } = useRequestByPage(searchHelpListApi, {
  keyword: keyword.value,
  pageSize: 100
})

const onKeyUp = () => {
  run({
    keyword: keyword.value,
    pageSize: 100
  })
}
</script>

<template>
  <div class="w-[1200px] mx-auto">
    <div class="pt-[40px]">
      <Breadcrumb :routes="routes">
        <template #itemRender="{ route }">
          <span v-if="routes.indexOf(route) === routes.length - 1">
            {{ route.breadcrumbName }}
          </span>
          <router-link v-else :to="route.path">
            {{ route.breadcrumbName }}
          </router-link>
        </template>
      </Breadcrumb>
    </div>
    <div class="pt-[40px]">
      <div class="flex items-center justify-between">
        <p class="text-4xl">Search result （{{ data.length }}）</p>
        <div class="search-box w-[550px]">
          <Input
            v-model:value="keyword"
            size="large"
            class="bg-gray-100"
            @keyup.enter="onKeyUp"
          >
            <template #prefix>
              <SearchOutlined class="py-2 text-gray-400" />
            </template>
          </Input>
        </div>
      </div>
    </div>
    <div class="my-[30px]">
      <ul>
        <li
          class="border-b-[1px] border-gray-200"
          v-for="item in data"
          :key="item.id"
        >
          <router-link
            :to="`/article/helpCenter/${item.id}`"
            class="block px-[10px] py-[20px] hover:bg-gray-200"
          >
            <h3
              class="text-[18px]/[24px] h-[24px] text-black font-bold ellipsis"
            >
              {{ item.title }}
            </h3>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-box {
  :deep(.ant-input:where(input)) {
    @apply text-black;
    @apply bg-gray-100;
  }
}
</style>
