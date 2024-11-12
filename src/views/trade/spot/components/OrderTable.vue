<script lang="tsx">
import { getIconUrl } from '@/assets'
import { MyTabs } from '@/components'
import { Col, Row } from 'ant-design-vue'
import { useOrder } from '../hooks/useOrder'
import { TradeOrderItem } from '@/model/tradeModel'
import { tradeColor } from '@/utils/common'

export default defineComponent({
  props: {
    currency: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const active = ref<'all' | 'buy' | 'sell'>('all') // 1-全部  2-卖 3-买

    const activeKey = ref('1')
    const currency = computed(() => props.currency)

    const { orderList, getMarketsData, stopMarketsData } = useOrder(currency)

    watch(
      () => currency.value,
      () => {
        stopMarketsData('trade')
        getMarketsData()
      }
    )

    onMounted(() => {
      getMarketsData()
    })

    return () => {
      const tabPages = [
        {
          key: '1',
          tab: '订单表',
          content: (
            <Order
              currency={currency.value}
              active={active.value}
              onChange={(v: 'all' | 'buy' | 'sell') => (active.value = v)}
              dataSource={orderList.value}
            />
          )
        }
        // {
        //   key: '2',
        //   tab: '最新成交',
        //   content: <div>刷卡机粉红色的开发</div>
        // }
      ]
      return (
        <div class="w-full h-full overflow-hidden">
          <MyTabs
            class="my-tabs-deep-medium"
            tab-pages={tabPages}
            v-model:active-key={activeKey.value}
          >
            {{
              content: ({ content }: any) => content
            }}
          </MyTabs>
        </div>
      )
    }
  }
})

function Order(props: {
  currency: string
  active: 'all' | 'buy' | 'sell'
  dataSource: TradeOrderItem[]
  onChange: (value: 'all' | 'buy' | 'sell') => void
}) {
  const columns = computed(() => {
    const arr = props.currency.split('/')
    return [
      {
        dataIndex: 'price',
        title: `价格(${arr[1]})`,
        style: {
          textAlign: 'left'
        }
      },
      {
        dataIndex: 'amount',
        title: `数量(${arr[0]})`,
        style: {
          textAlign: 'right'
        }
      }
    ]
  })

  const data = computed(() =>
    props.dataSource.filter(
      (item) => props.active === 'all' || item.direction === props.active
    )
  )

  const { buyColor, sellColor } = tradeColor()

  const _items = [
    {
      type: 'all',
      icon: getIconUrl('icon-trade-1.png'),
      activeIcon: getIconUrl('icon-trade-active-1.png')
    },
    {
      type: 'buy',
      icon: getIconUrl('icon-trade-2.png'),
      activeIcon: getIconUrl('icon-trade-active-2.png')
    },
    {
      type: 'sell',
      icon: getIconUrl('icon-trade-3.png'),
      activeIcon: getIconUrl('icon-trade-active-3.png')
    }
  ] as const
  return (
    <div class={'px-3'}>
      {/* <div class={'px-3'}>
        <div
          class={
            'flex items-center bg-[#242424] rounded-[15px] p-[3px] mt-2 w-[150px]'
          }
        >
          {items.map((item) => (
            <span
              class={`block px-4 py-1 rounded-[12px] cursor-pointer  ${props.active === item.type ? 'bg-[#333]' : ''}`}
              onClick={() => props.onChange(item.type)}
            >
              <img src={item.icon} class={'block w-[16px] h-[16px]'} />
            </span>
          ))}
        </div>
      </div> */}
      <div>
        <Row class={'px-3 py-3'}>
          {columns.value.map((item) => (
            <Col
              span={12}
              key={item.dataIndex}
              style={item.style}
              class="leading-6"
            >
              <span class={'text-xs text-white'}>{item.title}</span>
            </Col>
          ))}
        </Row>

        <ul>
          {data.value.map((dataItem, index) => (
            <li key={index} class="my-[2px] relative">
              <Row class={'px-3 relative z-10'}>
                {columns.value.map((item) => (
                  <Col
                    key={item.dataIndex}
                    span={12}
                    style={item.style}
                    class="leading-6"
                  >
                    <span class={'text-xs text-white'}>
                      {dataItem[item.dataIndex as keyof TradeOrderItem]}
                    </span>
                  </Col>
                ))}
              </Row>
              <div
                class={
                  'absolute top-0 bottom-0 right-0 w-[100%] bg-[#de4a56] bg-opacity-50 rounded-[4px]'
                }
                style={{
                  backgroundColor:
                    dataItem.direction === 'buy' ? buyColor : sellColor
                }}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
</script>

<style lang="scss">
.my-tabs-deep-medium {
  background: none;

  .m-tabs-nav {
    margin-bottom: 0 !important;

    &::before {
      border-color: #313131 !important;
    }

    .tabs-nav-wrap {
      .tab-item {
        margin-left: 16px !important;
        padding: 10px 12px !important;
        color: #eee;
        font-size: 14px !important;

        &:first-child {
          margin-left: 0 !important;
        }

        &.tab-line-active,
        &:hover {
          color: #fff !important;
          font-weight: normal !important;
        }
      }

      .tab-bar {
        background: #fff !important;
      }
    }
  }
}
</style>
