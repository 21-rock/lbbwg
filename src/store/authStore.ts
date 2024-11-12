import { signInApi, SignInParams } from '@/api/auth'
import { defineStore } from 'pinia'
import useUserStore from './userStore'
import { message } from 'ant-design-vue'
import { useRequest } from '@/hooks/useRequest'

const useAuthStore = defineStore('authStore', () => {
  const { setTokenValue } = useUserStore()
  const router = useRouter()
  const route = useRoute()

  const { loading, run } = useRequest(signInApi)

  // 登录
  const login = async (data: SignInParams) => {
    if (loading.value) {
      return
    }
    loading.value = true
    message.loading('正在登录，请稍等...')
    try {
      const res = await run(data)
      message.destroy()
      setTokenValue(res.data)
      message.success(res.msg, 1.5, () => {
        const redirect = route.query.redirect || '/'
        router.push({
          path: redirect as string,
          replace: true
        })
      })
    } catch (error) {
      console.log('login error', error)
    }
    loading.value = false
  }

  // 退出登录
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return {
    loading,
    logout,
    login
  }
})

export default useAuthStore
