import { useCurrency } from '@/hooks'
import { TradeOrderItem } from '@/model/tradeModel'

export const useOrder = (currency: Ref<string>) => {
  const orderList = ref<TradeOrderItem[]>([])

  const useCurrencyParm = computed<WebSocketSendDto>(() => ({
    page: 1,
    search: '',
    symbol: currency.value || 'BTC/USDT',
    token: 'a0d6f16b-afde-4b52-9d2a-9c019a62b530',
    type: 'trade'
  }))
  // symbol: 'BTC/USDT'
  // type: 'trade'
  // amount
  // :
  // "0.04479200"
  // direction
  // :
  // "buy"
  // price
  // :
  // "67027.23377533"
  const { marketsData, getMarketsData, stopMarketsData } =
    useCurrency(useCurrencyParm)

  watch(marketsData, (res: any) => {
    if (res.type === 'trade' && res.data) {
      orderList.value = res.data.map((item: any) => {
        item.amount = Number(item.amount)
        item.price = Number(item.price)
        return item
      })
    }
  })

  onUnmounted(() => {
    // stopMarketsData('trade')
  })

  return {
    orderList,
    getMarketsData,
    stopMarketsData
  }
}
