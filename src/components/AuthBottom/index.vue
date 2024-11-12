<script setup lang="ts">
import { useInjectIsLogin } from '@/hooks/useIsLogin'
import { Button } from 'ant-design-vue'
const emit = defineEmits<{
  (e: 'click'): void
}>()
const router = useRouter()
const isLogin = useInjectIsLogin()
const onClick = () => {
  if (isLogin.value) {
    emit('click')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <Button v-bind="$attrs" @click="onClick">
    <template v-if="!isLogin">去登录</template>
    <template v-else><slot name="default"></slot></template>
  </Button>
</template>
