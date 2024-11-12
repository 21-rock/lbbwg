import { provide, inject } from 'vue'

const KEY = 'IS_LOGIN'

export const useProvideIsLogin = (value: Ref<boolean>) => {
  provide(KEY, value)
}

export const useInjectIsLogin = () => {
  const isLogin = inject(KEY)

  return isLogin as Ref<boolean>
}
