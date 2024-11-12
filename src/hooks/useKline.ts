import { useCurrency } from '@/hooks'
import { Period } from '@klinecharts/pro'
import dayjs from 'dayjs'
import { KLineData } from 'klinecharts'

type Priod = 'minute' | 'hour' | 'day' | 'month' | 'year'
/* 
  { multiplier: 1, 
   timespan: 'week', // 'minute' | 'hour' | 'day' | 'month' | 'year'
   text: 'W'  // 5m 120min D W M Y
   } 
*/
const getPeriodStr = (value: number, unit: Priod) => {
  // week day min
  if (unit === 'minute') {
    return value + 'min'
  }
  if (unit === 'hour') {
    return value * 60 + 'min'
  }

  return value + unit
}

const useKline = (currency: Ref<string>) => {
  const klineData = ref<KLineData[]>([])
  const period = ref<Period>({
    multiplier: 1,
    timespan: 'minute',
    text: '1m'
  })
  const isUpdata = ref(false)

  const useCurrencyParm = computed<WebSocketSendDto>(() => ({
    page: 1,
    size: 1,
    search: '',
    period: getPeriodStr(
      period.value.multiplier,
      period.value.timespan as Priod
    ),
    symbol: currency.value || 'BTC/USDT',
    type: 'kline'
  }))

  const { marketsData, getMarketsData, stopMarketsData } =
    useCurrency(useCurrencyParm)

  watch(marketsData, (res: any) => {
    if (res.type === 'kline') {
      console.log('--res.data--', res.data)
    }
    if (res.type === 'kline' && res.data && res.data.length > 0) {
      const data = res.data.slice().reverse()
      klineData.value = data.map((item: any) => ({
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
    }
  })

  onUnmounted(() => {
    stopMarketsData('kline')
  })

  return {
    klineData,
    period,
    isUpdata,
    getMarketsData,
    stopMarketsData
  }
}

export default useKline
