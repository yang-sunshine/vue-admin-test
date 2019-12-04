<!--  -->
<template>
  <el-form
    ref="projectForm"
    :model="form"
    :rules="addRules"
    label-width="150px"
  >
    <el-form-item label="关键字" prop="keyword">
      <el-col :span="12"><el-input v-model="form.keyword" /></el-col>
    </el-form-item>
    <el-form-item label="标题" prop="name">
      <el-col :span="12"><el-input v-model="form.name" /></el-col>
    </el-form-item>
    <el-form-item label="摘要">
      <el-input v-model="form.summary" type="textarea" :rows="6" />
    </el-form-item>
    <el-form-item label="开班有效时间" prop="time">
      <el-date-picker
        v-model="form.time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
    </el-form-item>
    <el-form-item label="班级地址">
      <el-col :span="20"><el-input v-model="form.url" size="small" /></el-col>
    </el-form-item>
    <el-form-item label="班级状态">
      <el-switch v-model="form.projectStatus" />
    </el-form-item>
    <el-form-item label="允许分享">
      <el-switch v-model="form.is_share" />
    </el-form-item>
    <el-form-item label="允许粉丝访问">
      <el-switch v-model="form.is_allow_fans_visit" />
    </el-form-item>
    <el-form-item label="课堂互动">
      <el-switch v-model="form.is_interact" />
    </el-form-item>
    <el-form-item label="开启内容学习统计">
      <el-switch v-model="form.is_content_statistics" />
    </el-form-item>
    <el-form-item label="班级搜索">
      <el-radio-group v-model="form.search_status">
        <el-radio label="开启" />
        <el-radio label="关闭" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="允许关键字加入班级">
      <el-switch v-model="form.is_code_join" />
    </el-form-item>
    <el-form-item label="版权归属">
      <el-col :span="12"><el-input v-model="form.bottom_txt" size="small" /></el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { validRmpty } from '@/utils/validate'
import { addProject, editProject } from '@/api/project'
import store from '@/store'
export default {
  data() {
    const validateEmpty = (rule, value, callback) => {
      if (!validRmpty(value)) {
        callback(new Error('必填项不能为空'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      id: '',
      form: {
        keyword: '',
        name: '',
        summary: '',
        cover: '',
        public_number_id: 1,
        projectStatus: true,
        time: '',
        search_status: '关闭',
        is_content_statistics: false,
        is_interact: false,
        is_code_join: true,
        is_share: true,
        project_interact_name: '课堂互动',
        is_allow_fans_visit: false,
        template_id: 223,
        color_id: 0,
        project_interact_url: '',
        bottom_txt: ''
      },
      addRules: {
        keyword: [
          { required: true, trigger: 'blur', validator: validateEmpty }
        ],
        name: [
          { required: true, trigger: 'blur', validator: validateEmpty }
        ],
        time: [
          { required: true, trigger: 'blur', validator: validateEmpty }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.projectForm.validate(valid => {
        if (valid) {
          const addData = this.form
          addData.status = this.form.projectStatus ? 'show' : 'hidden'
          addData.start_time = this.form.time[0]
          addData.end_time = this.form.time[1]
          addData.master_id = parseInt(store.getters.id)
          delete addData.time
          delete addData.projectStatus
          this.loading = true
          const conf = { fields: JSON.stringify(addData) }
          if (this.id) {
            editProject(conf).then(Response => {

            })
          } else {
            addProject(conf).then(Response => {
              this.id = Response.data
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
form{padding:50px}
.align{text-align: center}
</style>
