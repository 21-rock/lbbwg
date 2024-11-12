<script setup lang="ts">
import { LOCALE_ITEMS } from '@/constant/locale'
import { LocaleEnum } from '@/enums/locale'
import useLocaleStore from '@/store/localeStore'
import { getEnumKey } from '@/utils/util'
import { DownOutlined } from '@ant-design/icons-vue'
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'

const localeStore = useLocaleStore()
const changeLocale = (temp: LocaleEnum) => {
  localeStore.setLocale(temp)
}
</script>

<template>
  <div class="w-[1200px] mx-auto">
    <h2 class="text-[32px] py-[70px] font-bold">偏好设置</h2>
    <div
      class="flex justify-between items-center pb-4 border-b border-gray-100"
    >
      <p class="text-xl">Language</p>
      <Dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <span>{{ getEnumKey(localeStore.locale, LocaleEnum) }}</span>
          <DownOutlined class="align-middle" />
        </a>
        <template #overlay>
          <Menu>
            <MenuItem v-for="item in LOCALE_ITEMS" :key="item.value">
              <a
                href="javascript:;"
                @click.prevent="changeLocale(item.value)"
                class="block text-base text-black py-2 w-[120px]"
                >{{ item.title }}</a
              >
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </div>
</template>
