<script lang="tsx">
import { MyTabs } from '@/components'
import ExchangeForm from './ExchangeForm.vue'
import { getIconUrl } from '@/assets'
import { RouterLink } from 'vue-router'
import { useSpot } from '../hooks/useSpot'
import { AddSpotOrderParams } from '@/api/trade'
import OrderConfirm from './OrderConfirm.vue'
import { useModal } from '@/hooks'
import { PropType } from 'vue'
import { CurrencyPrice } from '@/model/tradeModel'

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
        tab: '现货'
      }
    ]

    const currentCurrency = computed(() => props.currency)
    const tickerData = computed(() => props.tickerData)

    const {
      buyInfo,
      sellInfo,
      directionTabs,
      typeTabs,
      formState,
      orderInfo,

      onDirectionChange,
      trade
    } = useSpot(currentCurrency, tickerData)
    const { modalVisible, onModalClose, onModalOpen } = useModal()

    const handleSubmit = () => {
      onModalOpen()
    }

    const handleTrade = async () => {
      onModalClose()
      trade()
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
                          background: `no-repeat url(${formState.direction === item.type ? item.bgActive : item.bg}) left center`,
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
                  <MyTabs
                    tabPages={typeTabs}
                    v-model:activeKey={formState.type}
                    class={'my-tabs-deep-medium mt-3'}
                  >
                    {{
                      content: () => (
                        <div class={'mt-5'}>
                          <ExchangeForm
                            direction={formState.direction}
                            type={formState.type}
                            formState={formState}
                            buyInfo={buyInfo}
                            sellInfo={sellInfo}
                            onChange={(
                              prop: keyof AddSpotOrderParams,
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
                            {/* <AssetInfo /> */}
                          </div>
                        </div>
                      )
                    }}
                  </MyTabs>
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AssetInfo() {
  return (
    <>
      <div class={'pt-5  border-t border-[#313131]'}>
        <h3 class={'text-sm text-white font-bold pb-4'}>资产</h3>
        <section class={'pb-5'}>
          <ul class="text-sm text-[#727272]">
            <li
              class={'pl-9 py-1 leader-[24px] text-white flex justify-between'}
              style={{
                background: `no-repeat url(${getIconUrl('icon-check.png')}) left`,
                backgroundSize: '24px 24px'
              }}
            >
              <span>USDT</span>
              <span>0</span>
            </li>
            <li class={'pl-9 py-1 leader-[24px]  flex justify-between'}>
              <span>冻结</span>
              <span>0</span>
            </li>
            <li class={'pl-9 pt-1 leader-[24px]  flex justify-between'}>
              <span>待释放</span>
              <span>0</span>
            </li>
          </ul>
        </section>
        <section class={'py-4  border-t border-[#313131]'}>
          <ul class="text-sm text-[#727272]">
            <li
              class={'pl-9 py-1 leader-[24px] text-white flex justify-between'}
              style={{
                background: `no-repeat url(${getIconUrl('icon-check.png')}) left`,
                backgroundSize: '24px 24px'
              }}
            >
              <span>ETH</span>
              <span>0</span>
            </li>
            <li class={'pl-9 py-1 leader-[24px]  flex justify-between'}>
              <span>冻结</span>
              <span>0</span>
            </li>
            <li class={'pl-9 py-1 leader-[24px]  flex justify-between'}>
              <span>待释放</span>
              <span>0</span>
            </li>
          </ul>
        </section>
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
    </>
  )
}
</script>
