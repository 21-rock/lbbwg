<script setup lang="ts">
import { SearchHelpItem, searchHelpListApi } from '@/api/help'
import { AutoComplete, message } from 'ant-design-vue'
const router = useRouter()
const keyword = ref()
const options = ref<SearchHelpItem[]>()

const search = () => {
  if (!keyword.value) {
    message.warn('请输入问题')
    return
  }
  router.push(`/help/search-result/${keyword.value}`)
}

const handleSearch = async (val: string) => {
  if (!val) {
    return
  }
  const res = await searchHelpListApi({
    keyword: val
  })
  if (res.code === 1) {
    options.value = res.data.data
  }
}
</script>

<template>
  <div class="h-[356px] flex flex-col justify-center items-center">
    <h1 class="text-[44px] text-white font-bold mb-[40px]">UZX帮助中心</h1>
    <div class="search-wrap flex gap-5 w-[604px]">
      <div class="flex-1">
        <AutoComplete
          class="auto-complete-search"
          size="large"
          v-model:value.trim="keyword"
          placeholder="请输入问题"
          :options="options"
          @search="handleSearch"
          :popupClassName="'helpCenter-search'"
        >
          <template #option="{ title, id }">
            <router-link
              :to="`/article/helpCenter/${id}`"
              class="ant-select-item-link"
            >
              {{ title }}
            </router-link>
          </template>
        </AutoComplete>
      </div>
      <a class="btn w-[88px] h-[48px] rounded-[24px]" @click.prevent="search">
        搜索
      </a>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search-wrap {
  :deep(.ant-select-auto-complete) {
    width: 100%;

    .ant-select-selector {
      width: 100%;
      height: 48px;
      padding: 4px 11px;
      border: 1px solid hsl(0deg 0% 100% / 20%);
      border-radius: 24px;
      background: rgb(52 52 52 / 78%);
      color: #fff;
      backdrop-filter: blur(3px);

      &:focus {
        outline: 0;
        box-shadow: 0 0 0 2px rgb(45 140 240 / 20%);
      }

      &::placeholder {
        color: #939393;
      }
    }

    .ant-select-selection-placeholder {
      color: #939393;
    }

    .ant-select-selection-search-input {
      height: 46px !important;
    }
  }
}
</style>

<style lang="scss">
.helpCenter-search {
  border: 1px solid hsl(0deg 0% 100% / 20%);
  background: rgb(52 52 52 / 28%);
  backdrop-filter: blur(3px);

  .ant-select-item {
    color: #fff !important;
    font-size: 14px;

    &:hover {
      background: rgb(52 52 52 / 78%);
    }

    .ant-select-item-link {
      display: block;
      padding: 6px 2px;

      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
