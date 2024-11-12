<script setup lang="ts">
import { getRechargeRecordsApi, getWithdrawRecordsApi } from '@/api/wallet'
import { MyTabs } from '@/components'
import { useMountedRequest } from '@/hooks/useRequest'
import { Table } from 'ant-design-vue'
import { ColumnsType } from 'ant-design-vue/es/table'
const active = ref('1')
const columns: ColumnsType = [
  {
    title: '币种',
    dataIndex: 'currency',
    key: 'currency'
  },
  {
    title: '充值数量',
    dataIndex: 'receipt',
    key: 'receipt'
  },
  {
    title: '交易时间',
    dataIndex: 'create_time',
    key: 'create_time',
    align: 'right'
  }
]

const { data: rechargeRes } = useMountedRequest(getRechargeRecordsApi, {
  page: 1,
  pageSize: 10
})
const { data: withdrawRes } = useMountedRequest(getWithdrawRecordsApi, {
  page: 1,
  pageSize: 10
})

const tabPages = [
  {
    key: '1',
    tab: '充币'
  },
  {
    key: '2',
    tab: '提币'
  }
]
</script>

<template>
  <div class="w-full h-[517px] border-[1px] border-gray-300 rounded-[20px] p-5">
    <div class="flex items-center justify-between">
      <h3 class="text-[20px] font-bold">最近充提币记录</h3>
    </div>
    <MyTabs
      :tabPages="tabPages"
      v-model:active-key="active"
      isSub
      class="tabs-small"
    >
      <template #suffix>
        <router-link
          :to="active === '1' ? '/recharge' : '/withdraw'"
          class="text-base text-[#0075ff] rounded-[20px]"
        >
          查看全部
        </router-link>
      </template>
      <template #content="prop">
        <Table
          v-if="prop.key === '1'"
          class="ant-middle-table"
          :columns="columns"
          :data-source="rechargeRes?.data"
          :pagination="false"
        ></Table>
        <Table
          v-else
          class="ant-middle-table"
          :columns="columns"
          :data-source="withdrawRes?.data"
          :pagination="false"
        ></Table>
      </template>
    </MyTabs>

    <!-- <div>
      <Table
        class="table-wrapper ant-middle-table"
        :columns="columns"
        :data-source="rechargeList?.data"
        :pagination="false"
      />
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  &:deep(th, td) {
    color: #000 !important;
    font-size: 12px;
    font-weight: normal;
  }
}
</style>
