import Vue from 'vue'
import QS from 'qs'
Vue.prototype.qs = QS
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getCertificate, getCompanyCode } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    console.log(config)
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }

    config.data.certificate = getCertificate() ? getCertificate() : 'sinoStrong'
    config.data.companyCode = getCompanyCode() ? getCompanyCode() : 'ruixue_dev'
    if (config.method === 'post') {
      config.data = QS.stringify(config.data)
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res)
    if (res.errorCode !== 0) {
      Message({
        message: res.errorMassage || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.errorCode >= 11) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  }, error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
