import { message } from 'ant-design-vue'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from './auth'
import { getLocale } from './locale'

export interface ResponseResult<T = unknown> {
  code: number
  data: T
  msg: string
}

interface PendingTask {
  config: AxiosRequestConfig
  resolve: (value: unknown) => void
  reject: (reason?: any) => void
}

export type RequestConfig = Recordable

const setHeaderTOken = (config: AxiosRequestConfig, token: string | null) => {
  if (token && config.headers) {
    // 请求头token信息，请根据实际情况进行修改
    // config.headers['Authorization'] = `Bearer ${token}`
    config.headers['ba-user-token'] = token
  }
}

class HttpRequest {
  public baseURL = import.meta.env.VITE_BASE_API ?? '/'
  public timeout = 5000
  public refreshing = false
  public queue: Record<string, PendingTask[]> = {}

  public init(options: AxiosRequestConfig) {
    const instance = axios.create()

    options = this.mergeOptions(options)

    this.setInterceptors(instance)

    return instance(options)
  }

  // 拦截器
  setInterceptors(instance: AxiosInstance) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        const token = getToken()
        if (token && config.headers) {
          setHeaderTOken(config, token)
          const lang = getLocale()
          config.headers['lang'] = lang
          config.headers['server'] = 1
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse<ResponseResult>) => {
        // const { code } = res.data
        // if (code !== 0) {
        //   return Promise.reject(res)
        // }
        if (res.data.code === 302) {
          message.warn(res.data.msg, 1.5, () => {
            localStorage.clear()
            window.location.reload()
          })
        }
        return res
      },
      (error) => {
        console.log('---2222222----', error)
        // 处理 422 或者 500 的错误异常提示
        const errMsg = error?.response?.data?.message ?? '未知错误，请重试'
        if (error.code === 'ERR_CANCELED') {
          return Promise.reject(error)
        }
        message.error(errMsg)
        error.message = errMsg
        return Promise.reject(error)
      }
    )
  }
  mergeOptions(options: AxiosRequestConfig) {
    return Object.assign(
      {
        baseURL: this.baseURL,
        timeout: this.timeout
      },
      {
        ...options
      }
    )
  }

  public async request<T = unknown>(
    options: AxiosRequestConfig,
    config: RequestConfig = {}
  ) {
    try {
      const res = await this.init({ ...options, ...config })

      // return res.data as ResponseResult<T> // 真实接口中，你可能会用到这个
      return res.data as T
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public get<T = any>(options: AxiosRequestConfig, config?: RequestConfig) {
    return this.request<T>(
      {
        method: 'GET',
        ...options
      },
      config
    )
  }
  public post<T = any>(options: AxiosRequestConfig, config?: RequestConfig) {
    return this.request<T>(
      {
        method: 'POST',
        ...options
      },
      config
    )
  }
  public put<T = any>(options: AxiosRequestConfig, config?: RequestConfig) {
    return this.request<T>(
      {
        method: 'PUT',
        ...options
      },
      config
    )
  }
  public patch<T = any>(options: AxiosRequestConfig, config?: RequestConfig) {
    return this.request<T>(
      {
        method: 'PATCH',
        ...options
      },
      config
    )
  }
  public delete<T = any>(options: AxiosRequestConfig, config?: RequestConfig) {
    return this.request<T>(
      {
        method: 'DELETE',
        ...options
      },
      config
    )
  }
}

export default new HttpRequest()
