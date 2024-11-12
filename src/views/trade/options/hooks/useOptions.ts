import { computed, Ref, watch } from 'vue'
import { CurrencyPrice, TradeInfo } from '@/model/tradeModel'
import {
  addOptionalApi,
  addOptionOrderApi,
  AddOptionOrderParams,
  deleteOptionalApi,
  getOptionConfigApi,
  isOptionalApi,
  tradeColor
} from '@/api/trade'
import { message } from 'ant-design-vue'
import { getCurrencyBalanceApi } from '@/api/wallet'
import { getImageUrl } from '@/assets'
import { OrderDirectionEnum } from '@/enums/trade'
import { useMountedRequest } from '@/hooks/useRequest'

export const useOptions = (
  currency: Ref<string>,
  tickerData: Ref<CurrencyPrice>
) => {
  const directionTabs = [
    {
      title: '买涨',
      type: 1,
      bg: getImageUrl('bg-4.png'),
      bgActive: getImageUrl('bg-2.png'),
      style: {
        left: 0
      }
    },
    {
      title: '买跌',
      type: 2,
      bg: getImageUrl('bg-3.png'),
      bgActive: getImageUrl('bg-1.png'),
      style: {
        right: 0
      }
    }
  ]

  const { data: configData } = useMountedRequest(getOptionConfigApi)
  const { buyColor, sellColor } = tradeColor()

  const formState = reactive<Partial<AddOptionOrderParams>>({
    symbol: currency.value,
    buy_direct: 1,
    money: undefined,
    mode_id: undefined
  })
  // 能否可以自选
  const isCanOptional = ref(false)
  // 是否自选
  const isOptional = ref(false)
  const optionalList = [
    {
      label: '加入自选',
      value: true
    },
    {
      label: '取消自选',
      value: false
    }
  ]

  // [卖出币种, 买入币种] - BTC/USDT
  const currentCurrency = computed(() => currency.value.split('/'))
  const configRecord = computed(() =>
    configData.value?.find((item) => item.id === formState.mode_id)
  )
  const orderInfo = computed(() => ({
    symbol: currency.value,
    buy_direct: formState.buy_direct === 1 ? '买多' : '卖空',
    color: formState.buy_direct === 1 ? buyColor : sellColor,
    price: tickerData.value.high,
    money: formState.money,
    period: configRecord.value?.seconds,
    period_rate: configRecord.value?.rate
  }))

  // 买入交易信息
  const buyInfo = reactive<TradeInfo>({
    currency: currentCurrency.value[1], // 币种
    balance: 0, // 余额
    total: 0, // 全部
    margin: 0, // 保证金
    fees: 0 // 手续费
  })
  // 卖出交易信息
  const sellInfo = reactive<TradeInfo>({
    currency: currentCurrency.value[0], // 币种
    balance: 0, // 余额
    total: 0, // 全部
    margin: 0, // 保证金
    fees: 0 // 手续费
  })

  const onDirectionChange = (value: OrderDirectionEnum) => {
    formState.buy_direct = value
  }

  const resetForm = () => {
    formState.money = undefined
  }

  // 刷新余额
  const refreshBuyBalance = async () => {
    if (buyInfo.currency) {
      let result = await getCurrencyBalanceApi({
        type: '0',
        currency: buyInfo.currency
      })
      if (result.code == 1) {
        buyInfo.balance = parseFloat(result.data)
      }
    }
  }

  // 刷新可售数量
  const refreshSellBalance = async () => {
    if (sellInfo.currency) {
      let result = await getCurrencyBalanceApi({
        type: '0',
        currency: sellInfo.currency
      })
      if (result.code == 1) {
        sellInfo.balance = parseFloat(result.data)
      }
    }
  }

  const getIsOptional = async () => {
    try {
      const res = await isOptionalApi(currency.value)
      isOptional.value = res.code.data === 1
    } catch (error) {
      console.log(error)
    }
  }

  const switchOptional = async (isTrue: boolean) => {
    try {
      let res = null
      if (isTrue) {
        res = await addOptionalApi(currency.value)
      } else {
        res = await deleteOptionalApi(currency.value)
      }

      if (res.code === 1) {
        isOptional.value = !isOptional.value
      }
    } catch (error) {
      console.log(error)
    }
  }

  const submitOrder = async () => {
    try {
      const res = await addOptionOrderApi({
        ...toRaw(formState as AddOptionOrderParams)
      })
      if (res.code === 1) {
        message.success(res.msg)
        resetForm()
        return true
      } else {
        message.error(res.msg)
      }
    } catch (_error) {
      console.log(_error)
    }
    return false
  }

  watch(
    currency,
    (value) => {
      let currencyArr = value.split('/')
      buyInfo.currency = currencyArr[1]
      buyInfo.amount = 0
      buyInfo.leverage = 0

      sellInfo.currency = currencyArr[0]
      sellInfo.amount = 0
      sellInfo.leverage = 0
      resetForm()
      refreshBuyBalance()
      refreshSellBalance()
      getIsOptional()
    },
    {
      immediate: true
    }
  )
  watch(
    () => configData.value,
    (cur) => {
      if (cur && cur.length > 0) {
        formState.mode_id = cur[0].id
      }
    }
  )

  return {
    buyInfo,
    sellInfo,
    directionTabs,
    formState,
    configData,
    configRecord,
    onDirectionChange,
    submitOrder,
    orderInfo,
    isCanOptional,
    isOptional,
    optionalList,
    switchOptional
  }
}
