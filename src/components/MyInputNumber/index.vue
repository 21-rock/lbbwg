<script lang="tsx">
import { InputNumber, InputNumberProps } from 'ant-design-vue'

interface Props {
  wrapClass?: string
  theme?: 'dark'
}

export default defineComponent({
  inheritAttrs: false,
  props: {
    wrapClass: String,
    theme: {
      type: String as PropType<'dark' | 'light'>,
      default: 'dark'
    }
  },
  setup(props: InputNumberProps & Props, { attrs, slots }) {
    const cls = computed(() => {
      let c = 'my-input-number'
      c +=
        props.theme === 'dark'
          ? ' ant-deep-input-number'
          : ' ant-light-input-number'
      if (props.wrapClass) {
        c += ' ' + props.wrapClass
      }
      return c
    })
    return () => {
      return (
        <section class={cls.value}>
          <InputNumber bordered={false} {...attrs}>
            {{ ...slots }}
          </InputNumber>
        </section>
      )
    }
  }
})
</script>

<style lang="scss">
.my-input-number {
  border-radius: 4px;

  .ant-input-number-group-wrapper,
  .ant-input-number-wrapper,
  .ant-input-number,
  .ant-input-number-input-wrap,
  .ant-input-number-input {
    width: 100%;
    height: 100%;
  }

  .ant-input-number-group-addon {
    padding: 0 6px;
    border: none;
    background: none;
  }

  .ant-input-number-input {
    padding-right: 0;
    padding-left: 0;
  }
}

.ant-deep-input-number {
  border: 1px solid #313131;
}

.ant-light-input-number {
  border: 1px solid #d9d9d9;
}
</style>
