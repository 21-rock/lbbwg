<script lang="ts" setup>
import { CoinItem } from '@/api/coin'
import { getIconUrl } from '@/assets'
import { Space } from 'ant-design-vue'

interface Props {
  topCoin: CoinItem[]
  newCoin: CoinItem[]
  rankCoin: CoinItem[]
}

const props = withDefaults(defineProps<Props>(), {
  topCoin: () => [],
  newCoin: () => [],
  rankCoin: () => []
})

const options = computed(() => [
  {
    title: '热门榜',
    icon: getIconUrl('assets-icon-1.png'),
    data: props.topCoin
  },
  {
    title: '新币榜',
    icon: getIconUrl('assets-icon-2.png'),
    data: props.newCoin
  },
  {
    title: '涨幅榜',
    icon: getIconUrl('assets-icon-3.png'),
    data: props.rankCoin
  }
])
</script>

<template>
  <div class="grid grid-cols-3 gap-12">
    <div
      v-for="(item, index) in options"
      :key="index"
      :style="{
        backgroundImage: `linear-gradient(130deg, #e9e9e9, #fff 80%);`
      }"
      class="h-[566px] p-5 border border-gray-200 rounded-[8px]"
    >
      <div>
        <h3
          :style="{
            background: `no-repeat  url('${item.icon}') left center`
          }"
          class="pl-10 text-[20px] text-black font-bold mb-[15px]"
        >
          {{ item.title }}
        </h3>
      </div>
      <ul>
        <li
          v-for="(c, i) in item.data"
          :key="i"
          class="h-[78px] flex items-center justify-between text-black"
        >
          <Space>
            <div class="text-[18px] font-bold">{{ i + 1 }}</div>
            <img :src="c.logo" class="w-6 h-6" />
            <div class="text-[18px] font-bold">
              {{ c.symbol }}
            </div>
          </Space>
          <div>
            <!-- <p class="text-base">{{ c.diff }}</p> -->

            <p v-if="c.rate.startsWith('-')" class="text-base text-[green]">
              {{ c.rate }}
            </p>
            <p class="text-base text-[red]" v-else>{{ c.rate }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped></style>
