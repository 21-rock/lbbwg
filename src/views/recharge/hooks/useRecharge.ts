import {
  getRechargeDetailApi,
  getRechargeListApi,
  RechargeCoinType,
  RechargeDetail,
  submitRechargeApi
} from '@/api/wallet'
import { message } from 'ant-design-vue'

interface Args {
  onRechargeSuccess?: () => void
}

export const useRecharge = ({ onRechargeSuccess }: Args) => {
  const coinList = ref<Record<string, RechargeCoinType[]>>({})
  // 当前选中的币种
  const coinCurrent = ref<string>()
  // 充值方式ID（币种ID）
  const coinId = ref<number>()
  const detailInfo = ref<RechargeDetail>({} as RechargeDetail)
  // 充币金额
  const amount = ref<number>()
  // 支付截图
  const payment_screenshot = ref('')
  const submitLoading = ref(false)
  const active = ref(0)
  const onCurrencyChange = () => {
    active.value = 1
  }
  const onNetChange = () => {
    active.value = 2
  }

  const netList = computed(() => {
    return coinList.value[coinCurrent.value || ''] || []
  })

  const getRechargeList = async () => {
    const res = await getRechargeListApi()
    if (res.code === 1) {
      coinList.value = handleRechargeList(res.data)
    }
  }

  const handleRechargeList = (list: RechargeCoinType[]) => {
    const obj = {} as Record<string, RechargeCoinType[]>

    list.forEach((item) => {
      if (!obj[item.currency]) {
        obj[item.currency] = [item]
      } else {
        obj[item.currency].push(item)
      }
    })

    return obj
  }

  // 获取充值方式详情
  const getRechargeDetail = async (coinId: number) => {
    const res = await getRechargeDetailApi(coinId)
    if (res.code === 1) {
      detailInfo.value = res.data
    }
  }

  const submitRecharge = async () => {
    if (amount.value !== 0 && !amount.value) {
      message.warn('充值金额不能为空')
      return
    }
    if (!payment_screenshot.value) {
      message.warn('请上传支付截图')
      return
    }
    if (submitLoading.value) {
      return
    }
    submitLoading.value = true
    message.loading('充值中...')

    const params = {
      recharge_id: coinId.value!,
      amount: amount.value,
      payment_screenshot: payment_screenshot.value
    }
    try {
      const res = await submitRechargeApi(params)
      message.destroy()
      if (res.code === 1) {
        message.success('充值成功')
        handleRechargeSuccess()
      } else {
        message.error(res.msg)
      }
    } catch (error) {
      console.log(error)
    }
    submitLoading.value = false
  }

  function handleRechargeSuccess() {
    coinCurrent.value = undefined
    active.value = 0
    amount.value = undefined
    payment_screenshot.value = ''
    onRechargeSuccess?.()
  }

  watch(
    () => coinCurrent.value,
    () => {
      coinId.value = undefined
    }
  )

  watch(
    () => coinId.value,
    () => {
      coinId.value && getRechargeDetail(coinId.value)
    }
  )

  onMounted(() => {
    getRechargeList()
  })

  return {
    coinList,
    coinCurrent,
    coinId,
    netList,
    detailInfo,
    amount,
    payment_screenshot,
    active,
    submitRecharge,
    onCurrencyChange,
    onNetChange
  }
}
