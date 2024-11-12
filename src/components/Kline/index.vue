<script setup lang="ts">
import { useKline } from '@/hooks'
import { v4 } from 'uuid'
// 引入js
import {
  KLineChartPro,
  DatafeedSubscribeCallback,
  Period,
  SymbolInfo
} from '@klinecharts/pro'
import { KLineData } from 'klinecharts'
import mitt from 'mitt'
// 引入样式
import '@klinecharts/pro/dist/klinecharts-pro.css'
import { Button } from 'ant-design-vue'
import { getKlineDataApi, GetKlineDataParams } from '@/api/trade'
import dayjs from 'dayjs'
import { CurrencyPrice } from '@/model/tradeModel'

interface Props {
  currency: string
  tickerData: CurrencyPrice
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'BTC/USDT'
})

type Priod = 'minute' | 'hour' | 'day' | 'month' | 'year'
const getPeriodStr = (value: number, unit: Priod) => {
  const o = {
    minute: 'min',
    hour: 'hour',
    day: 'day',
    month: 'mon',
    year: 'year'
  }
  if (value === 1 && unit === 'hour') {
    return '60min'
  }
  return value + o[unit]
}
// const period = ref<Period>({
//   multiplier: 15,
//   timespan: 'minute',
//   text: '15m'
// })

const emitter = mitt()
const EVENT_NAME = 'Kline_data_change'

const currency = computed(() => props.currency)
const loading = ref(false)
const id = v4()
const { klineData, period, getMarketsData, stopMarketsData } =
  useKline(currency)
const klineInstance = ref<KLineChartPro>()
const lists = ref<KLineData[]>([])

const params = computed(() => ({
  size: 150,
  period: getPeriodStr(period.value.multiplier, period.value.timespan as Priod),
  symbol: currency.value || 'BTC/USDT'
}))

watch(
  () => currency.value,
  (cur) => {
    const arr = cur.split('/')
    const symbolInfo = klineInstance.value?.getSymbol() || {}
    klineInstance.value?.setSymbol({
      ...symbolInfo,
      shortName: arr[0],
      ticker: arr[0],
      priceCurrency: arr[1] // 价格币种
    })
    getMarketsData()
  }
)

const getDifItem = (arr1: any, arr2: any) => {
  if (
    arr1.length > 0 &&
    arr2.length > 0 &&
    arr1[arr1.length - 1].timestamp !== arr2[arr2.length - 1].timestamp
  ) {
    return arr2[arr2.length - 1]
  }
  return undefined
}

watch(
  () => klineData.value,
  (data) => {
    const item = getDifItem(lists.value, data)
    if (item) {
      console.log(
        'update',
        dayjs(data[data.length - 1].timestamp).format('YYYY-MM-DD HH:mm:ss'),
        item
      )
      emitter.emit(EVENT_NAME, item)
    }
  }
)

const getData = async (params: GetKlineDataParams): Promise<KLineData[]> => {
  try {
    const res = await getKlineDataApi(params)
    const data = (res.data || [])
      .slice()
      .reverse()
      .map((item: any) => ({
        // 收盘价，必要字段
        close: item.close,
        // 最高价，必要字段
        high: item.high,
        // 最低价，必要字段
        low: item.low,
        // 开盘价，必要字段
        open: item.open,
        timestamp: item.id * 1000,
        time: dayjs(item.id * 1000).format('YYYY-MM-DD HH:mm:ss'),
        // 成交额，非必须字段，如果需要展示技术指标'EMV'和'AVP'，则需要为该字段填充数据。
        turnover: item.amount,
        // 成交量，非必须字段
        volume: item.vol
      }))
    // console.log('--data--', data)
    lists.value = data
    return data
  } catch (error) {
    console.log(error)
  }
  return []
}

const publish = () => {
  // emitter.emit(EVENT_NAME, klineData.value)
}

