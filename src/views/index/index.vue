<!--  -->
<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import BarChart from './components/BarChart'
export default {
  data() {
    return {
    }
  },
  compontents: {
    BarChart,
    GithubCorner
  }
}
</script>

<style lang='stylus' scoped>

</style>
