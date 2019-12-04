import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/ruixue_dev/mobile/signinStatistics/signinRank',
    method: 'get',
    params
  })
}
