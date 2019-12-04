<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="关键字/标题" style="width: 200px;" class="filter-item" @keyup.enter.native="search" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">查询</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="add">添加</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="exportExcal">导出</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="关键字">
        <template slot-scope="scope">
          {{ scope.row.keyword }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="活动时间" width="300" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="operate(row,'status')">{{ scope.row.status| filterStatus }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="报名人数" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.registerNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通过人数" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.passNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="operate(row,'send')">查看结果</el-button>
          <el-button type="primary" size="mini" @click="operate(row,'edit')">编辑</el-button>
          <el-button size="mini" type="danger" @click="operate(row,'del')">删除</el-button>
          <el-button type="primary" size="mini" @click="operate(row,'copy')">复制</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="fetchData" />

  </div>
</template>

<script>
import { getList, copyProject, delProject, exportProjectList } from '@/api/active'
import { parseTime } from '@/utils/index'
import Pagination from '@/components/Pagination'
import store from '@/store'

export default {
  name: '',
  components: { Pagination },
  filters: {
    filterStatus(status) {
      return status === 'show' ? '开启' : '关闭'
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 15,
        keyword: '',
        needTotalSize: true,
        publicNumberId: 1
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        var len = response.data.records.length
        for (var i = 0; i < len; i++) {
          response['data']['records'][i]['time'] = parseTime(response['data']['records'][i]['start_date']) + '~' + parseTime(response['data']['records'][i]['end_date'])
        }
        this.list = response.data.records
        this.total = response.data.totalSize
        this.listLoading = false
        setTimeout(() => {
          this.listLoading = false
        }, 1500)
      })
    },
    search() {
      this.fetchData()
    },
    operate(row, status) {
      const id = row.id
      const personId = store.getters.id
      switch (status) {
        case 'edit':
          this.$router.push('/activity/edit/' + id)
          break
        case 'copy':
          copyProject({ id: id, personId: personId }).then(response => {
            this.$message('复制成功')
            this.fetchData()
          })
          break
        case 'res':
          break
        case 'del':
          delProject({ id: id }).then(response => {
            this.fetchData()
            this.$message('删除成功')
          })
          break
        default:
      }
    },
    add() {
      this.$router.push({ path: '/activity/add' })
    },

    exportExcal() {
      exportProjectList(this.listQuery).then(response => {
        location.href = response.data
      })
    }
  }
}
</script>
<style scoped>
.filter-container {
    padding-bottom: 10px;float: right;
  }

</style>
