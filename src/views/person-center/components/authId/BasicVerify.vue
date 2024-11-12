<script lang="ts" setup>
import { AuthParams, submitAuthApi } from '@/api/user'
import router from '@/router'
import { Form, FormItem, Input, message, Select } from 'ant-design-vue'
import { RuleObject } from 'ant-design-vue/es/form'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { UnwrapRef } from 'vue'
interface FormState {
  name: string
  idNo: string
}

const formRef = ref()
const formState: UnwrapRef<
  Pick<AuthParams, 'tab' | 'primary_type' | 'primary_name' | 'primary_number'>
> = reactive({
  tab: 'primary',
  primary_type: '0',
  primary_name: '',
  primary_number: ''
})

const options = [
  {
    value: '0',
    label: '身份证'
  },
  {
    value: '1',
    label: '护照'
  },
  {
    value: '2',
    label: '驾驶证'
  }
]

const rules: Record<string, RuleObject | RuleObject[]> = {
  primary_type: [
    {
      required: true,
      message: '证件类型不能为空',
      trigger: 'blur'
    }
  ],
  primary_name: [
    {
      required: true,
      message: '姓名不能为空',
      trigger: 'blur'
    }
  ],
  primary_number: [
    { required: true, message: '证件号码不能为空', trigger: 'blur' }
  ]
}

const handleFinish = (values: FormState) => {
  console.log(values, formState)
  submitAuthApi(toRaw(formState)).then((res) => {
    console.log(2222, res)
    if (res.code === 1) {
      message.success('提交成功，请耐心等侯审核', 1.5, () => {
        router.back()
      })
    } else {
      message.error(res.msg)
    }
  })
}
const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
  console.log(errors)
}
</script>

<template>
  <div class="w-[1200px] mx-auto pb-10">
    <h3 class="pt-6 pb-12 text-3xl font-bold text-white">基础认证</h3>

    <div class="border border-[#313131] p-10 rounded-[8px]">
      <p class="mb-5 text-sm text-gray-400">
        UZX会严格对个人信息进行加密保护，以保障用户隐私和安全。请您放心，个人信息只会用于认证用户身份，从而为用户提供更佳服务，绝不会对外分享或用于任何其他用途。
      </p>
      <Form
        class="basic-verify-container"
        size="large"
        :label-col="{ span: 24 }"
        ref="formRef"
        :model="formState"
        :rules="rules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <FormItem label="证件类型" name="primary_type">
          <Select
            :options="options"
            v-model:value="formState.primary_type"
            placeholder="请选择"
          ></Select>
        </FormItem>
        <FormItem label="姓名" name="primary_name">
          <Input placeholder="请输入" v-model:value="formState.primary_name" />
        </FormItem>
        <FormItem label="证件号码" name="primary_number">
          <Input
            placeholder="请输入证件号码"
            v-model:value="formState.primary_number"
          >
          </Input>
        </FormItem>
        <FormItem>
          <button class="btn w-[100%] h-[40px] rounded-[20px]">提交审核</button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<style lang="scss">
.basic-verify-container {
  width: 400px;

  .ant-form-item {
    label {
      color: #fff !important;
    }
  }

  .ant-input {
    height: 48px;
    border: none;
    border-radius: 4px;
    background-color: rgb(52 52 52 / 40%);
    color: #fff;

    &::placeholder {
      color: #939393; /* 灰色的placeholder文本 */
    }
  }

  .ant-select {
    .ant-select-selector {
      height: 48px !important;
      border: none;
      border-radius: 4px;
      background-color: rgb(52 52 52 / 40%);
      color: #fff;

      .ant-select-selection-item {
        line-height: 48px;
      }
    }

    .ant-select-arrow {
      color: #fff;
    }
  }
}
</style>
