<script setup lang="ts">
import { RechargeRecord } from '@/api/wallet'
import { RechargeStatus } from '@/constant/status'
import { Table, TableColumnProps, TableProps, Tag } from 'ant-design-vue'

interface Props extends Omit<TableProps, 'columns'> {}

const props = withDefaults(defineProps<Props>(), {})

const columns: TableColumnProps<RechargeRecord>[] = [
  {
    title: '订单号',
    dataIndex: 'order_no',
    key: 'order_no',
    width: '20%'
  },
  {
    title: '币种',
    dataIndex: 'currency',
    key: 'currency',
    width: '16%'
  },
  {
    title: '网络',
    dataIndex: 'currency_network',
    key: 'currency_network',
    width: '16%'
  },
  {
    title: '充值金额',
    dataIndex: 'receipt',
    key: 'receipt',
    width: '16%'
  },
  {
    title: '充值时间',
    dataIndex: 'create_time',
    key: 'create_time',
    width: '16%'
  },
  {
    title: '审核状态',
    dataIndex: 'audit_status',
    key: 'audit_status',
    width: '16%',
    align: 'right',
    customRender: ({ record }) => {
      const color = {
        0: 'processing',
        1: 'success',
        2: 'error'
      }

      return h(
        Tag,
        {
          color: color[record.audit_status]
        },
        () => RechargeStatus[record.audit_status]
      )
    }
  }
]
</script>

<template>
  <Table class="ant-small-table" :columns="columns" v-bind="props" />
</template>
