<script lang="tsx">
import useLocaleStore from '@/store/localeStore'
import Cn from './Cn.vue'
import En from './En.vue'
import Hk from './Hk.vue'
import Jp from './Jp.vue'
import Ko from './Ko.vue'
import { LocaleEnum } from '@/enums/locale'

export default defineComponent({
  setup() {
    const store = useLocaleStore()
    const obj = {
      [LocaleEnum.简体中文]: Cn,
      [LocaleEnum.English]: En,
      [LocaleEnum.繁体中文]: Hk,
      [LocaleEnum.日语]: Jp,
      [LocaleEnum.韩语]: Ko
    }

    return () => {
      const Content = obj[store.locale]
      return (
        <div class="w-full bg-white">
          <Content />
        </div>
      )
    }
  }
})
</script>
