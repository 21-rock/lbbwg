<script setup lang="ts">
import { getImageUrl } from '@/assets'
import { RightOutlined } from '@ant-design/icons-vue'
const img2 = getImageUrl('assets-2.png')
</script>

<template>
  <div
    class="wrapper relative w-full h-[96px] border-[1px] border-gray-300 rounded-[20px] flex flex-col justify-center p-5"
  >
    <p class="text-black text-[17px] font-bold">
      储备金证明 <RightOutlined class="text-[12px]" />
    </p>
    <p class="text-gray-400 text-[13px] mt-[8px]">100%储备金证明</p>
    <img
      :src="img2"
      class="absolute right-[30px] top-[16px] w-[134px] h-auto"
      alt=""
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background-image: linear-gradient(
    104deg,
    #fffbf2 5.49%,
    rgb(255 251 242 / 10%) 97.03%
  );
}
</style>
