<script lang="ts" setup>
import { Logo } from '@/components'
import { FOOT_NAV_ITEMS } from '@/constant/nav'
import { Row, Col } from 'ant-design-vue'
</script>

<template>
  <!-- 适配PC端 -->
  <footer class="min-w-[1200px] pt-24 text-white bg-black">
    <div class="w-[1200px] my-0 mx-auto">
      <div>
        <Logo class="h-[42px] w-auto" />
      </div>
      <Row class="py-10">
        <Col :span="6" v-for="item in FOOT_NAV_ITEMS" :key="item.title">
          <h3 class="h-10 text-lg font-bold text-white">{{ item.title }}</h3>
          <span
            v-for="child in item.children"
            :key="child.title"
            class="block text-sm leading-8 text-gray-400"
          >
            {{ child.title }}
          </span>
        </Col>
      </Row>
    </div>
  </footer>
</template>
