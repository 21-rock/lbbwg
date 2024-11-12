<script setup lang="ts">
import {
  getMiningOrderListApi,
  MiningOrderListItem,
  revokeMiningOrderApi
} from '@/api/earn'
import { useRequestByPage } from '@/hooks/useRequest'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  message,
  Popconfirm,
  Table,
  TableColumnType
} from 'ant-design-vue'

const columns: TableColumnType<MiningOrderListItem>[] = [
  {
    dataIndex: 'mining_config_name',
    key: 'mining_config_name',
    title: '名称'
  },
  {
    dataIndex: 'create_time',
    key: 'create_time',
    title: '购买时间'
  },
  {
    dataIndex: 'buy_amount',
    key: 'buy_amount',
    title: '购买金额'
  },
  {
    dataIndex: 'residue',
    key: 'residue',
    title: '剩余时间',
    customRender({ text }) {
      return `${text}天`
    }
  },
  {
    dataIndex: 'update_time',
    key: 'update_time',
    title: '结束时间'
  },
  {
    dataIndex: 'profit_ratio',
    key: 'profit_ratio',
    title: '日收益',
    customRender({ text }) {
      return `${text}%`
    }
  },
  {
    dataIndex: 'daily_income',
    key: 'daily_income',
    title: '每日收益(USDT)'
  },
  {
    dataIndex: 'earnings',
    key: 'earnings',
    title: '累计收益(USDT)',
    align: 'right'
  },
  {
    dataIndex: 'earnings',
    key: 'earnings',
    title: '累计收益(USDT)'
  },
  {
    dataIndex: 'operate',
    key: 'operate',
    title: '操作',
    align: 'right',
    customRender: ({ record }) =>
      h(
        Popconfirm,
        {
          title: '你是否确认赎回该订单？',
          okText: '确认',
          cancelText: '否',
          onConfirm() {
            revokeMiningOrder(record.id)
          }
        },
        {
          default: () =>
            h(
              Button,
              {
                class:
                  'inline-block cursor-pointer w-[78px]  text-center rounded-[18px] bg-black text-white'
              },
              { default: () => '赎回' }
            )
        }
      )
  }
]

const revokeLoading = ref(false)

const revokeMiningOrder = async (id: number) => {
  revokeLoading.value = true
  try {
    const res = await revokeMiningOrderApi(id)
    if (res.code === 1) {
      message.success(res.msg)
      run()
    } else {
      message.warn(res.msg)
    }
  } catch (error) {
    console.log(error)
  }
  revokeLoading.value = false
}

const { onPageChange, loading, data, pagination, run } = useRequestByPage(
  getMiningOrderListApi
)
</script>

<template>
  <div class="w-[1200px] mx-auto">
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
    ></Table>
  </div>
</template>
