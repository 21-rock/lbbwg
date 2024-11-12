<script lang="ts" setup>
import { getImageUrl } from '@/assets'
import Flexible from './components/Flexible.vue'
import Fixed from './components/Fixed.vue'
import { MyTabs, Modal } from '@/components'
import { useModal } from '@/hooks'
import {
  getMiningIncomeSituationApi,
  getMiningListApi,
  getMiningOrderListApi,
  MiningListItem
} from '@/api/earn'
import { useMountedRequest } from '@/hooks/useRequest'
import { Spin } from 'ant-design-vue'
import OrderModal from './components/OrderModal.vue'
const tabPages = ref([
  {
    key: '1',
    tab: '活期'
  },
  {
    key: '2',
    tab: '定期',
    content: 'Content of Tab Pane 2'
  }
])
const activeKey = ref('1')
const orderInfo = ref<MiningListItem>()
const onChange = () => {}
const { modalVisible, onModalOpen, onModalClose } = useModal()

const { data, loading } = useMountedRequest(getMiningListApi)
const onDeposit = (info: MiningListItem) => {
  orderInfo.value = info
}

onMounted(() => {
  getMiningIncomeSituationApi()
  getMiningOrderListApi()
})
</script>

<template>
  <div>
    <div class="bg-black">
      <div
        class="h-[440px] w-[1200px] mx-auto flex justify-between items-center"
      >
        <div>
          <h1 class="text-[44px] text-white font-bold">质押生息</h1>
          <p class="text-[20px] text-white mt-5 mb-[40px]">
            简单 高效 轻松赚币
          </p>
          <a
            @click.prevent="onModalOpen"
            class="btn w-[252px] h-[60px] rounded-[30px]"
          >
            什么是质押生息
          </a>
        </div>
        <img :src="getImageUrl('earn-1.png')" class="h-auto w-[463px]" alt="" />
      </div>
    </div>
    <div class="w-[1200px] mx-auto">
      <MyTabs
        class="tops-tab"
        :tab-pages="tabPages"
        v-model:active-key="activeKey"
        @change="onChange"
      >
        <template #suffix>
          <router-link to="/earn-order" class="text-base text-blue"
            >我的订单</router-link
          >
        </template>
        <template #content="prop">
          <Spin :spinning="loading">
            <Flexible
              v-if="prop.key === '1'"
              :data-source="data"
              @deposit="onDeposit"
            />
            <Fixed v-if="prop.key === '2'" />
          </Spin>
        </template>
      </MyTabs>
    </div>
    <Modal
      title="什么是质押生息"
      v-model:open="modalVisible"
      @cancel="onModalClose"
    >
      <div class="py-6">
        <p class="text-base/[24px]">
          存币生息是UZX打造的一款金融产品。可以帮助用户利用闲置资产赚币。存币生息分为活期和定期。活期用户可以随时提取本金和利息，定期用户会按照存入时选择的时间进行结算，若提前提取会收取一定手续费。
        </p>
      </div>
    </Modal>
    <OrderModal
      v-if="orderInfo"
      open
      :orderInfo="orderInfo"
      @cancel="orderInfo = undefined"
      @success="orderInfo = undefined"
    />
  </div>
</template>
<style lang="less" scoped></style>
