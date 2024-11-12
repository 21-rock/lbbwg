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
  SelectOption
} from 'ant-design-vue'
import dayjs from 'dayjs'
import {
  ContractOrderListItem,
  GetContractOrderList,
  getContractOrderListApi,
  tradeColor
} from '@/api/trade'
import { useRequestByPage } from '@/hooks/useRequest'
import { ContractOrderDirectionEnum } from '@/enums/trade'
import { ContractOrderStatus } from '@/enums/status'
const dateFormat = 'YYYY-MM-DD'

const params = reactive<GetContractOrderList>({
  direction: undefined,
  start_time: '',
  end_time: '',
  status: undefined
})

const { data, pagination, loading, search, onPageChange } = useRequestByPage(
  getContractOrderListApi,
  { ...toRaw(params) }
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

const { buyColor, sellColor } = tradeColor()
const columns: ColumnsType<ContractOrderListItem> = [
  /* {
      title: '订单号',
      dataIndex: 'order_no',
      key: 'order_no'
    }, */
  {
    title: '交易对',
    dataIndex: 'symbol',
    key: 'symbol'
  },
  {
    title: '交易方向',
    dataIndex: 'direction',
    key: 'direction',
    customRender({ record }) {
      return h(
        'span',
        {
          style: {
            color: Number(record.direction) === 1 ? buyColor : sellColor
          }
        },
        {
          default: () => (Number(record.direction) === 1 ? '买多' : '卖空')
        }
      )
    }
  },

  {
    title: '交易时间',
    dataIndex: 'buy_time',
    key: 'buy_time'
  },
  {
    title: '买入现价',
    dataIndex: 'buy_price',
    key: 'buy_price',
    customRender({ text, record }) {
      return text + record.symbol_pricing
    }
  },
  {
    title: '手续费',
    dataIndex: 'commission',
    key: 'commission'
  },
  {
    title: '结算时间',
    dataIndex: 'close_time',
    key: 'close_time'
  },
  {
    title: '结算现价',
    dataIndex: 'close_price',
    key: 'close_price'
  },
  {
    title: '结算金额',
    dataIndex: 'close_money',
    key: 'close_money'
  },
  {
    title: '订单时长',
    dataIndex: 'seconds',
    key: 'seconds',
    customRender: ({ record }) => record.seconds + 's'
  },
  {
    title: '盈亏',
    dataIndex: 'profit_money',
    key: 'profit_money',
    align: 'right',
    customRender({ text, record }) {
      return h(
        'span',
        {
          style: {
            color: Number(text) > 1 ? buyColor : sellColor
          }
        },
        {
          default: () => text + record.symbol_pricing
        }
      )
    }
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
          <FormItem label="方向">
            <Select
              v-model:value="params.direction"
              style="width: 100%"
              placeholder="请选择"
            >
              <SelectOption :value="ContractOrderDirectionEnum.买多">
                买多
              </SelectOption>
              <SelectOption :value="ContractOrderDirectionEnum.卖空">
                卖空
              </SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="类型">
            <Select
              v-model:value="params.status"
              style="width: 100%"
              placeholder="请选择"
            >
              <SelectOption :value="ContractOrderStatus.已结算">
                已结算
              </SelectOption>
              <SelectOption :value="ContractOrderStatus.未结算">
                未结算
              </SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label=" ">
            <button
              class="block btn w-[78px] h-[30px] rounded-[15px] align-middle"
              @click="onSearch"
            >
              搜索
            </button>
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
