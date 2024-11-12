<script setup lang="ts">
import { CoinOrderListItem, getCoinOrderListApi } from '@/api/currency'
import { SubscriptCurrencyStatus } from '@/constant/status'
import { useRequestByPage } from '@/hooks/useRequest'
import { Table, TableColumnType } from 'ant-design-vue'

const { data, pagination, loading, onPageChange } =
  useRequestByPage(getCoinOrderListApi)

const columns: TableColumnType<CoinOrderListItem>[] = [
  {
    dataIndex: 'symbol_base',
    key: 'symbol_base',
    title: '基础货币'
  },
  {
    dataIndex: 'symbol_pricing',
    key: 'symbol_pricing',
    title: '计价货币'
  },
  {
    dataIndex: 'final_price',
    key: 'final_price',
    title: '订单价格'
  },
  {
    dataIndex: 'final_amount',
    key: 'final_amount',
    title: '成交量'
  },
  {
    dataIndex: 'status',
    key: 'status',
    title: '状态',
    customRender({ text }) {
      return h(
        'span',
        {},
        {
          default: () => SubscriptCurrencyStatus[text as 0]
        }
      )
    }
  }
]
</script>

<template>
  <div>
    <Table
      class="ant-middle-table"
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :pagination="{
        ...pagination,
        showSizeChanger: false
      }"
      @change="onPageChange"
    />
  </div>
</template>
