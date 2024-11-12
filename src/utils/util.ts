// 获取枚举中的key值
export const getEnumKey = (value: string, obj: any = {}) => {
  const key = Object.keys(obj).find((item) => obj[item] === value)
  return key || ''
}

// 是否是双数
export const isEven = (number: number) => {
  return number % 2 === 0
}

export const toDecimals = (v: number, decimals = 2) => {
  if (!v) {
    return 0
  }
  let result = v.toFixed(decimals)
  return parseFloat(result)
}
