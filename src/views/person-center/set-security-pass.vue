<script lang="ts" setup>
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
interface FormState {
  pass: string
  checkPass: string
}

const formRef = ref()
const formState: UnwrapRef<FormState> = reactive({
  pass: '',
  checkPass: ''
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
  } else if (value !== formState.pass) {
    return Promise.reject("Two inputs don't match!")
  } else {
    return Promise.resolve()
  }
}

const rules: Record<string, RuleObject | RuleObject[]> = {
  pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }]
}

const handleFinish = (values: FormState) => {
  console.log(values, formState)
  userStore.setSecurityPassword(formState.pass)
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
        <BreadcrumbItem>设置资金密码</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <h3 class="pt-6 pb-12 text-xl font-bold">设置资金密码</h3>

    <div class="w-[520px]">
      <Form
        size="large"
        :label-col="{ span: 24 }"
        ref="formRef"
        :model="formState"
        :rules="rules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <FormItem label="资金密码" name="pass">
          <Input
            placeholder="请输入确认密码"
            type="password"
            v-model:value.trim="formState.pass"
          />
        </FormItem>
        <FormItem label="确认密码" name="checkPass">
          <Input
            placeholder="请输入确认密码"
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
