// import elEnLocale from 'element-plus/es/locale/lang/en'
// import elZhLocale from 'element-plus/es/locale/lang/zh-cn'
import en from './en.json'
import cn from './cn.json'
import hk from './hk.json'
import jp from './jp.json'
import ko from './ko.json'

export const LocaleMessages = {
  en: {
    ...en
    // ...elEnLocale
  },
  cn: {
    ...cn
    // ...elZhLocale
  },
  hk: { ...hk },
  jp: { ...jp },
  ko: { ...ko }
}
