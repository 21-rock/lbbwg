interface ResponseData<T> {
  code: number
  msg: string
  data: T
}

interface PageResponse<T> {
  code: number
  msg: string
  data: {
    total: number
    current_page: number
    per_page: number
    data: T[]
  }
}

type ApiResult<T> = Promise<ResponseData<T>>
type ApiPageResult<T> = Promise<PageResponse<T>>

interface FileResponse {
  full_url: string
  height: number
  id: number
  last_upload_time: number
  mimetype: string
  name: string
  sha1: string
  size: number
  storage: string
  suffix: string
  topic: string
  url: string
  user_id: number
  width: number
}

interface WebSocketSendDto {
  type: string
  symbol?: string | undefined
  symbolType?: string | undefined
  token?: string | undefined
  period?: string // 1min 5min 30min 60min
  page: number
  search?: string
}
