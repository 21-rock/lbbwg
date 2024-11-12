<script lang="tsx">
import { AddContractOrderParams, OptionConfig, tradeColor } from '@/api/trade'
import { TradeInfo } from '@/model/tradeModel'
import { Button, Col, InputNumber, message, Row } from 'ant-design-vue'
import { PropType } from 'vue'

export default defineComponent({
  props: {
    formState: {
      type: Object as PropType<Partial<AddContractOrderParams>>,
      required: true
    },
    buyInfo: {
      type: Object as PropType<TradeInfo>,
      required: true
    },
    sellInfo: {
      type: Object as PropType<TradeInfo>,
      required: true
    },
    configData: {
      type: Array as PropType<OptionConfig[]>,
      required: true,
      default: () => []
    },
    configRecord: {
      type: Object as PropType<OptionConfig>,
      default: () => ({})
    },
    isCanOptional: Boolean,
    isOptional: Boolean,
    optionalList: {
      type: Object as PropType<Array<{ label: string; value: boolean }>>,
      default: () => ({})
    }
  },
  emits: ['change', 'submit', 'switchOptional'],
  setup(props, { emit }) {
    const { buyColor, sellColor } = tradeColor()

    const onchange = (prop: keyof AddContractOrderParams, value: any) => {
      emit('change', prop, value)
    }

    const textPlaceholder = computed(
      () =>
        `最小买入量${props.configRecord?.buy_min},最大买入量${props.configRecord?.buy_max}`
    )

    const onSubmit = () => {
      if (!props.formState.money) {
        return message.warn('交易数量不能少于0')
      }
      emit('submit')
    }

    return () => {
      const { buyInfo, formState } = props
      // const info = props.formState.buy_direct === 1 ? buyInfo : sellInfo
      const info = buyInfo
      const btnColor = props.formState.buy_direct === 1 ? buyColor : sellColor

      return (
        <div class="flex flex-col gap-4 ant-form form-deep">
          <section class={'flex gap-2'}>
            {props.optionalList.map((item, index) => (
              <a
                key={index}
                class={`flex justify-center items-center flex-1 h-[32px] border border-[#424242]  rounded-[4px] text-[#7c7f82] text-sm ${props.isOptional === item.value ? 'bg-black text-white' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  emit('switchOptional', item.value)
                }}
              >
                {item.label}
              </a>
            ))}
          </section>
          <section>
            <InputNumber
              class={'ant-deep-input'}
              controls={false}
              max={props.configRecord?.buy_max || 0}
              min={props.configRecord?.buy_min || 0}
              value={formState.money}
              size="large"
              onChange={(value) => {
                onchange('money', value)
              }}
            >
              {{
                addonBefore: () => (
                  <span class={'text-sm text-[#7c7f82]'}>数量</span>
                ),
                addonAfter: () => (
                  <span class={'text-sm text-[#7c7f82]'}>{info.currency}</span>
                )
              }}
            </InputNumber>
            <p class="text-xs text-[#7c7f82]">{textPlaceholder.value}</p>
          </section>
          <section>
            <Row gutter={[12, 12]}>
              {props.configData.map((item) => (
                <Col span={8} key={item.id}>
                  <a
                    class={`block py-1 border border-[#424242] bg-[#161616] rounded-[4px] text-[#7c7f82] text-sm  cursor-pointer ${item.id === formState.mode_id ? 'bg-black text-white' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      onchange('mode_id', item.id)
                    }}
                  >
                    <p class={'h-[24px]/[24px] text-center'}>
                      {item.multiple}
                      <span>s</span>
                    </p>
                    <p class={'h-[24px]/[24px] text-center text-xs'}>
                      <span> {item.profit_min}%</span>
                      <span>~</span>
                      <span>{item.profit_max}%</span>
                    </p>
                  </a>
                </Col>
              ))}
            </Row>
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
            <span class={'text-xs text-[#7c7f82]'}>手续费</span>
            <span class={'text-xs text-white font-bold pl-2'}>
              {props.configRecord?.commission}%
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
              确认下单
            </Button>
          </section>
        </div>
      )
    }
  }
})
</script>
