import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/gateway/list',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/gateway/add',
    method: 'post',
    data
  })
}

