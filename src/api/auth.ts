import http from '@/utils/http'
import { UserInfo } from './user'

export interface SignInParams {
  email: string
  password: string
}
// 登录账号
export const signInApi = (
  data: SignInParams
): Promise<ResponseData<UserInfo>> => {
  return http.post({
    url: '/user/checkIn',
    data: {
      ...data,
      tab: 'login',
      keep: true
    }
  })
}

interface SignUpParams {
  email: string
  password: string
  captcha: string
  invite_code: string
}
// 注册账号
export const signUpApi = (data: SignUpParams) => {
  return http.post({
    url: '/user/checkIn',
    data: {
      ...data,
      tab: 'register',
      keep: true
    }
  })
}

// 发送邮箱验证码
export const sendCode = (email: string) => {
  return http.post({
    url: '/ems/send',
    data: {
      email,
      event: 'user_register'
    }
  })
}
