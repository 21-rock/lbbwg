declare interface PaginationType {
  current: number
  pageSize: number
  total: number
}

declare type Recordable<T = any> = Record<string, T>
