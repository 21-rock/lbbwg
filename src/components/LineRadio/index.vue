<script setup lang="ts">
interface Props {
  options: Array<{ label: string; value: string | number }>
}
defineProps<Props>()
const avtive = defineModel()

const onChange = (value: string | number) => {
  avtive.value = value
}
</script>

<template>
  <ul class="flex gap-5 line-radio">
    <li
      v-for="item in options"
      :key="item.value"
      @click="onChange(item.value)"
      :class="avtive === item.value ? 'radio-item active' : 'radio-item'"
    >
      {{ item.label }}
      <span class="line" v-if="avtive === item.value"></span>
    </li>
  </ul>
</template>

<style lang="scss">
.line-radio {
  .radio-item {
    position: relative;
    font-size: 16px;
    line-height: 32px;
    cursor: pointer;

    &.active {
      font-weight: bold;
    }
  }

  .line {
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #000;
  }
}
</style>
