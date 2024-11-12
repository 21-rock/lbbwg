// src/store/localeStore.ts
import { LocaleEnum } from '@/enums/locale'
import i18n from '@/locales'
import { getLocale, setLocale } from '@/utils/locale'
import { defineStore } from 'pinia'

const useLocaleStore = defineStore('locale', {
  state: () => {
    return {
      locale: getLocale()
    }
  },
  actions: {
    // 设置当前语言
    setLocale(locale: LocaleEnum) {
      this.locale = locale
      setLocale(locale)
      i18n.global.locale.value = locale
    }
  },
  getters: {}
})
export default useLocaleStore
