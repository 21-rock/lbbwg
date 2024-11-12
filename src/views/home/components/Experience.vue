<script setup lang="ts">
import { getImageUrl } from '@/assets'

const items = [
  {
    title: '金融安全',
    desc: '全方位金融风控系统和防盗系统，冷热钱包、多签系统保证资金安全',
    icon: getImageUrl('exp-1.png')
  },
  {
    title: '极速充提',
    desc: '充值提现最快3分钟完成，24H人工在线审核，保护客户不错过最佳投资机会',
    icon: getImageUrl('exp-2.png')
  },
  {
    title: '全球服务',
    desc: '全球业务服务网络覆盖，助您投资全球加密资产，与全球用户交易',
    icon: getImageUrl('exp-3.png')
  },
  {
    title: '严选项目',
    desc: '严格选择优质加密项目，为您过滤80%极高风险项目',
    icon: getImageUrl('exp-4.png')
  }
]
</script>

<template>
  <div class="clearfix">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="float-left w-[25%] flex flex-col justify-center items-center px-6"
    >
      <div>
        <img :src="item.icon" class="w-auto h-[110px]" alt="" />
      </div>
      <p class="mt-3 text-xl font-bold text-white">{{ item.title }}</p>
      <span class="block w-[20px] h-1 bg-white mt-3 mb-3"></span>
      <p class="text-base text-gray-400">{{ item.desc }}</p>
    </div>
  </div>
</template>
