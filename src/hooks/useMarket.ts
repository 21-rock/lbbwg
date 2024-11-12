import { computed, ref, watch } from 'vue'

import { useCurrency } from '@/hooks'
import { useUserStore } from '@/store'
import { CurrencyPrice, WebSocketSendDto } from '@/model/tradeModel'

const useMarket = () => {
  const user = useUserStore()
  const tickerList = ref<CurrencyPrice[]>([])
  const search = ref<string>()
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const tabPages = ref([
    {
      key: 'optional',
      tab: '自选'
    },
    {
      key: 'markets',
      tab: '币种'
    }
  ])
  const activeKey = ref<'optional' | 'markets'>('markets')

  const useCurrencyParm = computed<WebSocketSendDto>(() => ({
    page: pagination.current,
    search: search.value || '',
    symbolType: '1',
    token: user.token,
    type: activeKey.value
  }))

  const { marketsData, getMarketsData, stopMarketsData } =
    useCurrency(useCurrencyParm)

  watch(marketsData, (res: any) => {
    if (res.type === 'markets' && res.data) {
      tickerList.value = res.data.data
      pagination.total = res.data.total
    }
  })

  const getData = () => {
    stopMarketsData(activeKey.value)
    getMarketsData()
  }

  watch(
    () => activeKey.value,
    (_cur, pre) => {
      stopMarketsData(pre)
      pagination.current = 1
      pagination.total = 0
      tickerList.value = []
      getMarketsData()
    }
  )

  const onPageChange = (
    current: number | Record<'current' | 'pageSize' | 'total', number>
  ) => {
    if (typeof current === 'number') {
      pagination.current = current
    } else {
      pagination.current = current.current
    }

    getData()
  }

  const onSearch = (value?: string) => {
    pagination.current = 1
    search.value = value
    getData()
  }

  onUnmounted(() => {
    stopMarketsData(activeKey.value)
  })

  return {
    tickerList,
    pagination,
    tabPages,
    activeKey,
    search,
    getMarketsData,
    stopMarketsData,
    onPageChange,
    onSearch
  }
}

export default useMarket
