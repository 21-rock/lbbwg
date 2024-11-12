<script lang="tsx">
import { MyTabs } from '@/components'
import { CurrencyPrice } from '@/model/tradeModel'
import { DownOutlined, SearchOutlined } from '@ant-design/icons-vue'
import {
  Input,
  PaginationProps,
  Popover,
  Table,
  TableColumnProps
} from 'ant-design-vue'
import { PropType, SetupContext } from 'vue'
import useMarket from '@/hooks/useMarket'

export default defineComponent({
  props: {
    currency: String,
    logo: String
  },
  emits: ['rowClick'],
  setup: (props, { emit }) => {
    const {
      tickerList,
      pagination,
      tabPages,
      activeKey,
      getMarketsData: getSymbolList,
      stopMarketsData,
      onPageChange,
      onSearch
    } = useMarket()

    const visible = ref(false)
    const inputValue = ref<string>()
    const handleSearch = () => {
      onSearch(inputValue.value)
    }

    watch(
      () => visible.value,
      (cur) => {
        if (cur) {
          getSymbolList()
        } else {
          stopMarketsData(activeKey.value)
        }
      }
    )

    /*  onMounted(() => {
      console.log('--getSymbolList--')
      getSymbolList()
    }) */

    return () => (
      <Popover
        placement="bottom"
        overlayClassName="tradeview-overlay"
        color="#131313"
        trigger={['click']}
        v-model:visible={visible.value}
        title={
          <Input
            class="search-input"
            placeholder="请输入币种名称"
            v-model:value={inputValue.value}
          >
            {{
              suffix: () => (
                <SearchOutlined
                  class={'cursor-pointer text-white'}
                  onClick={handleSearch}
                />
              )
            }}
          </Input>
        }
        content={
          <div class="overflow-hidden w-[400px]">
            <MyTabs
              size="small"
              theme="deep"
              tab-pages={tabPages.value}
              v-model:active-key={activeKey.value}
            >
              {{
                content: () => (
                  <div class="overflow-hidden h-[392px] w-full">
                    <TableContainer
                      dataSource={tickerList.value}
                      pagination={pagination}
                      onClick={(record: CurrencyPrice) => {
                        visible.value = false
                        emit('rowClick', record)
                      }}
                      onChange={(page: number) => onPageChange(page)}
                    />
                  </div>
                )
              }}
            </MyTabs>
          </div>
        }
      >
        <div class={'h-full flex items-center gap-2 text-white cursor-pointer'}>
          {props.logo && (
            <img src={props.logo} class={'w-[24px] h-auto'} alt="" />
          )}
          <span class={'text-xl font-bold'}>{props.currency}</span>
          <DownOutlined class={'text-sm'} />
        </div>
      </Popover>
    )
  }
})
// tickerList

type TableContainerProps = {
  dataSource: CurrencyPrice[]
  pagination: PaginationProps
  onClick: (value: CurrencyPrice) => void
  onChange: (value: number) => void
}

type TableContainerEvents = {
  click(value: CurrencyPrice): void
  change(value: number): void
}
function TableContainer(
  props: TableContainerProps,
  context: SetupContext<TableContainerEvents>
) {
  const columns: TableColumnProps<CurrencyPrice>[] = [
    {
      dataIndex: 'symbol',
      key: 'symbol',
      title: '币种',
      width: '40%',
      align: 'left'
    },
    {
      dataIndex: 'lastPrice',
      key: 'lastPrice',
      title: '最新价',
      width: '30%'
    },
    {
      dataIndex: 'rate',
      key: 'c',
      title: '24h涨跌',
      width: '30%',
      align: 'right',
      customRender: ({ text }) => {
        if (text < 0) {
          return <span class="text-[#EE3E57]">{text.toFixed(2)}</span>
        }
        return <span class="text-[#0BBA99]">{text.toFixed(2)}</span>
      }
    }
  ]
  return (
    <div class="small-wrap deep-wrap">
      <Table
        size="small"
        columns={columns}
        dataSource={props.dataSource}
        class="ant-deep-table"
        rowClassName="cursor-pointer"
        pagination={{
          ...props.pagination,
          showSizeChanger: false
        }}
        customRow={(record) => {
          return {
            onClick: () => context.emit('click', record) // 点击行
          }
        }}
        onChange={(page) => {
          context.emit('change', page.current as number)
        }}
      />
      {/* <div class={'flex justify-end '}>
        <Pagination
          {...props.pagination}
          onChange={(current) => context.emit('change', current)}
        ></Pagination>
      </div> */}
    </div>
  )
}
TableContainer.props = {
  dataSource: {
    type: Array as PropType<CurrencyPrice[]>,
    default: () => []
  },
  pagination: {
    type: Object as PropType<PaginationProps>
  }
}
TableContainer.emits = {
  click: (value: CurrencyPrice) => typeof value === 'string',
  change: (value: number) => typeof value === 'string'
}
</script>

<style lang="scss">
.tradeview-overlay {
  left: 20px !important;

  .ant-popover-arrow {
    z-index: 2;
    top: 1px;
    overflow: visible;

    .ant-popover-arrow-content {
      display: block;
      position: absolute;
      z-index: 1;
      top: 6px;
      left: -2px;
      width: 20px;
      height: 10px;
      background: #313131;
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
    }

    &::before {
      z-index: 2;
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
    }
  }

  .ant-popover-inner {
    border: 1px solid #313131;
    color: #fff;
  }

  .search-input {
    border-color: #313131;
    background: none;
    color: #fff;

    .ant-input {
      border-color: #313131;
      background: none;
      color: #fff;
      font-weight: normal;

      &::placeholder {
        color: #666;
      }
    }
  }
}
</style>
