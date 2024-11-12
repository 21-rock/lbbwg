<script lang="ts" setup>
import {
  addWalletAddressApi,
  AddWalletAddressParams,
  WithdrawCoinType
} from '@/api/wallet'
import { Modal, MyUpload } from '@/components'
import { PlusOutlined } from '@ant-design/icons-vue'
import {
  Form,
  FormItem,
  Input,
  message,
  Select,
  SelectOption
} from 'ant-design-vue'
import { FormInstance, RuleObject } from 'ant-design-vue/es/form'
import { UnwrapRef } from 'vue'
type FormState = Partial<AddWalletAddressParams>

interface Props {
  coinList: WithdrawCoinType[]
}
const props = withDefaults(defineProps<Props>(), {
  coinList: () => []
})

const emit = defineEmits<{
  (e: 'success'): void
}>()

const loading = ref(false)
const formRef = ref<FormInstance>()
const formState: UnwrapRef<FormState> = reactive({
  currency: undefined,
  currency_network: undefined,
  currency_address: undefined,
  currency_qr: ''
})
const netList = computed(() => {
  const res = props.coinList.find(
    (item) => item.currency === formState.currency
  )
  return res ? res.currency_network : []
})

const rules: Record<string, RuleObject | RuleObject[]> = {
  currency: [
    {
      required: true,
      message: '币种不能为空',
      trigger: 'change'
    }
  ],
  currency_network: [
    {
      required: true,
      message: '网络不能为空',
      trigger: 'blur'
    }
  ],
  currency_address: [
    { required: true, message: '地址不能为空', trigger: 'blur' }
  ]
}

watch(
  () => formState.currency,
  () => {
    formState.currency_network = ''
  }
)

const handleSubmit = async () => {
  loading.value = true
  try {
    const values =
      (await formRef.value!.validateFields()) as AddWalletAddressParams
    const res = await addWalletAddressApi(values)
    if (res.code === 1) {
      message.success('添加成功', 1.5, () => {
        emit('success')
      })
    } else {
      message.success(res.msg)
    }
  } catch (error) {
    console.log('error', error)
  }
  loading.value = false
}
</script>

<template>
  <Modal
    title="添加地址"
    v-bind="$attrs"
    :width="600"
    :loading="loading"
    @submit="handleSubmit"
  >
    <div class="pb-3">
      <Form
        size="large"
        :label-col="{
          style: {
            width: '100px'
          }
        }"
        ref="formRef"
        :model="formState"
        :rules="rules"
      >
        <FormItem label="币种" name="currency">
          <Select v-model:value="formState.currency" placeholder="请选择">
            <SelectOption
              v-for="item in coinList"
              :key="item.id"
              :value="item.currency"
            >
              {{ item.currency }}
            </SelectOption>
          </Select>
        </FormItem>
        <FormItem label="网络(选填)" name="currency_network">
          <Select
            v-model:value="formState.currency_network"
            placeholder="请选择"
          >
            <SelectOption
              v-for="item in netList"
              :key="item.key"
              :value="item.value"
            >
              {{ item.value }}
            </SelectOption>
          </Select>
        </FormItem>
        <FormItem label="提币地址" name="currency_address">
          <Input
            placeholder="请输入"
            v-model:value="formState.currency_address"
          />
        </FormItem>
        <FormItem label="货币二维码" name="primary_name">
          <MyUpload
            class="block w-[257px] upload-wrapper"
            :show-upload-list="false"
            v-model:value="formState.currency_qr"
          >
            <div
              class="w-[148px] h-[148px] bg-gray-100 rounded-[8px] overflow-hidden cursor-pointer"
            >
              <img
                v-if="formState.currency_qr"
                :src="formState.currency_qr"
                class="object-cover w-full h-full"
              />
              <div
                v-else
                class="flex items-center justify-center w-full h-full border border-gray-300 border-dashed"
              >
                <PlusOutlined class="text-4xl text-gray-300"></PlusOutlined>
              </div>
            </div>
          </MyUpload>
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>

<style lang="scss"></style>
