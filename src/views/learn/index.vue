<script lang="ts" setup>
/* 新手社区 */
import { getLearnListApi } from '@/api/help'
import { getIconUrl, getImageUrl } from '@/assets'
import { useMountedRequest } from '@/hooks/useRequest'
import { RightOutlined } from '@ant-design/icons-vue'
const img = getImageUrl('earn-2.png')

const { data } = useMountedRequest(
  getLearnListApi,
  {},
  {
    initState: {
      dictionary: [],
      beginner: []
    }
  }
)
</script>

<template>
  <article class="text-white bg-black">
    <section class="w-[1200px] mx-auto clearfix">
      <div class="float-left pt-[70px]">
        <h2 class="text-[44px]">玩转数字货币</h2>
        <p class="text-[18px] mt-3">
          新手攻略、交易进阶、操作指南就看UZX新手学院
        </p>
      </div>
      <div class="float-right">
        <img :src="getImageUrl('lean-1.png')" class="w-[465px] h-auto" alt="" />
      </div>
    </section>
    <!-- <section class="w-[1200px] mx-auto mt-[130px]">
      <h2 class="text-[32px] font-bold mb-[30px]">主题课堂</h2>
      <div class="clearfix">
        <div
          class="w-[678px] h-[380px] border border-[hsla(0,0%,40%,.2)] float-left"
        >
          <video
            data-v-7bb23a20=""
            src="https://uzx.oss-cn-hongkong.aliyuncs.com/2023/09/14/eff624dc-f49b-4a90-ad6e-0a0d82d31c49.mp4"
            poster="https://uzx.oss-cn-hongkong.aliyuncs.com/2023/09/14/c6e993ad-b925-433f-92e3-5e8098d66090.png"
            controls="controls"
            class="w-full h-full"
          ></video>
        </div>
        <div class="w-[466px] float-right">
          <ul class="flex flex-col gap-6">
            <li
              v-for="(item, index) in topicList"
              :key="index"
              class="flex gap-2 h-[87px]"
            >
              <img
                data-v-7bb23a20=""
                :src="item.img"
                class="w-[156px] h-full"
              />
              <div class="flex flex-col justify-between flex-1">
                <p class="text-base font-bold">{{ item.title }}</p>
                <em class="text-xs not-italic font-normal text-gray-400">{{
                  item.time
                }}</em>
              </div>
            </li>
          </ul>
          <RouterLink
            to=""
            class="block w-[120px] h-[36px] text-sm leading-[34px] text-center border border-blue rounded-[18px] mt-6"
          >
            查看更多
          </RouterLink>
        </div>
      </div>
    </section> -->
    <section class="w-[1200px] mx-auto mt-[130px]">
      <div class="flex justify-between mb-[30px]">
        <h2 class="text-[32px] font-bold">新手必读</h2>
        <RouterLink to="/beginner" class="text-base text-blue">
          <span class="align-middle">查看更多</span>
          <RightOutlined class="align-middle relative top-[2px]" />
        </RouterLink>
      </div>
      <ul class="grid grid-cols-3 gap-6">
        <li v-for="item in data.beginner" :key="item.id">
          <RouterLink
            :to="`/article/learn/${item.id}?title=新手必读`"
            class="block"
          >
            <div class="text-center">
              <img
                data-v-7bb23a20=""
                :src="item.cover || img"
                class="inline-block w-auto h-[210px]"
              />
            </div>
            <div class="flex flex-col justify-between flex-1">
              <p class="my-3 text-base font-bold">{{ item.title }}</p>
              <em class="text-xs not-italic font-normal text-gray-400">{{
                item.create_time
              }}</em>
            </div>
          </RouterLink>
        </li>
      </ul>
    </section>
    <section class="w-[1200px] mx-auto mt-[130px]">
      <div class="flex justify-between mb-[30px]">
        <h2 class="text-[32px] font-bold">区块链词典</h2>
        <RouterLink to="/glossary" class="text-base text-blue">
          <span class="align-middle">查看更多</span>
          <RightOutlined class="align-middle relative top-[2px]" />
        </RouterLink>
      </div>
      <ul class="grid grid-cols-2 gap-[30px]">
        <li v-for="item in data.dictionary" :key="item.id">
          <RouterLink
            :to="`/article/learn/${item.id}?title=区块链词典`"
            class="h-[144px] p-[30px] flex flex-col justify-between bg-[hsla(0,0%,40%,.2)]"
          >
            <h3 class="text-6">{{ item.title }}</h3>
            <!-- <div class="text-sm leading-[22px] ellipsis-2 max-h-[44px]">
            <p>什么是UMA？</p>
            <p>什么是UMA？</p>
            <p>什么是UMA？</p>
            <p>什么是UMA？</p>
          </div> -->
            <div class="text-sm leading-[22px] ellipsis-2 max-h-[44px]">
              <p>{{ item.create_time }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </section>
    <section class="mt-[130px] bg-[hsla(0,0%,40%,.2)]">
      <div class="w-[1200px] mx-auto h-[406px] relative">
        <img
          :src="getIconUrl('icon-34.png')"
          alt=""
          class="absolute top-0 right-0"
        />
        <img
          :src="getIconUrl('icon-35.png')"
          alt=""
          class="absolute bottom-0 left-0"
        />
        <div class="flex flex-col items-center justify-center h-full">
          <p class="text-[32px] font-bold mb-[80px]">还未解决您的问题</p>
          <RouterLink
            to="/help/helpCenter"
            class="btn w-[284px] h-[48px] rounded-[24px] text-base font-bold"
            >去帮助中心</RouterLink
          >
        </div>
      </div>
    </section>
  </article>
</template>
<style lang="less" scoped></style>
