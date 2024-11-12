<script setup lang="ts">
// import { getNewCurrencyListApi } from '@/api/currency'
import { getSubscriptCurrencyListApi } from '@/api/currency'
import { MyTabs, RateChart } from '@/components'
import { SubscriptCurrencyStatusEnum } from '@/enums/currency'
import { useRequestByPage } from '@/hooks/useRequest'
import { Col, Row } from 'ant-design-vue'
import dayjs from 'dayjs'

const router = useRouter()

const tabPages = [
  {
    key: SubscriptCurrencyStatusEnum.全部,
    tab: '全部'
  },
  {
    key: SubscriptCurrencyStatusEnum.即将开始,
    tab: '即将开始'
  },
  {
    key: SubscriptCurrencyStatusEnum.进行中,
    tab: '进行中'
  },
  {
    key: SubscriptCurrencyStatusEnum.已完成,
    tab: '已完成'
  }
]

const getText = (status: SubscriptCurrencyStatusEnum) => {
  if (status === SubscriptCurrencyStatusEnum.即将开始) {
    return 'Token未派发'
  }
  if (status === SubscriptCurrencyStatusEnum.进行中) {
    return 'Token派发中'
  }
  return 'Token已派发'
}

const activeKey = ref(SubscriptCurrencyStatusEnum.全部)

const { data, run } = useRequestByPage(getSubscriptCurrencyListApi, {
  status: activeKey.value
})

const goSubscript = (id: number, status: SubscriptCurrencyStatusEnum) => {
  if (status === SubscriptCurrencyStatusEnum.进行中) {
    router.push({
      path: '/currency-subscript-form',
      query: {
        id: id
      }
    })
  }
}

watch(
  () => activeKey.value,
  (v) => {
    data.value = []
    run({
      status: v
    })
  }
)
</script>

<template>
  <div class="bg-black min-h-[calc(100vh-80px)]">
    <div class="w-[1200px] mx-auto overflow-hidden">
      <MyTabs
        theme="deep"
        size="middle"
        :tabPages="tabPages"
        v-model:active-key="activeKey"
        class="my-tabs-deep-small"
      >
        <template #suffix>
          <router-link
            to="/currency-subscript-form"
            class="btn w-[78px] h-[30px] rounded-[15px]"
            >去申购</router-link
          >
        </template>
        <template #content>
          <Row :gutter="[20, 20]">
            <Col :span="6" v-for="item in data" :key="item.id">
              <section
                class="mt-6 bg-[#212121] border border-[#313131] rounded-[8px] w-full h-[320px] cursor-pointer"
                @click="goSubscript(item.id, item.status)"
              >
                <div class="h-[168px] flex justify-center items-center">
                  <div class="w-[120px] h-[120px]">
                    <RateChart :num="item.sales_progress" :total="100" />
                  </div>
                </div>
                <div class="flex flex-col px-3 gap-[12px]">
                  <div class="flex justify-between">
                    <p class="text-xl font-bold text-[#1fa2ff]">
                      {{ item.name }}
                    </p>
                    <span
                      class="text-[#ffd302] bg-[#ffd302]/[0.06] px-[5px] py-[3px] rounded-[4px]"
                    >
                      {{ getText(item.status) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <p class="text-sm font-bold text-white">
                      {{ item.seller_num }}
                    </p>
                    <!-- <p class="text-sm font-bold text-yellow-500">
                      {{ item.USDT }}
                    </p> -->
                  </div>
                  <div class="flex justify-between">
                    <p class="text-sm text-gray-400">价格</p>
                    <p class="text-sm text-gray-400">
                      <span class="font-bold text-white">{{
                        item.settlement_amount
                      }}</span>
                      <span class="pl-1">{{ item.settlement_coin }}</span>
                    </p>
                  </div>
                  <div class="flex justify-between">
                    <p class="text-sm text-gray-400">时间</p>
                    <p class="text-sm text-gray-400">
                      {{ dayjs(item.start_date).format('YYYY-MM-DD') }} ~
                      {{ dayjs(item.end_date).format('YYYY-MM-DD') }}
                    </p>
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </template>
      </MyTabs>
    </div>
  </div>
</template>
