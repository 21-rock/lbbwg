<script lang="tsx">
import {
  getSpotListApi,
  GetSpotListItem,
  revokeSpotOrderApi
} from '@/api/trade'
import { MyTabs } from '@/components'
import { SpotOrderStatus } from '@/constant/status'
import { OrderDirectionEnum, OrderTypeEnum } from '@/enums/trade'
import { useRequestByPage } from '@/hooks/useRequest'
import { tradeColor } from '@/utils/common'
import { message } from 'ant-design-vue'
import Table, { ColumnsType, TableProps } from 'ant-design-vue/es/table'
import OrderConfirm from './OrderConfirm.vue'
import { OrderDirection, OrderType } from '@/constant/trade'
import { useModal } from '@/hooks'
import { SpotExchangeStatusEnum, SpotOrderStatusEnum } from '@/enums/status'

export default defineComponent({
  setup() {
    const activeKey = ref('1')
    const { data } = useRequestByPage(getSpotListApi, {
      status: SpotExchangeStatusEnum.全部,
      start_time: '',
      end_time: ''
    })
    const orderInfo = ref<Record<any, any>>({})

    const dataSource = computed(() => data.value.slice(0, 8))
    const { buyColor, sellColor } = tradeColor()
    const { modalVisible, modalLoading, onModalClose, onModalOpen } = useModal()
    const cancel = (record: GetSpotListItem) => {
      orderInfo.value = {
        id: record.id,
        symbol: record.symbol,
        color:
          record.direction === OrderDirectionEnum.买入 ? buyColor : sellColor,
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

    return () => {
      const tabPages = [
        {
          key: '1',
          tab: '当前委托',
          content: (
            <CurrentEntrust
              wrapperClass="ant-deep-table"
              dataSource={dataSource.value}
              onCancel={(record) => cancel(record)}
            />
          )
        }
      ]
      return (
        <>
          <MyTabs
            class={'my-tabs-deep-medium'}
            tab-pages={tabPages}
            v-model:active-key={activeKey.value}
          >
            {{
              content: ({ content }: any) => content
            }}
          </MyTabs>

          <OrderConfirm
            v-model:open={modalVisible.value}
            orderInfo={orderInfo.value!}
            confirmLoading={modalLoading.value}
            onCancel={() => onModalClose()}
            onOk={() => handleCancel()}
          />
        </>
      )
    }
  }
})

interface Props extends TableProps {
  dataSource: GetSpotListItem[]
  onCancel: (record: GetSpotListItem) => void
  wrapperClass?: string
}
export function CurrentEntrust(props: Props) {
  const { buyColor, sellColor } = tradeColor()
  const { onCancel, wrapperClass, ...reset } = props
  const columns: ColumnsType<GetSpotListItem> = [
    {
      title: '交易时间',
      dataIndex: 'trust_time',
      key: 'trust_time'
    },
    {
      title: '交易对',
      dataIndex: 'symbol',
      key: 'symbol'
    },
    {
      title: '类型',
      dataIndex: 'trust_type',
      key: 'trust_type',
      customRender({ text }) {
        return Number(text) === OrderTypeEnum.市场委托 ? '市场委托' : '限价委托'
      }
    },
    {
      title: '方向',
      dataIndex: 'direction',
      key: 'direction',
      customRender({ record }) {
        return (
          <span
            style={{
              color:
                Number(record.direction) === OrderDirectionEnum.买入
                  ? buyColor
                  : sellColor
            }}
          >
            {Number(record.direction) === OrderDirectionEnum.买入
              ? '买入'
              : '卖出'}
          </span>
        )
      }
    },
    {
      title: '价格',
      dataIndex: 'trust_price',
      key: 'trust_price'
    },
    // {
    //   title: '数量',
    //   dataIndex: 'trust_amount',
    //   key: 'trust_amount'
    // },
    {
      title: '成交金额',
      dataIndex: 'trust_amount',
      key: 'trust_amount'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      customRender: ({ record }) => SpotOrderStatus[record.status]
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'right',
      customRender({ record }) {
        if (record.status !== SpotOrderStatusEnum.委托等待) {
          return null
        }
        return h(
          'span',
          {
            class: 'text-gray-400 cursor-pointer',
            onClick: () => {
              onCancel(record)
            }
          },
          {
            default: () => '撤销'
          }
        )
      }
    }
  ]
  const cls = 'px-2  ant-middle-table'
  return (
    <div class={wrapperClass ? `${cls} ${wrapperClass}` : cls}>
      <Table columns={columns} pagination={false} {...reset}></Table>
    </div>
  )
}
</script>
