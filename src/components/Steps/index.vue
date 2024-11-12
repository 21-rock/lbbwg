<script lang="tsx">
import { getIconUrl } from '@/assets'
import { PropType, VNode } from 'vue'

const checkIcon = getIconUrl('icon-check.png')

export default defineComponent({
  props: {
    active: {
      type: Number,
      default: () => 0
    },
    titles: {
      type: Array as PropType<Array<string | VNode>>,
      default: () => []
    }
  },
  setup(props, { slots }) {
    return () => {
      const nodes = slots.default?.() || []
      return (
        <div class="step-container">
          {nodes.map((item, index) => {
            const title = props.titles[index]
            return (
              <div
                class={{
                  'step-item': true,
                  active: props.active === index,
                  finished: props.active > index
                }}
              >
                <div class="left">
                  <div class="hd-box">
                    {props.active > index ? (
                      <img src={checkIcon} class={'circle-icon'} alt="" />
                    ) : (
                      <span class="circle">{index + 1}</span>
                    )}
                  </div>
                  {nodes.length - 1 > index ? <span class="line"></span> : null}
                </div>
                <div class="content">
                  <h3 class="title">{title}</h3>
                  {props.active >= index ? h(item) : null}
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.step-container {
  $gray: #e0e0e0;

  .step-item {
    position: relative;
    padding-bottom: 0;
    padding-left: 30px;

    .left {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;

      .hd-box {
        display: flex;
        position: relative;
        z-index: 2;
        align-items: center;
        height: 30px;
      }

      .circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border: 1px solid $gray;
        border-radius: 50%;
        color: $gray;
        font-size: 12px;
        font-weight: bold;
      }

      .circle-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }

      .line {
        position: absolute;
        z-index: 1;
        top: 25px;
        bottom: -5px;
        left: 10px;
        transform: translateX(-50%);
        border-left: 1px dashed $gray;
      }
    }

    .content {
      position: relative;
      z-index: 2;
      // padding-top: 30px;
      padding-bottom: 30px;
    }

    .title {
      display: flex;
      align-items: center;
      color: #939393;
      font-size: 20px;
      line-height: 30px;
    }

    &.active {
      .circle {
        background-image: linear-gradient(90deg, #1fa2ff, #12d8fa, #a6ffcb);
        color: #000;
      }

      .title {
        color: #000;
        font-weight: bold;
      }
    }

    &.finished {
      .title {
        color: #000;
        font-weight: bold;
      }
    }
  }
}
</style>
