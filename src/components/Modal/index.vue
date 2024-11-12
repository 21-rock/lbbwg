<script setup lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue'
import { Modal as AntModal, Button, ModalProps } from 'ant-design-vue'

interface Props extends ModalProps {
  title?: string
  loading?: boolean
  confirmLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const modalRef = ref<InstanceType<typeof AntModal>>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const onOk = (e: MouseEvent) => {
  emit('submit')
  modalRef.value!.onOk?.(e)
}

const onClose = (e: MouseEvent) => {
  modalRef.value!.onCancel?.(e)
}
</script>

<template>
  <AntModal ref="modalRef" v-bind="props">
    <template #title>
      <h3 class="text-xl font-bold">
        <slot name="title">{{ title }}</slot>
      </h3>
    </template>
    <template #closeIcon>
      <CloseOutlined class="text-xl font-bold text-black" @click="onClose" />
    </template>
    <div>
      <slot name="default"></slot>
    </div>
    <template #footer>
      <div class="flex justify-end gap-5">
        <span
          class="px-[16px] h-[30px] leading-[28px] border-[1px] border-[#000] rounded-[15px] cursor-pointer"
          @click="onClose"
        >
          取消
        </span>
        <Button
          class="btn px-[16px] h-[30px] leading-[30px] rounded-[15px]"
          :loading="loading || confirmLoading"
          @click="onOk"
        >
          确认
        </Button>
      </div>
    </template>
  </AntModal>
</template>
