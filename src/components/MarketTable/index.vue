<script setup lang="ts">
// import { LineChart } from '@/components'
import { CurrencyPrice } from '@/model/tradeModel'
import { tradeColor } from '@/utils/common'
import { FallOutlined, RiseOutlined } from '@ant-design/icons-vue'
import { Table, TableColumnType } from 'ant-design-vue'

const router = useRouter()
const { buyColor, sellColor } = tradeColor()

const columns: TableColumnType<CurrencyPrice>[] = [
  {
    dataIndex: 'symbol',
    key: 'symbol',
    title: '币种',
    width: '16%',
    customRender({ record }) {
      return h(
        'div',
        {
          class: 'flex items-center gap-2'
        },
        {
          default: () => [
            h('img', {
              src: record.logo,
              class: 'block w-[24px] h-[24px] rounded-[50%]'
            }),
            h(
              'span',
              {
                class: 'block leading-[24px]'
              },
              { default: () => record.symbol }
            )
          ]
        }
      )
    }
  },
  {
    dataIndex: 'lastPrice',
    key: 'lastPrice',
    title: '最新价'
  },
  {
    dataIndex: 'high',
    key: 'high',
    title: '24H最高'
  },
  {
    dataIndex: 'low',
    key: 'low',
    title: '24H最低'
  },
  {
    dataIndex: 'amount',
    key: 'amount',
    title: '24H量'
  },
  /* {
    dataIndex: 'vol',
    key: 'vol',
    title: '流通市值',
    width: '24%'
  }, */
  {
    dataIndex: 'rate',
    key: 'rate',
    title: '24h涨跌',
    customRender({ record }) {
      return h(
        'div',
        {
          class: 'flex items-center gap-1',
          style: {
            color: record.rate > 0 ? buyColor : sellColor
          }
        },
        {
          default: () => [
            h(
              'span',
              {
                class: 'block'
              },
              { default: () => record.rate }
            ),
            h(record.rate > 0 ? RiseOutlined : FallOutlined, {
              src: record.logo,
              class: 'block text-sm'
            })
          ]
        }
      )
    }
  },
  {
    dataIndex: 'operate',
    key: 'operate',
    title: '操作',
    width: '90px',
    align: 'right',
    customRender({ record }) {
      return h(
        'span',
        {
          class:
            'inline-flex justify-center items-center bg-black text-white h-[30px] w-[48px] rounded-[15px] cursor-pointer',
          onClick: () => {
            router.push({
              path: '/trade/spot',
              query: {
                currency: record.symbol
              }
            })
          }
        },
        { default: () => '交易' }
      )
    }
  }
]
</script>

<template>
  <Table :columns="columns" v-bind="$attrs"> </Table>
</template>
