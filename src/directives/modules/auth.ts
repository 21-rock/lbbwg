/**
 * v-auth
 * 按钮权限指令
 */
import { useUserStore } from '@/store'
import type { Directive, DirectiveBinding } from 'vue'

/* export const auth: Directive = {
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    console.log('我这', value)
    const authStore = useAuthStore()
    const isLogin = !!authStore.userInfo
    if (isLogin !== value) {
      el.remove()
    }
  }
} */

export const auth: Directive = (el: HTMLElement, binding: DirectiveBinding) => {
  const { value } = binding
  console.log('我这', value)
  const userStore = useUserStore()
  const isLogin = userStore.isLogin
  if (isLogin !== value) {
    el.remove()
  }
}
