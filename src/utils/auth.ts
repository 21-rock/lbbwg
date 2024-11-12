// import Cookies from 'js-cookie'

import { UserInfo } from '@/api/auth'

const key = 'USER_INFO'

export const setUserInfoCache = (userInfo: UserInfo) => {
  const str = JSON.stringify(userInfo)
  return localStorage.setItem(key, str)
}

export function getUserInfoFromCache() {
  const res = localStorage.getItem(key)
  if (res) {
    return JSON.parse(res) as UserInfo
  }
  return undefined
}

export function removeUserInfoCache() {
  return localStorage.removeItem(key)
}

const AccessTokenKey = 'ACCESS-Token'
const RefreshTokenKey = 'REFRESH-Token'

export function getToken() {
  return localStorage.getItem(AccessTokenKey) || undefined
}

export function setToken(token: string) {
  return localStorage.setItem(AccessTokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(AccessTokenKey)
}

export function getReToken() {
  return localStorage.getItem(RefreshTokenKey) || undefined
}

export function setReToken(token: string) {
  return localStorage.setItem(RefreshTokenKey, token)
}

export function removeReToken() {
  return localStorage.removeItem(RefreshTokenKey)
}
