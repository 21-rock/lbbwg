<script setup lang="ts">
import { VNode, isVNode } from 'vue'

const props = defineProps<{
  node: VNode
}>()

const Cont = () => {
  return isVNode(props.node) ? '12313' : props.node
}
</script>

<template>
  <div>
    <Cont />
  </div>
</template>
