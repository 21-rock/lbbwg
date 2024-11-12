<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const onNav = (type: 'primary' | 'senior') => {
  router.push({
    path: route.path,
    query: {
      activeKey: route.query.activeKey,
      type
    }
  })
}
</script>

<template>
  <div class="bg-black min-h-[calc(100vh-600px)]">
    <div class="text-white w-[1200px] mx-auto">
      <h2 class="text-[32px] font-bold py-10">身份认证</h2>
      <div
        class="p-10 border border-[hsla(0,0%,100%,.2)] rounded-[8px] flex justify-between items-center"
      >
        <div>
          <p class="text-[24px] font-bold">
            <span>高级认证</span>
            <span
              class="bg-[rgba(29,174,254,.3)] text-[##1daefe] text-xs px-[5px] py-[2px] rounded-[4px] font-normal align-middle ml-1"
            >
              推荐
            </span>
          </p>
          <p class="mt-3 text-sm text-gray-400">
            24小时提币额度提升至 500
            BTC、API交易权限、UZX创世信用卡申请权限、法币出入金权限等
          </p>
        </div>
        <span class="btn-normal" @click="onNav('senior')">去认证</span>
      </div>
      <div
        class="p-10 border border-[hsla(0,0%,100%,.2)] rounded-[8px] mt-10 flex justify-between items-center"
      >
        <div>
          <p class="text-[24px] font-bold">初级认证</p>
          <p class="mt-3 text-sm text-gray-400">
            24小时提币额度提升至 100 BTC、UZX白金信用卡申请权限等
          </p>
        </div>
        <span class="btn-normal" @click="onNav('primary')">去认证</span>
      </div>
    </div>
  </div>
</template>
