<script lang="ts" setup>
import { getIconUrl } from '@/assets'
import { HistoryOutlined } from '@ant-design/icons-vue'
import {
  Button,
  Divider,
  Form,
  FormItem,
  InputNumber,
  Select,
  SelectOption
} from 'ant-design-vue'
import useCoin from '../hooks/useCoin'

const {
  coinFromUnit,
  coinToUnit,
  inputCount,
  fromCoins,
  toCoins,
  coinReteTxt,
  handlingCharge,
  exchangeAccount,
  launchLoading,
  range,
  handleFromChange,
  handleToChange,
  convert,
  launchExchange
} = useCoin()
</script>

<template>
  <div class="convert-page-container">
    <div class="h-[240px] bg-black">
      <div class="w-[680px] h-full flex justify-center items-center mx-auto">
        <div class="text-center text-white align-center">
          <h1 class="text-[44px] font-[600]">闪兑</h1>
          <p class="text-[18px] mt-3">
            <span>无滑点</span>
            <Divider type="vertical" class="bg-white w-[2px]" />
            <span>一键交易</span>
          </p>
        </div>
      </div>
    </div>
    <div class="w-[680px] pt-[48px] pb-[200px] mx-auto">
      <div class="flex justify-between mb-[35px]">
        <h3 class="text-[28px] font-bold">闪兑</h3>
        <RouterLink to="/manage?activeKey=4&sub=5" class="flex items-center">
          <HistoryOutlined class="text-[16px]" />
          <span class="pl-2 text-base">记录</span>
        </RouterLink>
      </div>
      <Form
        :labelCol="{ span: 24 }"
        class="form-3xl form-light form-border-none"
      >
        <FormItem>
          <template #label>
            <span>消耗</span>
            <span>余额: 0 USDT</span>
          </template>
          <InputNumber
            wrapClass="ant-bg-gray-input"
            :controls="false"
            v-model:value="inputCount"
            :placeholder="range"
          >
            <!-- <template #addonBefore>
              <p>ABC</p>
            </template> -->
            <template #addonAfter>
              <div class="flex items-center">
                <p class="text-base/[32px] text-blue">最大</p>
                <Divider
                  type="vertical"
                  class="block h-[20px] mx-5 bg-gray-300 top-0"
                />
                <div class="w-[160px]">
                  <Select
                    class="covert-form-select-wrap"
                    :value="coinFromUnit?.coinUnit"
                    @change="handleFromChange"
                  >
                    <SelectOption
                      v-for="coin in fromCoins"
                      :key="coin.coinUnit"
                      :value="coin.coinUnit"
                      :data-record="coin"
                    >
                      {{ coin.coinUnit }}
                    </SelectOption>
                  </Select>
                </div>
              </div>
            </template>
          </InputNumber>
        </FormItem>
        <div class="py-3 text-center">
          <a @click.prevent="convert" class="p-2">
            <img
              :src="getIconUrl('icon-36.png')"
              alt=""
              class="w-[28px] h-[28px] inline-block"
            />
          </a>
        </div>
        <FormItem>
          <template #label>
            <span>获得</span>
          </template>
          <InputNumber
            wrapClass="ant-bg-gray-input"
            disabled
            :controls="false"
            :value="exchangeAccount"
          >
            <template #addonAfter>
              <div class="w-[160px]">
                <Select
                  class="covert-form-select-wrap"
                  :value="coinToUnit?.coinUnit"
                  @change="handleToChange"
                >
                  <SelectOption
                    v-for="coin in toCoins"
                    :key="coin.coinUnit"
                    :value="coin.coinUnit"
                    :data-record="coin"
                  >
                    {{ coin.coinUnit }}
                  </SelectOption>
                </Select>
              </div>
            </template>
          </InputNumber>
        </FormItem>
        <div class="flex justify-between mb-10 text-gray-400">
          <span> 兑换价格: {{ coinReteTxt }} </span>
          <span>手续费: {{ handlingCharge }}</span>
        </div>

        <FormItem>
          <Button
            :loading="launchLoading"
            class="btn border-none w-[396px] h-[48px] rounded-[24px] text-black mx-auto hover:!text-black"
            @click="launchExchange"
          >
            立即兑换
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<style lang="scss">
.convert-page-container {
  .ant-form-item-label {
    padding: 0 !important;

    label {
      display: flex !important;
      justify-content: space-between;
    }
  }
}

/* 
.ant-bg-gray-input {
  height: 72px;
  padding: 6px 0 6px 6px;
  border: none;
  background: #f5f5f5;

  .ant-input-number-input {
    font-size: 24px !important;
    line-height: 60px;
  }

  .ant-input-number-disabled {
    background: none;
  }
} */

.covert-form-select-wrap {
  width: 100%;
  padding: 0;

  .ant-select-selector {
    border: none !important;
    box-shadow: none !important;

    &:hover {
      border: none !important;
    }
  }

  .ant-select-selection-item {
    color: #000 !important;
    font-size: 20px;
    font-weight: bold;
  }

  .ant-select-arrow {
    color: #000;
    font-size: 14px;
  }
}
</style>
