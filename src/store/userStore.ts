import {
  alterSecurityPasswordApi,
  AlterSecurityPasswordParams,
  getUserInfoApi,
  setSecurityPasswordApi,
  UserInfo
} from '@/api/user'
import { getReToken, getToken, setReToken, setToken } from '@/utils/auth'
import { message } from 'ant-design-vue'

import { defineStore } from 'pinia'

const useUserStore = defineStore(
  'userStore',
  () => {
    const userInfo = ref<UserInfo | undefined>()
    const token = ref<string | undefined>(getToken())
    const refreshToken = ref<string | undefined>(getReToken())
    const isLogin = computed(() => !!token.value)
    const route = useRoute()
    const router = useRouter()
    const setLoading = ref(false)

    const setUserInfo = (info: UserInfo) => {
      userInfo.value = info
      token.value = info.token
      refreshToken.value = info.refresh_token
      setToken(info.token)
      setReToken(info.refresh_token)
    }

    const setTokenValue = (info: UserInfo) => {
      token.value = info.token
      setToken(info.token)
    }

    const getUserInfo = async () => {
      try {
        const res = await getUserInfoApi()
        if (res.code === 1) {
          setUserInfo(res.data)
        }
      } catch (_error) {
        console.log(_error)
      }
    }

    const removeUserInfo = () => {
      userInfo.value = undefined
      window.localStorage.clear()
    }

    const setSecurityPassword = async (security_password: string) => {
      setLoading.value = true
      try {
        const res = await setSecurityPasswordApi(security_password)
        if (res.code === 1) {
          await getUserInfo()
          router.push((route.query.redirect as string) || '/person-center')
        } else {
          message.error(res.msg)
        }
      } catch (_error) {
        console.log(_error)
      }
      setLoading.value = false
    }

    const alterSecurityPassword = async (data: AlterSecurityPasswordParams) => {
      setLoading.value = true
      let res: ResponseData<any> | undefined = undefined
      try {
        res = await alterSecurityPasswordApi(data)
        if (res.code === 1) {
          await getUserInfo()
          router.push((route.query.redirect as string) || '/person-center')
        } else {
          message.error(res.msg)
        }
      } catch (_error) {
        console.log(_error)
      }
      setLoading.value = false
      return res as ResponseData<any>
    }

    return {
      userInfo,
      isLogin,
      token,
      refreshToken,
      setLoading,
      setUserInfo,
      getUserInfo,
      setTokenValue,
      setSecurityPassword,
      alterSecurityPassword,
      removeUserInfo
    }
  },
  {
    persist: true //开启数据持久化
  }
)

export default useUserStore
