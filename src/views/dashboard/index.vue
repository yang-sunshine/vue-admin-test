<template>
  <section class="section-body" />
</template>

<script>

import { getList } from '@/api/index'

export default {
  name: 'DataInfo',

  data() {
    return {
      timeLineOption: {},
      timeLoading: false
    }
  },
  mounted() {

  },
  methods: {
    test() {
      var param = { signinId: 1, memberId: 1098, pageSize: 10, pageNo: 1, signinRankType: 1 }
      getList(param).then(Response => {
        console.log(Response)
      })
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
