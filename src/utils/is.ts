// 匹配数字和小数点
export function isNumeric(value: string) {
  const regex = /^\d+(\.\d+)?$/
  return regex.test(value)
}
