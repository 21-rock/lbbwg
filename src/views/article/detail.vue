<script setup lang="ts">
import { getAnnounceDetailApi } from '@/api/announcement'
import { getHelpDetailApi } from '@/api/help'
import { Breadcrumb } from 'ant-design-vue'

const route = useRoute()

const id = route.params.id as string
const type = route.params.type as string
const article = reactive({
  title: '',
  content: '',
  create_time: ''
})

const title = route.query.title || '文章'

const routes = computed(() => {
  switch (type) {
    case 'announcement':
      return [
        {
          path: '/announcement',
          breadcrumbName: '公告中心'
        },
        {
          breadcrumbName: title,
          path: ''
        }
      ]
    case 'helpCenter':
      return [
        {
          path: '/helpCenter',
          breadcrumbName: '帮助中心'
        },
        {
          breadcrumbName: title,
          path: ''
        }
      ]
    case 'learn':
      return [
        {
          path: '/learn',
          breadcrumbName: '新手社区'
        },
        {
          breadcrumbName: title,
          path: ''
        }
      ]
    default:
      return []
  }
})

const getDetail = async () => {
  if (type === 'announcement') {
    const res = await getAnnounceDetailApi(+id)
    if (res.code === 1) {
      article.title = res.data.notice_title
      article.create_time = res.data.create_time
      article.content = res.data.notice_content
    }
  } else if (type === 'helpCenter' || type === 'learn') {
    const res = await getHelpDetailApi(+id)
    if (res.code === 1) {
      article.title = res.data.title
      article.create_time = res.data.create_time
      article.content = res.data.content
    }
  }
}

onMounted(() => {
  getDetail()
})
</script>

<template>
  <div class="w-[1200px] mx-auto">
    <div class="pt-[40px]">
      <Breadcrumb :routes="routes">
        <template #itemRender="{ route }">
          <span v-if="routes.indexOf(route) === routes.length - 1">
            {{ route.breadcrumbName }}
          </span>
          <router-link v-else :to="route.path">
            {{ route.breadcrumbName }}
          </router-link>
        </template>
      </Breadcrumb>
    </div>
    <article class="pt-[40px]">
      <h1 class="text-4xl text-black">{{ article.title }}</h1>
      <p class="mt-3 text-xs text-gray-400">发布于{{ article.create_time }}</p>
    </article>
    <div v-html="article.content" class="mt-7"></div>
  </div>
</template>
