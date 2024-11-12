<script setup lang="ts">
import { sendCode } from '@/api/auth'
import { useRequest } from '@/hooks/useRequest'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { message, Space } from 'ant-design-vue'

const props = defineProps({
  email: String
})

const { loading, run } = useRequest(sendCode)
let timer: any = null
let second = 60
const text = ref('发送验证码')
const sendClick = async () => {
  if (timer) {
    return
  }
  if (!props.email) {
    message.warning('请输入邮箱')
    return
  }
  const res = await run(props.email)
  if (res.code === 1) {
    message.success('发送成功，十分钟后过期')
  }
  text.value = `重新发送 (${second})`
  second--
  timer = setInterval(() => {
    if (second <= 0) {
      clearInterval(timer)
      timer = null
      text.value = `发送验证码`
      return
    }
    text.value = `重新发送 (${second})`
    second--
  }, 1000)
}
</script>

<template>
  <span class="text-[#0075ff] cursor-pointer" @click="sendClick">
    <Space>
      <span>{{ text }} </span>
      <LoadingOutlined v-if="loading" fill="#0075ff" />
    </Space>
  </span>
</template>
