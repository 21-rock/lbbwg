<script lang="ts" setup>
import { getIconUrl, getImageUrl } from '@/assets'
import { isEven } from '@/utils/util'

const node2 = [
  {
    title: '提案权',
    desc: '治理代币持有人有权提出关于交易所和生态系统发展的提案。这可以包 括新功能的建议、改进用户体验的建议、扩展市场的建议等。',
    icon: getImageUrl('uzx-2.png')
  },
  {
    title: '投票权',
    desc: '治理代币持有人将有权参与投票。他们可以投票决定关于交易所运营和 生态系统发展的重要事项，例如提案的接受或拒绝、超级代表的选举等。',
    icon: getImageUrl('uzx-3.png')
  },
  {
    title: '交易 VIP 权',
    desc: '持有一定数量的治理代币的用户将获得交易 VIP 权，享受一系列交易优惠， 如低手续费、高佣金奖励等。',
    icon: getImageUrl('uzx-4.png')
  },
  {
    title: '交易所项目分红权',
    desc: '治理代币持有人享有交易所利润的分红权。这意味着他们可以从交易所的成功中分享利润，激励他们积极支持项目的发展。',
    icon: getImageUrl('uzx-5.png')
  }
]

const nodes3 = [
  {
    title: '发行5亿枚治理代币',
    desc: 'UZX DAO 将发行名为 UZX 的治理代币，总量限制为 5 亿枚，初始价格0.0416USDT。'
  },
  {
    title: '4亿枚代币给创世纪成员',
    desc: '1.4 亿枚 UZX 代币将分配给 7 个创世成员，每名成员 2000 万枚，发行后币锁仓2年。'
  },
  {
    title: '1亿枚代币给超级代表',
    desc: '2.1 亿枚 UZX 代币将按照每三个月释放 2100 万枚 UZX 代币给 2 个超级代表，释放后币锁仓1年，直至释放完毕。'
  },
  {
    title: '交易奖励1亿枚代币',
    desc: '全网奖励总额为 1 亿枚 UZX 治理代币，根据每日用户在交易所产生的手续费的1%比例同步释放。用户获得的奖励代币可以即时买卖。'
  },
  {
    title: '交易所营运持有3000万枚代币',
    desc: '交易所营运基金账户将持有 3000 万枚 UZX 代币，用于交易所前期的日常运营开支，包括市场活动和奖励优秀人才等。市场活动人员获得的奖励无锁仓要求，随时可以买卖'
  },
  {
    title: 'UZX发展基金持有2000万枚代币',
    desc: 'UZX DAO 的发展基金将持有 2000 万枚 UZX 代币，用于UZX.network 技术研发和社区建设。'
  }
]

const nodes4 = [
  {
    title: '智能合约',
    desc: '成员不受正式合同的约束，而是通过共同的目标和网络激励相互连接，这些规则是透明的，嵌入在开源软件中。',
    icon: getImageUrl('uzx-7.png')
  },
  {
    title: '时间锁（Timelocks)',
    desc: '资金可以被设定在某个时间点之前无法移动，为用户提供了额外的安全保障，以便对可疑活动做出反应',
    icon: getImageUrl('uzx-6.png')
  },
  {
    title: '多重签名（Multi-Sig）钱包',
    desc: '去中心化自治组织(DAO)将用于交易所的决策，包括资金管理。DAO 成员通常是交易所的用户，他们可以投票决定交易所的经营决策。',
    icon: getImageUrl('uzx-8.png')
  }
]

const nodes5 = [
  {
    title: '构建基础设施',
    time: '(2023 年初 - 2023 年底)',
    descItems: ['平台搭建', '代币发行', '安全审计', '社区互动和透明度'],
    idxIcon: getImageUrl('num-1.png')
  },
  {
    title: '平台推出和扩展',
    time: '(2024 年 - 2025年)',
    descItems: ['交易所上线', '跨链桥接', '社区建设', '社区互动和透明度'],
    idxIcon: getImageUrl('num-2.png')
  },
  {
    title: '持续改进和发展',
    time: '(2026年以后)',

    descItems: [
      '技术升级',
      '全球扩张',
      '建设 UZX.network 公链',
      '社区治理',
      '社区互动和透明度'
    ],
    idxIcon: getImageUrl('num-3.png')
  }
]

