import { LocaleEnum } from '@/enums/locale'

const LOCALE_KEY = 'locale'

export const getLocale = (): LocaleEnum => {
  const locale = localStorage.getItem(LOCALE_KEY) as LocaleEnum
  if (locale) {
    return locale
  }
  return LocaleEnum.简体中文
}

export const setLocale = (locale: string) => {
  localStorage.setItem(LOCALE_KEY, locale)
}
