<script lang="tsx">
import { CurrencyPrice } from '@/model/tradeModel'
import { PropType } from 'vue'

export default defineComponent({
  props: {
    tickerColorChange: String,
    tickerData: {
      type: Object as PropType<CurrencyPrice>,
      default: () => ({})
    }
  },
  setup(props) {
    const renderItem = (
      title: string,
      text: string | number,
      color?: string
    ) => (
      <section>
        <p class="text-xs text-gray-400">{title}</p>
        <p class="mt-1 text-sm text-white" style={{ color }}>
          {Number(text || 0).toFixed(2)}
        </p>
      </section>
    )
    return () => {
      const o = props.tickerData
      return (
        <div class={'h-full flex items-center gap-10'}>
          <section>
            <p
              class={'text-base text-[#de4a56] font-bold'}
              style={{ color: props.tickerColorChange }}
            >
              {Number(o.lastPrice || 0).toFixed(2)}
            </p>
            {/* <p class={'text-xs text-white'}>2671.04</p> */}
          </section>
          {renderItem('24h涨跌', o.rate, props.tickerColorChange)}
          {renderItem('24h最高价', o.high)}
          {renderItem('24h最低价', o.low)}
          {renderItem('交易数量', o.amount)}
        </div>
      )
    }
  }
})
</script>
