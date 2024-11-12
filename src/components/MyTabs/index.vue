<script setup lang="ts">
// https://blog.csdn.net/Dandrose/article/details/140863648
import useSlotsExist from '@/hooks/useSlotsExist'
import { useResizeObserver } from '@vueuse/core'
import { ref, watch, onMounted, computed } from 'vue'
import type { CSSProperties, VNode } from 'vue'
// import { useResizeObserver, useSlotsExist } from '../utils'
interface Tab {
  key?: string | number // 对应 activeKey，如果没有传入 key 属性，则默认使用数据索引 (0,1,2...) 绑定
  tab?: string // 页签显示文字 string | slot
  icon?: VNode // 页签图标
  content?: string | VNode // 标签页内容 string | slot
  disabled?: boolean // 是否禁用页签
}
interface Props {
  tabPages?: Tab[] // 标签页数组
  prefix?: string // 标签页前缀 string | slot
  suffix?: string // 标签页后缀 string | slot
  animated?: boolean // 是否启用切换动画，在 tabPosition: 'top' | 'bottom' 时有效
  centered?: boolean // 标签是否居中展示
  size?: 'small' | 'middle' | 'large' // 标签页大小
  type?: 'line' | 'card' // 标签页的类型
  theme?: 'light' | 'deep' | 'black'
  line?: 'normal' | 'gradient'
  tabGutter?: number // 页签之前的间隙大小，单位 px
  tabStyle?: CSSProperties // 自定义页签样式
  tabPosition?: 'top' | 'right' | 'bottom' | 'left' // 自定义页签位置
  contentStyle?: CSSProperties // 自定义内容样式
  activeKey?: string | number // (v-model) 当前激活 tab 面板的 key
  isSub?: boolean
  tabNavClass?: Record<string, boolean>
}
const props = withDefaults(defineProps<Props>(), {
  tabPages: () => [],
  prefix: undefined,
  suffix: undefined,
  animated: true,
  centered: false,
  size: 'large',
  type: 'line',
  theme: 'light',
  line: 'gradient',
  tabGutter: undefined,
  tabStyle: () => ({}),
  tabPosition: 'top',
  contentStyle: () => ({}),
  activeKey: undefined,
  isSub: false,
  tabNavClass: () => ({})
})
const tabsRef = ref() // 所有 tabs 的 ref 模板引用
const tabBarLeft = ref(0) // tabBar 的水平偏移量
const tabBarTop = ref(0) // tabBar 的垂直偏移量
const tabBarWidth = ref(0) // tabBar 的宽度
const tabBarHeight = ref(0) // tabBar 的高度
const wrapRef = ref()
const wrapWidth = ref()
const wrapHeight = ref()
const navRef = ref()
const navWidth = ref()
const navHeight = ref()
const showWheel = ref(false) // 标签页是否存在滚动
const scrollMax = ref(0) // 最大滚动距离
const scrollLeft = ref(0) // 水平滚动距离
const scrollTop = ref(0) // 垂直滚动距离
const transition = ref(false)
const emits = defineEmits(['update:activeKey', 'change'])
const slotsExist = useSlotsExist(['prefix', 'suffix'])
const activeIndex = computed(() => {
  return props.tabPages.findIndex(
    (page, index) => getPageKey(page.key, index) === props.activeKey
  )
})
const showPrefix = computed(() => {
  return Boolean(slotsExist.prefix || props.prefix)
})
const showSuffix = computed(() => {
  return Boolean(slotsExist.suffix || props.suffix)
})
const beforeShadowShow = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    // 水平位置
    return showWheel.value && scrollLeft.value > 0
  } else {
    // 垂直位置
    return showWheel.value && scrollTop.value > 0
  }
})
const afterShadowShow = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    // 水平位置
    return showWheel.value && scrollLeft.value < scrollMax.value
  } else {
    // 垂直位置
    return showWheel.value && scrollTop.value < scrollMax.value
  }
})
const navStyle = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    return {
      transform: `translate(${-scrollLeft.value}px, 0)`
    }
  } else {
    return {
      transform: `translate(0, ${-scrollTop.value}px)`
    }
  }
})
const tabGutterStyle = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    return {
      marginLeft: `${props.tabGutter}px`
    }
  } else {
    return {
      marginTop: `${props.tabGutter}px`
    }
  }
})
const tabBarStyle = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    return {
      left: `${tabBarLeft.value}px`,
      width: `${tabBarWidth.value}px`
    }
  } else {
    return {
      top: `${tabBarTop.value}px`,
      height: `${tabBarHeight.value}px`
    }
  }
})
const animatedStyle = computed(() => {
  if (props.animated && ['top', 'bottom'].includes(props.tabPosition)) {
    return {
      marginLeft: `-${100 * activeIndex.value}%`
    }
  }
  return {}
})
const hiddenStyle = computed(() => {
  if (props.animated && ['top', 'bottom'].includes(props.tabPosition)) {
    return {
      visibility: 'hidden',
      height: '0px',
      overflowY: 'hidden'
    }
  }
  return {
    display: 'none'
  }
})
watch(
  () => props.activeKey,
  () => {
    getBarDisplay()
  },
  {
    flush: 'post'
  }
)
useResizeObserver([wrapRef, navRef], () => {
  getNavSize()
})
onMounted(() => {
  getNavSize()
})
function getNavSize() {
  // console.log('getnavsize')
  if (['top', 'bottom'].includes(props.tabPosition)) {
    getNavHorizontalSize()
  } else {
    getNavVerticalSize()
  }
}
function getNavHorizontalSize() {
  wrapWidth.value = wrapRef.value.offsetWidth
  navWidth.value = navRef.value.offsetWidth
  if (navWidth.value > wrapWidth.value) {
    showWheel.value = true
    scrollMax.value = navWidth.value - wrapWidth.value
    scrollLeft.value = scrollMax.value
  } else {
    showWheel.value = false
    scrollLeft.value = 0
  }
  getBarDisplay()
}
function getNavVerticalSize() {
  wrapHeight.value = wrapRef.value.offsetHeight
  navHeight.value = navRef.value.offsetHeight
  if (navHeight.value > wrapHeight.value) {
    showWheel.value = true
    scrollMax.value = navHeight.value - wrapHeight.value
    scrollTop.value = scrollMax.value
  } else {
    showWheel.value = false
    scrollTop.value = 0
  }
  getBarDisplay()
}
function getBarDisplay() {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    getBarHorizontalDisplay()
  } else {
    getBarVerticalDisplay()
  }
}
function getBarHorizontalDisplay() {
  const el = tabsRef.value[activeIndex.value]
  if (el) {
    tabBarLeft.value = el.offsetLeft
    tabBarWidth.value = el.offsetWidth
    if (showWheel.value) {
      if (tabBarLeft.value < scrollLeft.value) {
        transition.value = true
        scrollLeft.value = tabBarLeft.value
      }
      const targetScroll =
        tabBarLeft.value + tabBarWidth.value - wrapWidth.value
      if (targetScroll > scrollLeft.value) {
        transition.value = true
        scrollLeft.value = targetScroll
      }
    }
  } else {
    tabBarLeft.value = 0
    tabBarWidth.value = 0
  }
}
function getBarVerticalDisplay() {
  const el = tabsRef.value[activeIndex.value]
  if (el) {
    tabBarTop.value = el.offsetTop
    tabBarHeight.value = el.offsetHeight
    if (showWheel.value) {
      if (tabBarTop.value < scrollTop.value) {
        transition.value = true
        scrollTop.value = tabBarTop.value
      }
      const targetScroll =
        tabBarTop.value + tabBarHeight.value - wrapHeight.value
      if (targetScroll > scrollTop.value) {
        transition.value = true
        scrollTop.value = targetScroll
      }
    }
  } else {
    tabBarTop.value = 0
    tabBarHeight.value = 0
  }
}
function getPageKey(key: string | number | undefined, index: number) {
  if (key === undefined) {
    return index
  } else {
    return key
  }
}
function onTab(key: string | number) {
  emits('update:activeKey', key)
  emits('change', key)
}
/*
  （触摸板滑动也会触发）监听滚轮事件，结合 transform: translate(-${scrollLeft}px, 0) 模拟滚动效果
  参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/wheel_event
  WheelEvent:
  事件属性：
  WheelEvent.deltaX 只读：返回一个浮点数（double），表示水平方向的滚动量。
  WheelEvent.deltaY 只读：返回一个浮点数（double），表示垂直方向的滚动量。
  WheelEvent.deltaZ 只读：返回一个浮点数（double）表示 z 轴方向的滚动量。
  WheelEvent.deltaMode 只读：返回一个无符号长整型数（unsigned long），表示 delta* 值滚动量的单位。
*/
function onWheel(e: WheelEvent) {
  e.stopPropagation()
  e.preventDefault() // 禁止浏览器捕获触摸板滑动事件
  if (e.deltaX || e.deltaY) {
    if (['top', 'bottom'].includes(props.tabPosition)) {
      // 水平滚动
      getHorizontalScroll(e)
    } else {
      getVerticalScroll(e)
    }
  }
}
function getHorizontalScroll(e: WheelEvent) {
  const scrollX = (e.deltaX || e.deltaY) * 1 // 滚轮的水平滚动量
  if (scrollLeft.value + scrollX > scrollMax.value) {
    scrollLeft.value = scrollMax.value
  } else if (scrollLeft.value + scrollX < 0) {
    scrollLeft.value = 0
  } else {
    scrollLeft.value += scrollX
  }
}
function getVerticalScroll(e: WheelEvent) {
  const scrollY = (e.deltaX || e.deltaY) * 1 // 滚轮的垂直滚动量
  if (scrollTop.value + scrollY > scrollMax.value) {
    scrollTop.value = scrollMax.value
  } else if (scrollTop.value + scrollY < 0) {
    scrollTop.value = 0
  } else {
    scrollTop.value += scrollY
  }
  // console.log('scrollLeft', scrollLeft.value)
  // console.log('scrollTop', scrollTop.value)
  // console.log('scrollMax', scrollMax.value)
}
function getContentStyle(key: string | number | undefined, index: number) {
  if (props.activeKey !== getPageKey(key, index)) {
    return hiddenStyle.value
  }
  return {}
}
</script>
<template>
  <div
    class="m-tabs"
    :class="[
      `tabs-${tabPosition} tabs-${size} tabs-${theme} tabs-${line}`,
      {
        'tabs-card': type === 'card'
      }
    ]"
  >
    <div class="m-tabs-nav" :style="tabStyle">
      <div v-if="showPrefix" class="tabs-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </div>
      <div
        ref="wrapRef"
        class="tabs-nav-wrap"
        :class="{
          'tabs-center': centered,
          'before-shadow-active': beforeShadowShow,
          'after-shadow-active': afterShadowShow
        }"
      >
        <div
          ref="navRef"
          class="tabs-nav-list"
          :class="{ 'nav-transition': transition, ...tabNavClass }"
          @transitionend="transition = false"
          :style="navStyle"
          @wheel="showWheel ? onWheel($event) : () => false"
        >
          <div
            ref="tabsRef"
            class="tab-item"
            :class="{
              'tab-line-active':
                type === 'line' && activeKey === getPageKey(page.key, index),
              'tab-card-active':
                type === 'card' && activeKey === getPageKey(page.key, index),
              'tab-disabled': page.disabled
            }"
            :style="index > 0 && tabGutter !== undefined ? tabGutterStyle : {}"
            @click="
              page.disabled ? () => false : onTab(getPageKey(page.key, index))
            "
            v-for="(page, index) in tabPages"
            :key="index"
          >
            <slot name="tab" :key="getPageKey(page.key, index)" :tab="page.tab">
              <component v-if="page.icon" :is="page.icon" />
              {{ page.tab }}
            </slot>
          </div>
          <div
            class="tab-bar"
            :class="{
              'tab-bar-disabled': tabPages[activeIndex]?.disabled,
              'card-hidden': type === 'card'
            }"
            :style="tabBarStyle"
          ></div>
        </div>
      </div>
      <div v-if="showSuffix" class="tabs-suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </div>
    </div>
    <div class="m-tabs-page" :style="contentStyle">
      <div
        class="tabs-content-wrap"
        :class="{
          'tabs-content-animated':
            animated && ['top', 'bottom'].includes(tabPosition)
        }"
        :style="animatedStyle"
      >
        <div
          class="tabs-content"
          :style="getContentStyle(page.key, index)"
          v-for="(page, index) in tabPages"
          :key="page.key || index"
        >
          <slot
            name="content"
            :key="getPageKey(page.key, index)"
            :content="page.content"
            >{{ page.content }}</slot
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-tabs {
  display: flex;
  color: rgb(0 0 0 / 88%);
  font-size: 14px;
  line-height: 1.57;
  list-style: none;

  .m-tabs-nav {
    display: flex;
    position: relative;
    flex: none;
    align-items: center;

    &::before {
      content: '';
      position: absolute;
    }

    .tabs-prefix {
      flex: none;
    }

    .tabs-suffix {
      flex: none;
    }

    .tabs-nav-wrap {
      display: flex;
      position: relative;
      flex: auto;
      align-self: stretch;
      overflow: hidden;
      transform: translate(0);
      white-space: nowrap;

      .shadow {
        content: '';
        position: absolute;
        z-index: 1;
        transition: opacity 0.3s;
        opacity: 0;
        pointer-events: none;
      }

      &::before {
        .shadow();
      }

      &::after {
        .shadow();
      }

      .tabs-nav-list {
        display: flex;
        position: relative;

        .tab-item {
          display: inline-flex;
          position: relative;
          align-items: center;
          transition: all 0.3s;
          border: 0;
          outline: none;
          background: transparent;
          color: #939393;
          font-size: 20px;
          cursor: pointer;
          gap: 8px;

          &:hover {
            color: #000;
          }

          :deep(svg) {
            fill: currentcolor;
          }
        }

        .tab-line-active {
          color: #000;
          font-weight: 700;
          // text-shadow: 0 0 0.25px currentcolor;
        }

        .tab-disabled {
          color: rgb(0 0 0 / 25%);
          cursor: not-allowed;

          &:hover {
            color: rgb(0 0 0 / 25%);
          }
        }

        .tab-bar {
          position: absolute;
          transition:
            width 0.3s,
            left 0.3s,
            height 0.3s,
            top 0.3s,
            background-color;
          border-radius: 2px;
          // background-color: #f50;
          background-image: linear-gradient(90deg, #1fa2ff, #12d8fa, #a6ffcb);
          pointer-events: none;
        }

        .tab-bar-disabled {
          background-color: rgb(0 0 0 / 25%);
        }

        .card-hidden {
          visibility: hidden;
        }
      }

      .nav-transition {
        transition: all 0.15s;
      }
    }

    .tabs-center {
      justify-content: center;
    }

    .before-shadow-active {
      &::before {
        opacity: 1;
      }
    }

    .after-shadow-active {
      &::after {
        opacity: 1;
      }
    }
  }

  .m-tabs-page {
    flex: auto;
    min-width: 0;
    min-height: 0;

    .tabs-content-wrap {
      display: flex;
      position: relative;
      width: 100%;

      .tabs-content {
        flex: none;
        width: 100%;
        outline: none;
      }
    }

    .tabs-content-animated {
      transition: margin 0.3s;
    }
  }
}

.tabs-top {
  flex-direction: column;

  .m-tabs-nav {
    margin-bottom: 16px;

    .tabs-prefix {
      padding-right: 12px;
    }

    .tabs-suffix {
      padding-left: 12px;
    }

    &::before {
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid rgb(5 5 5 / 6%);
    }

    .tabs-nav-wrap {
      &::before {
        top: 0;
        bottom: 0;
        left: 0;
        width: 32px;
        box-shadow: inset 10px 0 8px -8px rgb(0 0 0 / 8%);
      }

      &::after {
        top: 0;
        right: 0;
        bottom: 0;
        width: 32px;
        box-shadow: inset -10px 0 8px -8px rgb(0 0 0 / 8%);
      }

      .tabs-nav-list {
        .tab-item {
          &:not(:first-child) {
            margin-left: 32px;
          }
        }

        .tab-bar {
          bottom: 0;
          height: 2px;
        }
      }
    }
  }
}

.tabs-bottom {
  flex-direction: column;

  .m-tabs-nav {
    order: 1;
    margin-top: 16px;

    .tabs-prefix {
      padding-right: 12px;
    }

    .tabs-suffix {
      padding-left: 12px;
    }

    &::before {
      top: 0;
      right: 0;
      left: 0;
      border-bottom: 1px solid rgb(5 5 5 / 6%);
    }

    .tabs-nav-wrap {
      &::before {
        top: 0;
        bottom: 0;
        left: 0;
        width: 32px;
        box-shadow: inset 10px 0 8px -8px rgb(0 0 0 / 8%);
      }

      &::after {
        top: 0;
        right: 0;
        bottom: 0;
        width: 32px;
        box-shadow: inset -10px 0 8px -8px rgb(0 0 0 / 8%);
      }

      .tabs-nav-list {
        .tab-item {
          &:not(:first-child) {
            margin-left: 32px;
          }
        }

        .tab-bar {
          top: 0;
          height: 2px;
        }
      }
    }
  }

  .m-tabs-page {
    order: 0;
  }
}

.tabs-left {
  .m-tabs-nav {
    flex-direction: column;
    min-width: 40px;
    margin-right: 24px;

    .tabs-prefix {
      padding-bottom: 12px;
    }

    .tabs-suffix {
      padding-top: 12px;
    }

    &::before {
      top: 0;
      right: 0;
      bottom: 0;
      border-left: 1px solid rgb(5 5 5 / 6%);
    }

    .tabs-nav-wrap {
      flex-direction: column;

      &::before {
        top: 0;
        right: 0;
        left: 0;
        height: 32px;
        box-shadow: inset 0 10px 8px -8px rgb(0 0 0 / 8%);
      }

      &::after {
        right: 0;
        bottom: 0;
        left: 0;
        height: 32px;
        box-shadow: inset 0 -10px 8px -8px rgb(0 0 0 / 8%);
      }

      .tabs-nav-list {
        flex: 1 0 auto;
        flex-direction: column;

        .tab-item {
          padding: 8px 24px;
          text-align: center;

          &:not(:first-child) {
            margin-top: 16px;
          }
        }

        .tab-bar {
          right: 0;
          width: 2px;
        }
      }
    }
  }
}

.tabs-right {
  .m-tabs-nav {
    flex-direction: column;
    order: 1;
    min-width: 40px;
    margin-left: 24px;

    .tabs-prefix {
      padding-bottom: 12px;
    }

    .tabs-suffix {
      padding-top: 12px;
    }

    &::before {
      top: 0;
      bottom: 0;
      left: 0;
      border-left: 1px solid rgb(5 5 5 / 6%);
    }

    .tabs-nav-wrap {
      flex-direction: column;

      &::before {
        top: 0;
        right: 0;
        left: 0;
        height: 32px;
        box-shadow: inset 0 10px 8px -8px rgb(0 0 0 / 8%);
      }

      &::after {
        right: 0;
        bottom: 0;
        left: 0;
        height: 32px;
        box-shadow: inset 0 -10px 8px -8px rgb(0 0 0 / 8%);
      }

      .tabs-nav-list {
        flex: 1 0 auto;
        flex-direction: column;

        .tab-item {
          padding: 8px 24px;
          text-align: center;
        }

        .tab-bar {
          left: 0;
          width: 2px;
        }
      }
    }
  }

  &.tabs-card.tabs-small {
    .m-tabs-nav {
      border-radius: 0 6px 6px 0;

      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 0 6px 6px 0;
          }
        }
      }
    }
  }
}

