<script setup lang="ts">
import { getIconUrl, getImageUrl } from '@/assets'
import {
  CopyOutlined,
  EyeFilled,
  EyeInvisibleFilled,
  RightCircleOutlined,
  RightOutlined
} from '@ant-design/icons-vue'
import { Col, Row } from 'ant-design-vue'
import Announcements from './Announcements.vue'
import Discover from './Discover.vue'
import { useUserStore } from '@/store'

const defaultavatar = getImageUrl('defaultavatar.png')
// const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const isHideInfo = ref(false)

const onHideInfoToggle = () => {
  isHideInfo.value = !isHideInfo.value
}

const onNav = () => {
  router.push({ /* path: route.path, */ query: { activeKey: '3' } })
}
</script>

<template>
  <div>
    <div class="py-8 bg-black">
      <div class="w-[1200px] mx-auto">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-[20px]">
            <img :src="defaultavatar" class="w-[48px] h-[48px]" alt="" />
            <p class="text-2xl text-white">
              您好，{{ !isHideInfo ? userStore.userInfo?.nickname : '******' }}
            </p>
          </div>
          <a
            @click.prevent
            class="w-[138px] h-[30px] flex justify-center items-center gap-2 border-[1px] border-[#fff] rounded-[15px] text-white"
          >
            <span>隐藏个人信息</span>
            <EyeInvisibleFilled v-if="!isHideInfo" @click="onHideInfoToggle" />
            <EyeFilled v-else @click="onHideInfoToggle" />
          </a>
        </div>
        <div class="flex mt-8 gap-[110px]">
          <div>
            <p class="text-xs text-gray-400">UID</p>
            <p
              v-if="!isHideInfo"
              class="flex items-center gap-1 mt-1 text-base text-white"
            >
              <span>{{ userStore.userInfo?.id }}</span>
              <CopyOutlined />
            </p>
            <p v-else class="flex items-center gap-1 mt-1 text-base text-white">
              ******
            </p>
          </div>
          <div>
            <p
              class="flex items-center text-xs text-gray-400 cursor-pointer"
              @click="onNav"
            >
              <span>身份认证</span>
              <RightOutlined class="ml-[2px] relative top-[1px]" />
            </p>
            <p class="mt-1 text-base text-white">
              {{ userStore.userInfo?.is_senior === 1 ? '已认证' : '未认证' }}
            </p>
          </div>
          <div>
            <p class="text-xs text-gray-400">邮箱</p>
            <p class="mt-1 text-base text-white">
              {{ !isHideInfo ? userStore.userInfo?.email : '******' }}
            </p>
          </div>
          <div>
            <p class="text-xs text-gray-400">手续费等级</p>
            <p class="mt-1 text-base text-white">
              {{ !isHideInfo ? 'VIP' + userStore.userInfo?.vip : '******' }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="my-8">
      <div class="w-[1200px] mx-auto">
        <Row :gutter="32">
          <Col :span="16">
            <div class="w-full border-[1px] border-gray-300 rounded-[20px] p-6">
              <p class="text-[18px] text-black font-bold">
                您当前还没有资产，入金开启交易之旅
              </p>
              <p class="mt-3 text-xs text-gray-400">
                邀请好友，有机会享受终身返佣
              </p>
              <ul>
                <li class="flex items-center gap-[15px] mt-6">
                  <img
                    :src="getIconUrl('assets-icon-9.png')"
                    class="w-[26px] h-[26px]"
                    alt=""
                  />
                  <div class="flex-1">
                    <p class="text-[18px] text-black font-bold">充币</p>
                    <p class="mt-1 text-xs text-gray-400">
                      支持数字货币之间的划转
                    </p>
                  </div>
                  <RightCircleOutlined
                    class="text-[26px] cursor-pointer"
                    @click="router.push('/recharge')"
                  />
                </li>
                <li class="flex items-center gap-[15px] mt-6">
                  <img
                    :src="getIconUrl('assets-icon-4.png')"
                    class="w-[26px] h-[26px]"
                    alt=""
                  />
                  <div class="flex-1">
                    <p class="text-[18px] text-black font-bold">划转</p>
                    <p class="mt-1 text-xs text-gray-400">
                      支持数字货币之间的划转
                    </p>
                  </div>
                  <RightCircleOutlined
                    class="text-[26px] cursor-pointer"
                    @click="router.push('/transfer')"
                  />
                </li>
              </ul>
            </div>
            <div class="mt-10">
              <Discover />
            </div>
          </Col>
          <Col :span="8">
            <Announcements />
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>
