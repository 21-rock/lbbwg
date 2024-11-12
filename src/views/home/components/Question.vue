<script setup lang="ts">
import { Collapse, CollapsePanel } from 'ant-design-vue'
</script>

<template>
  <Collapse
    expandIconPosition="end"
    :bordered="false"
    class="index-questtion-container"
  >
    <CollapsePanel key="1">
      <template #header>
        <h3 class="text-xl text-white">UZX提供哪些服务？</h3>
      </template>
      <div class="text-base/[30px] text-gray-400">
        <p>
          UZX DAO 通过授权开曼基金会管理
          UZX.com，该治理结构比传统加密货币交易所更具优势，有效保证了交易所的公平公正及用户资产安全。管理团队成员来自全球多个国家和地区，核心骨干曾就职于Coinbase、Binance、MorganStanley、Amazon、Google等全球知名金融及科技企业，具有强大的全球战略运营能力和丰富的金融风险控制和管理经验
        </p>
      </div>
    </CollapsePanel>
    <CollapsePanel key="2">
      <template #header>
        <h3 class="text-xl text-white">UZX提供哪些服务？</h3>
      </template>
      <div class="text-base/[30px] text-gray-400">
        <p>
          UZX.com (Universal Zone Exchange)
          是一家基于分散式自治组织（DAO）治理的国际化数字资产衍生品交易所。
        </p>
        <p>UZX可以为您提供</p>
        <p>
          ·
          多种交易模式，如币币交易、U本位合约交易、币本位合约交易、期权合约交易、秒合约交易。
        </p>
        <p>· 通过UZX平台推出的存币生息，让手中的闲置资产变得有价值。</p>
        <p>· 支持用户匿名登录，保护用户的隐私。</p>
      </div>
    </CollapsePanel>
    <CollapsePanel key="3">
      <template #header>
        <h3 class="text-xl text-white">UZX值得用户信赖吗？</h3>
      </template>
      <div class="text-base/[30px] text-gray-400">
        <p>
          UZX的技术方案基于 Amazon AWS 与 Google Cloud 等，能有效防止 DDOS
          等攻击，支持动态和静态数据分离，热点数据缓存，异地容灾，平行扩展等功能。全球领先的技术架构保障了用户安全交易，并且拥有即时区块链资产存取功能，多币种地址共享技术，多重安全验证保护。同时，UZX.com
          拥有业内较低的区块链资产交易费用和提取费用。
        </p>
      </div>
    </CollapsePanel>
  </Collapse>
</template>

<style lang="less">
.index-questtion-container {
  .ant-collapse-header {
    align-items: center !important;
    height: 96px;
    color: #fff;

    .ant-collapse-expand-icon {
      color: #fff;
    }
  }

  .ant-collapse-item {
    border-color: #131419;
  }
}
</style>
