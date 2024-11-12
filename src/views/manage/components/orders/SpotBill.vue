<script setup lang="ts">
import {
  Col,
  Form,
  FormItem,
  Row,
  Select,
  RangePicker,
  SelectOption,
  message
} from 'ant-design-vue'
import dayjs from 'dayjs'
import {
  getSpotListApi,
  GetSpotListItem,
  getSpotListParams,
  revokeSpotOrderApi
} from '@/api/trade'
import { OrderDirectionEnum, OrderTypeEnum } from '@/enums/trade'
import { useRequestByPage } from '@/hooks/useRequest'
import { tradeColor } from '@/utils/common'
import { OrderDirection, OrderType } from '@/constant/trade'
import { CurrentEntrust } from '@/views/trade/spot/components/EntrustTable.vue'
import OrderConfirm from '@/views/trade/spot/components/OrderConfirm.vue'
import { useModal } from '@/hooks'
import { SpotExchangeStatusEnum } from '@/enums/status'
const dateFormat = 'YYYY-MM-DD'

const params = reactive<getSpotListParams>({
  direction: undefined,
  trust_type: undefined,
  start_time: '',
  end_time: '',
  status: SpotExchangeStatusEnum.全部
})

const { data, pagination, loading, search, onPageChange } = useRequestByPage(
  getSpotListApi,
  {
    ...toRaw(params)
  }
)

// eslint-disable-next-line no-undef
const onTimeChange: OnTimeChange = (_value, str) => {
  params.start_time = str[0]
  params.end_time = str[1]
}
const onSeach = () => {
  search({
    ...toRaw(params),
    start_time: params.start_time ? params.start_time + ' 00:00:00' : '',
    end_time: params.end_time ? params.end_time + ' 23:59:59' : ''
  })
}

const orderInfo = ref<Record<any, any>>({})
const { buyColor, sellColor } = tradeColor()
const { modalVisible, modalLoading, onModalClose, onModalOpen } = useModal()
const cancel = (record: GetSpotListItem) => {
  orderInfo.value = {
    id: record.id,
    symbol: record.symbol,
    color: record.direction === OrderDirectionEnum.买入 ? buyColor : sellColor,
    direction: OrderDirection[record.direction],
    type: OrderType[record.trust_type],
    price: record.trust_price,
    amount: record.trust_amount
  }
  onModalOpen()
}
const handleCancel = async () => {
  modalLoading.value = true
  try {
    const res = await revokeSpotOrderApi(orderInfo.value.id)
    if (res.code === 1) {
      message.success(res.msg)
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log(error)
  }
  onModalClose()
}
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
              <SelectOption :value="''">全部</SelectOption>
              <SelectOption :value="OrderDirectionEnum.买入">买入</SelectOption>
              <SelectOption :value="OrderDirectionEnum.卖出">卖出</SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="类型">
            <Select
              v-model:value="params.trust_type"
              style="width: 100%"
              placeholder="请选择"
            >
              <SelectOption :value="''">全部</SelectOption>
              <SelectOption :value="OrderTypeEnum.市场委托">
                市场委托
              </SelectOption>
              <SelectOption :value="OrderTypeEnum.限价委托">
                限价委托
              </SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="状态">
            <Select
              v-model:value="params.status"
              style="width: 100%"
              placeholder="请选择"
            >
              <SelectOption :value="SpotExchangeStatusEnum.全部">
                全部
              </SelectOption>
              <SelectOption :value="SpotExchangeStatusEnum.委托">
                委托
              </SelectOption>
              <SelectOption :value="SpotExchangeStatusEnum.成交">
                成交
              </SelectOption>
              <SelectOption :value="SpotExchangeStatusEnum.撤单">
                撤单
              </SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label=" ">
            <button
              class="block btn w-[78px] h-[30px] rounded-[15px] align-middle"
              @click="onSeach"
            >
              搜索
            </button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <CurrentEntrust
      :data-source="data"
      :onCancel="cancel"
      :pagination="{
        ...pagination,
        showSizeChanger: false
      }"
      :loading="loading"
      @change="onPageChange"
    />

    <OrderConfirm
      v-model:open="modalVisible"
      :orderInfo="orderInfo.value!"
      :confirmLoading="modalLoading"
      @cancel="onModalClose"
      @ok="handleCancel"
    />
  </div>
</template>
