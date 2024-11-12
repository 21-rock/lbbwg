<script setup lang="ts">
import { Table } from 'ant-design-vue'

const columns = [
  {
    title: '提现时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '币种',
    dataIndex: 'crypto',
    key: 'crypto'
  },
  {
    title: '网路协议',
    dataIndex: 'protocol',
    key: 'protocol'
  },
  {
    title: '提现地址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '提币数量',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: '预估手续费',
    dataIndex: 'fee',
    key: 'fee'
  },
  {
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  }
]
</script>

<template>
  <Table :columns="columns" />
</template>
