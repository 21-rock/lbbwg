<script setup lang="ts">
import { Modal } from '../'
const route = useRoute()
</script>

<template>
  <Modal v-bind="$attrs">
    <template #title>安全验证</template>
    <template #default>
      <ul class="safety-ver-modal-body">
        <li class="undo">
          <p class="li-hd">
            <span class="idx">1</span>
            <span class="txt">设置资金密码</span>
          </p>
          <p>
            <RouterLink
              :to="`/set-security-pass?redirect=${route.fullPath}`"
              class="btn"
            >
              去设置
            </RouterLink>
          </p>
        </li>
        <li>
          <p class="li-hd">
            <span class="idx">2</span>
            <span class="txt">绑定邮箱</span>
          </p>
          <p>已绑定</p>
          <!-- <p>
            <RouterLink to="" class="btn">去设置</RouterLink>
          </p> -->
        </li>
      </ul>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.safety-ver-modal-body {
  padding-top: 40px;

  li {
    color: #939393;
  }

  p {
    margin-bottom: 16px;
  }

  .li-hd {
    display: flex;
    align-items: center;
    gap: 4px;

    .idx {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border: 1px solid #939393;
      border-radius: 50%;
      font-size: 12px;
    }

    .txt {
      font-size: 14px;
    }
  }

  .btn {
    width: 120px;
    height: 30px;
    border-radius: 15px;
  }

  .undo {
    color: #333;

    .li-hd {
      .idx {
        border-color: #333;
      }
    }
  }
}
</style>
