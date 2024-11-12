import { RechargeStatusEnum } from '@/enums/status'
import http from '@/utils/http'

/*************************  充币相关接口 ********************************************/
export interface RechargeCoinType {
  currency: string
  currency_network: string
  id: number
  logo_link: string
}
// 获取充值方式列表，即币种
export const getRechargeListApi = (): ApiResult<RechargeCoinType[]> => {
  return http.get({
    url: '/platform/getRechargeList'
  })
}
// 获取充值方式详情

export interface RechargeDetail {
  currency: string
  currency_address: string
  currency_mix: string
  currency_network: string
  currency_qr: string
  id: number
}
export const getRechargeDetailApi = (id: number): ApiResult<RechargeDetail> => {
  return http.get({
    url: '/platform/getRechargeDetail',
    params: {
      id
    }
  })
}

interface SubmitRecharParams {
  // 充值方式id
  recharge_id: number
  // 充值数量
  amount: number
  // 支付截图
  payment_screenshot: string
}
// 提交充值
export const submitRechargeApi = (data: SubmitRecharParams): ApiResult<any> => {
  return http.post({
    url: '/wallet/submitRecharge',
    data
  })
}

/* 获取充值记录列表 */
export interface RechargeRecord {
  audit_status: RechargeStatusEnum
  create_time: string
  currency: string
  currency_network: string
  order_no: string
  receipt: string
}
export const getRechargeRecordsApi = (
  params: Partial<{
    page?: number
    pageSize?: number
  }>
): ApiPageResult<RechargeRecord> => {
  return http.get({
    url: '/wallet/rechargeList',
    params
  })
}

/*************************  提币相关接口 ********************************************/
export interface WithdrawCoinType {
  currency: string
  currency_network: Array<{ key: string; value: string }>
  id: number
  logo_link: string
}

// 获取提现方式列表，即币种
export const getWithdrawApi = (): ApiResult<WithdrawCoinType[]> => {
  return http.get({
    url: '/platform/getWithdraw'
  })
}

// 获取充值方式详情

export interface WithdrawDetail {
  // 手续费
  commission: string
  // 提币最大数量
  commission_max: string
  // 提币最小数量
  commission_min: string
  // 手续费类型 1-固定 0-百分比
  commission_type: 0 | 1
  // 币种
  currency: string
  id: number
}
export const getWithdrawDetailApi = (id: number): ApiResult<WithdrawDetail> => {
  return http.get({
    url: '/platform/getWithdrawDetail',
    params: { id }
  })
}

export interface AddWalletAddressParams {
  currency: string
  currency_network: string
  currency_address: string
  currency_qr?: string
}
// 添加钱包货币
export const addWalletAddressApi = (
  data: AddWalletAddressParams
): ApiResult<WithdrawCoinType[]> => {
  return http.post({
    url: '/wallet/addWalletAddress',
    data
  })
}

export interface WalletAddressItem {
  id: number
  create_time: string
  currencies_logo: string
  currency: string
  currency_address: string
  currency_network: string
  currency_qr: string
}
export const getWalletAddressListApi = (
  currency = ''
): ApiResult<WalletAddressItem[]> => {
  return http.get({
    url: '/wallet/allWalletAddress',
    params: {
      currency
    }
  })
}

// 删除钱包货币
export const deleteWalletAddressApi = (address_id: number) => {
  return http.post({
    url: '/wallet/deleteWalletAddress',
    data: { address_id }
  })
}

// 获取提现币的余额
export interface GetCurrencyBalanceParams {
  // 资产类型:0=资金账户,1=交易账户
  type: 0 | 1
  // 货币币种
  currency: string
}
// 获取币种余额
export const getCurrencyBalanceApi = (
  params: GetCurrencyBalanceParams
): ApiResult<string> => {
  return http.get({
    url: '/wallet/currencyBalance',
    params
  })
}

// /wallet/submitWithdraw
export interface SubmitWithdrawParams {
  // 提现方式id
  withdraw_id: number
  // 钱包地址ID
  wall_id: number
  // 金额
  amount: number
  // 支付密码
  password: string
}
// 发起提现
export const SubmitWithdrawApi = (data: SubmitWithdrawParams) => {
  return http.post({
    url: '/wallet/submitWithdraw',
    data
  })
}

/* 获取提币记录列表 */
export interface WithdrawRecord {
  audit_status: RechargeStatusEnum
  create_time: string
  currency: string
  currency_network: string
  order_no: string
  receipt: string
}
export const getWithdrawRecordsApi = (
  params: Partial<{
    page?: number
    pageSize?: number
  }>
): ApiPageResult<RechargeRecord> => {
  return http.get({
    url: '/wallet/withdrawList',
    params
  })
}

/**
 * 资产列表
 * @param type 资产类型:0=资金账户,1=交易账户
 * @returns
 */
export interface AssetListItem {
  currency: string
  money: string
  types: string
  user_id: number
  logo_link: string
  frozen: number
  discount_amount: string
}
export const getAssetListApi = ({
  type
}: {
  type: 0 | 1
}): ApiResult<AssetListItem[]> => {
  return http.get({
    url: '/wallet/assetList',
    params: {
      type
    }
  })
}
