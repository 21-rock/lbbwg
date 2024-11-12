<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem, Pagination } from 'ant-design-vue'
import Lists from './components/Lists.vue'
import { useRequestByPage } from '@/hooks/useRequest'
import { searchHelpListApi } from '@/api/help'

const { data, pagination, onPageChange } = useRequestByPage(searchHelpListApi, {
  category: 2
})
</script>

<template>
  <article class="deep-wrap min-h-[calc(100vh-80px)] bg-black text-white">
    <section class="w-[1200px] mx-auto">
      <div class="py-6">
        <Breadcrumb class="breadcrumb-theme-black">
          <BreadcrumbItem>
            <router-link to="/learn"> 新手社区 </router-link>
          </BreadcrumbItem>
          <BreadcrumbItem> 区块链词典 </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <h3 class="pt-6 pb-12 text-xl font-bold">区块链词典</h3>
      <Lists :data="data" title="区块链词典" />
      <div class="flex justify-end mt-6">
        <Pagination
          v-bind="pagination"
          show-less-items
          @change="onPageChange"
        />
      </div>
    </section>
  </article>
</template>
