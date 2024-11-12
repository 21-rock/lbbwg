import { onMounted, reactive, toRefs, UnwrapRef } from 'vue'
import { RequestConfig } from '@/utils/http'
import axios from 'axios'
import { message } from 'ant-design-vue'
const CancelToken = axios.CancelToken

interface State<T> {
  data: T | undefined // 异步请求的数据 如果没有数据  则为undefined
  loading: boolean // 异步请求是否在进行中
  error: any // 异步请求出错的信息
}

// 初始值配置
interface Config extends RequestConfig {
  // 当前页
  current?: number
  // 分页大小
  pageSize?: number
  // 初始值
  initState?: unknown
  // 延迟
  delay?: number
  // 是否进入界面就加载
  isMounted?: boolean
}

export function useRun<T = unknown, R = unknown>(
  api: (params: R, config: RequestConfig) => Promise<T>,
  params?: R,
  config: Config = {},
  done?: () => void
) {
  const { delay = 0, ...responseConfig } = config
  const result = reactive<Omit<State<any>, 'data'>>({
    loading: false,
    error: undefined
  })
  const cancel = ref<undefined | (() => void)>(undefined)

  const run = async (pms?: R, conf: Recordable = {}) => {
    result.loading = true
    try {
      if (delay > 0) {
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve(null)
          }, delay)
        )
      }

      let requestParams: any = undefined
      if (typeof params === 'object' && !params === null) {
        requestParams = Object.assign({}, params, pms)
      } else {
        requestParams = pms
      }
      const res = await api(requestParams, {
        cancelToken: new CancelToken(function executor(c) {
          // 参数 c 也是个函数
          cancel.value = c
        }),
        ...responseConfig,
        ...conf
      })
      result.error = undefined
      return res as T
    } catch (err) {
      result.error = err
    } finally {
      result.loading = false
      done?.()
    }
  }
  return {
    ...toRefs(result),
    cancel,
    run
  }
}

/**
 * 用于异步查询
 * @param api       接口
 * @param params    接口参数
 * @param config    其它配置，比如初始值 initState, 或者接口的其它配置（RequestOptions）
 *
 */
export function useRequest<T = unknown, R = unknown>(
  api: (params: R, config?: RequestConfig) => Promise<ResponseData<T>>,
  params?: R,
  config: Config = {},
  done?: () => void
) {
  const { initState, ...responseConfig } = config
  const data = ref<T>(initState as any)

  const {
    loading,
    error,
    cancel,
    run: _run
  } = useRun<ResponseData<T>, R>(api, params, responseConfig, done)

  const run = async (pms?: R, conf: Recordable = {}) => {
    const res = await _run(pms, conf)
    if (res && res.code === 1) {
      data.value = res.data as UnwrapRef<T>
      return res
    }
    message.error(res?.msg || 'Request error')
    throw new Error(res?.msg)
  }
  return {
    data,
    loading,
    error,
    cancel,
    run
  }
}

export const useMountedRequest = <T = unknown, R = unknown>(
  api: (params: R, config?: RequestConfig) => Promise<ResponseData<T>>,
  params?: R,
  config: Config = {}
) => {
  const result = useRequest<T, R>(api, params, config)

  onMounted(() => {
    result.run(params)
  })

  return result
}

/**
 * 用于分页数据查询
 */
export const useRequestByPage = <T = unknown, R = unknown>(
  api: (params: R, config?: RequestConfig) => Promise<PageResponse<T>>,
  params?: R,
  config: Config = {},
  done?: () => void
) => {
  const { current = 1, pageSize = 10, isMounted = true, ...conf } = config

  const pagination = reactive<PaginationType>({
    current: current,
    pageSize: pageSize,
    total: 0
  })

  const data = ref<T[]>([])

  const requestParams = {
    pageSize: pagination.pageSize,
    page: pagination.current,
    ...params
  } as unknown as R

  const {
    loading,
    error,
    cancel,
    run: _run
  } = useRun<PageResponse<T>, R>(api, requestParams, conf, done)

  const run = async (pms?: R, conf: Recordable = {}) => {
    const res = await _run(pms, conf)
    if (res && res.code === 1) {
      data.value = res.data.data as any
      pagination.total = res.data.total
      return res
    }

    throw new Error(res?.msg)
  }

  const reload = () =>
    run({
      ...requestParams,
      page: pagination.current,
      pageSize: pagination.pageSize
    } as unknown as R)

  type OnPageChange = (params: any) => void
  let onPageChange: OnPageChange = (value: PaginationType) => {
    Object.assign(pagination, value)
    run({
      ...requestParams,
      page: pagination.current,
      pageSize: pagination.pageSize
    })
  }

  const search = (params: R) => {
    console.log('--cancel--', cancel.value)
    cancel.value?.()
    Object.assign(requestParams as Recordable, params)
    pagination.pageSize = pageSize
    pagination.current = current

    return run(
      {
        ...requestParams,
        page: pagination.current,
        pageSize: pagination.pageSize
      } as unknown as R,
      config
    )
  }

  onMounted(() => {
    isMounted && run(requestParams)
  })

  /*  watchEffect((invalid) => {
    run({
      ...requestParams,
      pageSize: pagination.pageSize,
      page: pagination.current
    } as unknown as R)
    invalid(() => {
      cancel.value?.()
    })
  }) */

  return {
    loading,
    error,
    pagination,
    run,
    search,
    reload,
    data,
    onPageChange
  }
}
