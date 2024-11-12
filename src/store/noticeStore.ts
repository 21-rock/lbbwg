import {
  getNoticeListApi,
  getUnreadNotificationCountApi,
  NoticeListItem,
  readAllNoticeApi,
  readNoticeApi
} from '@/api/notice'
import { useRequest } from '@/hooks/useRequest'
import { defineStore } from 'pinia'

const useNoticeStore = defineStore('noticeStore', () => {
  const current = ref(1)
  const total = ref(0)
  const data = ref<NoticeListItem[]>([])
  const isBottom = ref(false)
  const uneadCount = ref(0)

  const { run, loading } = useRequest(getNoticeListApi)

  const initNoticeList = () => {
    isBottom.value = false
    current.value = 1
    run({
      current: current.value
    }).then((res) => {
      if (res.code === 1) {
        data.value = res.data.data || []
        total.value = res.data.total
      }
    })
  }

  const loadmore = () => {
    if (isBottom.value) {
      return
    }
    current.value++
    run({
      current: current.value,
      pageSize: 20
    }).then((res) => {
      if (res.code === 1) {
        data.value = [...data.value, ...res.data.data]
        total.value = res.data.total
        if (data.value.length >= total.value) {
          isBottom.value = true
        }
      } else {
        current.value--
      }
    })
  }

  const read = (r: NoticeListItem) => {
    readNoticeApi(r.id).then((res) => {
      if (res.code === 1) {
        r.is_read = 1
        uneadCount.value--
      }
    })
  }
  const readAll = () => {
    readAllNoticeApi().then((res) => {
      if (res.code === 1) {
        data.value = data.value.map((item) => ({
          ...item,
          is_read: 1
        }))
        uneadCount.value = 0
      }
    })
  }

  const getUnreadNotificationCount = () => {
    getUnreadNotificationCountApi().then((res) => {
      if (res.code === 1) {
        uneadCount.value = res.data.count
      }
    })
  }
  return {
    loading,
    data,
    current,
    isBottom,
    uneadCount,
    read,
    readAll,
    loadmore,
    initNoticeList,
    getUnreadNotificationCount
  }
})

export default useNoticeStore
