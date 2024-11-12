<script setup lang="ts">
import { Modal } from '@/components'
import { useModal } from '@/hooks'
import { Table } from 'ant-design-vue'

const columns = [
  {
    dataIndex: 'a',
    key: 'a',
    title: '备注名'
  },
  {
    dataIndex: 'b',
    key: 'b',
    title: 'API key'
  },
  {
    dataIndex: 'c',
    key: 'c',
    title: '权限'
  },
  {
    dataIndex: 'd',
    key: 'd',
    title: '创建时间'
  },
  {
    dataIndex: 'e',
    key: 'e',
    title: '操作'
  }
]

const nodes = [
  {
    label: '高级实名认证',
    btn: '认证',
    path: '/verify'
  },
  {
    label: '绑定邮箱',
    btn: '去绑定',
    path: '/bind-email'
  },
  {
    label: '设置资金密码',
    btn: '去设置',
    path: '/set-security-pass'
  }
]

const { modalVisible, onModalOpen, onModalClose } = useModal()
</script>

<template>
  <div class="mx-auto w-[1200px]">
    <div class="pt-[70px] pb-[40px] border-b border-gray-100">
      <div class="flex items-center justify-between">
        <h2 class="text-[32px] font-bold">API key</h2>
        <span class="btn-normal w-[160px]" @click="onModalOpen">
          创建API key
        </span>
      </div>
      <p class="mt-3 text-sm text-gray-400">
        创建 API key 满足您的交易需求。为保障资产安全，请不要泄露您的 API key。
      </p>
    </div>
    <div>
      <Table :columns="columns"></Table>
    </div>
    <Modal v-model:open="modalVisible" @cancel="onModalClose">
      <template #title>安全验证 </template>
      <div class="py-4">
        <div
          class="flex items-center justify-between py-4"
          v-for="(item, index) in nodes"
          :key="item.label"
        >
          <p class="flex items-center gap-1">
            <span
              class="flex justify-center items-center w-[14px] h-[14px] border border-black rounded-[100%] text-[10px]"
            >
              {{ index + 1 }}
            </span>
            <span>{{ item.label }}</span>
          </p>
          <router-link :to="item.path" class="btn-base w-[78px]">{{
            item.btn
          }}</router-link>
        </div>
      </div>
    </Modal>
  </div>
</template>
