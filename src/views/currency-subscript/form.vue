<script lang="ts" setup>
import {
  getSubscriptCurrencyListApi,
  subscriptCurrencyApi,
  SubscriptCurrencyParams
} from '@/api/currency'
import { SubscriptCurrencyStatusEnum } from '@/enums/currency'
import { useRequestByPage } from '@/hooks/useRequest'
import { Button, Form, FormItem, Input, message, Select } from 'ant-design-vue'
import { FormInstance, RuleObject } from 'ant-design-vue/es/form'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'

const route = useRoute()
type FormState = Partial<SubscriptCurrencyParams>
const formRef = ref<FormInstance>()
const formState = reactive<FormState>({
  id: route.query.id ? Number(route.query.id) : undefined,
  num: undefined
})

const rules: Record<string, RuleObject | RuleObject[]> = {
  id: [
    {
      required: true,
      message: '币种类型必选',
      trigger: 'blur'
    }
  ],
  num: [
    {
      required: true,
      message: '申购数量不能为空',
      trigger: 'blur'
    }
  ]
}

const { data } = useRequestByPage(
  getSubscriptCurrencyListApi,
  {
    status: SubscriptCurrencyStatusEnum.进行中
  },
  { pageSize: 100 }
)

const options = computed(() =>
  data.value.map((item) => ({
    label: item.name,
    value: item.id
  }))
)

const handleFinish = async (values: SubscriptCurrencyParams) => {
  console.log(values)
  try {
    const res = await subscriptCurrencyApi(values)
    if (res.code === 1) {
      message.success(res.msg, 1.5, () => {
        formRef.value?.resetFields()
      })
    } else {
      message.error(res.msg)
    }
  } catch (_error) {}
}
const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
  console.log(errors)
}
</script>

<template>
  <div class="bg-black min-h-[calc(100vh-80px)]">
    <div class="w-[1200px] mx-auto pb-10">
      <div class="flex items-center justify-between">
        <h3 class="pt-6 pb-12 text-3xl font-bold text-white">新币申购</h3>
        <RouterLink to="/manage?activeKey=2" class="text-base text-gray-300"
          >申购列表</RouterLink
        >
      </div>
      <div class="border border-[#313131] p-10 rounded-[8px]">
        <Form
          class="currency-subscript-form"
          size="large"
          :label-col="{ span: 24 }"
          ref="formRef"
          :model="formState"
          :rules="rules"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed"
        >
          <FormItem label="币种" name="id">
            <Select
              :options="options"
              v-model:value="formState.id"
              placeholder="请选择"
            ></Select>
          </FormItem>
          <FormItem label="数量" name="num">
            <Input placeholder="请输入" v-model:value="formState.num" />
          </FormItem>
          <FormItem>
            <Button
              html-type="submit"
              class="btn w-[100%] !h-[40px] !rounded-[20px]"
            >
              提交审核
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.currency-subscript-form {
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
    .ant-select-selector,
    .ant-select-selection-search-input {
      height: 48px !important;
      border: none;
      border-radius: 4px;
      background-color: rgb(52 52 52 / 40%);
      color: #fff;
      line-height: 48px !important;

      .ant-select-selection-item {
        line-height: 48px;
      }

      .ant-select-selection-placeholder {
        color: #939393 !important;
        line-height: 48px !important;
      }
    }

    .ant-select-arrow {
      color: #939393 !important;
    }
  }
}
</style>
