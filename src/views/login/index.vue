<script setup lang="ts">
import { SignInParams } from '@/api/auth'
import { getImageUrl } from '@/assets'
import useAuthStore from '@/store/authStore'
import { CloseOutlined } from '@ant-design/icons-vue'
import {
  Divider,
  Form,
  FormItem,
  Input,
  InputPassword,
  Spin
} from 'ant-design-vue'
import { RouterLink } from 'vue-router'

const imgUrl = getImageUrl('login-1.png')

const formState = reactive<SignInParams>({
  email: process.env.NODE_ENV === 'development' ? '123456@gmail.com' : '',
  password: process.env.NODE_ENV === 'development' ? '123456' : ''
})
const { loading, login } = useAuthStore()

const onFinish = async (values: SignInParams) => {
  login(values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const onClear = (prop: keyof SignInParams) => {
  formState[prop] = ''
}
</script>

<template>
  <div class="flex w-full h-full login-container container-full">
    <div
      class="w-[39%] h-full flex justify-center items-center max-md:hidden bg-black"
    >
      <div
        class="w-[421px] h-[601px]"
        :style="{
          background: `url(${imgUrl}) center no-repeat`,
          backgroundSize: '421px auto'
        }"
      >
        <div class="w-[420px] mx-auto">
          <h3 class="pl-8 text-4xl font-bold">
            <span class="hello-title"> 欢迎来到UZX </span>
          </h3>
          <p class="pl-8 mt-3 text-2xl text-gray-400">开启全新交易之旅</p>
        </div>
      </div>
    </div>
    <div
      class="w-[61%] bg-white flex justify-center items-center max-md:w-full max-md:items-start"
    >
      <Spin :spinning="loading">
        <div class="w-[490px] max-md:w-[92%] max-md:pt-12">
          <h1 class="mb-12 text-4xl font-bold text-center">登录</h1>
          <Form
            layout="vertical"
            class="login-form-wrapper form-xl form-light"
            :model="formState"
            name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <FormItem
              name="email"
              :rules="[{ required: true, message: 'Please input your email!' }]"
            >
              <Input placeholder="请输入邮箱" v-model:value="formState.email">
                <template #suffix>
                  <CloseOutlined
                    class="cursor-pointer bb"
                    @click="onClear('email')"
                  />
                </template>
              </Input>
            </FormItem>
            <FormItem
              class="mt-10"
              name="password"
              :rules="[
                { required: true, message: 'Please input your password!' }
              ]"
            >
              <InputPassword
                v-model:value="formState.password"
                type="password"
                placeholder="请输入密码"
              />
              <RouterLink to="/" class="link absolute right-0 bottom-[-22px]"
                >忘记密码</RouterLink
              >
            </FormItem>
            <div class="flex justify-center mt-14">
              <div>
                <button
                  html-type="submit"
                  class="block submit-btn w-60 h-10 leading-10 rounded-[5rem] text-[16px] text-black text-center border-0"
                >
                  登录
                </button>
                <span class="block mt-4 text-xs text-center text-gray-500">
                  没有账号
                  <Divider type="vertical" class="w-2[px] bg-gray-500" />
                  <RouterLink to="/register" class="link">去注册</RouterLink>
                </span>
              </div>
            </div>
          </Form>
        </div>
      </Spin>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hello-title {
  background-clip: text;
  background-image: linear-gradient(90deg, #1fa2ff 0, #12d8fa 55.21%, #a6ffcb);
  color: transparent;
}

.submit-btn {
  background-image: linear-gradient(90deg, #1fa2ff 0, #12d8fa 55.21%, #a6ffcb);
}
</style>

<style lang="scss"></style>
