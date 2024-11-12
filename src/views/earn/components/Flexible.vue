<script setup lang="ts">
import { MiningListItem } from '@/api/earn'
import { Table, TableColumnType } from 'ant-design-vue'

const emit = defineEmits<{
  (e: 'deposit', value: MiningListItem): void
}>()

const columns: TableColumnType<MiningListItem>[] = [
  {
    dataIndex: 'name',
    key: 'name',
    title: '币种'
  },
  {
    dataIndex: 'buy_min',
    key: 'buy_min',
    title: '最小质押数量'
  },
  {
    dataIndex: 'buy_max',
    key: 'buy_max',
    title: '最大质押数量'
  },
  {
    dataIndex: 'cycle',
    key: 'cycle',
    title: '周期',
    customRender({ text }) {
      return text + '天'
    }
  },
  {
    dataIndex: 'daily_income',
    key: 'daily_income',
    title: '日收益',
    customRender({ text }) {
      return text + '%'
    }
  },
  {
    dataIndex: 'f',
    key: 'f',
    title: '操作',
    align: 'right',
    customRender: ({ record }) =>
      h(
        'span',
        {
          class:
            'inline-block cursor-pointer w-[78px] leading-[36px] text-center rounded-[18px] bg-black text-white',
          onClick() {
            emit('deposit', record)
          }
        },
        { default: () => '质押' }
      )
  }
]
</script>

<template>
  <Table class="ant-middle-table" :columns="columns" />
</template>
