<script lang="tsx">
import { MyTabs } from '@/components'
import ExchangeForm from './ExchangeForm.vue'
import { RouterLink } from 'vue-router'
import { AddContractOrderParams } from '@/api/trade'
import OrderConfirm from './OrderConfirm.vue'
import { useModal } from '@/hooks'
import { PropType } from 'vue'
import { CurrencyPrice } from '@/model/tradeModel'
import { useContract } from '../hooks/useContract'

export default defineComponent({
  props: {
    currency: {
      type: String,
      default: 'BTC/USDT'
    },
    tickerData: {
      type: Object as PropType<CurrencyPrice>,
      required: true
    }
  },
  setup(props) {
    const tabPages = [
      {
        key: '1',
        tab: '合约'
      }
    ]

    const currentCurrency = computed(() => props.currency)
    const tickerData = computed(() => props.tickerData)

    const {
      buyInfo,
      sellInfo,
      directionTabs,
      formState,
      orderInfo,
      configData,
      configRecord,
      onDirectionChange,
      submitOrder
    } = useContract(currentCurrency, tickerData)
    const { modalVisible, onModalClose, onModalOpen } = useModal()

    const handleSubmit = () => {
      onModalOpen()
    }

    const handleTrade = async () => {
      onModalClose()
      submitOrder()
    }

    return () => {
      return (
        <>
          <MyTabs
            tabPages={tabPages}
            activeKey={'1'}
            class={'my-tabs-deep-medium'}
          >
            {{
              content: () => (
                <div class={'w-full min-h-[300px] overflow-hidden p-3'}>
                  <div class={'relative  h-[38px]'}>
                    {directionTabs.map((item) => (
                      <div
                        class="w-[51.5%] h-full flex justify-center items-center absolute"
                        style={{
                          background: `no-repeat url(${formState.buy_direct === item.type ? item.bgActive : item.bg}) left center`,
                          backgroundSize: '100% 100%',
                          ...item.style
                        }}
                      >
                        <span
                          class={
                            'flex justify-center items-center w-[90%] h-full cursor-pointer cursor-pointer text-white text-base'
                          }
                          onClick={() => onDirectionChange(item.type)}
                        >
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div class={'mt-5'}>
                    <ExchangeForm
                      formState={formState}
                      buyInfo={buyInfo}
                      sellInfo={sellInfo}
                      configData={configData.value}
                      configRecord={configRecord.value}
                      onChange={(
                        prop: keyof AddContractOrderParams,
                        value: any
                      ) => {
                        formState[prop] = value
                      }}
                      onSubmit={handleSubmit}
                    />
                    <div class={'mt-[100px]'}>
                      <section class="flex gap-5">
                        <RouterLink
                          to="/Recharge"
                          class="btn-border-deep-gradient w-[50%] h-[42px] rounded-[21px]"
                        >
                          <span class="rounded-[20px]">充值</span>
                        </RouterLink>
                        <RouterLink
                          to="/Recharge"
                          class="block border border-[#313131] text-white w-[50%] h-[42px] rounded-[21px]"
                        >
                          <span class="flex items-center justify-center w-full h-full">
                            划转
                          </span>
                        </RouterLink>
                      </section>
                    </div>
                  </div>
                </div>
              )
            }}
          </MyTabs>
          {modalVisible.value && (
            <OrderConfirm
              width={400}
              open={modalVisible.value}
              orderInfo={orderInfo.value}
              onCancel={onModalClose}
              onOk={handleTrade}
            />
          )}
        </>
      )
    }
  }
})
</script>
