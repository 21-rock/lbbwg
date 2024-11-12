<script lang="ts" setup>
import { NoticeListItem } from '@/api/notice'
import { Dialog, Modal } from '@/components'
import { useNoticeStore } from '@/store'
import { BellOutlined, RightOutlined } from '@ant-design/icons-vue'
import { Badge, Button, Space } from 'ant-design-vue'
import dayjs from 'dayjs'
const dialogOpen = ref<boolean>(false)
const modalOpen = ref<boolean>(false)
const record = ref<NoticeListItem>()

const { loadmore, initNoticeList, read, readAll } = useNoticeStore()
const store = useNoticeStore()

const showDialog = () => {
  dialogOpen.value = true
}

const onRecord = (v: NoticeListItem) => {
  read(v)
  record.value = v
  modalOpen.value = true
}

watch(
  () => dialogOpen.value,
  (cur) => {
    if (cur) {
      initNoticeList()
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <a class="block" @click.prevent="showDialog">
    <Badge
      :count="store.uneadCount"
      :overflowCount="99"
      :style="{ height: '16px', lineHeight: '16px' }"
    >
      <BellOutlined class="block text-xl text-white" />
    </Badge>
  </a>

  <Dialog v-model:modelValue="dialogOpen" :loading="store.loading">
    <template #prefix>
      <span class="text-sm cursor-pointer" @click="readAll">全部已读</span>
    </template>
    <template #default>
      <div class="w-[330px]">
        <ul class="my-3">
          <li
            v-for="item in store.data"
            :key="item.id"
            class="py-3 border-b-[1px] border-gray-100"
            @click="onRecord(item)"
          >
            <h3 class="flex items-center text-xl font-bold ellipsis">
              <span
                v-if="item.is_read === 0"
                class="inline-block w-[5px] h-[5px] text-[0px] rounded-[100%] bg-[red] mr-1"
              ></span>
              <span class="inline-block">{{ item.title }}</span>
            </h3>
            <p class="py-1 text-xs text-gray-400">
              {{ dayjs(item.create_time).format('YYYY-MM-DD HH:mm') }}
            </p>
            <p class="text-base h-[22px] ellipsis">
              {{ item.content }}
            </p>
            <a @click.prevent class="block mt-2 text-blue">
              <Space>
                <span class="text-sm align-middle">查看</span>
                <RightOutlined class="text-[10px] align-middle" />
              </Space>
            </a>
          </li>
        </ul>

        <Button
          :disabled="store.isBottom"
          type="text"
          style="width: 100%"
          :loading="store.loading"
          @click="loadmore"
        >
          {{ store.isBottom ? '已经到底了' : '加载更多' }}</Button
        >
      </div>
    </template>
  </Dialog>
  <Modal title="通告" v-model:open="modalOpen">
    <div>
      <h3 class="text-2xl/[30px] text-black font-weight">
        {{ record?.title }}
      </h3>
      <p class="text-xs text-gray-400">
        {{ dayjs(record?.create_time).format('YYYY-MM-DD HH:mm') }}
      </p>
      <p class="text-base/[24px] mt-3">{{ record?.content }}</p>
    </div>
  </Modal>
</template>
