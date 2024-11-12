<script setup lang="ts">
import { Col, Row, Table, TableColumnType } from 'ant-design-vue'
import Equity from './Equity.vue'
import RecentRecords from './RecentRecords.vue'
import { useMountedRequest } from '@/hooks/useRequest'
import { AssetListItem, getAssetListApi } from '@/api/wallet'
import { toDecimals } from '@/utils/util'
// import ProofReserves from './ProofReserves.vue'
const { data } = useMountedRequest(
  getAssetListApi,
  { type: 0 },
  { initState: [] }
)

const balance = computed(() =>
  toDecimals(
    data.value.reduce((total, cur) => +cur.discount_amount + total, 0),
    8
  )
)

const columns: TableColumnType<AssetListItem>[] = [
  {
    dataIndex: 'currency',
    key: 'currency',
    title: '币种',
    customRender({ record }) {
      return h(
        'div',
        {
          class: 'flex items-center gap-2'
        },
        {
          default: () => [
            h('img', {
              src: record.logo_link,
              class: 'block w-[24px] h-[24px] rounded-[50%]'
            }),
            h(
              'span',
              {
                class: 'block leading-[24px] relative top-[2px]'
              },
              { default: () => record.currency }
            )
          ]
        }
      )
    }
  },
  {
    dataIndex: 'money',
    key: 'money',
    title: '可用'
  },
  {
    dataIndex: 'frozen',
    key: 'frozen',
    title: '处理中'
  },
  {
    dataIndex: 'discount_amount',
    key: 'discount_amount',
    title: '折合(USDT)'
  }
]
</script>

<template>
  <Row :gutter="30">
    <Col :span="16">
      <Equity :balance="balance" />
      <!-- <div class="mt-[30px]">
        <ProofReserves />
      </div> -->

      <div class="mt-[30px] border-[1px] border-gray-300 rounded-[20px] p-5">
        <Table
          class="ant-middle-table"
          :columns="columns"
          :data-source="data"
          :pagination="false"
        />
      </div>
    </Col>
    <Col :span="8">
      <RecentRecords />
    </Col>
  </Row>
</template>
