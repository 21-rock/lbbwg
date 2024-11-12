import http from '@/utils/http'

export interface HelpCateItem {
  title: string
  id: number
  icon: string
  status: number
}
/* 获取帮助中心 - 分类列表 */
export const getHelpCategoryListApi = (): ApiResult<HelpCateItem[]> => {
  return http.get({
    url: '/platform/getHelpCateMap',
    params: {}
  })
}

export interface HelpListItem {
  cate: number
  cateTitle: string
  content: Array<{
    create_time: number
    id: number
    title: string
  }>
}

/* 获取搜索列表 */
export const getHelpListApi = (): Promise<ResponseData<HelpListItem[]>> => {
  return http.get({
    url: '/platform/getHelpCateList',
    params: {}
  })
}

/* 搜索结果 */
interface SearchHelpParams {
  page?: number
  pageSize?: number
  keyword?: string
  category?: number
}
export interface SearchHelpItem {
  create_time: number
  id: number
  title: string
  cover: string
}
export const searchHelpListApi = (
  params: SearchHelpParams
): ApiPageResult<SearchHelpItem> => {
  const { page = 1, pageSize = 20, keyword = '', category } = params
  return http.get({
    url: '/platform/getHelpList',
    params: {
      page,
      pageSize,
      keyword,
      category
    }
  })
}
/* 获取帮助中心 - 分类列表 */
export const getHelpDetailApi = (
  id: number
): ApiResult<{
  create_time: string
  id: number
  title: string
  content: string
}> => {
  return http.get({
    url: '/platform/getHelpDetail',
    params: { id }
  })
}

interface LearnItem {
  id: string
  title: string
  cover: string
  create_time: string
}

interface Learn {
  dictionary: Array<LearnItem>
  beginner: Array<LearnItem>
}

/* 获取搜索列表 */
export const getLearnListApi = (): ApiResult<Learn> => {
  return http.get({
    url: '/platform/getBeginnerList',
    params: {}
  })
}
