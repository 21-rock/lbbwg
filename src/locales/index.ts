import { createI18n } from 'vue-i18n'
import { LocaleMessages } from './locale-messages'
import { getLocale } from '@/utils/locale'

const locale = getLocale()

const i18n = createI18n({
  legacy: false,
  locale: locale, // 设置当前语言
  fallbackLocale: locale, // 设置回退语言
  globalInjection: true, // 全局注册 $t 方法
  messages: LocaleMessages
})

export default i18n
