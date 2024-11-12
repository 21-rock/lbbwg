<script setup lang="ts">
import { Withdraw, Recording } from './components'
</script>

<template>
  <div class="w-[1200px] mx-auto pt-[70px] pb-[130px]">
    <h1 class="font-bold text-[32px]">提币</h1>
    <div class="mt-6 mb-10">
      <Withdraw />
    </div>
    <div>
      <h3 class="text-[20px] text-black font-bold mb-[20px]">提现记录</h3>
      <Recording />
    </div>
  </div>
</template>
