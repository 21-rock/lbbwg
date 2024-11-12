<script setup lang="ts">
import { MyTabs } from '@/components'
import { Orders, AssetsOverview, Subscript, EarnOrder } from './components'

const route = useRoute()
const router = useRouter()
const current = route.query.activeKey as string
const activeKey = ref(current || '1')

const tabPages = ref([
  {
    key: '1',
    tab: '资产总览'
  },
  {
    key: '2',
    tab: '新币申购'
  },
  {
    key: '3',
    tab: '质押生息'
  },
  {
    key: '4',
    tab: '订单中心'
  }
])
function onChange(key: string | number) {
  console.log('key:', key)
  router.push({
    path: '/manage',
    query: {
      activeKey: key
    }
  })
}
</script>

<template>
  <div class="mx-auto w-[1200px] min-h-[calc(100vh-80px)] overflow-x-hidden">
    <MyTabs
      :tab-pages="tabPages"
      v-model:active-key="activeKey"
      @change="onChange"
    >
      <template #content="prop">
        <AssetsOverview v-if="prop.key === '1'" />
        <Subscript v-else-if="prop.key === '2'" />
        <EarnOrder v-else-if="prop.key === '3'" />
        <Orders v-else-if="prop.key === '4'" />
        <div v-else>
          {{ prop.content }}
        </div>
      </template>
    </MyTabs>
  </div>
</template>
