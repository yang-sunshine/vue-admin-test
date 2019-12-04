<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="班级名称" style="width: 200px;" class="filter-item" @keyup.enter.native="search" />

      <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in projectStatus" :key="item.key" :label="item.name" :value="item.value" />
      </el-select>
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
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="有效时间" width="300" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级人数" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.projectNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="operate(row,'status')">{{ scope.row.status| filterStatus }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="完成进度" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.projectProgress|progressNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="operate(row,'edit')">编辑</el-button>
          <el-button type="primary" size="mini" @click="operate(row,'copy')">复制</el-button>
          <el-button type="primary" size="mini" @click="operate(row,'send')">发送通知</el-button>
          <el-button size="mini" type="danger" @click="operate(row,'del')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="fetchData" />

  </div>
</template>

<script>
import { getList, copyProject, delProject, exportProjectList } from '@/api/project'
import { parseTime } from '@/utils/index'
import Pagination from '@/components/Pagination'
import store from '@/store'

const projectStatus = [
  { key: 0, value: '', name: '全部' },
  { key: 1, value: 'show', name: '开启' },
  { key: 2, value: 'hidden', name: '关闭' }
]
export default {
  name: '',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    filterStatus(status) {
      return status === 'show' ? '开启' : '关闭'
    },
    progressNum(number) {
      return (number * 100).toFixed(2) + '%'
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        pageNo: 3,
        pageSize: 15,
        name: '',
        status: '',
        needTotalSize: true,
        kind: 'project',
        publicNumberId: 1
      },
      projectStatus
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
          response['data']['records'][i]['time'] = parseTime(response['data']['records'][i]['start_time']) + '~' + parseTime(response['data']['records'][i]['end_time'])
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
          this.$router.push('/project/edit/' + id)
          break
        case 'copy':
          copyProject({ id: id, personId: personId }).then(response => {
            this.$message('复制成功')
            this.fetchData()
          })
          break
        case 'send':
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
      this.$router.push({ path: '/project/add' })
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
