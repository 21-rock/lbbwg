export enum RechargeStatusEnum {
  '审核中' = '0',
  '审核通过' = '1',
  '审核不通过' = '2'
}

// 订单状态
export enum SpotOrderStatusEnum {
  '完全成交' = 1,
  '委托等待' = 2,
  '主动撤单' = 3,
  '强制撤单' = 4
}

// 现货交易类型
export enum SpotExchangeStatusEnum {
  '全部' = '0',
  '委托' = '1',
  '成交' = '2',
  '撤单' = '3'
}

// 合约订单状态
export enum ContractOrderStatus {
  '已结算' = 1,
  '未结算' = 0
}
