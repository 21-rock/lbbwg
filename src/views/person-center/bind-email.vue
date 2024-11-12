<script lang="ts" setup>
import { SmsBtn } from '@/components'
import {
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input
} from 'ant-design-vue'
import { RuleObject } from 'ant-design-vue/es/form'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { UnwrapRef } from 'vue'
interface FormState {
  email: string
  code: string
}

const formRef = ref()
const formState: UnwrapRef<FormState> = reactive({
  email: '',
  code: ''
})

const rules: Record<string, RuleObject | RuleObject[]> = {
  email: [
    {
      required: true,
      type: 'email',
      message: '请输入正确的邮箱',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
}

const handleFinish = (values: FormState) => {
  console.log(values, formState)
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
        <BreadcrumbItem>绑定邮箱</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <h3 class="pt-6 pb-12 text-xl font-bold">绑定邮箱</h3>

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
        <FormItem label="邮箱" name="email">
          <Input placeholder="请输入邮箱号" v-model:value="formState.email" />
        </FormItem>
        <FormItem label="邮箱验证码" name="code">
          <Input placeholder="请输入邮箱验证码" v-model:value="formState.code">
            <template #suffix>
              <SmsBtn :email="formState.email" />
            </template>
          </Input>
        </FormItem>
        <FormItem>
          <button class="btn w-[78px] h-[36px] rounded-[18px]">确定</button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
