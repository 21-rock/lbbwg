<script setup lang="ts">
import { MarketTable } from '@/components'
import useMarket from '@/hooks/useMarket'

const {
  tickerList,
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
/* 
const options = [
  {
    label: '自选',
    value: 'options'
  },
  {
    label: '币种',
    value: 'markets'
  },
  {
    label: '热门榜',
    value: '3'
  },
  {
    label: '涨幅榜',
    value: '4'
  },
  {
    label: '新币榜',
    value: '5'
  },
  {
    label: '成交额榜',
    value: '6'
  }
] */
const onChange = (value: string) => {
  activeKey.value = value as 'optional' | 'markets'
}
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-black">行情</h2>
    <ul class="flex gap-4">
      <li
        v-for="item in tabPages"
        :key="item.key"
        class="text-sm/[28px] text-gray-400 px-3 border-[1px] border-[#d2d2d2] bg-gray-100 rounded-[15px] mt-6 cursor-pointer"
        :class="
          activeKey === item.key ? '!bg-black !border-black !text-white' : ''
        "
        @click="onChange(item.key)"
      >
        {{ item.tab }}
      </li>
    </ul>
    <MarketTable
      :data-source="tickerList"
      :pagination="false"
      @change="onPageChange"
    ></MarketTable>
  </div>
</template>
