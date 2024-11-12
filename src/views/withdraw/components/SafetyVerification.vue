<script setup lang="ts">
import { Modal } from '@/components'
import { Form, FormInstance, FormItem, InputPassword } from 'ant-design-vue'
interface FormState {
  password: string
}
interface Props {}

const emit = defineEmits<{
  (e: 'submit', v: FormState): void
}>()

defineProps<Props>()
const open = defineModel('open', {
  type: Boolean as PropType<boolean>,
  default: false
})

const formRef = ref<FormInstance>()

const formState = ref<FormState>({} as FormState)

const onOk = () => {
  formRef.value!.validateFields().then(() => {
    emit('submit', formState.value)
  })
}

watch(
  () => open.value,
  () => {
    formState.value = {} as FormState
  },
  { flush: 'post' }
)
</script>

<template>
  <Modal v-model:open="open" title="安全校验" @submit="onOk">
    <div class="py-[20px]">
      <Form
        ref="formRef"
        :model="formState"
        :label-col="{ span: 24 }"
        class="form-xl"
      >
        <FormItem
          ref="formRef"
          label="资金密码"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <InputPassword
            v-model:value="formState.password"
            placeholder="请输入"
          />
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>
