<script lang="tsx">
import { getContractOrderListApi, ContractOrderListItem } from '@/api/trade'
import { MyTabs } from '@/components'
import { useRequestByPage } from '@/hooks/useRequest'
import { tradeColor } from '@/utils/common'
import Table, { ColumnsType } from 'ant-design-vue/es/table'

export default defineComponent({
  setup() {
    const activeKey = ref('1')
    const { data } = useRequestByPage(getContractOrderListApi, {
      status: 0
    })

    const dataSource = computed(() => data.value.slice(0, 8))

    return () => {
      const tabPages = [
        {
          key: '1',
          tab: '在持订单',
          content: <CurrentEntrust dataSource={dataSource.value} />
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
        </>
      )
    }
  }
})

interface Props {
  dataSource: ContractOrderListItem[]
}
function CurrentEntrust(props: Props) {
  console.log('--dataSource--', props.dataSource)
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
        return (
          <span
            style={{
              color: Number(record.direction) === 1 ? buyColor : sellColor
            }}
          >
            {Number(record.direction) === 1 ? '买多' : '卖空'}
          </span>
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
    /* {
      title: '手续费',
      dataIndex: 'commission',
      key: 'commission',
      customRender({ text, record }) {
        return text + record.symbol_pricing
      }
    }, */
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
        return (
          <span
            style={{
              color: Number(text) > 1 ? buyColor : sellColor
            }}
          >
            {text + record.symbol_pricing}
          </span>
        )
      }
    }
  ]
  return (
    <div class="px-2 ant-deep-table ant-middle-table">
      <Table
        columns={columns}
        dataSource={props.dataSource}
        pagination={false}
      ></Table>
    </div>
  )
}
</script>
