import http from '@/utils/http'

export const getHomeDataApi = () => {
  return http.get({
    url: '/platform/getHomeData'
  })
}
