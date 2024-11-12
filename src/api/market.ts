import http from '@/utils/http'

export const getMarketApi = (): Promise<ApiResult<any>> => {
  return http.get({
    url: '/platform/testMarket'
  })
}
