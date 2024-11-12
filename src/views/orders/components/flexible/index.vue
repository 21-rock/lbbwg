<script lang="ts" setup>
import Closing from './Closing.vue'
import Position from './Position.vue'
import { MyTabs } from '@/components'
const tabPages = ref([
  {
    key: '1',
    tab: '持仓记录'
  },
  {
    key: '2',
    tab: '平仓记录'
  }
])
const activeKey = ref('1')
const onChange = () => {}
</script>

<template>
  <MyTabs
    class="tops-tab"
    :tab-pages="tabPages"
    v-model:active-key="activeKey"
    isSub
    @change="onChange"
  >
    <template #content="prop">
      <Position v-if="prop.key === '1'" />
      <Closing v-if="prop.key === '2'" />
    </template>
  </MyTabs>
</template>
<style lang="less" scoped></style>
