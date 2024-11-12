import { OrderDirectionEnum, OrderTypeEnum } from '@/enums/trade'

// 买卖类型
export const OrderDirection = {
  [OrderDirectionEnum.买入]: '买入',
  [OrderDirectionEnum.卖出]: '卖出'
}

export const OrderType = {
  [OrderTypeEnum.市场委托]: '市场委托',
  [OrderTypeEnum.限价委托]: '限价委托'
}
