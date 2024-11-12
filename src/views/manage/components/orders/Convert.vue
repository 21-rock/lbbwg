<script setup lang="ts">
import type { ColumnsType } from 'ant-design-vue/es/table'
import {
  Col,
  Form,
  FormItem,
  Row,
  RangePicker,
  Table,
  Button
} from 'ant-design-vue'
import dayjs from 'dayjs'
import { useRequestByPage } from '@/hooks/useRequest'
import {
  getExchangeOrderListApi,
  GetExchangeOrderListParams
} from '@/api/trade'
const dateFormat = 'YYYY-MM-DD'

const params = reactive<GetExchangeOrderListParams>({
  start_time: '',
  end_time: ''
})

const { data, pagination, loading, search, onPageChange } = useRequestByPage(
  getExchangeOrderListApi,
  {
    ...toRaw(params)
  }
)
// eslint-disable-next-line no-undef
const onTimeChange: OnTimeChange = (_value, str) => {
  params.start_time = str[0]
  params.end_time = str[1]
}
const onSearch = () => {
  search({
    ...toRaw(params),
    start_time: params.start_time ? params.start_time + ' 00:00:00' : '',
    end_time: params.end_time ? params.end_time + ' 23:59:59' : ''
  })
}

const columns: ColumnsType = [
  {
    title: '交易时间',
    dataIndex: 'create_time',
    key: 'create_time'
  },
  {
    title: '从',
    dataIndex: 'from_type',
    key: 'from_type'
  },
  {
    title: '至',
    dataIndex: 'reach_type',
    key: 'reach_type'
  },
  {
    title: '闪兑数量',
    dataIndex: 'from_amount',
    key: 'from_amount'
  },
  {
    title: '兑换比例',
    dataIndex: 'exchange_rate',
    key: 'exchange_rate'
  },
  {
    title: '兑换数量',
    dataIndex: 'reach_amount',
    key: 'reach_amount'
  },
  {
    title: '手续费',
    dataIndex: 'commission',
    key: 'commission'
  }
]
</script>

<template>
  <div>
    <Form size="middle" layout="vertical">
      <Row :gutter="[20, 20]">
        <Col :span="6">
          <FormItem label="日期">
            <RangePicker
              :value="
                params.start_time && params.end_time
                  ? [dayjs(params.start_time), dayjs(params.end_time)]
                  : undefined
              "
              :format="dateFormat"
              @change="onTimeChange"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label=" ">
            <Button
              class="block btn w-[78px] h-[30px] rounded-[15px] align-middle"
              @click="onSearch"
            >
              搜索
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Table
      class="ant-middle-table"
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :pagination="{
        ...pagination,
        showSizeChanger: false
      }"
    ></Table>
  </div>
</template>
