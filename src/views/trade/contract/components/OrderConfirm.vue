<script lang="tsx">
import { Modal } from '@/components'
import { ModalProps } from 'ant-design-vue'

interface Props extends ModalProps {
  orderInfo: Record<any, any>
}
export default defineComponent<Props>({
  props: {
    orderInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup: (props, { attrs }) => {
    return () => (
      <Modal title={'订单确认'} width={400} {...attrs}>
        <div class="order-confirm-wrap">
          <div class={'order-item'}>
            <p class="label">名称</p>
            <p>{props.orderInfo.symbol}</p>
          </div>
          <div class={'order-item'}>
            <p class="label">方向</p>
            <p
              style={{
                color: props.orderInfo.color
              }}
            >
              {props.orderInfo.buy_direct}
            </p>
          </div>
          <div class={'order-item'}>
            <p class="label">价格</p>
            <p>{props.orderInfo.price || 0}</p>
          </div>
          <div class={'order-item'}>
            <p class="label">周期</p>
            <p>
              {props.orderInfo.period}s({props.orderInfo.period_rate}%)
            </p>
          </div>

          <div class={'order-item'}>
            <p class="label">交易额</p>
            <p>{props.orderInfo.money || 0}</p>
          </div>
        </div>
      </Modal>
    )
  }
})
</script>

<style lang="scss" scoped>
.order-confirm-wrap {
  .order-item {
    display: flex;
    justify-content: space-between;
    height: 32px;
    font-size: 16px;
    line-height: 32px;

    .label {
      color: #616161;
    }
  }
}
</style>
