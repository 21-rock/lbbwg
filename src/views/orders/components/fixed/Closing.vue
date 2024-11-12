<script setup lang="ts">
import { Table } from 'ant-design-vue'

const columns = [
  {
    dataIndex: 'a',
    key: 'a',
    title: '币种'
  },
  {
    dataIndex: 'b',
    key: 'b',
    title: '数量'
  },
  {
    dataIndex: 'd',
    key: 'd',
    title: '实际利息'
  },
  {
    dataIndex: 'e',
    key: 'e',
    title: '创建时间'
  },
  {
    dataIndex: 'f',
    key: 'f',
    title: '期限'
  },
  {
    dataIndex: 'g',
    key: 'g',
    title: '平仓时间'
  },
  {
    dataIndex: 'h',
    key: 'h',
    title: '利率'
  },
  {
    dataIndex: 'type',
    key: 'type',
    title: '类型'
  },
  {
    dataIndex: 'i',
    key: 'i',
    title: '操作',
    customRender: () =>
      h(
        'span',
        {
          class:
            'block cursor-pointer w-[78px] leading-[36px] text-center rounded-[18px] bg-black text-white'
        },
        { default: () => '存入' }
      )
  }
]
const dataSource = ref([])
</script>

<template>
  <Table :columns="columns" :dataSource="dataSource" />
</template>
