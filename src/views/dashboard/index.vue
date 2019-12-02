<template>
  <section class="section-body">
    <info-line
      :id="'timeLine'"
      :loading="timeLoading"
      :opt-renderer="'canvas'"
      :option="timeLineOption"
    />
  </section>
</template>

<script>
import infoLine from '@/components/Echarts/lineMarker'

export default {
  name: 'DataInfo',
  components: {
    infoLine
  },
  data() {
    return {
      timeLineOption: {},
      timeLoading: false
    }
  },
  mounted() {
    this.setLineOption()
  },
  methods: {
    setLineOption() {
      this.timeLineOption = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
