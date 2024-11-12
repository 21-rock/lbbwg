import { computed, Ref } from 'vue'
import { tradeColor } from '@/utils/common'
import { useWebSocketStore } from '@/store'

const useCurrency = (parm: Ref<WebSocketSendDto>) => {
  let timer: NodeJS.Timeout | string | number | undefined
  const webSocket = useWebSocketStore()
  const marketsData = computed(() => webSocket.socketMsgs)
  const { buyColor, sellColor } = tradeColor()

  const subscribeDataTask = () => {
    if (webSocket.getState) {
      // console.log('webSocketSend', parm.value)
      webSocket.webSocketSend(parm.value)

      if (timer) {
        clearInterval(timer)
      }
    }
  }

  // 发起数据订阅
  const getMarketsData = () => {
    console.log(`getMarketsData ${parm.value.type}`)
    if (webSocket.getState) {
      subscribeDataTask()
    } else {
      timer = setInterval(subscribeDataTask, 1000)
    }
  }

  const marketData = [
    'deal',
    'market',
    'markets',
    'options',
    'optional',
    'trade',
    'kline'
  ] as const

  // 取消数据订阅
  const stopMarketsData = (method: (typeof marketData)[number]) => {
    webSocket.webSocketSend({ type: 'stop', method: method })
    console.log(`ws stop ${method} data`)
  }

  const stopAllMarketsData = () => {
    marketData.forEach((item) => {
      stopMarketsData(item)
    })
  }

  // 涨跌颜色(后续使用common.ts中的同名函数)
  const colorChange = (value: number | string) => {
    if (typeof value == 'number') {
      return value <= 0 ? sellColor : buyColor
    } else {
      return value === 'buy' ? buyColor : sellColor
    }
  }
  return {
    marketsData,
    getMarketsData,
    stopMarketsData,
    stopAllMarketsData,
    colorChange
  }
}

export default useCurrency
