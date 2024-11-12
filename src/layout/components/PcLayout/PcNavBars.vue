<script lang="ts" setup>
import { Dropdown } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'

import useRouteStore from '@/store/routeStore'
import { getIconUrl } from '@/assets'

const routeStore = useRouteStore()
const router = useRouter()

const jump = (path: string) => {
  console.log('--path--', path)
  router.push(path)
}
</script>

<template>
  <nav class="flex items-center h-20">
    <template v-for="item in routeStore.menus" :key="item.title">
      <template v-if="item.children && item.children.length > 0">
        <Dropdown>
          <a
            class="text-sm text-[#fff] h-full flex items-center gap-1 px-4 nav-item"
            @click.prevent
          >
            <!-- {{ $t(item.title) }} -->
            {{ item.title }}
            <DownOutlined class="text-xs icon" />
          </a>
          <template #overlay>
            <ul class="p-4 bg-white rounded-md w-[300px]">
              <li
                v-for="i in item.children"
                :key="i.path"
                @click="jump(i.path!)"
              >
                <a
                  href="javascript:;"
                  class="flex items-center w-40 gap-3 rounded-md p-2 hover:bg-[rgb(240,240,240)]"
                >
                  <img :src="getIconUrl(i.icon as string)" class="w-5 h-auto" />
                  <div>
                    <p class="text-ms text-[#000]">{{ i.title }}</p>
                    <p class="text-xs text-gray-500">{{ i.desc }}</p>
                  </div>
                </a>
              </li>
            </ul>
          </template>
        </Dropdown>
      </template>
      <template v-else>
        <a
          class="text-sm text-[#fff] h-full flex items-center gap-1 px-4 nav-item"
          @click.prevent="jump(item.path!)"
        >
          {{ item.title }}
        </a>
      </template>
    </template>
  </nav>
</template>
<style lang="less" scoped>
.nav-item .icon {
  transform: rotate(0deg);
  transition: all 0.3s linear;
}

.nav-item:hover {
  :deep(.icon) {
    position: relative;
    transform: rotate(180deg);
  }
}
</style>
