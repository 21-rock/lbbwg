import { computed, Ref, watch } from 'vue'
import { CurrencyPrice, TradeInfo } from '@/model/tradeModel'
import { addSpotOrderApi, AddSpotOrderParams, tradeColor } from '@/api/trade'
import { message } from 'ant-design-vue'
import { getCurrencyBalanceApi } from '@/api/wallet'
import { getImageUrl } from '@/assets'
import { OrderDirectionEnum, OrderTypeEnum } from '@/enums/trade'

export const useSpot = (
  currency: Ref<string>,
  tickerData: Ref<CurrencyPrice>
) => {
  const directionTabs = [
    {
      title: '买入',
      type: OrderDirectionEnum.买入,
      bg: getImageUrl('bg-4.png'),
      bgActive: getImageUrl('bg-2.png'),
      style: {
        left: 0
      }
    },
    {
      title: '卖出',
      type: OrderDirectionEnum.卖出,
      bg: getImageUrl('bg-3.png'),
      bgActive: getImageUrl('bg-1.png'),
      style: {
        right: 0
      }
    }
  ]

  const typeTabs = [
    {
      key: OrderTypeEnum.市场委托,
      tab: '市场委托'
    },
    {
      key: OrderTypeEnum.限价委托,
      tab: '限价委托'
    }
  ]
  const { buyColor, sellColor } = tradeColor()

  const formState = reactive<Partial<AddSpotOrderParams>>({
    symbol: currency.value,
    direction: OrderDirectionEnum.买入,
    type: OrderTypeEnum.市场委托,
    amount: undefined,
    price: 0
  })
  // [卖出币种, 买入币种] - BTC/USDT
  const currentCurrency = computed(() => currency.value.split('/'))
  const orderInfo = computed(() => ({
    symbol: formState.symbol,
    direction:
      formState.direction === OrderDirectionEnum.买入 ? '买入' : '卖出',
    type: formState.type === OrderTypeEnum.市场委托 ? '市场委托' : '限价委托',
    amount:
      formState.type === OrderTypeEnum.市场委托 ? undefined : formState.amount,
    price: formState.price,

    color:
      formState.direction === OrderDirectionEnum.买入 ? buyColor : sellColor
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
    formState.direction = value
  }

  const resetForm = () => {
    formState.symbol = currency.value
    formState.amount = undefined
    formState.price = 0
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

  const trade = async () => {
    try {
      const res = await addSpotOrderApi({
        ...toRaw(formState as AddSpotOrderParams),
        price: formState.price || 0
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
      if (formState.type === OrderTypeEnum.限价委托) {
        formState.price = tickerData.value.lastPrice
      } else {
        formState.price = 0
      }
    },
    {
      immediate: true
    }
  )

  watch(
    () => [formState.direction, formState.type],
    () => {
      resetForm()
      if (formState.type === OrderTypeEnum.限价委托) {
        formState.price = tickerData.value.lastPrice
      } else {
        formState.price = 0
      }
    }
  )

  return {
    buyInfo,
    sellInfo,
    directionTabs,
    typeTabs,
    formState,
    onDirectionChange,
    trade,
    orderInfo
  }
}
