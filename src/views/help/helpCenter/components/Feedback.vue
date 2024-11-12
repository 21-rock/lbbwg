<script lang="ts" setup></script>

<template>
  <div>
    <h2 class="text-[32px] text-center text-white">反馈意见</h2>
    <p class="mt-6 text-xl text-center text-gray-400">欢迎提交产品意见和Bug</p>
    <div class="flex justify-center gap-[42px] mt-[60px]">
      <RouterLink
        to="/"
        class="w-[284px] h-[48px] rounded-[24px] flex-center border-[1px] border-[#1fa2ff] bg-black text-white"
        >我的工单</RouterLink
      >
      <RouterLink
        to="/help/feedback"
        class="btn w-[284px] h-[48px] rounded-[24px] flex-center border-[1px] border-[#1fa2ff]"
        >去提交</RouterLink
      >
    </div>
  </div>
</template>
