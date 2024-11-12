import { computed, Ref, ref, watch } from 'vue'

import { useCurrency } from '@/hooks'
import { useUserStore } from '@/store'
import { CurrencyPrice, WebSocketSendDto } from '@/model/tradeModel'
import { tradeColor } from '@/utils/common'

export const usePrice = (currency: Ref<string>) => {
  const user = useUserStore()
  const useCurrencyParm = computed<WebSocketSendDto>(() => ({
    type: 'market',
    symbol: currency.value,
    token: user.token,
    page: 1,
    search: ''
  }))
  const { marketsData, getMarketsData, stopMarketsData } =
    useCurrency(useCurrencyParm)

  const { buyColor, sellColor } = tradeColor()
  const tickerData = ref<CurrencyPrice>({
    lastPrice: 0,
    open: 0
  } as CurrencyPrice)

  const tickerColorChange = computed(() => {
    return tickerData.value?.lastPrice &&
      tickerData.value.lastPrice >= tickerData.value.open
      ? buyColor
      : sellColor
  })

  watch(currency, () => {
    getMarketsData()
  })

  watch(marketsData, (data: any) => {
    if (data.type === 'market' && data.data) {
      if (data.data) {
        data.data.lastPrice = Number(data.data.lastPrice)
        data.data.close = Number(data.data.close)
        tickerData.value = data.data
      }
    }
  })

  onUnmounted(() => {
    stopMarketsData('market')
  })
  return {
    tickerData,
    tickerColorChange,
    getMarketsData,
    stopMarketsData
  }
}
