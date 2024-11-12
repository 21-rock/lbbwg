<script setup lang="ts">
import { Table, TableColumnType } from 'ant-design-vue'
import Chart from './Chart.vue'

const options = [
  {
    label: '自选',
    value: '1'
  },
  {
    label: '主流币',
    value: '2'
  },
  {
    label: '热门榜',
    value: '3'
  },
  {
    label: '涨幅榜',
    value: '4'
  },
  {
    label: '新币榜',
    value: '5'
  },
  {
    label: '成交额榜',
    value: '6'
  }
]
const checked = ref('1')
const onChange = (value: string) => {
  checked.value = value
}

const columns: TableColumnType[] = [
  {
    dataIndex: 'a',
    key: 'a',
    title: '币种'
  },
  {
    dataIndex: 'b',
    key: 'b',
    title: '最新价'
  },
  {
    dataIndex: 'c',
    key: 'c',
    title: '24h涨跌'
  },
  {
    dataIndex: 'd',
    key: 'd',
    title: '市值'
  },
  {
    dataIndex: 'e',
    key: 'e',
    title: '24h交易额'
  },
  {
    dataIndex: 'f',
    key: 'f',
    title: '价格趋势',
    customRender: ({ index }) => {
      return h(Chart, { isRise: index % 2 === 0 })
    }
  },
  {
    dataIndex: 'g',
    key: 'g',
    title: '交易'
  }
]

let base = +new Date(1968, 9, 3)
let oneDay = 24 * 3600 * 1000
let date = []
let data = []
for (let i = 1; i < 30; i++) {
  const now = new Date((base += oneDay))
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
  data.push(Math.round((Math.random() + 0.5) * 20))
}

const dataSource = [
  {
    a: 'BULL/USDT',
    b: '$0.0835',
    c: '-4.79%',
    date,
    data
  },
  {
    a: 'BULL/USDT',
    b: '$0.0835',
    c: '-4.79%',
    date,
    data
  }
]
</script>

<template>
  <div>
    <ul class="flex gap-4">
      <li
        v-for="item in options"
        :key="item.value"
        class="text-sm/[28px] text-gray-400 px-3 border-[1px] border-[#d2d2d2] bg-gray-100 rounded-[15px] cursor-pointer"
        :class="
          checked === item.value ? '!bg-black !border-black !text-white' : ''
        "
        @click="onChange(item.value)"
      >
        {{ item.label }}
      </li>
    </ul>
    <Table :columns="columns" :dataSource="dataSource"> </Table>
  </div>
</template>
