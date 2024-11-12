import http from '@/utils/http'

export const getHomeDataApi = () => {
  return http.get({
    url: '/platform/getHomeData'
  })
}

export interface CoinItem {
  data_code: string
  logo: string
  rate: string
  symbol: string
}

// 获取热门榜
export const geTopCoinApi = (): ApiResult<CoinItem[]> => {
  return http.get({
    url: '/coin/topCoin'
  })
}

// 获取新币榜
export const getNewCoinApi = (): ApiResult<CoinItem[]> => {
  return http.get({
    url: '/coin/newCoin'
  })
}

// 获取涨幅榜
export const getRankApi = (): ApiResult<CoinItem[]> => {
  return http.get({
    url: '/coin/rank'
  })
}

// 获取各类榜单
export const getRateListApi = (): ApiResult<CoinItem[]> => {
  return http.get({
    url: '/coin/rateList'
  })
}
