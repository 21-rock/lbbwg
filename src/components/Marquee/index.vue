<script lang="tsx">
// https://github.com/xfy520/vue3-seamless-scroll
import { PropType } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup(props, { slots, attrs }) {
    const data = Array.from({ length: 20 }, (_, index) => `slider-${index}`)

    return () => (
      <Vue3SeamlessScroll
        list={data}
        direction="left"
        class="scroll"
        {...attrs}
      >
        <div class="marquee-content">
          {props.data.map((item, index) => (
            <div class="marquee-item" key={index}>
              {slots.default && slots.default(item)}
            </div>
          ))}
        </div>
      </Vue3SeamlessScroll>
    )
  }
})
</script>

<style scoped lang="less">
.scroll {
  width: 100%;
  overflow: hidden;
}

.marquee-content {
  white-space: nowrap;

  .marquee-item {
    display: inline-block;
  }
}
</style>