.tabs-large {
  .m-tabs-nav {
    .tabs-nav-wrap {
      .tab-item {
        font-size: 18px !important;
        padding: 16px 0 !important;
      }
    }
  }
}

.tabs-middle {
  .m-tabs-nav {
    .tabs-nav-wrap {
      .tab-item {
        font-size: 16px !important;
        padding: 10px 0 !important;
      }
    }
  }
}

.tabs-small {
  .m-tabs-nav {
    .tabs-nav-wrap {
      .tab-item {
        font-size: 14px !important;
        padding: 6px 0 !important;
      }
    }
  }
}

.tabs-deep {
  background: none;
  .m-tabs-nav {
    margin-bottom: 0 !important;
    &::before {
      border-color: #313131 !important;
    }

    .tabs-nav-wrap {
      .tab-item {
        color: #eee;
        &:first-child {
          margin-left: 0 !important;
        }
        &.tab-line-active,
        &:hover {
          color: #fff !important;
          font-weight: normal !important;
        }
      }
    }
  }
}

.tabs-black {
  background: none;
  .m-tabs-nav {
    margin: 0;
    .tabs-nav-wrap {
      background: #000;
      .tabs-nav-list {
        .tab-item {
          color: #939393;
          &:hover {
            color: #fff;
          }
        }
        .tab-line-active {
          color: #fff;
          text-shadow: 0 0 0.25px currentcolor;
        }
        .tab-bar {
          background: #000;
        }
      }
    }
  }
}
.tabs-normal {
  .tab-bar {
    background: #000 !important;
  }
}
</style>
