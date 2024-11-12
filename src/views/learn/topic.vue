<script setup lang="ts">
import { MyTabs } from '@/components'
import { Breadcrumb, BreadcrumbItem, Pagination } from 'ant-design-vue'
import Lists from './components/Lists.vue'
const pagination = reactive({
  current: 1,
  total: 100,
  pageSize: 12
})

const tabPages = ref([
  {
    key: '1',
    tab: '新手攻略'
  },
  {
    key: '2',
    tab: '交易进阶',
    content: 'Content of Tab Pane 2'
  }
])
const activeKey = ref('1')
const onChange = () => {}
</script>

<template>
  <article class="min-h-[calc(100vh-80px)] bg-black text-white">
    <section class="w-[1200px] mx-auto">
      <div class="py-6">
        <Breadcrumb class="breadcrumb-theme-black">
          <BreadcrumbItem>
            <router-link to="/learn"> 新手社区 </router-link>
          </BreadcrumbItem>
          <BreadcrumbItem> 主题课堂 </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <h3 class="pt-6 pb-12 text-xl font-bold">主题课堂</h3>
      <MyTabs
        class="tops-tab"
        :tab-pages="tabPages"
        v-model:active-key="activeKey"
        theme="deep"
        @change="onChange"
      >
        <template #content>
          <Lists />
        </template>
      </MyTabs>

      <div class="flex justify-end mt-6">
        <Pagination
          class="pagination-theme-black"
          :showSizeChanger="false"
          show-less-items
          :total="pagination.total"
          :page-size="pagination.pageSize"
          v-model:current="pagination.current"
        />
      </div>
    </section>
  </article>
</template>
