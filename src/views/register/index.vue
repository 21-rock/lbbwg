<script setup lang="ts">
import { getImageUrl } from '@/assets'
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import {
  Checkbox,
  Divider,
  Form,
  FormItem,
  Input,
  InputPassword,
  message,
  Space,
  Spin
} from 'ant-design-vue'
import { RouterLink } from 'vue-router'
import { useInvite } from './hook'
import { signUpApi } from '@/api/auth'
import { Rule } from 'ant-design-vue/es/form'
import { SmsBtn } from '@/components'
import { useRequest } from '@/hooks/useRequest'

const imgUrl = getImageUrl('login-1.png')
const route = useRoute()

interface FormState {
  email: string
  password: string
  confirmPassword: string
  captcha: string
  invite_code: string
}
const formState = reactive<FormState>({
  email: route.query.email as string,
  password: '',
  confirmPassword: '',
  captcha: process.env.NODE_ENV === 'development' ? '4561' : '',
  invite_code: ''
})

const router = useRouter()
const checked = ref(false)
const { inviteVisible, toggleInviteVisible } = useInvite()
const { run, loading } = useRequest(signUpApi)

const onFinish = (values: any) => {
  console.log('Success:', values)
  if (!checked.value) {
    message.error('请点击同意')
    return
  }
  run({
    email: values.email,
    password: values.password,
    captcha: values.captcha,
    invite_code: values.invite_code
  }).then((res) => {
    if (res.code === 1) {
      console.log('res', res)
      message.success('注册成功', 1.5, () => {
        router.push('/login')
      })
    }
  })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const onClear = (prop: keyof FormState) => {
  formState[prop] = ''
}

const checkConfirmPass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password again')
  } else if (value !== formState.password) {
    return Promise.reject("Two inputs don't match!")
  } else {
    return Promise.resolve()
  }
}

// max-md:hidden
// hidden max-md:block
</script>

<template>
  <div class="relative w-full h-full login-container container-full">
    <div
      class="w-[39%] h-full absolute left-0 top-0 bottom-0 bg-black flex justify-center items-center max-md:hidden"
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
      class="w-[61%] h-full absolute right-0 top-0 overflow-auto bg-white max-md:w-full"
    >
      <Spin :spinning="loading">
        <div>
          <div class="w-[490px] py-10 max-md:w-[92%] mx-auto">
            <h1 class="mb-12 text-4xl font-bold text-center">注册</h1>
            <Form
              layout="vertical"
              class="register-form-wrapper form-light"
              :model="formState"
              name="basic"
              autocomplete="off"
              hideRequiredMark
              size="large"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <FormItem
                label="邮箱"
                name="email"
                :rules="[
                  {
                    required: true,
                    message: 'Please input your email!'
                  },
                  {
                    type: 'email',
                    message: '输入正确的邮箱'
                  }
                ]"
              >
                <Input placeholder="邮箱地址" v-model:value="formState.email">
                  <template #suffix>
                    <CloseOutlined
                      class="cursor-pointer bb"
                      @click="onClear('email')"
                    />
                  </template>
                </Input>
              </FormItem>
              <FormItem
                label="邮箱验证码"
                name="captcha"
                :rules="[
                  {
                    required: true,
                    message: 'Please input your captcha!'
                  }
                ]"
              >
                <Input
                  placeholder="短信验证码"
                  v-model:value="formState.captcha"
                >
                  <template #suffix>
                    <SmsBtn :email="formState.email" />
                  </template>
                </Input>
              </FormItem>
              <FormItem
                label="新登录密码"
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
              </FormItem>
              <FormItem
                label="确认新密码"
                name="confirmPassword"
                :rules="[
                  {
                    validator: checkConfirmPass
                  }
                ]"
              >
                <InputPassword
                  v-model:value="formState.confirmPassword"
                  type="password"
                  placeholder="请输入密码"
                />
              </FormItem>

              <FormItem
                :class="{
                  'hidden-content': !inviteVisible
                }"
              >
                <template #label>
                  <div
                    class="block cursor-pointer"
                    @click="toggleInviteVisible"
                  >
                    <Space>
                      <span class="text-xs align-middle">邀请码选填</span>
                      <DownOutlined
                        v-if="inviteVisible"
                        class="text-xs align-middle"
                      />
                      <UpOutlined v-else class="text-xs align-middle" />
                    </Space>
                  </div>
                </template>
                <Input
                  placeholder="填写邀请码"
                  v-model:value="formState.invite_code"
                >
                  <template #suffix>
                    <CloseOutlined
                      class="cursor-pointer bb"
                      @click="onClear('email')"
                    />
                  </template>
                </Input>
              </FormItem>
              <FormItem>
                <Space>
                  <Checkbox class="agree-checkbox" v-model:checked="checked">
                    <span class="text-gray-400">接受</span>
                  </Checkbox>
                  <RouterLink to="/agreement" class="link">用户协议</RouterLink>
                  <span>和</span>
                  <RouterLink to="/privacy" class="link">隐私政策</RouterLink>
                </Space>
              </FormItem>
              <div class="flex justify-center">
                <div>
                  <button
                    html-type="submit"
                    class="block submit-btn w-60 h-10 leading-10 rounded-[5rem] text-[16px] text-black text-center border-0"
                  >
                    注册
                  </button>
                  <span class="block mt-4 text-xs text-center text-gray-500">
                    已有账号
                    <Divider type="vertical" class="w-2[px] bg-gray-500" />
                    <RouterLink to="/login" class="link">去登录</RouterLink>
                  </span>
                </div>
              </div>
            </Form>
          </div>
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

<style lang="scss">
.register-form-wrapper {
  .hidden-content {
    .ant-form-item-control {
      display: none;
    }
  }

  .agree-checkbox {
    .ant-checkbox {
      border-radius: 100% !important;

      .ant-checkbox-inner {
        border-radius: 100% !important;
      }

      &::after {
        border-radius: 100% !important;
      }
    }
  }
}
</style>
