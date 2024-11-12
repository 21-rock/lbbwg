import {
  ContractOrderStatus,
  SpotExchangeStatusEnum,
  SpotOrderStatusEnum
} from '@/enums/status'
import {
  ContractOrderDirectionEnum,
  OrderDirectionEnum,
  OrderTypeEnum
} from '@/enums/trade'
import http from '@/utils/http'
import { KLineData } from 'klinecharts'

export interface CoinTypeItem {
  coinUnit: string
  fee: number
  maxAmount: number
  minAMount: number
}

// 获取可用的闪兑币种列表
export const getExchangeCoinsApi = (): ApiResult<CoinTypeItem[]> => {
  return http.get({
    url: '/wallet/getExchangeCoins'
  })
}

// 根据单位获取可兑换的目标币种
export const getExchangeCoinsByUnitApi = (
  unit: string
): ApiResult<CoinTypeItem[]> => {
  return http.get({
    url: '/wallet/getExchangeCoinsByUnit',
    params: {
      unit
    }
  })
}

/**
 * 获取单位兑换价格
 * @param params : {
 *  fromUnit：消耗币
 *  toUnit：换成币
 * }
 * @returns
 */
export const getExchangeCoinPriceApi = (params: {
  fromUnit: string
  toUnit: string
}): ApiResult<number> => {
  return http.get({
    url: '/wallet/getExchangeCoinPrice',
    params
  })
}

/**
 * 闪兑接口
 */

export const exchangeApi = ({
  fromUnit,
  toUnit,
  amount
}: {
  fromUnit: string
  toUnit: string
  amount: number
}): ApiResult<number> => {
  return http.post({
    url: '/wallet/currencyExchange',
    data: {
      amount,
      symbol: `${fromUnit}/${toUnit}`
    }
  })
}

// 账单日志，不知道干啥
export interface GetMoneyLogListParams extends Partial<PaginationType> {
  property?: 0 | 1 // 账户 0资金账户 1交易账户
  type: number
}
export const getMoneyLogListApi = (params: GetMoneyLogListParams) => {
  return http.get({
    url: '/wallet/moneyLogList',
    params
  })
}

// 闪兑订单列表
export interface GetExchangeOrderListParams extends Partial<PaginationType> {
  start_time: string
  end_time: string
}
export const getExchangeOrderListApi = (params: GetExchangeOrderListParams) => {
  const { current = 1, pageSize = 10, ...reset } = params
  return http.get({
    url: '/coin/getExchangeOrderList',
    params: {
      page: current,
      pageSize,
      ...reset
    }
  })
}

/********** 币币相关接口（现货）   *****************/
export interface AddSpotOrderParams {
  // 币种
  symbol: string
  // 1买入 2卖出
  direction: OrderDirectionEnum
  // 订单类型 1市价单 2限价单
  type: OrderTypeEnum
  // 交易数量
  amount: number
  // 订单价格 限价单时才需要填
  price: number
}
// 期货交易，即币币交易
export const addSpotOrderApi = (data: AddSpotOrderParams) => {
  return http.post({
    url: '/coin/addSpotOrder',
    data
  })
}

export interface getSpotListParams extends Partial<PaginationType> {
  // 0-全部 1-委托 2-已成交 3-已撤单
  status?: SpotExchangeStatusEnum
  direction?: OrderDirectionEnum
  trust_type?: OrderTypeEnum
  start_time?: string
  end_time?: string
}
export interface GetSpotListItem {
  commission: string
  data_code: string
  direction: OrderDirectionEnum
  end_time: string
  final_amount: string
  final_price: string
  id: string
  order_no: string
  status: SpotOrderStatusEnum
  symbol: string
  symbol_base: string
  symbol_pricing: string
  symbol_type: string
  trust_amount: string
  trust_price: string
  trust_time: string
  trust_type: OrderTypeEnum
}

// 现货交易
export const getSpotListApi = (
  params: getSpotListParams
): ApiPageResult<GetSpotListItem> => {
  const { current = 1, pageSize = 10, ...reset } = params
  return http.get({
    url: '/coin/getSpotList',
    params: { page: current, pageSize, ...reset }
  })
}

// 撤销交易
export const revokeSpotOrderApi = (id: string) => {
  return http.post({
    url: '/coin/revokeSpotOrder',
    data: {
      id
    }
  })
}

// 买卖颜色(后续使用common.ts中的同名函数)
export const tradeColor = () => {
  return {
    buyColor: '#0BBA99', // 绿色
    sellColor: '#EE3E57' // 红色
  }
}

// 获取K线图的数据
export interface GetKlineDataParams {
  symbol: string
  period: string
  size: number
}
export const getKlineDataApi = (
  params: GetKlineDataParams
): ApiResult<KLineData[]> => {
  return http.get({
    url: '/market/kline',
    params
  })
}

