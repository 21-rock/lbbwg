<script setup lang="ts">
import { MyTabs } from '@/components'
import { Api, AuthId, Overview, Preferences, SafetyCenter } from './components'
import BasicVerify from './components/authId/BasicVerify.vue'
import HighVerify from './components/authId/HighVerify.vue'
import { getAuth } from '@/api/user'

const route = useRoute()
const router = useRouter()
const current = route.query.activeKey as string
const activeKey = ref(current || '1')
// 认证跳转的时候，判断是初级认证还是高级认证
const authType = ref(route.query.type as 'primary' | 'senior' | undefined)

const tabPages = ref([
  {
    key: '1',
    tab: '总览'
  },
  {
    key: '2',
    tab: '安全中心',
    content: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tab: '身份认证'
  },
  {
    key: '4',
    tab: '偏好设置'
  },
  {
    key: '5',
    tab: 'API'
  }
])

const onChange = (activeKey: string) => {
  router.push({
    path: route.path,
    query: {
      activeKey: activeKey
    }
  })
}
watch(
  () => route.query.activeKey,
  (cur) => {
    activeKey.value = cur as string
  }
)
watch(
  () => route.query.type,
  (cur) => {
    authType.value = cur as 'primary' | 'senior' | undefined
  }
)

getAuth()

const cls = 'min-h-[calc(100vh-132px)]'
</script>

<template>
  <div class="w-full overflow-x-hidden">
    <MyTabs
      :tabNavClass="{
        'w-[1200px]': true,
        'mx-auto': true
      }"
      theme="black"
      :tab-pages="tabPages"
      :active-key="activeKey"
      @change="onChange"
    >
      <template #content="prop">
        <div v-if="prop.key === '1'" :class="cls">
          <Overview />
        </div>
        <div v-else-if="prop.key === '2'" :class="cls">
          <SafetyCenter />
        </div>
        <div
          v-else-if="prop.key === '3'"
          class="min-h-[calc(100vh-132px-514px)] bg-black"
        >
          <BasicVerify v-if="authType === 'primary'" />
          <HighVerify v-else-if="authType === 'senior'" />
          <AuthId v-else />
        </div>
        <div v-else-if="prop.key === '4'" :class="cls">
          <Preferences />
        </div>

        <div v-else-if="prop.key === '5'" :class="cls">
          <Api />
        </div>
      </template>
    </MyTabs>
  </div>
</template>
