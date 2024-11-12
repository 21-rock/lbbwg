<script setup lang="ts">
import { useOption } from '@/hooks'
import { StarFilled, StarOutlined } from '@ant-design/icons-vue'

interface Props {
  currency: string
}
const props = defineProps<Props>()

const { isOptional, getIsOptional, switchOptional } = useOption()

watch(
  () => props.currency,
  (c) => {
    getIsOptional(c)
  }
)

onMounted(() => {
  getIsOptional(props.currency)
})
</script>

<template>
  <StarFilled
    v-if="isOptional"
    class="text-2xl block text-[#f6c54d] cursor-pointer"
    @click="switchOptional(currency)"
  />
  <StarOutlined
    v-else
    class="block text-white"
    @click="switchOptional(currency)"
  />
</template>
