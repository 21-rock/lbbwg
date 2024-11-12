<script setup lang="ts">
import { MyTabs } from '@/components'
import { ref, watch } from 'vue'
import CurrentOrder from './CurrentOrder.vue'
import HistoryOrder from './HistoryOrder.vue'
import SpotBill from './SpotBill.vue'
import SecondFuture from './SecondFuture.vue'
import Convert from './Convert.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const current = route.query.sub as string
const activeKey = ref(current || '3')
const tansition = ref('slide-left')

watch(
  () => activeKey.value,
  (cur, pre) => {
    if (Number(cur) > Number(pre)) {
      tansition.value = 'slide-left'
    } else {
      tansition.value = 'slide-right'
    }
  }
)

const tabPages = ref([
  /*  {
    key: '1',
    tab: '当前委托',
    content: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tab: '历史委托',
    content: 'Content of Tab Pane 2'
  }, */
  {
    key: '3',
    tab: '现货账单'
  },
  {
    key: '4',
    tab: '秒合约账单'
  },
  {
    key: '5',
    tab: '闪兑'
  }
])
function onChange(key: string | number) {
  console.log('key:', key, route.fullPath)
  // console.log('key:', key)
  router.push({
    path: route.path,
    query: {
      ...route.query,
      sub: key
    }
  })
}
</script>

<template>
  <div class="mx-auto w-[1200px] overflow-x-hidden">
    <MyTabs
      size="middle"
      line="normal"
      :tab-pages="tabPages"
      v-model:active-key="activeKey"
      isSub
      @change="onChange"
    >
      <template #content="prop">
        <CurrentOrder v-if="prop.key === '1'" />
        <HistoryOrder v-else-if="prop.key === '2'" />
        <SpotBill v-else-if="prop.key === '3'" />
        <SecondFuture v-else-if="prop.key === '4'" />
        <Convert v-else-if="prop.key === '5'" />
      </template>
    </MyTabs>
  </div>
</template>
