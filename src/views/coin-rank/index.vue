<script lang="ts" setup>
import { CoinItem, geTopCoinApi, getNewCoinApi, getRankApi } from '@/api/coin'
import { Overview, Details } from './components'

const topCoin = ref<CoinItem[]>([]) // 热门榜
const newCoin = ref<CoinItem[]>([]) // 新币榜
const rankCoin = ref<CoinItem[]>([]) // 排行榜

const tabs = [
  {
    title: '概览',
    key: '1'
  },
  {
    title: '详情',
    key: '2'
  }
]

const tabsActive = ref('1')
const onTabChange = (v: string) => {
  tabsActive.value = v
}

const getData = async () => {
  const [topCoinRes, newCoinRes, rankCoinRes] = await Promise.all([
    geTopCoinApi(),
    getNewCoinApi(),
    getRankApi()
  ])
  topCoin.value = topCoinRes.data || []
  newCoin.value = newCoinRes.data || []
  rankCoin.value = rankCoinRes.data || []
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="w-[1200px] mx-auto pb-10">
    <header class="h-[116px] flex items-center">
      <h2 class="relative text-2xl">热门资产</h2>

      <ul
        class="bg-[#f5f5f5] h-[32px] px-[5px] cursor-pointer ml-[14px] flex items-center rounded-[4px]"
      >
        <li
          v-for="tab in tabs"
          :key="tab.key"
          class="leading-[26px] text-sm px-[10px] rounded-[4px]"
          :class="tabsActive === tab.key ? 'bg-black text-white' : ''"
          @click="onTabChange(tab.key)"
        >
          {{ tab.title }}
        </li>
      </ul>
    </header>
    <Overview
      v-if="tabsActive === '1'"
      :topCoin="topCoin"
      :newCoin="newCoin"
      :rankCoin="rankCoin"
    />
    <Details
      v-else-if="tabsActive === '2'"
      :topCoin="topCoin"
      :newCoin="newCoin"
      :rankCoin="rankCoin"
    />
  </div>
</template>
<style lang="less" scoped></style>
