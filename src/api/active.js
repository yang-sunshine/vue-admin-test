// 活动报名的API

import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/active/matchPage',
    method: 'post',
    data
  })
}
export function copyProject(data) {
  return request({
    url: '/active/copy',
    method: 'post',
    data
  })
}
export function delProject(data) {
  return request({
    url: '/active/delete',
    method: 'post',
    data
  })
}
export function exportProjectList(data) {
  return request({
    url: '/active/exportQueryResult',
    method: 'post',
    data
  })
}

export function addProject(data) {
  return request({
    url: '/active/insert',
    method: 'post',
    data
  })
}
export function editProject(data) {
  return request({

  })
}
