<script setup lang="ts">
import { getIconUrl } from '@/assets'
import { RightOutlined } from '@ant-design/icons-vue'
import { Col, Row } from 'ant-design-vue'

const items = [
  {
    title: 'X',
    icon: getIconUrl('community-0.png'),
    cnUrl: 'https://x.com/uzxchinese',
    enUrl: 'https://x.com/uzx_official'
  },
  {
    title: 'Instagram',
    icon: getIconUrl('community-1.png'),
    cnUrl:
      'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fuzx.chinese%2F&is_from_rle',
    enUrl:
      'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fuzx_official%2F&is_from_rle'
  },
  {
    title: 'Discord',
    icon: getIconUrl('community-2.png'),
    enUrl: 'https://discord.com/invite/mEY9sgYvne'
  },
  {
    title: 'Telegram',
    icon: getIconUrl('community-3.png'),
    cnUrl: 'https://t.me/uzxofficial_chinese',
    enUrl: 'https://t.me/uzxofficial_english'
  },
  {
    title: 'Youtube',
    icon: getIconUrl('community-4.png'),
    enUrl: 'https://www.youtube.com/@UZX-Official'
  },
  {
    title: 'Facebook',
    icon: getIconUrl('community-5.png'),
    enUrl: 'https://www.facebook.com/UZXOfficial'
  },
  {
    title: 'Trades',
    icon: getIconUrl('community-6.png'),
    enUrl: 'https://www.threads.net/@uzx_official'
  }
]
</script>

<template>
  <div class="w-[560px] mx-auto pt-12">
    <section v-for="item in items" :key="item.title" class="mb-12">
      <h3
        :style="{
          background: `no-repeat url('${item.icon}') left center`,
          backgroundSize: '26px'
        }"
        class="pl-[32px] text-xl text-black font-[600] mb-4"
      >
        {{ item.title }}
      </h3>
      <Row :gutter="30">
        <Col :span="12" v-if="item.cnUrl">
          <a
            :href="item.cnUrl"
            target="blank"
            class="w-full h-10 border-[1px] border-black text-black flex justify-between items-center px-[14px] hover:text-black"
          >
            <span>中文</span>
            <RightOutlined />
          </a>
        </Col>
        <Col :span="12" v-if="item.enUrl">
          <a
            :href="item.enUrl"
            target="blank"
            class="w-full h-10 border-[1px] border-black text-black flex justify-between items-center px-[14px] hover:text-black"
          >
            <span>英文</span>
            <RightOutlined />
          </a>
        </Col>
      </Row>
    </section>
  </div>
</template>
