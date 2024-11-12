<script lang="tsx">
import { AddSpotOrderParams, tradeColor } from '@/api/trade'
import { OrderDirectionEnum, OrderTypeEnum } from '@/enums/trade'
import { TradeInfo } from '@/model/tradeModel'
import { toDecimals } from '@/utils/util'
import { Button, InputNumber, Input, message, Slider } from 'ant-design-vue'
import { PropType } from 'vue'

export default defineComponent({
  props: {
    direction: {
      // 1买入 2卖出
      type: Number as PropType<1 | 2>,
      default: 1
    },
    type: {
      // 订单类型 1市价单 2限价单
      type: Number as PropType<1 | 2>,
      default: 1
    },
    formState: {
      type: Object as PropType<Partial<AddSpotOrderParams>>,
      required: true
    },
    buyInfo: {
      type: Object as PropType<TradeInfo>,
      required: true
    },
    sellInfo: {
      type: Object as PropType<TradeInfo>,
      required: true
    }
  },
  emits: ['change', 'submit'],
  setup(props, { emit }) {
    // 如果是市场委托，price可不填，并且出现文字提示
    const exchangeAmountHint = computed(() => {
      if (props.formState.type !== OrderTypeEnum.市场委托) {
        return ''
      }
      if (props.direction === OrderDirectionEnum.买入) {
        return '以最优价格买入'
      }
      return '以最优价格卖出'
    })

    const rate = ref(0)
    const { buyColor, sellColor } = tradeColor()

    const onchange = (prop: keyof AddSpotOrderParams, value: any) => {
      emit('change', prop, value)
    }

    const onRateChange = (value: number) => {
      const info =
        props.direction === OrderDirectionEnum.买入
          ? props.buyInfo
          : props.sellInfo
      const balance = info.balance || 0
      let amount = 0
      if (value === 0) {
        amount = 0
      } else if (value === 100) {
        amount = balance
      } else {
        amount = toDecimals((balance * value) / 100, 8) || 0
      }
      onchange('amount', amount)
    }

    const onSubmit = () => {
      if (!props.formState.amount) {
        return message.warn('交易金额不能少于0')
      }
      emit('submit')
    }

    return () => {
      const marks = {
        0: '0°C',
        25: '25%',
        50: '50%',
        75: '75%',
        100: '100%'
      }

      const { buyInfo, sellInfo, formState } = props
      const info =
        props.direction === OrderDirectionEnum.买入 ? buyInfo : sellInfo
      const btnText =
        props.direction === OrderDirectionEnum.买入 ? '买入' : '卖出'
      const btnColor =
        props.direction === OrderDirectionEnum.买入 ? buyColor : sellColor

      const max = info.balance
      return (
        <div class="flex flex-col gap-4 ant-form form-deep">
          <section>
            {exchangeAmountHint.value ? (
              <Input
                disabled={!!exchangeAmountHint.value}
                value={exchangeAmountHint.value}
                class="ant-deep-input"
                size="large"
              >
                {{
                  prefix: () => (
                    <span class={'text-sm text-[#7c7f82]'}>交易价格</span>
                  )
                }}
              </Input>
            ) : (
              <InputNumber
                class={'ant-deep-input'}
                controls={false}
                value={formState.price}
                onChange={(value) => {
                  onchange('price', value)
                }}
                size="large"
              >
                {{
                  addonBefore: () => (
                    <span class={'text-sm text-[#7c7f82]'}>交易价格</span>
                  ),
                  addonAfter: () => (
                    <span class={'text-sm text-[#7c7f82]'}>
                      {info.currency}
                    </span>
                  )
                }}
              </InputNumber>
            )}
          </section>

          <section>
            <InputNumber
              class={'ant-deep-input'}
              controls={false}
              max={max}
              value={formState.amount}
              size="large"
              onChange={(value) => {
                onchange('amount', value)
              }}
            >
              {{
                addonBefore: () => (
                  <span class={'text-sm text-[#7c7f82]'}>金额</span>
                ),
                addonAfter: () => (
                  <span class={'text-sm text-[#7c7f82]'}>{info.currency}</span>
                )
              }}
            </InputNumber>
          </section>
          <section class="px-2">
            <Slider
              marks={marks}
              class="ant-deep-slider"
              v-model:value={rate.value}
              onChange={(value) => onRateChange(value as number)}
            />
          </section>
          <section class={'flex justify-between'}>
            <span class={'text-xs text-[#7c7f82]'}>可用</span>
            <span class={'text-xs text-white font-bold pl-2'}>
              {info.balance} {info.currency}
            </span>
          </section>
          <section class={'flex justify-between'}>
            <span class={'text-xs text-[#7c7f82]'}>全部</span>
            <span class={'text-xs text-white font-bold pl-2'}>
              {info.balance} {info.currency}
            </span>
          </section>
          <section class={'flex justify-between'}>
            <span class={'text-xs text-[#7c7f82]'}>保证金</span>
            <span class={'text-xs text-white font-bold pl-2'}>
              {info.margin} {info.currency}
            </span>
          </section>
          <section class={'flex justify-between'}>
            <span class={'text-xs text-[#7c7f82]'}>手续费</span>
            <span class={'text-xs text-white font-bold pl-2'}>
              {info.fees} {info.currency}
            </span>
          </section>
          <section>
            <Button
              class={
                'block w-full h-[42px] text-base !text-white cursor-pointer rounded-[21px] !border-none'
              }
              style={{
                backgroundColor: btnColor
              }}
              onClick={onSubmit}
            >
              {btnText}
            </Button>
          </section>
        </div>
      )
    }
  }
})
</script>