class CustomDatafeed {
  /**
   * 模糊搜索标的
   * 在搜索框输入的时候触发
   * 返回标的信息数组
   */
  async searchSymbols(search?: string): Promise<SymbolInfo[]> {
    // 根据模糊字段远程拉取标的数据
    console.log('--search--', search)
    return []
  }

  /**
   * 获取历史k线数据
   * 当标的和周期发生变化的时候触发
   *
   * 返回标的k线数据数组
   */
  async getHistoryKLineData(
    _symbol: SymbolInfo,
    _period: Period,
    _from: number,
    _to: number
  ): Promise<KLineData[]> {
    // if (loading.value) {
    //   return lists.value
    // }
    // console.log('--getHistoryKLineData--', _period)
    stopMarketsData('kline')
    period.value = _period
    klineInstance.value?.setPeriod(_period)
    loading.value = true

    const data = await getData(params.value)
    getMarketsData()
    loading.value = false
    return data
  }

  /**
   * 订阅标的在某个周期的实时数据
   * 当标的和周期发生变化的时候触发
   *
   * 通过callback告知图表接收数据
   */
  subscribe(
    _symbol: SymbolInfo,
    _period: Period,
    callback: DatafeedSubscribeCallback
  ): void {
    // const period = getPeriodStr(
    //   _period.multiplier,
    //   _period.value.timespan as Priod
    // )

    emitter.on(EVENT_NAME, (payload) => {
      const dataItem = payload as KLineData
      // 完成ws订阅或者http轮询
      callback(dataItem)
    })
  }

  /**
   * 取消订阅标的在某个周期的实时数据
   * 当标的和周期发生变化的时候触发
   *
   */
  unsubscribe(_symbol: SymbolInfo, _period: Period): void {}
}

onMounted(() => {
  getMarketsData()
  // 创建实例
  klineInstance.value = new KLineChartPro({
    container: document.getElementById(id)!,
    // 初始化标的信息
    symbol: {
      // exchange: 'XNYS',
      // market: 'stocks',
      // name: 'Alibaba Group Holding Limited American Depositary Shares, each represents eight Ordinary Shares',
      // shortName: 'BTC',
      ticker: 'BTC',
      priceCurrency: 'USDT' // 价格币种
      // type: 'ADRC'
    },
    theme: 'dark',
    // 初始化周期
    // period: { multiplier: 15, timespan: 'minute', text: '15m' },
    // period: { multiplier: 1, timespan: 'week', text: 'W' },
    period: period.value,
    // 1min, 5min, 15min, 30min, 60min, 4hour, 1day, 1mon, 1week, 1year
    periods: [
      { multiplier: 1, timespan: 'minute', text: '1' },
      { multiplier: 5, timespan: 'minute', text: '5m' },
      { multiplier: 15, timespan: 'minute', text: '15m' },
      { multiplier: 1, timespan: 'hour', text: 'H' },
      { multiplier: 4, timespan: 'hour', text: '4H' },
      { multiplier: 1, timespan: 'day', text: 'D' },
      { multiplier: 1, timespan: 'week', text: 'W' },
      { multiplier: 1, timespan: 'month', text: 'M' }
      // { multiplier: 1, timespan: 'year', text: 'Y' }
    ],
    // 这里使用默认的数据接入，如果实际使用中也使用默认数据，需要去 https://polygon.io/ 申请 API key
    // datafeed: new DefaultDatafeed(`${import.meta.env.VITE_POLYGON_API_KEY}`)
    datafeed: new CustomDatafeed()
  })
  // chart.setPeriod
})
</script>

<template>
  <div class="relative w-full h-full bg-slate-300">
    <Button @click="publish" class="absolute top-0 left-0 z-9999">
      发布消息
    </Button>
    <div class="w-full h-full" :id="id" data-theme="dark"></div>
  </div>
</template>

<style lang="scss">
.klinecharts-pro {
  .klinecharts-pro-period-bar {
    .symbol {
      display: none;
    }
  }

  .klinecharts-pro-widget {
    .klinecharts-pro-watermark {
      display: none;
    }
  }
}
</style>
