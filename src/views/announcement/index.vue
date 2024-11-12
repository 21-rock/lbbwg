<script lang="ts" setup>
import { getAnnounceListApi } from '@/api/announcement'
import { getImageUrl } from '@/assets'
import { useRequestByPage } from '@/hooks/useRequest'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Input, Pagination } from 'ant-design-vue'

const bgImg = getImageUrl('ann-bg-1.png')

const keyword = ref()

const { pagination, data, run } = useRequestByPage(getAnnounceListApi)
const onSearch = () => {
  pagination.current = 1
  run({
    keyword: keyword.value,
    page: pagination.current,
    pageSize: pagination.pageSize
  })
}
</script>

<template>
  <div>
    <div class="bg-black">
      <div
        class="w-[1200px] h-[287px] mx-auto flex items-center"
        :style="{
          background: `no-repeat url('${bgImg}') right center`,
          backgroundSize: '465px 196px'
        }"
      >
        <div>
          <p class="text-[44px]/[1.5] text-white font-bold">UZX Announcement</p>
          <p class="text-[18px] text-gray-400 mt-[16px]">
            Get UZX first-hand news anytime, anywhere
          </p>
        </div>
      </div>
    </div>
    <div class="w-[1200px] mx-auto">
      <div class="flex justify-end pt-[30px] pb-[50px]">
        <Input
          size="large"
          v-model:value="keyword"
          placeholder="input search text"
          style="width: 600px"
          @keyup.enter="onSearch"
        >
          <template #suffix>
            <SearchOutlined
              class="text-[#808695] cursor-pointer"
              @click="onSearch"
            />
          </template>
        </Input>
      </div>
      <ul>
        <li v-for="item in data" :key="item.id">
          <RouterLink
            :to="`/article/announcement/${item.id}`"
            class="block w-[100%] py-[22px] px-[24px] border-b-[1px] border-[#e7e7e7] hover:bg-[#f5f5f5] hover:rounded-[8px]"
          >
            <p class="text-base text-black">{{ item.notice_title }}</p>
            <p class="mt-2 text-xs text-gray-500">{{ item.create_time }}</p>
          </RouterLink>
        </li>
      </ul>

      <div class="flex justify-end py-10">
        <Pagination
          v-model:current="pagination.current"
          :total="pagination.total"
          :page-size="pagination.pageSize"
          show-less-items
          :showSizeChanger="false"
        />
      </div>
    </div>
  </div>
</template>
