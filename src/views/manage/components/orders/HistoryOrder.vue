<script setup lang="ts">
import type { ColumnsType } from 'ant-design-vue/es/table'
import {
  Col,
  Form,
  FormItem,
  Row,
  Select,
  RangePicker,
  Table,
  PaginationProps,
  SelectOption
} from 'ant-design-vue'
import { Dayjs } from 'dayjs'
const dateFormat = 'YYYY-MM-DD'

interface State {
  date?: [Dayjs, Dayjs]
  pair?: string
  type?: string
  direction?: string
}

const formState = reactive<State>({
  date: undefined,
  type: undefined,
  pair: undefined,
  direction: undefined
})
const columns: ColumnsType = [
  {
    title: '交易时间',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: '交易对',
    dataIndex: 'pair',
    key: 'pair'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '方向',
    dataIndex: 'direction',
    key: 'direction'
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: '数量',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: '已成交',
    dataIndex: 'filled',
    key: 'filled'
  },
  {
    title: '成交金额',
    dataIndex: 'total',
    key: 'total'
  },
  {
    title: '状态',
    dataIndex: 'count',
    key: 'count'
  }
]

const pagination: PaginationProps = {
  current: 1,
  pageSize: 10,
  total: 100
}
</script>

<template>
  <div>
    <Form size="middle" layout="vertical">
      <Row :gutter="[20, 20]">
        <Col :span="6">
          <FormItem label="日期">
            <RangePicker
              v-model:value="formState.date"
              :format="dateFormat"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="交易">
            <Select
              v-model:value="formState.pair"
              style="width: 100%"
              placeholder="请选择"
            >
              <SelectOption value="jack">Jack</SelectOption>
              <SelectOption value="lucy">Lucy</SelectOption>
              <SelectOption value="Yiminghe">yiminghe</SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="类型">
            <Select
              v-model:value="formState.type"
              style="width: 100%"
              placeholder="请选择"
            >
              <SelectOption value="jack">Jack</SelectOption>
              <SelectOption value="lucy">Lucy</SelectOption>
              <SelectOption value="Yiminghe">yiminghe</SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="交易方向">
            <Select
              v-model:value="formState.direction"
              style="width: 100%"
              placeholder="请选择"
            >
              <SelectOption value="jack">Jack</SelectOption>
              <SelectOption value="lucy">Lucy</SelectOption>
              <SelectOption value="Yiminghe">yiminghe</SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label=" ">
            <button
              class="block btn w-[78px] h-[30px] rounded-[15px] align-middle"
            >
              搜索
            </button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Table :columns="columns" :pagination="pagination"></Table>
  </div>
</template>
