import http from '@/utils/http'

export interface AuthParams {
  // 认证类型 primary：初级认证senior：高级认证
  tab: 'primary' | 'senior'
  // 初级认证类型 初级证件类型:0=身份证,1=护照,2=驾驶证
  primary_type: '0' | '1' | '2'
  // 姓名
  primary_name: string
  // 证件号码
  primary_number: string
  // 高级认证 - 证件正面照片
  senior_front: string
  // 高级认证 - 证件背面照片
  senior_back: string
  // 高级认证 - 手持证件照片
  senior_hand: string
}
// 提交认证
export const submitAuthApi = (data: Partial<AuthParams>): ApiResult<any> => {
  return http.post({
    url: '/user/submitAuthentication',
    data
  })
}

// 获取用户认证
export const getAuth = () => {
  return http.get({
    url: '/user/getAuthentication'
  })
}

export interface UserInfo {
  avatar: string
  credit_score: number
  email: string
  id: number
  // 初级认证 0-审核中 1-已审核 2-已拒绝
  is_primary: 0 | 1 | 2
  // 高级认证 0-审核中 1-已审核 2-已拒绝
  is_senior: 0 | 1 | 2
  // 是否已设置了支付密码 1-已设置 0-未设置
  isSetPwd: 1 | 0
  join_time: number
  last_login_ip: string
  last_login_time: number
  money: string
  nickname: string
  refresh_token: string
  token: string
  username: string
  vip: number
}
// 获取用户信息
export const getUserInfoApi = (): ApiResult<UserInfo> => {
  return http.get({
    url: '/user/getUserInfo'
  })
}

/* 设置资金密码 */
export const setSecurityPasswordApi = (
  security_password: string
): ApiResult<any> => {
  return http.post({
    url: '/user/setSecurityPassword',
    data: {
      security_password
    }
  })
}

/* 修改资金密码 */
export interface AlterSecurityPasswordParams {
  origin_security_password: string
  new_security_password: string
}
export const alterSecurityPasswordApi = (
  data: AlterSecurityPasswordParams
): ApiResult<any> => {
  return http.post({
    url: '/user/changeSecurityPassword',
    data
  })
}

/* 修改登录密码 */
export interface AlterasswordParams {
  origin_password: string
  new_password: string
}
export const alterPassword = (data: AlterasswordParams): ApiResult<any> => {
  return http.post({
    url: '/user/changePassword',
    data
  })
}
