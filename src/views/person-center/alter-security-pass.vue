<script lang="ts" setup>
import { AlterSecurityPasswordParams } from '@/api/user'
import { useUserStore } from '@/store'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormItem,
  Input
} from 'ant-design-vue'
import { RuleObject } from 'ant-design-vue/es/form'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { UnwrapRef } from 'vue'

const router = useRouter()

interface FormState {
  origin_security_password: string
  new_security_password: string
  checkPass: string
}
const formRef = ref()
const formState: UnwrapRef<Partial<FormState>> = reactive({
  origin_security_password: undefined,
  new_security_password: undefined,
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
  } else if (value !== formState.new_security_password) {
    return Promise.reject("Two inputs don't match!")
  } else {
    return Promise.resolve()
  }
}

const rules: Record<string, RuleObject | RuleObject[]> = {
  origin_security_password: [
    { required: true, message: 'Please input the password', trigger: 'blur' }
  ],
  new_security_password: [
    { required: true, validator: validatePass, trigger: 'blur' }
  ],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }]
}

const handleFinish = async (values: FormState) => {
  console.log(values, formState)
  const data = {
    origin_security_password: formState.origin_security_password,
    new_security_password: formState.new_security_password
  } as AlterSecurityPasswordParams
  const res = await userStore.alterSecurityPassword(data)
  if (res?.code === 1) {
    router.back()
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
        <BreadcrumbItem>修改资金密码</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <h3 class="pt-6 pb-12 text-xl font-bold">修改资金密码</h3>

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
        <FormItem label="原资金密码" name="origin_security_password">
          <Input
            placeholder="请输入确认密码"
            type="password"
            v-model:value.trim="formState.origin_security_password"
          />
        </FormItem>
        <FormItem label="新资金密码" name="new_security_password">
          <Input
            placeholder="请输入不小于6位新登录密码"
            type="password"
            v-model:value.trim="formState.new_security_password"
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
