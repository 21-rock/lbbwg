<script lang="ts" setup>
import { AlterasswordParams, alterPassword } from '@/api/user'
import { useUserStore } from '@/store'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormItem,
  Input,
  message
} from 'ant-design-vue'
import { RuleObject } from 'ant-design-vue/es/form'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { UnwrapRef } from 'vue'

// const router = useRouter()

interface FormState {
  origin_password: string
  new_password: string
  checkPass: string
}
const formRef = ref()
const formState: UnwrapRef<Partial<FormState>> = reactive({
  origin_password: undefined,
  new_password: undefined,
  checkPass: undefined
})

const userStore = useUserStore()

let validatePass = async (_rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password')
  } else {
    if (formState.checkPass !== '') {
      formRef.value!.validateFields('checkPass')
    }
    return Promise.resolve()
  }
}
let validatePass2 = async (_rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password again')
  } else if (value !== formState.new_password) {
    return Promise.reject("Two inputs don't match!")
  } else {
    return Promise.resolve()
  }
}

const rules: Record<string, RuleObject | RuleObject[]> = {
  origin_password: [
    { required: true, message: 'Please input the password', trigger: 'blur' }
  ],
  new_password: [{ required: true, validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }]
}

const handleFinish = async (values: FormState) => {
  console.log(values, formState)
  const data = {
    origin_password: formState.origin_password,
    new_password: formState.new_password
  } as AlterasswordParams
  const res = await alterPassword(data)
  if (res?.code === 1) {
    message.success('密码修改成功，需跳转到重新登录界面', 1.5, () => {
      // userStore.removeUserInfo()
      window.localStorage.clear()
      window.location.reload()
      // router.push('/login')
    })
  } else {
    message.error('新密码不能和原始密码相同')
  }
}
const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
  console.log(errors)
}
</script>

<template>
  <div class="w-[1200px] mx-auto pb-10 min-h-[calc(100vh-80px)]">
    <div class="py-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <router-link to="/person-center?activeKey=2">安全中心</router-link>
        </BreadcrumbItem>
        <BreadcrumbItem>修改密码</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <h3 class="pt-6 pb-12 text-xl font-bold">修改密码</h3>

    <div class="w-[520px]">
      <Form
        class="form-xl"
        :label-col="{ span: 24 }"
        ref="formRef"
        :model="formState"
        :rules="rules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <FormItem label="原密码" name="origin_password">
          <Input
            placeholder="请输入密码"
            type="password"
            v-model:value.trim="formState.origin_password"
          />
        </FormItem>
        <FormItem label="新密码" name="new_password">
          <Input
            placeholder="请输入不小于6位新登录密码"
            type="password"
            v-model:value.trim="formState.new_password"
          />
        </FormItem>
        <FormItem label="确认密码" name="checkPass">
          <Input
            placeholder="请再次输入确认密码"
            type="password"
            v-model:value.trim="formState.checkPass"
          />
        </FormItem>
        <FormItem>
          <Button
            class="btn w-[120px] h-[36px] rounded-[18px]"
            html-type="submit"
            :loading="userStore.setLoading"
            >确定</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>
