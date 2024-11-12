<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem, Pagination } from 'ant-design-vue'
import Lists from './components/Lists.vue'
import { useRequestByPage } from '@/hooks/useRequest'
import { searchHelpListApi } from '@/api/help'

const { data, pagination, onPageChange } = useRequestByPage(searchHelpListApi, {
  category: 1
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
          <BreadcrumbItem> 新手必读 </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <h3 class="pt-6 pb-12 text-xl font-bold">新手必读</h3>
      <Lists :data="data" title="新手必读" />
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
