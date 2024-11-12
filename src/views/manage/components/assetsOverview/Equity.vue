<script setup lang="ts">
import { getImageUrl } from '@/assets'

interface Props {
  balance: number
}

defineProps<Props>()

const imgUrl = getImageUrl('assets-1.png')
</script>

<template>
  <div
    class="w-full h-[392px] border-[1px] border-gray-300 rounded-[20px] flex flex-col justify-center items-center gap-10"
  >
    <img :src="imgUrl" alt="" class="w-[74px] h-auto" />
    <p>
      您的权益目前为 <span class="text-xl font-blod">{{ balance }}</span> USDT
    </p>
    <router-link
      to="/recharge"
      class="btn w-[255px] h-[48px] rounded-[24px] font-semibold"
    >
      充值数字货币
    </router-link>
  </div>
</template>
