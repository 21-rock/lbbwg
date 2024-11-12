// 货币涨跌
export interface CurrencyRiseFall {
  // 币种
  currencyName: string
  // 最新价格
  lastPrice: number
  // 涨跌幅度
  rate: number
}

// 交易历史
export interface TradeHistory {
  // 价格
  price: number
  // 数量
  amount: number
  // 类型
  direction: string
}

// 交易信息
export interface TradeInfoOld {
  /**
   * 币种
   */
  currencyName: string
  /**
   * 杠杆
   */
  leverage: number
  /**
   * 价格
   */
  price: number
  /**
   * 金额
   */
  amount: number
  rate: number
  /**
   * 可用
   */
  available: number
  /**
   * 全部
   */
  total: number
  /**
   * 保证金
   */
  margin: number
  /**
   * 手续费
   */
  fees: number
}

// websocket发送参数
export interface WebSocketSendDto {
  type: string
  symbol?: string | undefined
  symbolType?: string | undefined
  token?: string | undefined
  period?: string // 1min 5min 30min 60min
  page: number
  search?: string
}

export interface WsResponse {
  type: string
  time: number
  data: any
}

// 交易价格信息
export interface FinancialData {
  open: number
  high: number
  low: number
  close: number
  amount: number
  vol: number
  count: number
  bid: number
  bidSize: number
  ask: number
  askSize: number
  lastPrice: number
  lastSize: number
  logo: string
  rate: number
  symbol: string
}

// 交易信息
export interface TradeInfo {
  // /**
  //  * 交易类型
  //  */
  // type: "buy" | "sell";
  /**
   * 计价货币
   */
  currency?: string
  /**
   * 交易类型 1：市场委托 2：限价委托
   */
  orderType?: '1' | '2'
  /**
   * 可用余额/数量
   */
  balance?: number
  /**
   * 交易价格
   */
  price?: number
  /**
   * 交易金额/数量
   */
  amount?: number
  /**
   * 杠杆
   */
  leverage?: number
  /**
   * 全部
   */
  total?: number
  /**
   * 保证金
   */
  margin?: number
  /**
   * 手续费
   */
  fees?: number
}

// 现货交易入参
export interface AddSpotOrderIp {
  symbol: string
  direction: 1 | 2
  type: string
  amount: number
  price: number
}

export interface OrderConfirm {
  currency: string
  tradType: 'buy' | 'sell'
  tradTypeName: string
  orderType: string
  amount: number
}

// 划转记录返回值
export interface TransferListOp {
  currency: string
  from_type: string
  reach_type: string
  amount: number
  create_time: string
}

// 转账记录返回值
export interface PageData<T> {
  /**
   * 当前页数
   */
  current_page: number
  /**
   * 数据
   */
  data: T[]
  /**
   * 总页数
   */
  last_page: number
  /**
   * 每页条数
   */
  per_page: number
  /**
   * 总条数
   */
  total: number
  [property: string]: any
}

export interface getMoneyLogListIp {
  page: number
  property: string
  type: string
}

// 转账记录
export interface Datum {
  /**
   * 变动时间
   */
  create_time: string
  /**
   * 变动金额
   */
  money: number | number
  /**
   * 变动类型，类型:1=充值,2=提现,3=理财产品,4=普通交易.5=手续费,6=印花税,7=战略配售,8=快速交易,9=大宗交易,10=IPO,11=保证金交易
   */
  type: number
  [property: string]: any
}

// 现货查询入参
export interface getSpotListIp {
  page: number
  status: string
}

// 现货记录
export interface Spot {
  id: string
  order_no: string
  symbol_base: string
  symbol_pricing: string
  symbol: string
  symbol_type: string
  data_code: string
  direction: string
  trust_type: string
  trust_amount: number
  trust_price: number
  trust_time: string
  final_price: number
  final_amount: number
  end_time: string
  commission: string
  status: string
}

// 合约持仓入参
export interface getOptionOrderListIp {
  page: number
  status: string
}

// 合约持仓
export interface OptionOrder {
  id: string
  order_no: string
  symbol_base: string
  symbol_pricing: string
  symbol: string
  symbol_type: string
  data_code: string
  direction: string
  buy_money: string
  buy_time: string
  buy_price: string
  commission: string
  seconds: string
  profit: string
  loss: string
  close_money: string
  close_time: string
  close_price: string
  profit_money: string
  gain: string
  status: string
  countdown: string
}

// 短线期权持仓入参
export interface getLeverOrderListIp {
  page: number
  status: string
}

// 短线期权持仓
export interface ShortOptionOrder {
  id: string
  order_no: string
  multiple: string
  symbol_base: string
  symbol_pricing: string
  symbol: string
  symbol_type: string
  data_code: string
  direction: string
  buy_money: string
  buy_time: string
  buy_price: string
  commission: string
  seconds: string
  profit: string
  loss: string
  close_money: string
  close_time: string
  close_price: string
  profit_money: string
  gain: string
  status: string
  countdown: string
}

// 质押订单入参
export interface getMiningOrderListIp {
  page: number
}

// 质押订单
export interface MiningOrder {
  id: string
  order_no: string
  mining_config_id: string
  mining_config_logo: string
  mining_config_name: string
  default: string
  income_type: string
  profit_ratio: string
  daily_income: string
  cycle: string
  residue: string
  buy_amount: string
  redemption_amount: string
  earnings: string
  radio: string
  create_time: string
  update_time: string
}

export interface WalletAddress {
  id: string
  /**
   * 币种名称
   */
  currency: string
  /**
   * 币种图标
   */
  currencies_logo: string
  currency_network: string
  currency_address: string
  currency_qr: string
  create_time: string
}

// 添加钱包地址
export interface AddWalletAddressIp {
  currency: string
  currency_network: string
  currency_address: string
  currency_qr: string
}

// 币种地址信息
export interface CurrencyNetwork {
  key: string
  value: string
}

// 币种信息
export interface GetWithdrawOp {
  id: string
  currency: string
  logo_link: string
  currency_network: CurrencyNetwork[]
}

// 兑换入参
export interface CurrencyExchangeIp {
  amount: string
  symbol: string
}

// 当前币种的价格
export interface CurrencyPrice {
  amount: number
  ask: number
  askSize: number
  bid: number
  bidSize: number
  // 接口时字符串，注意转成数字
  close: number
  count: number
  high: number
  // 接口时字符串，注意转成数字
  lastPrice: number
  lastSize: number
  logo: string
  low: number
  open: number
  rate: number
  symbol: string
  vol: number
}

// 现货订单信息
export interface TradeOrderItem {
  amount: number
  direction: 'buy' | 'sell'
  price: number
  tradeId: number
}
