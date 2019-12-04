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
      <el-col :span="12"><el-input v-model="form.summary" type="textarea" :rows="6" /></el-col>
    </el-form-item>
    <el-form-item label="封面图">
      <el-col :span="12">
        <Upload v-model="form.cover" />
      </el-col>
    </el-form-item>

    <el-form-item label="活动介绍">
      <el-col :span="12"><el-input v-model="form.cover" /></el-col>
    </el-form-item>
    <el-form-item label="报名须知">
      <el-col :span="12"><el-input v-model="form.cover" /></el-col>
    </el-form-item>
    <el-form-item label="报名成功信息">
      <el-col :span="12"><el-input v-model="form.cover" /></el-col>
    </el-form-item>
    <el-form-item label="报名失败信息">
      <Tinymce ref="editor" v-model="form.content" :height="400" />
    </el-form-item>

    <el-form-item label="报名信息">
      <el-col :span="12"><el-input v-model="form.cover" /></el-col>
    </el-form-item>

    <el-form-item label="名额">
      <el-col :span="12"><el-input v-model="form.cover" /></el-col>
    </el-form-item>
    <el-form-item label="是否须要审核">
      <el-col :span="12"><el-input v-model="form.cover" /></el-col>
    </el-form-item>
    <el-form-item label="活动时间" prop="time">
      <el-date-picker
        v-model="form.time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
    </el-form-item>
    <el-form-item label="报名信息">
      <el-col :span="12"><el-input v-model="form.cover" /></el-col>
    </el-form-item>

    <el-form-item label="积分规则">
      <el-switch v-model="form.projectStatus" />
    </el-form-item>
    <el-form-item label="允许分享">
      <el-switch v-model="form.is_share" />
    </el-form-item>
    <el-form-item label="允许粉丝访问">
      <el-switch v-model="form.is_allow_fans_visit" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="onSubmit">保存</el-button>
      <el-button @click="cancelBack">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/resourceCover'
import { validRmpty } from '@/utils/validate'
import { addProject, editProject } from '@/api/project'
import store from '@/store'
export default {
  components: { Tinymce, Upload },
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
    },
    cancelBack() {
      this.$router.push('/project/index')
    }
  }
}
</script>

<style scoped>
form{padding:50px}
.align{text-align: center}
</style>
