<script lang="ts" setup>
import { Collect, Kline } from '@/components'

import {
  SwitchTypePopover,
  CurrentTradeInfo,
  OrderTable,
  ExchangePanel
} from './components'
import { Divider } from 'ant-design-vue'
import EntrustTable from './components/EntrustTable.vue'
import { usePrice } from './hooks/usePrice'

import { CurrencyPrice } from '@/model/tradeModel'
import { debounce } from 'lodash-es'

const route = useRoute()

const currency = ref((route.query.currency as string) || 'BTC/USDT')

const { tickerData, tickerColorChange, getMarketsData } = usePrice(currency)

// 切换币种
const handleSymbolClick = (record: CurrencyPrice) => {
  currency.value = record.symbol
}

const w = ref(0)
const { width } = useWindowSize()

const changeWidth = debounce(() => {
  w.value = width.value
}, 600)

watch(
  () => width.value,
  () => {
    changeWidth()
  }
)

onMounted(() => {
  getMarketsData()
})
</script>

<template>
  <div class="px-2 bg-black spot-container">
    <header
      class="bg-[#161616] px-10 py-3 flex items-center"
      style="grid-area: head"
    >
      <SwitchTypePopover
        :currency="currency"
        :logo="tickerData?.logo"
        @rowClick="handleSymbolClick"
      />
      <span class="ml-4 text-2xl cursor-pointer">
        <Collect :currency="currency" />
      </span>
      <Divider class="h-full bg-[#2f2f2f] mx-10" type="vertical"></Divider>
      <CurrentTradeInfo
        :tickerData="tickerData"
        :tickerColorChange="tickerColorChange"
      />
    </header>
    <section class="bg-[#161616] text-white" style="grid-area: view">
      <!-- <TradingViewWidget /> -->
      <Kline :currency="currency" :tickerData="tickerData" :key="w" />
    </section>
    <div class="bg-[#161616] text-white" style="grid-area: order">
      <OrderTable :currency="currency" />
    </div>
    <div class="bg-[#161616] text-white" style="grid-area: exchange">
      <ExchangePanel :tickerData="tickerData" :currency="currency" />
    </div>
    <div class="bg-[#161616]" style="grid-area: entrust">
      <EntrustTable />
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable declaration-block-no-redundant-longhand-properties */
.spot-container {
  display: grid; /* 1.设置 display 为 grid */
  grid-template-areas:
    'head head head'
    'view  order exchange'
    'entrust   entrust  exchange';
  grid-template-columns: 3fr 1fr 1fr;
  grid-template-rows: 64px auto 400px;
  width: 100%;
  height: 1110px;
  gap: 8px;
}
</style>
