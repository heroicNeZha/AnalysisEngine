import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/gateway/list',
    method: 'get',
    params
  })
}
