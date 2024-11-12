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
    title: '参考年化'
  },
  {
    dataIndex: 'd',
    key: 'd',
    title: '期限'
  },
  {
    dataIndex: 'e',
    key: 'e',
    title: '已投入'
  },
  {
    dataIndex: 'f',
    key: 'f',
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
const dataSource = ref([
  {
    a: 'USDT',
    b: '6.0006%',
    c: '6.0006%',
    d: '活期',
    e: 0
  },
  {
    a: 'USDT',
    b: '6.0006%',
    c: '6.0006%',
    d: '活期',
    e: 0
  },
  {
    a: 'USDT',
    b: '6.0006%',
    c: '6.0006%',
    d: '活期',
    e: 0
  },
  {
    a: 'USDT',
    b: '6.0006%',
    c: '6.0006%',
    d: '活期',
    e: 0
  }
])
</script>

<template>
  <Table :columns="columns" :dataSource="dataSource" />
</template>
