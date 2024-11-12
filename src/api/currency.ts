import { SubscriptCurrencyStatusEnum } from '@/enums/currency'
import http from '@/utils/http'

export const getNewCurrencyListApi = () => {
  return http.get({
    url: '/coin/index'
  })
}

/* 获取新币申购的列表 */
export interface GetSubscriptCurrencyListParams
  extends Partial<PaginationType> {
  status: SubscriptCurrencyStatusEnum
}

interface SubscriptCurrencyListItem {
  id: number
  name: string
  image: string
  create_time: number
  update_time: number
  status: number
  is_show: number
  number: number // 总数量
  start_date: string // 开始时间
  end_date: string // 结束时间
  seller_num: 0 // 已售数量
  sales_progress: 0 // 销售进度
  settlement_amount: string // 申购所需币种
  settlement_coin: string // 申购所需币额
  min_amount: string // 最小购买金额
  max_amount: string // 最小购买金额
}
export const getSubscriptCurrencyListApi = (
  _params: GetSubscriptCurrencyListParams
): ApiPageResult<SubscriptCurrencyListItem> => {
  const params = {
    status: _params.status,
    pageSize: _params.pageSize || 20,
    page: _params.current || 1
  }
  return http.get({
    url: '/coin/index',
    params
  })
}

export interface SubscriptCurrencyParams {
  num: number
  id: number
}
export const subscriptCurrencyApi = (data: SubscriptCurrencyParams) => {
  return http.post({
    url: '/coin/buy',
    data
  })
}

export interface CoinOrderListItem {
  order_id: number
  coin_id: number
  create_time: string
  symbol_pricing: string
  symbol_base: string
  status: number
  final_price: string
  final_amount: string
}
export const getCoinOrderListApi = (
  params: Partial<PaginationType>
): ApiPageResult<CoinOrderListItem> => {
  return http.get({
    url: '/coin/getCoinOrderList',
    params
  })
}
