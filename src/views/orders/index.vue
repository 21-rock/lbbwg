<script lang="ts" setup>
import Flexible from './components/flexible/index.vue'
import Fixed from './components/fixed/index.vue'
import { MyTabs } from '@/components'
const tabPages = ref([
  {
    key: '1',
    tab: '活期'
  },
  {
    key: '2',
    tab: '定期',
    content: 'Content of Tab Pane 2'
  }
])
const activeKey = ref('1')
const onChange = () => {}
</script>

<template>
  <div class="w-[1200px] mx-auto py-[30px] min-h-[calc(100vh-80px)]">
    <MyTabs
      class="tops-tab"
      :tab-pages="tabPages"
      v-model:active-key="activeKey"
      @change="onChange"
    >
      <template #content="prop">
        <Flexible v-if="prop.key === '1'" />
        <Fixed v-if="prop.key === '2'" />
      </template>
    </MyTabs>
  </div>
</template>
<style lang="less" scoped></style>