const node6 = [
  {
    title: '决策系统',
    desc: '为了有效管理和指导交易所的运营和发展，我们将设立一个由 20 个超级代表和 7 个创世成员组成的交易所 DAO 决策委员会。'
  },
  {
    title: '代表任期',
    desc: '每位超级代表的任期将设定为一年。一旦超级代表的任期结束，社区的UZX 代币持有者将有机会投票选举新的超级代表。这种机制确保了决策委员会成员的持续流动性和民主性。'
  },
  {
    title: '候选要求',
    desc: '成为超级代表的候选人，最低持币锁仓要求将不得低于 500 万枚 UZX 代币。这一要求旨在确保超级代表拥有足够的权益，并对交易所的长期成功有着共同的信念。'
  },
  {
    title: '提案系统',
    desc: '我们鼓励 DAO 的成员积极参与提出有关交易所发展的提案。这些提案可以涵盖各种方面，包括但不限于增加新功能、改进用户体验、扩展市场、提高安全性等。'
  }
]

const getDis = (index: number) => {
  const row = Math.ceil((index + 1) / 3)
  if (!isEven(row)) {
    return {
      left: (index % 3) * 33.33 + '%'
    }
  }
  let left = (index + 1) % 3
  return {
    left: left === 0 ? left : (3 - left) * 33.33 + '%'
  }
  // left: (index % 3) * 33.33 + '%',
}
</script>