/*************** 合约下单  *****************/
export interface AddContractOrderParams {
  // 买入或者卖空
  buy_direct: 1 | 2
  // 配置ID
  mode_id: number
  // 金额
  money: number
  // 币种
  symbol: string
}
export const addContractOrderApi = (data: AddContractOrderParams) => {
  return http.post({
    url: '/coin/addOptionOrder',
    data
  })
}

/* 获取合约配置 */
export interface ContractConfig {
  buy_max: string
  buy_min: string
  commission: string
  id: number
  phase_max: string
  phase_min: string
  seconds: number
  rate: number
}
export const getContractConfigApi = (): ApiResult<ContractConfig[]> => {
  return http
    .get({
      url: '/coin/getOptionConfig'
    })
    .then((res) => {
      if (res.code === 1 && res.data) {
        const data = res.data as ContractConfig[]
        const totalPeriod = computed(() =>
          data.reduce((total, next) => total + next.seconds, 0)
        )

        res.data = data.map((item) => ({
          ...item,
          rate: parseFloat(
            ((item.seconds / totalPeriod.value) * 100).toFixed(2)
          )
        }))
      }
      return res
    })
}

/* 获取合约订单列表 */

export interface ContractOrderListItem {
  buy_money: string
  buy_price: string
  buy_time: string
  close_money: string
  close_price: string
  close_time: string
  commission: string
  countdown: number
  data_code: string
  direction: string
  gain: string
  id: string
  loss: string
  order_no: string
  profit: string
  profit_money: string
  seconds: string
  status: string
  symbol: string
  symbol_base: string
  symbol_pricing: string
  symbol_type: string
}
export interface GetContractOrderList extends Partial<PaginationType> {
  status?: ContractOrderStatus
  direction?: ContractOrderDirectionEnum
  start_time: string
  end_time: string
}
export const getContractOrderListApi = (
  params: GetContractOrderList
): ApiPageResult<ContractOrderListItem> => {
  const { status, current = 1, pageSize = 10 } = params

  return http.get({
    url: '/coin/getOptionOrderList',
    params: { status, page: current, pageSize }
  })
}

/************* 是否加入自选相关接口  ****************/
export const isOptionalApi = (symbol: string) => {
  return http.get({
    url: '/coin/isOptional',
    params: {
      symbol
    }
  })
}
export const deleteOptionalApi = (symbol: string) => {
  return http.post({
    url: '/coin/deleteOptional',
    data: {
      symbol
    }
  })
}
export const addOptionalApi = (symbol: string) => {
  return http.post({
    url: '/coin/addOptional',
    data: {
      symbol
    }
  })
}

/* 期权相关 */
export interface AddOptionOrderParams {
  // 买入或者卖空
  buy_direct: 1 | 2
  // 配置ID
  mode_id: number
  // 金额
  money: number
  // 币种
  symbol: string
}
export const addOptionOrderApi = (data: AddContractOrderParams) => {
  return http.post({
    url: '/coin/addLeverOrder',
    data
  })
}

/* 获取期权配置 */
export interface OptionConfig {
  id: number
  multiple: number
  profit_min: string
  profit_max: string
  loss_min: string
  loss_max: string
  seconds: number
  buy_min: string
  buy_max: string
  commission: string
}
export const getOptionConfigApi = (): ApiResult<ContractConfig[]> => {
  return http
    .get({
      url: '/coin/getLeverConfig'
    })
    .then((res) => {
      if (res.code === 1 && res.data) {
        const data = res.data as ContractConfig[]
        const totalPeriod = computed(() =>
          data.reduce((total, next) => total + next.seconds, 0)
        )

        res.data = data.map((item) => ({
          ...item,
          rate: parseFloat(
            ((item.seconds / totalPeriod.value) * 100).toFixed(2)
          )
        }))
      }
      return res
    })
}

/* 获取期权订单列表 */

export interface OptionOrderListItem {
  buy_money: string
  buy_price: string
  buy_time: string
  close_money: string
  close_price: string
  close_time: string
  commission: string
  countdown: number
  data_code: string
  direction: string
  gain: string
  id: string
  loss: string
  order_no: string
  profit: string
  profit_money: string
  seconds: string
  status: string
  symbol: string
  symbol_base: string
  symbol_pricing: string
  symbol_type: string
}
export interface GetOptionOrderList extends Partial<PaginationType> {
  status: 0 | 1 // 0-在持  1-历史
}
export const getOptionOrderListApi = (
  params: GetOptionOrderList
): ApiPageResult<OptionOrderListItem> => {
  const { status, current = 1, pageSize = 10 } = params
  return http.get({
    url: '/coin/getLeverOrderList',
    params: { status, page: current, pageSize }
  })
}
