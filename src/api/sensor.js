import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sensor/list',
    method: 'get',
    params
  })
}
export function add(data) {
  return request({
    url: '/sensor/add',
    method: 'post',
    data
  })
}
