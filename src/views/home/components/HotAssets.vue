<script lang="ts" setup>
import { CoinItem } from '@/api/coin'
import { getIconUrl, getImageUrl } from '@/assets'
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
  <div class="w-[1200px] mx-auto">
    <h2 class="relative text-5xl text-center">
      <span class="tracking-widest title-gradient"> 热门资产 </span>
      <router-link
        to="/coin-rank"
        class="absolute right-0 top-[50%] translate-y-[-50%] text-[#1daefe] text-base"
      >
        查看更多
      </router-link>
    </h2>
    <div class="grid grid-cols-3 gap-12 mt-[60px]">
      <div
        v-for="(item, index) in options"
        :key="index"
        :style="{
          background: `no-repeat  url(${getImageUrl('index-bg-2.png')}) center center`,
          backgroundSize: '100% 100%'
        }"
        class="h-[566px] p-5"
      >
        <div>
          <h3
            :style="{
              background: `no-repeat  url('${item.icon}') left center`
            }"
            class="pl-10 text-[20px] text-white font-bold mb-[15px]"
          >
            {{ item.title }}
          </h3>
        </div>
        <ul>
          <li
            v-for="(c, i) in item.data"
            :key="i"
            class="h-[78px] flex items-center justify-between text-white"
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

              <p v-if="c.rate.startsWith('-')" class="text-base text-[red]">
                {{ c.rate }}
              </p>
              <p class="text-base text-[green]" v-else>{{ c.rate }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped></style>
