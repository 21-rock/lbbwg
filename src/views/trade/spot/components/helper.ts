import { OrderConfirm } from '.'
import { h } from 'vue'

export const confirm = () => {
  return new Promise((resolve) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    h(OrderConfirm, {
      open: true,
      orderInfo: {},
      onCancel: () => {
        div.parentNode?.removeChild(div)
        resolve(false)
      },
      onOk: () => {
        div.parentNode?.removeChild(div)
        resolve(true)
      }
    })
    // document.body.appendChild(vNode.el)
  })
}
