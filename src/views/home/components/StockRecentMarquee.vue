<script lang="ts" setup>
import { Marquee } from '@/components'
import { Space } from 'ant-design-vue'

const items = [
  {
    title: 'BTC',
    amount: '$65803.89',
    percent: '(0.32%)'
  },
  {
    title: 'ETH',
    amount: '$2656.49',
    percent: '(-0.51%)'
  },
  {
    title: 'DOGE',
    amount: '$0.126615 ',
    percent: ' (-3.27%)'
  },
  {
    title: 'SKL',
    amount: '$0.04289 ',
    percent: '(-1.20%)'
  },
  {
    title: 'ACH',
    amount: '$0.0203 ',
    percent: ' (-3.15%)'
  },
  {
    title: 'LTC',
    amount: '$69.24',
    percent: ' (-0.71%)'
  },
  {
    title: 'MAGIC',
    amount: '$0.392',
    percent: ' (-1.54%)'
  },
  {
    title: 'STPT',
    amount: '$0.04884',
    percent: '(2.01%)'
  },
  {
    title: 'TRB',
    amount: '$74.95',
    percent: ' (-0.16%)'
  }
]
</script>

<template>
  <div class="w-full gradient">
    <Marquee :data="items">
      <template #default="record">
        <div class="inline-block px-6">
          <Space class="text-black text-[24px] leading-[58px]">
            <span>{{ record.title }}</span>
            <span>{{ record.amount }}</span>
            <span>{{ record.percent }}</span>
          </Space>
        </div>
      </template>
    </Marquee>
  </div>
</template>
