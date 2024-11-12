<script lang="ts" setup>
import { Logo } from '@/components'
import { FOOT_NAV_ITEMS } from '@/constant/nav'
import { MenuProps, MenuItem, Menu, SubMenu } from 'ant-design-vue'

const handleClick: MenuProps['onClick'] = (e) => {
  console.log('click', e)
}
</script>

<template>
  <footer class="w-full py-10 text-white bg-black">
    <div class="px-[16px]">
      <Logo class="w-auto h-11" />
    </div>
    <Menu
      style="width: 100%"
      mode="inline"
      :theme="'dark'"
      @click="handleClick"
      class="mb-foot-nav"
    >
      <template v-for="item in FOOT_NAV_ITEMS" :key="item.title">
        <template v-if="item.children && item.children.length > 0">
          <SubMenu :key="item.title">
            <template #title>{{ $t(item.title) }}</template>
            <MenuItem v-for="i in item.children" :key="i.title">{{
              i.title
            }}</MenuItem>
          </SubMenu>
        </template>
        <template v-else>
          <MenuItem>{{ item.title }}</MenuItem>
        </template>
      </template>
    </Menu>
  </footer>
</template>

<style lang="scss">
.mb-foot-nav {
  margin-top: 30px;
  padding: 0;
  padding-left: 16px;
  background: none;
  color: #fff;
  font-size: 16px;

  .ant-menu-sub {
    background: none !important;
  }

  .ant-menu-submenu-title {
    font-size: 16px;
    // font-weight: bold;
  }

  .ant-menu-submenu-arrow {
    left: 0;
    // transform: translate(-50%);
    transform: translate(0, -50%) rotate(-90deg);
    // right: auto;
  }

  .ant-menu-submenu-selected,
  .ant-menu-item-selected {
    background: none;
  }
}
</style>
