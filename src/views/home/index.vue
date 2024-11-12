<script setup lang="tsx">
import { getImageUrl } from '@/assets'
import {
  Banner,
  ExchangeScreen,
  Experience,
  FirstSection,
  HotAssets,
  Newcomers,
  Question,
  ServiceProduct,
  StockRecentMarquee
} from './components'
import { useMountedRequest } from '@/hooks/useRequest'
import { getHomeDataApi } from '@/api/home'
import { useInjectIsLogin } from '@/hooks/useIsLogin'

import { CoinItem, geTopCoinApi, getNewCoinApi, getRankApi } from '@/api/coin'
import { getMarketApi } from '@/api/market'

const imageBg1 = getImageUrl('index-bg-1.png')
const image8 = getImageUrl('index-8.png')

const isLogin = useInjectIsLogin()

const { data } = useMountedRequest(getHomeDataApi)
console.log(data)

const topCoin = ref<CoinItem[]>([]) // 热门榜
const newCoin = ref<CoinItem[]>([]) // 新币榜
const rankCoin = ref<CoinItem[]>([]) // 排行榜

const getData = async () => {
  const [topCoinRes, newCoinRes, rankCoinRes] = await Promise.all([
    geTopCoinApi(),
    getNewCoinApi(),
    getRankApi()
  ])
  // const marketRes = await getMarketApi()
  topCoin.value = topCoinRes.data || []
  newCoin.value = newCoinRes.data || []
  rankCoin.value = rankCoinRes.data || []

  // console.log('--marketRes--', marketRes)
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="min-h-full bg-black full-container min-w-[1200px]">
    <div class="w-[1200px] mx-auto py-10">
      <FirstSection />
    </div>
    <!-- 股票滚动信息 -->
    <div class="w-full">
      <StockRecentMarquee />
    </div>
    <!-- 货币交易所 -->
    <div v-if="!isLogin" class="mt-[100px]">
      <ExchangeScreen />
    </div>
    <!-- 热门资产 -->
    <div v-if="isLogin" class="mt-[100px]">
      <HotAssets :topCoin="topCoin" :newCoin="newCoin" :rankCoin="rankCoin" />
    </div>
    <!-- 新人专享 -->
    <div class="mt-[100px]">
      <Newcomers />
    </div>
    <!-- 产品和服务 -->
    <div class="mt-[100px]">
      <h2 class="text-5xl text-center">
        <span class="tracking-widest title-gradient">
          发现我们的产品和服务
        </span>
      </h2>
      <div class="w-[1200px] mx-auto mt-[100px]">
        <ServiceProduct />
      </div>
    </div>
    <!-- banner -->
    <div class="mt-[20px]">
      <div class="w-[1200px] h-[400px] rounded-[10px] overflow-hidden mx-auto">
        <Banner />
      </div>
    </div>
    <!-- 提升用户交易体验，保护用户资产安全 -->
    <div class="mt-[100px]">
      <h2 class="text-5xl text-center">
        <span class="tracking-widest title-gradient">
          提升用户交易体验，保护用户资产安全
        </span>
      </h2>
      <div class="w-[1200px] mx-auto mt-[100px]">
        <Experience />
      </div>
    </div>
    <!-- 常见问题 -->
    <div class="mt-[100px]">
      <h2 class="text-5xl text-center">
        <span class="tracking-widest title-gradient"> 常见问题 </span>
      </h2>
      <div class="w-[1200px] mx-auto mt-[30px]">
        <Question />
      </div>
    </div>
    <!-- 开启你的交易之旅 -->
    <div class="mt-[60px] bg-[#0e0e11]">
      <div class="w-[1124px] mx-auto clearfix">
        <div
          :class="`float-left h-[532px] flex flex-col justify-center items-center gap-20 ${isLogin ? 'w-[60%]' : 'w-[50%]'}`"
          :style="{
            background: `no-repeat url('${imageBg1}') center`,
            backgroundSize: 'cover'
          }"
        >
          <h2 class="text-5xl text-center">
            <span class="tracking-widest title-gradient">
              {{ isLogin ? '玩转UZX宇宙 交易随时随地' : '开启你的交易之旅' }}
            </span>
          </h2>
          <div
            class="btn w-[238px] h-[54px] text-[20px] rounded-[27px] overflow-hidden"
          >
            <span
              class="block w-[236px] leading-[52px] bg-black text-white rounded-[26px]"
            >
              <span v-if="!isLogin">立即注册</span>
              <span v-else>充值数字货币</span>
            </span>
          </div>
        </div>
        <div
          :class="`float-right  h-[532px] flex justify-center items-center  ${isLogin ? 'w-[40%]' : 'w-[50%]'}`"
        >
          <img :src="image8" class="block w-[296px] h-auto" />
        </div>
      </div>
    </div>
  </div>
</template>
