<script lang="tsx">
import { v4 } from 'uuid'
export default defineComponent({
  props: {
    active: {
      type: Number,
      default: () => 0
    }
  },
  setup() {
    const id = v4()
    const compRef = useTemplateRef<HTMLElement>(id)
    const renderView = () => {
      const script = document.createElement('script')
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
      script.type = 'text/javascript'
      script.async = true
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "zh_CN",
          "hide_side_toolbar": false,
          "allow_symbol_change": false,
          "calendar": false,
          "backgroundColor": "rgba(22, 22, 22, 1)",
          "support_host": "https://www.tradingview.com"
        }`
      compRef.value!.appendChild(script)
    }

    onMounted(() => {
      nextTick(() => {
        renderView()
      })
    })

    return () => {
      return (
        <div
          class="tradingview-widget-container"
          ref={id}
          style={{ height: '100%', width: '100%' }}
        >
          <div
            class="tradingview-widget-container__widget"
            style={{ height: 'calc(100% - 32px)', width: '100%' }}
          ></div>
          {/* <div class="tradingview-widget-copyright">
            <a
              href="https://cn.tradingview.com/"
              rel="noopener nofollow"
              target="_blank"
            >
              <span class="blue-text">在TradingView上跟踪所有市场</span>
            </a>
          </div> */}
        </div>
      )
    }
  }
})
</script>

<style lang="less" scoped></style>
