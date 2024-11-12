<script setup lang="ts">
import { LOCALE_ITEMS } from '@/constant/locale'
import { getIconUrl } from '@/assets'
import useLocaleStore from '@/store/localeStore'
import { Modal, Row, Col } from 'ant-design-vue'
import { LocaleEnum } from '@/enums/locale'

const icon = getIconUrl('icon-20.png')
const visible = ref(false)
const showModal = () => {
  visible.value = true
}

const localeStore = useLocaleStore()
const changeLocale = (temp: LocaleEnum) => {
  localeStore.setLocale(temp)
}
</script>

<template>
  <a class="block" @click.prevent="showModal">
    <img :src="icon" alt="locale" class="w-6 h-6" />
  </a>
  <Modal
    v-model:open="visible"
    title="语言"
    :footer="false"
    width="760px"
    @cancel="visible = false"
  >
    <div class="p-4">
      <Row :gutter="[20, 20]">
        <Col :span="6" v-for="item in LOCALE_ITEMS" :key="item.value">
          <a
            href="javascript:;"
            class="text-base"
            @click.prevent="changeLocale(item.value)"
          >
            {{ item.title }}
          </a>
        </Col>
      </Row>
    </div>
  </Modal>
</template>
