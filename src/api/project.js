import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/project/matchPage',
    method: 'post',
    data
  })
}
