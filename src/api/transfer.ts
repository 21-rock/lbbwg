import http from '@/utils/http'

// 币种划转
export interface TransferParams {
  from_type: 0 | 1
  reach_type: 0 | 1
  amount: string
  currency: string
}
export const transferApi = (data: TransferParams): ApiResult<any> => {
  return http.post({
    url: '/wallet/currencyTransfer',
    data
  })
}

export interface ExchangeCurrency {
  convertible: Record<string, string[]>
  currency: string[]
  detail: Record<
    string,
    {
      commission: string
      rate: string
    }
  >
}
export const getExchangeCurrencyApi = (): ApiResult<ExchangeCurrency> => {
  return http.get({
    url: 'platform/getExchangeCurrency'
  })
}
