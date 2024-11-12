<script setup lang="ts">
import { getImageUrl } from '@/assets'
import { Carousel } from '@/components'
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay
} from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
const nodes = [
  getImageUrl('banner-1.png'),
  getImageUrl('banner-2.jpg'),
  getImageUrl('banner-3.png'),
  getImageUrl('banner-4.png')
]
// const controlledSwiper = ref(null)
// const setControlledSwiper = (swiper: any) => {
//   controlledSwiper.value = swiper
// }
const modules = [
  // controlledSwiper,
  // setControlledSwiper,
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard
]
// const controller = { control: controlledSwiper }
</script>

<template>
  <div class="relative index-banner">
    <Carousel
      :nodes="nodes"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false
      }"
      :slidesPerView="1"
      :spaceBetween="0"
      :loop="true"
      :pagination="{
        clickable: true
      }"
      :navigation="{
        enabled: true,
        prevEl: '.my-swiper-button-prev',
        nextEl: '.my-swiper-button-next'
      }"
      :mousewheel="true"
      :keyboard="true"
      :modules="modules"
    >
      <template #default="item">
        <div class="w-full h-full">
          <img :src="item" class="block w-full h-full" alt="" />
        </div>
      </template>
    </Carousel>
    <div class="my-swiper-button-prev">
      <LeftOutlined class="text-sm" />
    </div>
    <div class="my-swiper-button-next">
      <RightOutlined class="text-sm" />
    </div>
  </div>
</template>

<style lang="less">
.index-banner {
  // .swiper-pagination-bullet

  .swiper-pagination-bullet-active {
    padding: 0 8px;
    border-radius: 4px;
    background: #8391a5;
  }

  .my-swiper-button-prev,
  .my-swiper-button-next {
    display: flex;
    position: absolute;
    z-index: 10;
    top: 50%;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    transform: translateY(-50%);
    transition: background 0.2s;
    border-radius: 100%;
    background: rgb(31 45 61 / 11%);
    color: #fff;
    cursor: pointer;

    &:hover {
      background: rgb(31 45 61 / 100%);
    }
  }

  .my-swiper-button-prev {
    left: 24px;
  }

  .my-swiper-button-next {
    right: 24px;
  }
}
</style>
