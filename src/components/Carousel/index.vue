<script lang="tsx">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { PropType } from 'vue'

export default defineComponent({
  // components: [Swiper, SwiperSlide],
  props: {
    nodes: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup(props, { attrs }) {
    const onSwiper = () => {
      // console.log(swiper)
    }
    const onSlideChange = () => {
      // console.log('slide change')
    }

    // 默认插槽
    // const defaultSlot = (record: any) =>
    //   slots.default ? slots.default(record) : null

    return () => (
      <Swiper
        slides-per-view={1}
        space-between={0}
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
        {...attrs}
      >
        {{
          default: () =>
            props.nodes.map((src, index) => (
              <SwiperSlide key={index}>
                <div class="w-full h-full">
                  <img src={src} class="w-full h-full object-cover" />
                </div>
              </SwiperSlide>
            ))
        }}
      </Swiper>
    )
  }
})
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #fff;
  font-size: 18px;
  text-align: center;
}

.swiper-slide img {
  display: block;
  object-fit: cover;
}
</style>
