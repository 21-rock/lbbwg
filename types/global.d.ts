// import { Dayjs } from 'dayjs'

export {}
declare global {
  type OnTimeChange = (
    value: [Dayjs, Dayjs] | [string, string],
    valueStr: [string, string]
  ) => void

  interface Demo {
    a: string
  }
}
