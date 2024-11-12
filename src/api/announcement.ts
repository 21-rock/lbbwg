import http from '@/utils/http'

interface Params {
  keyword?: string
  page: number
  pageSize?: number
}

interface AnnounceListItem {
  create_time: string
  id: number
  notice_content: string
  notice_title: string
}

export const getAnnounceListApi = (
  params: Params
): Promise<PageResponse<AnnounceListItem>> => {
  return http.get({
    url: '/platform/getNoticeList',
    params: params
  })
}

export const getAnnounceDetailApi = (
  id: number
): ApiResult<AnnounceListItem> => {
  return http.get({
    url: '/platform/getNoticeDetail',
    params: {
      id
    }
  })
}
