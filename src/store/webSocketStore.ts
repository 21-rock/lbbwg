import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import pako from 'pako'

const useWebSocketStore = defineStore('webSocket', () => {
  const wsurl = ref<string>('')
  const ws = ref<WebSocket | null>(null)
  const lockReconnect = ref<boolean>(false)
  const timeout = ref<number>(30000) // 心跳间隔
  const timeoutObj = ref<number | null>(null)
  const serverTimeoutObj = ref<number | null>(null)
  const timeoutnum = ref<number | null>(null)
  const isState = ref<boolean>(false)
  const msg = ref<any>(null) // 接收到的信息

  const socketMsgs = computed(() => msg.value)
  const getState = computed(() => isState.value)

  function webSocketInit(url: string) {
    // console.log('--url--', url)
    wsurl.value = url
    ws.value = new WebSocket(wsurl.value)

    ws.value.onopen = () => {
      clearTimeout(connectTimer)
      console.log('Connection success...')
      isState.value = true
      start()
    }

    const connectTimer = setTimeout(() => {
      if (!isState.value) {
        console.log('WebSocket connection timed out')
        ws.value?.close()
      }
    }, 3000)

    ws.value.onmessage = (res) => {
      const base64String = res.data
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
      const base64 = (base64String + padding)
        .replace(/\-/g, '+') // eslint-disable-line
        .replace(/_/g, '/') // eslint-disable-line
      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      const info = pako.inflateRaw(outputArray, { to: 'string' })
      const data = JSON.parse(info)

      if (data.type === 'ping') {
        reset()
      } else {
        // console.log('--data--', data)
        msg.value = data
      }
      // if (msg.value.type == "markets") {
      // console.log("websokect message:");
      // console.log(msg.value);
      // }
    }

    ws.value.onclose = () => {
      console.log('Connection closed...')
      isState.value = false
      reconnect()
    }

    ws.value.onerror = () => {
      console.log('Connection error...')
      isState.value = false
      reconnect()
    }
  }

  function reconnect() {
    if (lockReconnect.value) return
    lockReconnect.value = true

    timeoutnum.value && clearTimeout(timeoutnum.value)
    timeoutnum.value = window.setTimeout(() => {
      webSocketInit(wsurl.value)
      lockReconnect.value = false
    }, 500)
  }

  function reset() {
    clearTimeout(timeoutObj.value!)
    clearTimeout(serverTimeoutObj.value!)
    start()
  }

  function start() {
    if (timeoutObj.value) {
      clearTimeout(timeoutObj.value)
    }
    if (serverTimeoutObj.value) {
      clearTimeout(serverTimeoutObj.value)
    }

    timeoutObj.value = window.setTimeout(() => {
      if (ws.value?.readyState === 1) {
        webSocketSend({ type: 'ping' })
      } else {
        reconnect()
      }

      serverTimeoutObj.value = window.setTimeout(() => {
        ws.value?.close()
      }, timeout.value)
    }, timeout.value)
  }

  function webSocketSend(data: any) {
    // console.log('--webSocketSend---', data)
    if (ws.value?.readyState === 1) {
      ws.value.send(JSON.stringify(data))
    } else {
      console.log(ws.value?.readyState)
    }
  }

  return {
    wsurl,
    ws,
    lockReconnect,
    timeout,
    timeoutObj,
    serverTimeoutObj,
    timeoutnum,
    isState,
    msg,
    socketMsgs,
    getState,
    webSocketInit,
    webSocketSend,
    reconnect,
    reset,
    start
  }
})

export default useWebSocketStore
