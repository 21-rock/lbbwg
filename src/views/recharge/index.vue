<script setup lang="ts">
import { useRequestByPage } from '@/hooks/useRequest'
import { Deposit, Recording } from './components'
import { getRechargeRecordsApi } from '@/api/wallet'
const { data, reload, pagination, onPageChange } = useRequestByPage(
  getRechargeRecordsApi
)
</script>

<template>
  <div class="w-[1200px] mx-auto pt-[70px] pb-[130px]">
    <h1 class="font-bold text-[32px]">充币</h1>
    <div class="mt-6 mb-10">
      <Deposit @rechargeSuccess="reload" />
    </div>
    <div>
      <h3 class="text-[20px] text-black font-bold mb-[20px]">充值记录</h3>
      <Recording
        :data-source="data"
        :pagination="pagination"
        @change="onPageChange"
      />
    </div>
  </div>
</template>
