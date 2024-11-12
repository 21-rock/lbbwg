<script setup lang="ts">
import { addMiningOrderApi, MiningListItem } from '@/api/earn'
import { Modal } from '@/components'
import { useRequest } from '@/hooks/useRequest'
import {
  Form,
  FormInstance,
  FormItem,
  InputNumber,
  message
} from 'ant-design-vue'

const emit = defineEmits<{
  (e: 'success'): void
}>()

interface Props {
  orderInfo: MiningListItem
}
const props = defineProps<Props>()
const formRef = ref<FormInstance>()
const formState = reactive({
  money: undefined
})
const placeholder = computed(
  () => `最小数量${props.orderInfo.buy_min}~最大数量${props.orderInfo.buy_max}`
)

const { loading, run } = useRequest(addMiningOrderApi)

const handleOk = () => {
  formRef.value?.validateFields().then(() => {
    run({
      id: props.orderInfo.id,
      money: formState.money!
    }).then((res) => {
      if (res.code === 1) {
        message.success(res.msg)
        emit('success')
      }
    })
  })
}
</script>

<template>
  <Modal title="参与质押" v-bind="$attrs" :loading="loading" @submit="handleOk">
    <Form ref="formRef" :model="formState">
      <FormItem>
        <div class="flex items-center gap-2">
          <img
            src="//www.huajinzhenquan.net/storage/default/20231218/c9685fac-d3b9-432c7084b8bab2343b05cf02537bb1a1c2bdde6a2.jpg"
            class="w-[40px] h-[40px]"
            alt=""
          />
          <div>
            <h3 class="text-base font-bold">{{ orderInfo.name }}</h3>
            <p class="text-sm">
              <span>日利率{{ orderInfo.daily_income }}%</span>
              <span class="pl-3">周期{{ orderInfo.daily_income }}天</span>
            </p>
          </div>
        </div>
      </FormItem>
      <FormItem
        name="money"
        :rules="[
          {
            required: true,
            message: '数量不能为空',
            trigger: 'blur'
          }
        ]"
      >
        <InputNumber
          v-model:value="formState.money"
          class="w-full"
          size="large"
          :placeholder="placeholder"
          :min="orderInfo.buy_min"
          :max="orderInfo.buy_max"
          :controls="false"
          string-mode
        ></InputNumber>
      </FormItem>
    </Form>
  </Modal>
</template>
