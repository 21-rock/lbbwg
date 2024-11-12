<script lang="ts" setup>
import { CloseOutlined } from '@ant-design/icons-vue'
import { Spin } from 'ant-design-vue'

interface Props {
  loading: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false
})

const open = defineModel({
  type: Boolean,
  default: false
})

const close = () => {
  open.value = false
}
watch(
  () => open.value,
  (cur) => {
    if (cur) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'inherit'
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <transition name="dialog-fade">
      <div v-if="open" class="dialog-overlay">
        <div
          class="absolute right-[30px] top-[80px] bottom-[30px] bg-white rounded-[8px] flex flex-col overflow-hidden"
        >
          <header class="relative w-full p-[20px]">
            <div
              v-if="$slots.prefix"
              class="absolute left-[20px] top-[50%] translate-y-[-50%]"
            >
              <slot name="prefix"></slot>
            </div>
            <p class="text-base font-bold text-center text-black">通知中心</p>
            <CloseOutlined
              class="absolute right-[20px] top-[50%] translate-y-[-50%] text-base text-black font-bold"
              @click="close"
            />
          </header>
          <div class="flex-1 w-full min-h-0 overflow-y-hidden">
            <Spin :spinning="loading" class="h-full" style="height: 100%">
              <div class="h-full px-[20px] pb-[30px] overflow-y-auto">
                <slot></slot>
              </div>
            </Spin>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.dialog-overlay {
  position: fixed;
  z-index: 999;
  background-color: rgb(0 0 0 / 60%);
  inset: 0;

  :deep(.ant-spin-nested-loading),
  :deep(.ant-spin-container) {
    height: 100%;
  }
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.5s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
