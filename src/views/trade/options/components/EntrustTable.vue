<script lang="tsx">
import { getOptionOrderListApi, OptionOrderListItem } from '@/api/trade'
import { MyTabs } from '@/components'
import { useRequestByPage } from '@/hooks/useRequest'
import { tradeColor } from '@/utils/common'
import Table, { ColumnsType } from 'ant-design-vue/es/table'

export default defineComponent({
  setup() {
    const activeKey = ref('1')
    const { data } = useRequestByPage(getOptionOrderListApi, {
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
  dataSource: OptionOrderListItem[]
}
function CurrentEntrust(props: Props) {
  console.log('--dataSource--', props.dataSource)
  const { buyColor, sellColor } = tradeColor()
  const columns: ColumnsType<OptionOrderListItem> = [
    /* {
      title: '订单号',
      dataIndex: 'order_no',
      key: 'order_no'
    }, */
    {
      title: '时间',
      dataIndex: 'buy_time',
      key: 'buy_time'
    },
    {
      title: '交易对',
      dataIndex: 'symbol',
      key: 'symbol'
    },
    {
      title: '周期',
      dataIndex: 'buy_time',
      key: 'buy_time'
    },
    {
      title: '方向',
      dataIndex: 'direction',
      key: 'direction',
      customRender({ record }) {
        return (
          <span
            style={{
              color: Number(record.direction) === 1 ? buyColor : sellColor
            }}
          >
            {Number(record.direction) === 1 ? '买涨' : '买跌'}
          </span>
        )
      }
    },
    {
      title: '买入价格',
      dataIndex: 'buy_price',
      key: 'buy_price',
      customRender({ text, record }) {
        return text + record.symbol_pricing
      }
    },
    {
      title: '手续费',
      dataIndex: 'commission',
      key: 'commission',
      customRender({ text, record }) {
        return text + record.symbol_pricing
      }
    },
    {
      title: '交易数量',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: '结算金额',
      dataIndex: 'close_money',
      key: 'close_money'
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
