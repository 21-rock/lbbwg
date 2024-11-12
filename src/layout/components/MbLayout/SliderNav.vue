<script lang="ts" setup>
import { CloseOutlined } from '@ant-design/icons-vue'
import { Divider, Drawer, Menu, MenuItem, SubMenu } from 'ant-design-vue'
import type { MenuProps } from 'ant-design-vue'
// import { useI18n } from 'vue-i18n'
import useLocaleStore from '@/store/localeStore'
import { LocaleEnum } from '@/enums/locale'
import { LOCALE_ITEMS } from '@/constant/locale'
import { useRoute } from 'vue-router'
import useRouteStore from '@/store/routeStore'

defineOptions({
  name: 'SliderNav'
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const visible = defineModel<boolean>({
  required: true
})

const route = useRoute()
const router = useRouter()
// const { t, locale } = useI18n()
const localeStore = useLocaleStore()
const routeStore = useRouteStore()
// 切换语言
const handleLocaleClick: MenuProps['onClick'] = (e) => {
  localeStore.setLocale(e.key as LocaleEnum)
  emit('close')
}

const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e)
  router.push(e.key as string)
}

watch(
  () => route.path,
  () => {
    emit('close')
  }
)
</script>

<template>
  <Drawer
    placement="right"
    :visible="visible"
    :closable="false"
    width="100%"
    :drawerStyle="{ background: '#292929', padding: 0 }"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <div class="flex items-center justify-end text-white">
        <a @click.prevent="emit('close')" class="p-1 text-[0px]">
          <CloseOutlined class="text-white text-base/[0]" />
        </a>
      </div>
    </template>
    <div class="text-white px-[24px] text-sm h-10 flex items-center gap-2">
      <RouterLink
        to="/register"
        class="px-3 py-1 border border-solid divide-white rounded-3xl"
      >
        注册
      </RouterLink>
      <RouterLink to="/login" class="px-3 py-1">登录</RouterLink>
    </div>
    <div class="app-mb-menu">
      <Menu
        style="width: 100%"
        mode="inline"
        :theme="'dark'"
        @click="handleMenuClick"
      >
        <template v-for="item in routeStore.menus" :key="item.path">
          <template v-if="item.children && item.children.length > 0">
            <SubMenu :key="item.title">
              <template #title>{{ item.title }}</template>
              <MenuItem v-for="i in item.children" :key="i.path">{{
                i.title
              }}</MenuItem>
            </SubMenu>
          </template>
          <template v-else>
            <MenuItem :key="item.path">{{ item.title }}</MenuItem>
          </template>
        </template>
      </Menu>
      <Divider type="horizontal" class="my-0 bg-gray-500" />
      <Menu mode="inline" :theme="'dark'" @click="handleLocaleClick">
        <SubMenu key="locale">
          <template #title>语言</template>
          <MenuItem v-for="i in LOCALE_ITEMS" :key="i.value">{{
            i.title
          }}</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  </Drawer>
</template>
<style lang="less">
.app-mb-menu {
  .ant-menu {
    padding: 0;
    background: none;
    color: #fff;
    font-size: 16px;

    .ant-menu-sub {
      background: none !important;
    }

    .ant-menu-submenu-arrow {
      // transform: translate(-50%);
      transform: translate(-50%) rotate(-90deg);
      // left: 10px;
      // right: auto;
    }
  }

  .ant-menu-submenu-selected,
  .ant-menu-item-selected {
    background: none;
  }
}
</style>
