<script setup lang="ts">
import { getIconUrl } from '@/assets'

const items = [
  {
    title: '币币交易',
    desc: '虚拟币和虚拟币之间的兑换交易，支持多种热门币种。',
    icon: getIconUrl('service-icon-1.png'),
    route: '/'
  },
  {
    title: '永续合约',
    desc: '币本位、U本位合约，安全交易保障。',
    icon: getIconUrl('service-icon-2.png'),
    route: '/'
  },
  {
    title: '期权交易',
    desc: '简易化期权合约,数字资产衍生品，实现交易多元化',
    icon: getIconUrl('service-icon-3.png'),
    route: '/'
  },
  {
    title: '秒合约',
    desc: '体验刺激的交易时刻',
    icon: getIconUrl('service-icon-4.png'),
    route: '/'
  },
  {
    title: '闪兑',
    desc: '币币闪兑，一键完成交易',
    icon: getIconUrl('service-icon-5.png'),
    route: '/'
  },
  {
    title: '存币生息',
    desc: '利用闲置资产，轻松赚币',
    icon: getIconUrl('service-icon-6.png'),
    route: '/'
  }
]
const moreIcon = getIconUrl('more-icon-1.png')
const router = useRouter()
const jump = (route: string) => {
  router.push(route)
}
</script>

<template>
  <ul class="grid grid-cols-2 gap-5">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="h-[177px] bg-[hsla(0,0%,40%,.2)] rounded-[10px] p-6 cursor-pointer primary-shadow"
      @click="jump(item.route)"
    >
      <h3
        :class="`text-2xl text-white weight- pl-9 font-bold relative`"
        :style="{
          background: `url('${item.icon}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 center'
        }"
      >
        {{ item.title }}
        <img
          :src="moreIcon"
          class="w-[19px] h-auto absolute top-[50%] right-0 translate-y-[-50%]"
          alt=""
        />
      </h3>
      <p class="mt-5 text-sm text-gray-400">{{ item.desc }}</p>
    </li>
  </ul>
</template>
