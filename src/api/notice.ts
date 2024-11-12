import http from '@/utils/http'

export interface NoticeListItem {
  create_time: string
  id: number
  content: string
  title: string
  is_read: 0 | 1 // 0未读 1已读
}

interface Params extends Partial<PaginationType> {}

export const getNoticeListApi = (
  params: Params
): Promise<PageResponse<NoticeListItem>> => {
  return http.get({
    url: '/platform/getNotificationList',
    params: {
      page: params.current,
      pageSize: params.pageSize
    }
  })
}

export const readNoticeApi = (id: number): Promise<ResponseData<any>> => {
  return http.get({
    url: '/platform/notificationRead',
    params: {
      id
    }
  })
}

export const readAllNoticeApi = (): Promise<ResponseData<any>> => {
  return http.get({
    url: '/platform/notificationBatchRead',
    params: {}
  })
}

export const getUnreadNotificationCountApi = (): Promise<
  ResponseData<{ count: number }>
> => {
  return http.get({
    url: '/platform/getUnreadNotificationCount',
    params: {}
  })
}
