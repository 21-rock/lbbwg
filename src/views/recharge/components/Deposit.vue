<script setup lang="ts">
import { MyUpload, Steps, SvgIcon } from '@/components'
import {
  Button,
  InputNumber,
  Modal,
  QRCode,
  Select,
  SelectOption,
  Space
} from 'ant-design-vue'
import { useClipboard } from '@vueuse/core'
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { useModal } from '@/hooks'
import { useRecharge } from '../hooks/useRecharge'

const emit = defineEmits<{
  (e: 'rechargeSuccess'): void
}>()

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
const { copy } = useClipboard()

const { modalVisible, onModalClose, onModalOpen } = useModal()

const {
  coinList,
  coinCurrent,
  coinId,
  netList,
  detailInfo,
  amount,
  payment_screenshot,
  active,
  submitRecharge,
  onCurrencyChange,
  onNetChange
} = useRecharge({
  onRechargeSuccess: () => emit('rechargeSuccess')
})
</script>

<template>
  <div class="ant-form form-xl">
    <Steps :titles="['选择币种', '选择网络', '充币详情']" :active="active">
      <div class="pt-[40px] pb-[10px]">
        <p class="text-[14px] mb-[6px]">币种</p>
        <Select
          class="input-wrap"
          v-model:value="coinCurrent"
          :filterOption="filterOption"
          show-search
          placeholder="请选择"
          size="large"
          @change="onCurrencyChange"
        >
          <SelectOption
            v-for="(_item, key) in coinList"
            :key="key"
            :value="key"
          >
            {{ key }}
          </SelectOption>
        </Select>
      </div>
      <div class="pt-[40px] pb-[10px]">
        <p class="text-[14px] mb-[6px]">网络</p>
        <Select
          class="input-wrap"
          v-model:value="coinId"
          :filterOption="filterOption"
          placeholder="请选择"
          size="large"
          @change="onNetChange"
        >
          <SelectOption v-for="item in netList" :key="item.id" :value="item.id">
            {{ item.currency_network }}
          </SelectOption>
        </Select>
      </div>
      <div class="pt-[40px] pb-[10px]">
        <div class="inline-flex">
          <p class="text-[14px]">充币地址：</p>
          <p class="text-[14px]">
            <Space>
              <span>{{ detailInfo.currency_address }}</span>
              <span
                class="text-[#0075FF] cursor-pointer"
                @click="copy(detailInfo.currency_address)"
              >
                复制
              </span>
            </Space>
          </p>
        </div>
        <div class="mt-5">
          <QRCode :value="detailInfo.currency_address" />
        </div>
        <div class="mt-5 ant-form-item-control-input-content">
          <InputNumber
            :controls="false"
            v-model:value="amount"
            placeholder="请输入"
            :min="parseFloat(detailInfo.currency_mix || '0')"
            class="input-wrap"
          >
            <template #addonBefore>
              <span class="text-[#666]">金额</span>
            </template>
            <template #addonAfter>
              <span class="text-[#666]">{{ coinCurrent }}</span>
            </template>
          </InputNumber>
          <div class="flex items-center w-[486px] justify-between">
            <Space>
              <span class="align-middle text-[12px] text-gray-400">
                最小充币金额
              </span>
              <ExclamationCircleOutlined
                class="align-middle text-gray-400 cursor-pointer text-[12px]"
                @click="onModalOpen"
              />
            </Space>
            <p class="text-xs font-[600] text-black">
              {{ detailInfo.currency_mix }} {{ detailInfo.currency }}
            </p>
          </div>
        </div>
        <div class="mt-5">
          <MyUpload
            class="block w-[257px] upload-wrapper"
            :show-upload-list="false"
            v-model:value="payment_screenshot"
          >
            <div
              class="w-[148px] h-[148px] bg-gray-100 rounded-[8px] overflow-hidden cursor-pointer"
            >
              <img
                v-if="payment_screenshot"
                :src="payment_screenshot"
                class="object-cover w-full h-full"
              />
              <div
                v-else
                class="flex flex-col items-center justify-center w-full h-full gap-1 border border-gray-300 border-dashed"
              >
                <SvgIcon name="screenshot" class="text-4xl text-gray-300" />
                <span>请上传支付截图</span>
              </div>
            </div>
          </MyUpload>
        </div>
        <div class="mt-5">
          <Button
            class="btn w-[486px] h-[36px] rounded-[18px]"
            @click="submitRecharge"
            >充值</Button
          >
        </div>
      </div>
    </Steps>

    <Modal :open="modalVisible">
      <template #title>
        <h3 class="text-xl font-bold">最小充币金额</h3>
      </template>
      <template #closeIcon>
        <CloseOutlined
          class="text-xl font-bold text-black"
          @click="onModalClose"
        />
      </template>
      <div class="py-10">
        <p class="text-sm">
          若您的充币数量小于最小充币金额，该笔充币将无法到帐或找回。
        </p>
      </div>
      <template #footer>
        <div class="flex justify-end gap-5">
          <span
            class="btn px-[16px] h-[30px] leading-[30px] rounded-[15px]"
            @click="onModalClose"
          >
            确认
          </span>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.input-wrap {
  width: 486px;
}
</style>
