import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/validate',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/person/get',
    method: 'post',
    data
  })
}

