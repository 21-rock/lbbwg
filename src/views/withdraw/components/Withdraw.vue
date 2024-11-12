<script setup lang="ts">
import { Steps } from '@/components'
import {
  Button,
  Form,
  FormItem,
  InputNumber,
  Select,
  SelectOption,
  Space,
  Tag
} from 'ant-design-vue'
import useWithdraw from '@/hooks/useWithdraw'
import { useModal } from '@/hooks'
import SafetyVerification from './SafetyVerification.vue'
const {
  coinList,
  addrList,
  coinId,
  addressId,
  currencyRecord,
  handlingcharge,
  amount,
  min,
  max,
  actualReceivedAmount,
  withdrawLoading,
  payPass,
  netId,
  netList,
  netIsMatchAddr,
  withdraw,
  getWithdrawList
} = useWithdraw()

onMounted(() => {
  getWithdrawList()
})

const { modalVisible, onModalClose, onModalOpen } = useModal()

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
const active = ref(0)
const visibleNextBtn = computed(() => !!coinId.value)
const disabledBtn = computed(() => {
  const v = coinId.value && addressId.value && amount.value
  return !v
})

const onNextClick = () => {
  active.value++
}

const Title1 = () => {
  return h(
    'span',
    {},
    {
      default: () => [
        h('span', {}, { default: () => '选择您需要提取的币种' }),
        active.value === 0
          ? null
          : h(
              'span',
              {
                class:
                  'ml-6 text-sm font-normal text-blue cursor-pointer relative z-20',
                onClick: () => {
                  active.value = 0
                }
              },
              { default: () => '重新编辑' }
            )
      ]
    }
  )
}

const onwithdrawClick = () => {
  onModalOpen()
}

const handleSubmit = (data: { password: string }) => {
  payPass.value = data.password
  onModalClose()
  withdraw()
}
</script>

<template>
  <div>
    <Steps :titles="[Title1(), '提币详情']" :active="active">
      <div class="pt-[40px] pb-[10px] ant-form form-xl">
        <template v-if="active === 0">
          <div class="w-[486px] flex justify-between">
            <p class="text-[14px] mb-[6px]">币种</p>
          </div>
          <Select
            class="select-wrap"
            v-model:value="coinId"
            :filterOption="filterOption"
            show-search
            placeholder="请选择"
            size="large"
          >
            <SelectOption
              v-for="item in coinList"
              :key="item.id"
              :value="item.id"
              :record="item"
            >
              {{ item.currency }}
            </SelectOption>
          </Select>
          <span
            v-if="visibleNextBtn"
            class="btn w-[112px] h-[36px] rounded-[18px] mt-[24px]"
            @click="onNextClick"
          >
            下一步
          </span>
        </template>
        <template v-else>
          <Space>
            <img
              :src="currencyRecord?.logo_link"
              class="w-[20px] h-[20px]"
              alt=""
            />
            <span>{{ currencyRecord?.currency }}</span>
          </Space>
        </template>
      </div>
      <div class="pt-[40px] pb-[10px] w-[560px]">
        <Form class="form-xl" :label-col="{ span: 24 }">
          <FormItem label="提币地址">
            <div class="relative">
              <RouterLink
                to="/withdraw-address"
                @click.prevent
                class="absolute p-[11px] z-10 top-[50%] translate-y-[-50%] inline-block cursor-pointer right-0"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3.7"
                    y="1.7"
                    width="14.6"
                    height="16.6"
                    rx="1.3"
                    stroke="#000000"
                    stroke-width="1.4"
                  ></rect>
                  <circle
                    cx="11"
                    cy="7"
                    r="2"
                    stroke="#000000"
                    stroke-width="1.4"
                  ></circle>
                  <path
                    d="M15 14C15 12.3431 13.2091 11 11 11C8.79086 11 7 12.3431 7 14"
                    stroke="#000000"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M1 6H3"
                    stroke="#000000"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M1 14H3"
                    stroke="#000000"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M1 10H3"
                    stroke="#000000"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </RouterLink>
              <Select
                placeholder="请选择"
                :showArrow="false"
                v-model:value="addressId"
                :optionLabelProp="'label'"
              >
                <SelectOption
                  v-for="item in addrList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.currency_address"
                >
                  <div>
                    <p class="text-sm font-semibold">
                      {{ item.currency_address }}
                    </p>
                    <p class="mt-2">
                      <Space>
                        <Tag color="blue">{{ item.currency }}</Tag>
                        <Tag color="default">{{ item.currency_network }}</Tag>
                      </Space>
                    </p>
                  </div>
                </SelectOption>
              </Select>
              <div
                v-if="!netIsMatchAddr"
                class="ant-form-item-explain ant-form-item-explain-error"
              >
                <div role="alert">您的提币地址与主网不匹配</div>
              </div>
            </div>
          </FormItem>
          <FormItem label="转账网络">
            <Select
              placeholder="请选择"
              :showArrow="false"
              v-model:value="netId"
            >
              <SelectOption
                v-for="item in netList"
                :key="item.key"
                :value="item.value"
              >
                {{ item.value }}
              </SelectOption>
            </Select>
          </FormItem>
          <FormItem label="提币数量">
            <InputNumber
              placeholder="输入提币数量"
              :controls="false"
              v-model:value="amount"
              :min="min"
              :max="max"
              string-mode
            ></InputNumber>
            <div class="flex justify-between mt-2">
              <p class="text-sm text-gray-400">
                预估手续费： {{ handlingcharge }} {{ currencyRecord?.currency }}
              </p>
              <p class="text-sm text-gray-400">
                到账数量： {{ actualReceivedAmount }}
                {{ currencyRecord?.currency }}
              </p>
            </div>
            <p class="text-sm text-[#C8C8C8] mt-2">
              手续费根据市场行情波动变化
            </p>
          </FormItem>
          <FormItem label="">
            <Button
              class="btn w-[112px] h-[36px] rounded-[18px]"
              :disabled="disabledBtn"
              :loading="withdrawLoading"
              @click="onwithdrawClick"
            >
              提币
            </Button>
            <div class="mt-[60px]">
              <p class="text-sm text-black">温馨提示</p>
              <div class="mt-3 text-sm text-gray-400">
                <p>• 最小提币数量为： -- ETC</p>
                <p>
                  •
                  为保障资金安全，当您账户安全策略变更、密码修改、使用新地址提币，我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系
                </p>
                <p>• 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
              </div>
            </div>
          </FormItem>
        </Form>
      </div>
    </Steps>
    <SafetyVerification
      v-model:open="modalVisible"
      @close="onModalClose"
      @submit="handleSubmit"
    />
  </div>
</template>

<style lang="scss" scoped>
.select-wrap {
  width: 486px;
}
</style>
