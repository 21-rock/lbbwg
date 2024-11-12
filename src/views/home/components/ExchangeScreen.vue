<script lang="ts" setup>
import { getImageUrl } from '@/assets'
import { useWindowScroll } from '@vueuse/core'
import { throttle } from 'lodash-es'

const image4 = getImageUrl('index-4.png')
const image5 = getImageUrl('index-5.png')

const { y } = useWindowScroll()

const scroll = throttle(() => {
  const el = document.querySelector('#exchange')

  if (el) {
    const e = el.getBoundingClientRect()
    const img = el?.querySelector('img')
    if (e.top < -30) {
      img!.style.cssText =
        'transform: perspective(3300px) rotateX(0deg) translateY(0px) translateZ(0px); opacity: 1;'
    } else if (e.top < 0) {
      img!.style.cssText =
        'transform: perspective(3300px) rotateX(-38.4623deg) translateY(110.9px) translateZ(-185.901px); opacity: 0.807688;'
    } else {
      img!.style.cssText =
        'transform: perspective(3300px) rotatex(-60deg) translateY(173px) translateZ(-290px);'
    }
  }
}, 30)

watch(
  () => y.value,
  () => {
    scroll()
  }
)
</script>

<template>
  <div id="exchange">
    <h2 class="text-5xl text-center">
      <span class="tracking-widest title-gradient">
        全球领先数字货币交易所
      </span>
    </h2>
    <p class="mt-6 mb-12 text-xl font-normal text-center text-white">
      专业交易，操作简单，让你轻松了解数字交易
    </p>
    <div
      class="w-[1124px] h-[701px] mx-auto"
      :style="{
        background: `url(${image4}) no-repeat  center 0`,
        backgroundSize: 'contain'
      }"
    >
      <img class="img-5" :src="image5" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.img-5 {
  width: 100%;
  transform: perspective(3300px) rotateX(-60deg) translateY(173px)
    translateZ(-290px);
  transition: all 0.1s linear;
  border-radius: 20px 20px 0 0;
  opacity: 0.7;
}
</style>
