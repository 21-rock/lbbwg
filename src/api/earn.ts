import http from '@/utils/http'

export const getMiningIncomeSituationApi = () => {
  return http.get({
    url: '/coin/getMiningIncomeSituation'
  })
}

/* 获取理财产品订单列表 */
export interface MiningOrderListItem {
  buy_amount: string
  create_time: string
  cycle: number
  daily_income: string
  default: string
  earnings: string
  id: number
  income_type: string
  mining_config_id: number
  mining_config_logo: string
  mining_config_name: string
  order_no: string
  profit_ratio: string
  radio: string
  redemption_amount: string
  residue: number
  update_time: null
}
export const getMiningOrderListApi = (
  params: Partial<PaginationType> = {}
): ApiPageResult<MiningOrderListItem> => {
  return http.get({
    url: '/coin/getMiningOrderList',
    params: {
      page: params.current
    }
  })
}

export interface AddMiningOrderParams {
  id: number
  money: number
}
export const addMiningOrderApi = (
  data: AddMiningOrderParams
): ApiResult<any> => {
  return http.post({
    url: '/coin/addMiningOrder',
    data
  })
}

/* 获取可质押产品列表 */
export interface MiningListItem {
  buy_max: string
  buy_min: string
  cycle: number
  daily_income: string
  id: number
  image: string
  income_type: string
  name: string
}
export const getMiningListApi = (): ApiResult<MiningListItem[]> => {
  return http.get({
    url: 'platform/getMiningList'
  })
}

/* 赎回理财产品 */
export const revokeMiningOrderApi = (id: number) => {
  return http.post({
    url: '/coin/revokeMiningOrder',
    data: {
      id
    }
  })
}
