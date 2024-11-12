import {
  GetCurrencyBalanceParams,
  SubmitWithdrawApi,
  WalletAddressItem,
  WithdrawCoinType,
  WithdrawDetail,
  deleteWalletAddressApi,
  getCurrencyBalanceApi,
  getWalletAddressListApi,
  getWithdrawApi,
  getWithdrawDetailApi
} from '@/api/wallet'
import { toDecimals } from '@/utils/util'
import { message } from 'ant-design-vue'

const useWithdraw = () => {
  const router = useRouter()

  const coinList = ref<WithdrawCoinType[]>([])
  const addrList = ref<WalletAddressItem[]>([])
  const loading = ref(false)
  const deleteLoading = ref(false)
  const withdrawLoading = ref(false)
  const coinId = ref<number>()
  const netId = ref<number | string>()
  const addressId = ref<number>()
  const detailInfo = ref<WithdrawDetail>()
  const amount = ref<number>() // 提现金额
  const balance = ref<number>(0) // 余额
  const payPass = ref<string>() // 资金密码
  const netIsMatchAddr = ref(true) // 网络是否匹配地址

  // 当前选中币种对象
  const currencyRecord = computed(() =>
    coinList.value.find((item) => item.id === coinId.value)
  )

  // 网络列表，在项目中无用
  const netList = computed(() => {
    return (
      coinList.value.find((item) => item.id === coinId.value)
        ?.currency_network || []
    )
  })

  // 手续费计算规则
  const handlingcharge = computed(() => {
    if (!detailInfo.value || !amount.value) {
      return 0
    }
    if (detailInfo.value.commission_type === 1) {
      return Number(detailInfo.value.commission)
    }

    if (detailInfo.value.commission_type === 0) {
      let v = Number(detailInfo.value.commission) * amount.value
      return toDecimals(v, 8)
    }
    return 0
  })

  // 提现最小值
  const min = computed(() =>
    detailInfo.value ? Number(detailInfo.value.commission_min) : 0
  )

  // 提现最大值
  const max = computed(() => {
    const _max = detailInfo.value ? Number(detailInfo.value?.commission_max) : 0

    return balance.value > _max ? _max : balance.value
  })

  // 时间到账数量
  const actualReceivedAmount = computed(() => {
    if (!amount.value) {
      return 0
    }
    return toDecimals(amount.value - (handlingcharge.value as number), 8)
  })

  // 获取币种列表，即充币方式列表
  const getWithdrawList = () => {
    getWithdrawApi().then((res) => {
      if (res.code === 1) {
        coinList.value = res.data
      }
    })
  }
  // 获取充币方式详情
  const getWithdrawDetail = async (id: number) => {
    const res = await getWithdrawDetailApi(id)
    if (res.code === 1) {
      detailInfo.value = res.data
    }
  }

  // 获取币种的余额
  const getCurrencyBalance = async (params: GetCurrencyBalanceParams) => {
    const res = await getCurrencyBalanceApi(params)
    if (res.code === 1) {
      balance.value = +res.data
    }
  }

  // 获取钱包地址列表
  const getWalletAddressList = (currency = '') => {
    loading.value = true
    getWalletAddressListApi(currency)
      .then((res) => {
        if (res.code === 1) {
          addrList.value = res.data
        } else {
          message.error(res.msg)
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  // 删除钱包地址
  const deleteWalletAddress = (id: number) => {
    message.loading('deleting')
    if (deleteLoading.value) {
      return
    }
    deleteLoading.value = true
    deleteWalletAddressApi(id)
      .then((res) => {
        if (res.code === 1) {
          message.destroy()
          message.success('删除成功', 1.5, () => {
            getWalletAddressList()
          })
        } else {
          message.destroy()
          message.error(res.msg)
        }
      })
      .finally(() => {
        deleteLoading.value = false
      })
  }

  const withdraw = async () => {
    if (!netIsMatchAddr.value) {
      message.error('你的提币地址与主网不匹配')
      return
    }
    try {
      const params = {
        withdraw_id: coinId.value as number,
        wall_id: addressId.value as number,
        amount: amount.value as number,
        password: payPass.value || ''
      }
      withdrawLoading.value = true
      const res = await SubmitWithdrawApi(params)
      if (res.code === 1) {
        message.success('提交成功', 1.5, () => {
          router.push({
            path: '/manage',
            query: {
              activeKey: '1'
            }
          })
        })
      } else {
        message.error(res.msg)
      }
    } catch (error) {
      console.log(error)
    }
    withdrawLoading.value = false
  }

  watch(
    () => coinId.value,
    () => {
      if (coinId.value) {
        getWalletAddressList(currencyRecord.value!.currency)
        getWithdrawDetail(coinId.value)
        getCurrencyBalance({
          type: '0',
          currency: currencyRecord.value!.currency
        })
      }

      netId.value = undefined
      addressId.value = undefined
    }
  )

  watch(
    () => addressId.value,
    () => {
      if (addressId.value) {
        netId.value = addrList.value.find(
          (item) => item.id === addressId.value
        )?.currency_network
      } else {
        netId.value = undefined
      }
    }
  )

  watch(
    () => netId.value,
    (cur) => {
      if (!cur) {
        netIsMatchAddr.value = true
      } else {
        netIsMatchAddr.value =
          addrList.value.find((item) => item.id === addressId.value)
            ?.currency_network === cur
      }
    }
  )

  return {
    coinList,
    loading,
    addrList,
    withdrawLoading,
    coinId,
    netId,
    addressId,
    netList,
    currencyRecord,
    handlingcharge,
    min,
    max,
    amount,
    actualReceivedAmount,
    payPass,
    netIsMatchAddr,
    getWithdrawList,
    getWalletAddressList,
    deleteWalletAddress,
    withdraw
  }
}

export default useWithdraw
