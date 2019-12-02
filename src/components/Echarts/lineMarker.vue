<!--  -->
<template>
  <div class="module-container" :style="{width:width}">
    <div
      :id="lineId"
      class="module-body bg"
      :style="{height:height,width:width}"
    />
  </div>
</template>

<script>
// 按照使用到的功能添加组件导入，
require('echarts/lib/chart/line') // 按需导入折线组件
require('echarts/lib/chart/effectScatter') // 拐点出闪烁，高亮
require('echarts/lib/component/tooltip') // 提示组件
require('echarts/lib/component/legend') // 图例组件
require('echarts/lib/component/markPoint') // 标注组件
require('echarts/lib/component/markLine')
import 'zrender/lib/svg/svg' // svg模式

export default {
  name: 'InfoLine',
  props: {
    lineId: { // 折线图图表id
      type: String,
      default() {
        return 'line'
      }
    },
    height: { // 折线图高
      type: String,
      default() {
        return '100%'
      }
    },
    width: { // 折线图宽
      type: String,
      default() {
        return '300px'
      }
    },
    option: { // 折线图配置
      type: Object,
      required: true // 数据
    },
    loading: { // 图形加载
      type: Boolean,
      default() {
        return false
      }
    },
    enabledClick: { // 折线图是否配置点击事件
      type: Boolean,
      default: false
    },
    optRenderer: { // 渲染模式：canvas，svg
      type: String,
      default() {
        return 'svg'
      }
    }
  },
  data() {
    return {
      line: null,
      empty: false
    }
  },
  computed: {
    lineOption() {
      return this.option.series
    },
    pieToolInfoStatus() {
      const arr = Object.keys(this.toolInfo)
      if (arr.length > 0) {
        return true
      }
      return false
    },
    opts() {
      return {
        renderer: this.optRenderer
      }
    }
  },
  watch: {
    lineOption() {
      this.option.series.length === 0 ? this.empty = true : (this.option.series[0].data.length === 0 ? this.empty = true : this.empty = false)
      if (this.empty) {
        this.line.clear()
        this.option.yAxis.data = []
        this.option.xAxis.data = []
        this.line.setOption(this.option)
      } else {
        this.drawLine()
      }
    }
  },
  mounted() {
    if (this.line === null) {
      this.line = this.$echarts.init(document.getElementById(this.lineId), null, this.opts)
    }
    /**
         * 设置折线图点击事件
         */
    if (this.enabledClick) {
      this.line.getZr().on('click', (params) => {
        const pointInPixel = [params.offsetX, params.offsetY]
        if (this.line.containPixel('grid', pointInPixel)) {
          const pointInGrid = this.line.convertFromPixel({ seriesIndex: 0 }, pointInPixel)
          const xIndex = pointInGrid[[0]]
          const op = this.line.getOption()
          const xValue = op.xAxis[0].data[xIndex]
          this.$emit('onDetail', xValue, op.series[1].data[xIndex].groupTime)
        }
      })
    }
    /**
         * 设置图例最少一个选中
         */
    this.line.on('legendselectchanged', params => {
      const legendObj = params.selected
      let selectedNum = 0
      for (const key in legendObj) {
        if (legendObj.hasOwnProperty(key)) {
          const element = legendObj[key]
          if (element) {
            selectedNum += 1
          }
        }
      }
      if (selectedNum === 0) {
        legendObj[params.name] = true
        this.option.legend.selected = legendObj
        this.line.setOption(this.option)
      }
    })
  },
  beforeDestroy() {
    if (this.line !== null && this.line !== '' && !(typeof this.line === 'undefined')) {
      this.line.clear()
    }
  },
  methods: {
    /**
         * 折线图
         */
    drawLine: function() {
      if (this.line === null && this.line !== '' && !(typeof this.line === 'undefined')) {
        this.line = this.$echarts.init(document.getElementById(this.lineId), null, this.opts)
      }
      this.line.setOption(this.option)
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>
