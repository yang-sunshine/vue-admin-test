<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="search" />

      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in projectStatus" :key="item.key" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
        Search
      </el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="班级人数" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.projectNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="operate(row,'status')">{{ scope.row.status| filterStatus }}</el-button>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <em class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="operate(row,'edit')">编辑</el-button>
          <el-button size="mini" type="danger" @click="operate(row,'del')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.limit" @pagination="fetchData" />

  </div>
</template>

<script>
import { getList } from '@/api/project'
import Pagination from '@/components/Pagination'

const projectStatus = [
  { key: 0, value: '全部' },
  { key: 1, value: '开启' },
  { key: 2, value: '关闭' }
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
      return status ? '开启' : '关闭'
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
        title: '',
        type: '',
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
        this.list = response.data.records
        this.total = response.data.totalSize
        this.listLoading = false
        setTimeout(() => {
          this.listLoading = false
        }, 1500)
      })
    },
    search() {
      this.fetchData
    },
    operate(row, status) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>
.table {
  &-filter-container {
    padding-bottom: 10px;
  }
}

</style>