<template>
  <article class="bg-black min-h-[calc(100vh-80px)] pt-[100px] text-white">
    <section class="clearfix w-[1200px] mx-auto">
      <div class="float-right mt-[14px]">
        <img :src="getImageUrl('uzx-1.png')" class="w-[400px] h-auto" />
      </div>
      <div class="float-left w-[800px]">
        <h2 class="text-[56px] font-bold mb-[28px] text-white">
          <span class="text-gradient"> 欢迎来到 UZX OpenGov </span>
        </h2>
        <p class="text-[24px] text-gray-400">
          UZX.com是一家由DAO驱动的全球加密货币交易所，致力于提供安全稳定的交易环境。通过DAO，我们的目标是消除中心化交易所的潜在风险，提高用户信任度和透明度。
        </p>
        <div class="flex items-center gap-1 mt-[28px]">
          <img :src="getIconUrl('icon-32.png')" alt="" />
          <p class="text-xl text-white">限时免费领取空投治理代币</p>
          <img :src="getIconUrl('icon-32.png')" alt="" />
        </div>
      </div>
    </section>

    <section class="mt-[130px] w-[1200px] mx-auto">
      <h2
        class="text-[56px] font-bold mb-[70px] text-white text-gradient text-center"
      >
        UZX 治理代币持有人部分权益
      </h2>
      <ul class="grid grid-cols-2 gap-16">
        <li
          v-for="item in node2"
          :key="item.title"
          class="flex items-center gap-7"
        >
          <img :src="item.icon" alt="" class="w-[112px] h-auto" />
          <div>
            <h3 class="text-2xl font-bold text-white">{{ item.title }}</h3>
            <p class="mt-4 text-base text-gray-400">{{ item.desc }}</p>
          </div>
        </li>
      </ul>
    </section>
    <section class="mt-[130px] w-[1200px] mx-auto">
      <h2
        class="text-[56px] font-bold mb-[70px] text-white text-gradient text-center"
      >
        <span class="text-gradient"> UZX 治理代币持有人部分权益 </span>
      </h2>
      <div class="section-3-content">
        <div class="line-box">
          <span
            class="idx"
            v-for="(item, index) in 6"
            :key="item"
            :style="{
              // left: (index % 3) * 33.33 + '%',
              top: Math.floor(index / 3) * 380 + 'px',
              transform: 'translateY(-50%)',
              ...getDis(index)
            }"
            >{{ item }}</span
          >
        </div>
        <div
          class="text-item"
          v-for="(item, index) in nodes3"
          :key="index"
          :style="{
            ...getDis(index),
            top: Math.floor(index / 3) * 380 + 'px'
            // transform: 'translateY(-50%)'
          }"
        >
          <h3 class="text-[22px] text-white font-bold">{{ item.title }}</h3>
          <p class="text-gray-400 text-base mt-[60px]">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </section>

    <section class="mt-[130px] w-[1200px] mx-auto">
      <div class="flex items-center gap-3">
        <img :src="getIconUrl('icon-33.png')" />
        <span class="text-gradient text-[18px] font-bold">
          治理代币在第一年内高达95%以上锁仓率，在第二年内预计高达90%锁仓率，这将保证治理代币价格随交易所发展稳步增长。
        </span>
      </div>
      <div class="mt-10">
        <h3 class="text-[36px] text-white font-[600]">UZX 代币</h3>
        <p class="mt-5 text-base text-white">
          UZX治理代币不仅是平台的数字货币，还是治理的核心代币。它将决定交易所的发展方向与未来，是汇集全球智慧，提升交易所核心竞争力的至胜法宝。
        </p>
      </div>
    </section>
    <!-- 安全赋能 -->
    <section class="mt-[130px] w-[1200px] mx-auto">
      <h2
        class="text-[56px] font-bold mb-[70px] text-white text-gradient text-center"
      >
        <span class="text-gradient">安全赋能</span>
      </h2>
      <ul class="grid grid-cols-3 gap-10 text-white">
        <li
          v-for="(item, index) in nodes4"
          :key="index"
          class="h-[328px] p-6 flex flex-col justify-center items-center gap-6 border border-[hsla(0,0%,100%,.2)] rounded-[8px] bg-[#131313]"
        >
          <img :src="item.icon" alt="" class="h-[66px] w-auto" />
          <h3 class="text-[22px] font-bold">{{ item.title }}</h3>
          <p class="text-base">{{ item.desc }}</p>
        </li>
      </ul>
    </section>
    <!-- 项目路线图 -->
    <section class="mt-[130px] w-[1200px] mx-auto">
      <h2
        class="text-[56px] font-bold mb-[70px] text-white text-gradient text-center"
      >
        <span class="text-gradient">项目路线图</span>
      </h2>
      <ul class="flex justify-between gap-10">
        <template v-for="(item, index) in nodes5" :key="index">
          <li
            class="pt-[120px]"
            :style="{ background: `no-repeat url(${item.idxIcon}) center top` }"
          >
            <h3 class="text-center text-xl font-bold tracking-[2px]">
              {{ item.title }}
            </h3>
            <p class="text-[13px] text-gray-400 text-center">{{ item.time }}</p>
            <ol class="pl-4 mt-2">
              <li
                v-for="(c, idx) in item.descItems"
                :key="idx"
                class="text-[13px]/[22px] list-disc"
              >
                {{ c }}
              </li>
            </ol>
          </li>
          <span
            v-if="index < nodes5.length - 1"
            class="inline-block h-[140px] flex-1 border-b-[2px] border-dashed border-gray-400"
          ></span>
        </template>
      </ul>
    </section>
    <section class="mt-[130px] gradient h-[600px]">
      <div
        class="w-[1200px] h-full mx-auto flex items-center justify-between gap-3"
      >
        <div>
          <p class="text-[32px] text-black">谁拥有UZX.com交易所？</p>
          <p class="text-[56px] font-bold text-black mt-[40px]">
            UZX DAO成员共同拥有！
          </p>
          <p class="text-[18px] text-[rgba(99,59,59,.8)] mt-[18px]">
            Uzx的代币持有者（Uzx dao成员）拥有投票权，提案权，分红权。uzx
            dao决策委员会可以投票决定是否接受提案，审核提案。每个成员具有一票资格，重大决策需要三分之二票数通过，日常治理决策需要超过半数的票数通过。
          </p>
        </div>
        <img :src="getImageUrl('uzx-9.png')" />
      </div>
    </section>
    <section class="mt-[130px] h-[600px]">
      <div
        class="w-[1200px] h-full mx-auto relative"
        :style="{
          background: `no-repeat url(${getImageUrl('uzx-10.png')}) right center`
        }"
      >
        <div class="absolute top-[50%] translate-y-[-50%]">
          <p class="text-[46px] font-bold text-gradient">
            <span class="text-gradient">UZX OpenGov </span>
          </p>
          <p class="text-[46px] font-bold text-gradient my-6">
            <span class="text-gradient">介绍 </span>
          </p>
          <p class="text-[18px]">去中心化，社区治理</p>
        </div>
      </div>
    </section>
    <!-- 投票和治理  -->
    <section class="mt-[130px] w-[1200px] mx-auto">
      <h2
        class="text-[56px] font-bold mb-[70px] text-white text-gradient text-center"
      >
        <span class="text-gradient">投票和治理 </span>
      </h2>
      <div class="flex items-center gap-6 mb-[70px]">
        <img :src="getImageUrl('uzx-11.png')" alt="" />
        <div>
          <p class="mb-3 text-xl font-bold">所有决策均由UZX持有者制定</p>
          <p class="text-base">
            我们将采用
            DAO（去中心化自治组织）作为交易所的治理机制。这意味着所有代币持有者将有平等的权力参与交易所的运营和决策，确保了公平、开放和透明的治理环境。
          </p>
        </div>
      </div>
      <ul class="grid grid-cols-2 gap-16 pl-8">
        <li v-for="item in node6" :key="item.title" class="text-2xl list-disc">
          <h3 class="text-2xl font-bold">{{ item.title }}</h3>
          <p class="text-[18px]/[24px] mt-3">
            {{ item.desc }}
          </p>
        </li>
      </ul>
    </section>
    <section class="mt-[130px] w-[1200px] mx-auto">
      <h2 class="mb-[70px] text-gradient text-center">
        <p class="text-[56px] font-bold text-gradient">成为我们社区的一员</p>
        <p class="text-base mt-5 text-[#1fa2ff]">
          与优秀的开发者联系并加入最活跃的社区
        </p>
      </h2>
      <div class="flex justify-around">
        <img :src="getImageUrl('uzx-12.png')" class="w-[100px] h-auto" alt="" />
        <img :src="getImageUrl('uzx-13.png')" class="w-[100px] h-auto" alt="" />
        <img :src="getImageUrl('uzx-14.png')" class="w-[100px] h-auto" alt="" />
        <img :src="getImageUrl('uzx-15.png')" class="w-[100px] h-auto" alt="" />
      </div>
    </section>
    <section class="mt-[130px] w-[1200px] mx-auto flex h-[307px]">
      <div class="flex items-center justify-center flex-1 h-full">
        <div class="flex items-center px-[50px] h-full relative">
          <img
            :src="getImageUrl('uzx-16.png')"
            alt=""
            class="absolute top-[50%] translate-y-[-50%] left-0 w-[44px] h-auto"
          />
          <img
            :src="getImageUrl('uzx-17.png')"
            alt=""
            class="absolute top-[50%] translate-y-[-50%] right-0 w-[44px] h-auto"
          />
          <p class="text-[26px] text-center font-bold">
            开曼群岛<br />公司注册证书
          </p>
        </div>
      </div>
      <img :src="getImageUrl('uzx-18.png')" class="w-auto h-full" alt="" />
    </section>
    <section class="mt-[130px] w-[1200px] mx-auto">
      <h2 class="mb-[70px] text-gradient text-center">
        <p class="text-[56px] font-bold text-gradient">UZX DAO 白皮书</p>
        <p class="text-base mt-5 text-[#1fa2ff]">共创 UZX 去中心化治理</p>
      </h2>
      <div class="flex justify-center mt-[70px]">
        <a @click.prevent class="btn w-[256px] h-[68px] rounded-[34px]">下载</a>
      </div>
    </section>
  </article>
</template>
<style lang="less" scoped>
.section-3-content {
  position: relative;
  height: 580px;

  .text-item {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 330px;
  }
}

.line-box {
  position: absolute;
  top: 60px;
  width: 100%;
  height: 380px;
  border: 2px solid #a6ffcb;
  border-left: 0;
  border-radius: 0 190px 190px 0;

  .idx {
    display: block;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background-color: #12d8fa;
    // border: 2px solid #939393;
    background-image: linear-gradient(90deg, #1fa2ff, #12d8fa, #a6ffcb);
    color: #000;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
