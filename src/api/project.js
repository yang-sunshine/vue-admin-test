import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/project/matchPage',
    method: 'post',
    data
  })
}
export function copyProject(data) {
  return request({
    url: '/project/copy',
    method: 'post',
    data
  })
}
export function delProject(data) {
  return request({
    url: '/project/delete',
    method: 'post',
    data
  })
}
export function exportProjectList(data) {
  return request({
    url: '/project/exportQueryResult',
    method: 'post',
    data
  })
}

export function addProject(data) {
  return request({
    url: '/project/insert',
    method: 'post',
    data
  })
}
export function editProject(data) {
  return request({

  })
}
