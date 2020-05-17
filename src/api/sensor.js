import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sensor/list',
    method: 'get',
    params
  })
}
