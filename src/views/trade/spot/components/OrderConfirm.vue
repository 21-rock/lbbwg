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
              {props.orderInfo.direction}
            </p>
          </div>
          <div class={'order-item'}>
            <p class="label">方式</p>
            <p>{props.orderInfo.type}</p>
          </div>
          {props.orderInfo.type === '限价委托' && (
            <div class={'order-item'}>
              <p class="label">委托价</p>
              <p>{props.orderInfo.price || 0}</p>
            </div>
          )}

          <div class={'order-item'}>
            <p class="label">交易额</p>
            <p>{props.orderInfo.amount || 0}</p>
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
