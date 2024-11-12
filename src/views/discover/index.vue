<script setup lang="ts">
import { MarketTable, MyTabs } from '@/components'
import useMarket from '@/hooks/useMarket'

const {
  tickerList,
  pagination,
  tabPages,
  activeKey,
  getMarketsData,
  // stopMarketsData,
  onPageChange
  // onSearch
} = useMarket()

onMounted(() => {
  getMarketsData()
})
</script>

<template>
  <div class="w-[1200px] mx-auto overflow-hidden h-[calc(100vh-80px)]">
    <h2 class="text-3xl font-bold text-black my-[30px]">货币行情</h2>
    <MyTabs :tab-pages="tabPages" v-model:active-key="activeKey">
      <template #content>
        <MarketTable
          :data-source="tickerList"
          :pagination="pagination"
          @change="onPageChange"
        />
      </template>
    </MyTabs>
  </div>
</template>
