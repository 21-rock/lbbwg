<script setup lang="ts">
import {
  getExchangeCurrencyApi,
  transferApi,
  TransferParams
} from '@/api/transfer'
import { AssetListItem, getAssetListApi } from '@/api/wallet'
import { getIconUrl, getImageUrl } from '@/assets'
import {
  Button,
  Col,
  Form,
  FormItem,
  InputNumber,
  message,
  Row,
  Select,
  SelectOption
} from 'ant-design-vue'

const formState = reactive<Partial<TransferParams>>({
  from_type: 0,
  reach_type: 1,
  amount: undefined,
  currency: undefined
})
const submitLoading = ref(false)
const assetList = ref<AssetListItem[]>([])

const getAssetList = async (type: 0 | 1) => {
  try {
    const res = await getAssetListApi({ type })
    if (res.code === 1 && res.data.length > 0) {
      assetList.value = res.data
      if (formState.currency === undefined) {
        formState.currency = res.data[0].currency
      }
    } else {
      formState.currency = undefined
    }
  } catch (_error) {}
}

const currencyItem = computed(() =>
  assetList.value.find((item) => item.currency === formState.currency)
)

const transform = () => {
  const from_type = formState.from_type
  const reach_type = formState.reach_type
  formState.from_type = reach_type
  formState.reach_type = from_type
}

const allIn = () => {
  formState.amount = currencyItem.value?.money
}

const submit = async () => {
  if (!formState.amount) {
    message.warn('划转数量不能小于0')
    return
  }
  submitLoading.value = true
  try {
    const params = {
      ...toRaw(formState)
    } as unknown as TransferParams
    const res = await transferApi(params)
    if (res.code === 1) {
      getAssetList(formState.from_type!)
      message.success(res.msg, 1.5, () => {
        formState.amount = undefined
      })
    } else {
      message.error(res.msg)
    }
  } catch (_error) {}
  submitLoading.value = false
}

watch(
  () => formState.from_type,
  (cur) => {
    getAssetList(cur!)
  }
)

onMounted(() => {
  getExchangeCurrencyApi()
  getAssetList(formState.from_type!)
})
</script>

<template>
  <div class="max-w-[660px] mx-auto mt-[70px] mb-[200px]">
    <h1 class="text-[32px] font-bold mb-[30px]">资金划转</h1>
    <Form layout="vertical" class="form-xl">
      <Row>
        <Col :span="24">
          <FormItem name="from_type">
            <div class="flex items-center gap-4">
              <template v-if="formState.from_type === 0">
                <span>资金账户</span>
                <div class="h-[100%] flex justify-center items-center">
                  <img
                    :src="getImageUrl('faq-5.png')"
                    class="w-[24px] h-[24px]"
                  />
                </div>
                <span> 交易账户 </span>
              </template>
              <template v-else>
                <span>交易账户</span>
                <div class="h-[100%] flex justify-center items-center">
                  <img
                    :src="getImageUrl('faq-5.png')"
                    class="w-[24px] h-[24px]"
                  />
                </div>
                <span>资金账户</span>
              </template>
              <a class="block" @click.prevent="transform">
                <img
                  :src="getIconUrl('icon-36.png')"
                  class="w-[24px] h-[24px]"
                />
              </a>
            </div>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="币种">
            <Select v-model:value="formState.currency">
              <SelectOption
                v-for="item in assetList"
                :key="item.currency"
                :value="item.currency"
              >
                {{ item.currency }}
              </SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="划转数量">
            <InputNumber
              :precision="8"
              stringMode
              placeholder="请输入"
              theme="light"
              :controls="false"
              v-model:value="formState.amount"
            >
              <template #addonAfter>
                <a @click.prevent="allIn">全部</a>
              </template>
            </InputNumber>
            <div class="flex justify-end">可用：{{ currencyItem?.money }}</div>
          </FormItem>
        </Col>
        <Col :span="24">
          <Button
            :loading="submitLoading"
            class="btn w-[200px] h-[36px] rounded-[18px]"
            @click="submit"
            >划转</Button
          >
        </Col>
      </Row>
    </Form>
  </div>
</template>
