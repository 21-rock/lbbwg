<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  BarChart,
  LineChart,
  PieChart
])

export default defineComponent({
  name: 'MixLineBarChart',
  components: {
    VChart
  },
  props: {
    num: {
      type: Number as PropType<number>,
      default: 0
    },
    total: {
      type: Number as PropType<number>,
      default: 100
    },
    color: {
      type: String,
      default: '#1fa2ff'
    },
    bgColor: {
      type: String,
      default: 'rgba(255,255,255,0.3)'
    }
  },
  setup: (props) => {
    const rate = computed(
      () => ((props.num / props.total) * 100).toFixed(6) + '%'
    )
    const getOption = () => {
      const option = {
        color: [props.color, props.bgColor],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['80%', '100%'], // 半径
            center: ['50%', '50%'], // 位置
            data: [
              {
                value: props.num
              },
              {
                value: props.total - props.num
              }
            ],
            hoverAnimation: false,
            emphasis: {
              itemStyle: {
                borderColor: 'rgba(0,0,0,0)', // 鼠标移入时边框颜色透明
                borderWidth: 0, // 边框宽度设置为0
                shadowBlur: 0, // 去除阴影
                shadowColor: 'rgba(0,0,0,0)' // 阴影颜色透明
              }
            },
            label: {
              show: false // 可选，隐藏标签，也可以通过设置样式来隐藏
            },
            labelLine: {
              show: false // 可选，隐藏标签线，也可以通过设置样式来隐藏
            }
          }
        ]
      }
      return option
    }
    const option = computed(getOption)

    const myChart = ref<any>()
    // const $timer = ref<any>(null);
    onMounted(() => {})
    return { option, myChart, rate }
  }
})
</script>

<template>
  <div class="chart-box">
    <VChart
      v-if="option"
      ref="myChart"
      autoresize
      class="chart"
      :option="option"
    />
    <p class="account">{{ rate }}</p>
  </div>
</template>

<style lang="scss" scoped>
.chart-box {
  position: relative;
  width: 100%;
  height: 100%;

  .account {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
