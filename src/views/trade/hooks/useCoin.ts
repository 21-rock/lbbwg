import {
  CoinTypeItem,
  exchangeApi,
  getExchangeCoinPriceApi,
  getExchangeCoinsApi,
  getExchangeCoinsByUnitApi
} from '@/api/trade'
import { toDecimals } from '@/utils/util'
import { message } from 'ant-design-vue'

const useCoin = () => {
  const coinFromUnit = ref<CoinTypeItem>()
  const coinToUnit = ref<CoinTypeItem>()
  const coinRete = ref(0)
  const fromCoins = ref<CoinTypeItem[]>([])
  const toCoins = ref<CoinTypeItem[]>([])
  const inputCount = ref<number | undefined>(undefined)
  const isConvert = ref(false)
  const launchLoading = ref(false)

  // 兑换价格:
  const coinReteTxt = computed(() =>
    coinFromUnit.value && coinToUnit.value
      ? `1${coinFromUnit.value.coinUnit} ≈ ${coinRete.value} ${coinToUnit.value.coinUnit}`
      : ''
  )

  // 手续费
  const handlingCharge = computed(() => {
    if (!coinFromUnit.value || !inputCount.value) {
      return 0
    }
    return toDecimals(coinFromUnit.value.fee * inputCount.value, 8)
  })

  // 兑换目标币的数量
  const exchangeAccount = computed(() => {
    if (inputCount.value === 0) {
      return 0
    }
    return !inputCount.value
      ? undefined
      : toDecimals(inputCount.value * coinRete.value, 8)
  })

  // 能够兑换的数量判断
  const range = computed(() => {
    if (coinFromUnit.value && coinToUnit.value && coinRete.value) {
      return (
        toDecimals(coinToUnit.value.minAMount / coinRete.value, 8) +
        '~' +
        toDecimals(coinToUnit.value.maxAmount / coinRete.value, 8)
      )
    }

    return ''
  })

  // 获取可用的闪兑币种列表
  const getExchangeCoins = async () => {
    try {
      const res = await getExchangeCoinsApi()
      if (res.code === 1 && res.data.length > 0) {
        fromCoins.value = res.data
        coinFromUnit.value = res.data[0]
      } else {
        fromCoins.value = []
        coinFromUnit.value = undefined
        message.warn('没有币可兑换')
      }
    } catch (error) {
      console.log('--errror--1', error)
    }
  }

  // 根据单位获取可兑换的目标币种
  const getExchangeCoinsByUnit = async () => {
    try {
      const res = await getExchangeCoinsByUnitApi(coinFromUnit.value!.coinUnit)
      if (res.code === 1 && res.data.length > 0) {
        toCoins.value = res.data
        if (!isConvert.value) {
          coinToUnit.value = res.data[0]
        } else {
          isConvert.value = false
        }
      } else {
        toCoins.value = []
        coinToUnit.value = undefined
        message.warn('没有可兑换币')
      }
    } catch (error) {
      console.log('--errror--2', error)
    }
  }

  // 获取兑换比例
  const getExchangeCoinPrice = async () => {
    try {
      const res = await getExchangeCoinPriceApi({
        fromUnit: coinFromUnit.value!.coinUnit,
        toUnit: coinToUnit.value!.coinUnit
      })
      if (res.code === 1) {
        coinRete.value = res.data
      }
    } catch (error) {
      console.log('--errror--3', error)
    }
  }

  // 发起兑换
  const launchExchange = async () => {
    if (!inputCount.value) {
      message.warn('兑换数量不能为空')
      return
    }
    if (!coinFromUnit.value) {
      message.warn('兑换币种不能为空')
      return
    }
    if (!coinToUnit.value) {
      message.warn('兑换币种不能为空')
      return
    }
    launchLoading.value = true

    try {
      const res = await exchangeApi({
        amount: inputCount.value,
        fromUnit: coinFromUnit.value.coinUnit,
        toUnit: coinToUnit.value.coinUnit
      })

      launchLoading.value = false

      if (res.code === 1) {
        message.warn('兑换成功')
        inputCount.value = undefined
      } else {
        message.warn(res.msg)
      }
    } catch (error) {
      console.log('--error--', error)
    }
  }

  onMounted(() => {
    getExchangeCoins()
  })

  watch(
    () => coinFromUnit.value,
    (value) => {
      inputCount.value = undefined
      if (value) {
        getExchangeCoinsByUnit()
      } else {
        toCoins.value = []
        coinToUnit.value = undefined
      }
    }
  )
  watch(
    () => coinToUnit.value,
    (value) => {
      if (value) {
        getExchangeCoinPrice()
      } else {
        coinRete.value = 0
      }
    }
  )

  // 当需要兑换的的币发生变更
  const handleFromChange = (_v: any, e: any) => {
    coinFromUnit.value = e['data-record']
    inputCount.value = undefined
    getExchangeCoinsByUnit()
  }

  // 当需要兑换的目标币发生变更
  const handleToChange = (_v: any, e: any) => {
    coinToUnit.value = e['data-record']
  }

  // 当兑换币和目标币进行转换
  const convert = () => {
    isConvert.value = true
    const from = Object.assign({}, coinFromUnit.value)
    const to = Object.assign({}, coinToUnit.value)
    coinFromUnit.value = to
    coinToUnit.value = from
  }

  return {
    coinFromUnit,
    coinToUnit,
    coinRete,
    fromCoins,
    toCoins,
    coinReteTxt,
    handlingCharge,
    inputCount,
    exchangeAccount,
    launchLoading,
    range,
    handleFromChange,
    handleToChange,
    convert,
    launchExchange
  }
}

export default useCoin
