<script setup lang="ts">
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts'
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import * as uuid from 'uuid'

// 注册必须的组件
echarts.use([
  GridComponent,
  DatasetComponent,
  TransformComponent,
  CanvasRenderer,
  LineChart
])

const { v4: uuidv4 } = uuid
const ID = uuidv4()
onMounted(() => {
  // 接下来的使用就跟之前一样，初始化图表，设置配置项
  const myChart = echarts.init(document.getElementById(ID))

  let base = +new Date(1968, 9, 3)
  let oneDay = 24 * 3600 * 1000
  let date = []
  let data = []
  for (let i = 1; i < 30; i++) {
    const now = new Date((base += oneDay))
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
    data.push(Math.round((Math.random() + 0.5) * 20))
  }
  const option = {
    // grid: {
    //   top: '0%',
    //   left: '0%',
    //   right: '0%',
    //   bottom: '0%'
    // },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date,
      show: false
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      show: false
    },
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 0, 0)',
          borderSize: 1,
          width: 1
        },
        // smooth: true, // 可选，是否平滑显示线条
        lineStyle: {
          width: 0.5 // 调整此值以增加或减少折线粗细
        },
        // color: 'rgb(255, 70, 131)' color: 'rgb(255, 158, 68)'
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 0, 0)'
            },
            {
              offset: 0.5,
              color: 'rgb(255, 255, 255)'
            },
            {
              offset: 1,
              color: 'rgb(255, 255, 255)'
            }
          ])
        },
        data: data
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<template>
  <div :id="ID" style="width: 100px; height: 30px"></div>
</template>
