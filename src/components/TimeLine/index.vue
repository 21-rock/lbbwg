<script lang="tsx">
export default defineComponent({
  props: {
    active: {
      type: Number,
      default: () => 0
    }
  },
  setup(props, { slots }) {
    return () => {
      const nodes = slots.default?.() || []
      return (
        <div class="timeline-container">
          {nodes.map((item, index) => (
            <div
              class={{
                'timeline-item': true,
                active: props.active === index
              }}
            >
              <div class="left">
                <span class="circle">{index + 1}</span>
                {nodes.length - 1 > index ? <span class="line"></span> : null}
              </div>
              {item}
            </div>
          ))}
        </div>
      )
    }
  }
})
</script>

<style lang="less" scoped>
.timeline-container {
  .timeline-item {
    position: relative;
    padding-bottom: 32px;
    padding-left: 52px;

    .left {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
    }

    .circle {
      display: flex;
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #282828;
      color: hsl(0deg 0% 100% / 60%);
      font-size: 14px;
    }

    .line {
      position: absolute;
      // border-left: 1px dashed #595959;
      z-index: 1;
      top: 40px;
      bottom: 8px;
      left: 16px;
      width: 1px;
      transform: translateX(-50%);
      background-image: linear-gradient(
        180deg,
        #595959 0,
        #595959 50%,
        transparent 0
      );
      background-size: 1px 8px;
    }

    &.active {
      .circle {
        background-image: linear-gradient(90deg, #1fa2ff, #12d8fa, #a6ffcb);
        color: #000;
      }
    }
  }
}
</style>
