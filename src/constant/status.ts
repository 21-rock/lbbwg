import { SubscriptCurrencyStatusEnum } from '@/enums/currency'
import { RechargeStatusEnum, SpotOrderStatusEnum } from '@/enums/status'

export const RechargeStatus = {
  [RechargeStatusEnum.审核中]: '审核中',
  [RechargeStatusEnum.审核通过]: '审核通过',
  [RechargeStatusEnum.审核不通过]: '审核不通过'
}

export const SpotOrderStatus = {
  [SpotOrderStatusEnum.完全成交]: '完全成交',
  [SpotOrderStatusEnum.委托等待]: '委托等待',
  [SpotOrderStatusEnum.主动撤单]: '主动撤单',
  [SpotOrderStatusEnum.强制撤单]: '强制撤单'
}

export const SubscriptCurrencyStatus = {
  [SubscriptCurrencyStatusEnum.即将开始]: '即将开始',
  [SubscriptCurrencyStatusEnum.进行中]: '进行中',
  [SubscriptCurrencyStatusEnum.已完成]: '已完成',
  [SubscriptCurrencyStatusEnum.全部]: '全部'
}
