import request from '@/utils/request'

export function getGatewayList(params) {
  return request({
    url: '/gateway/list',
    method: 'get',
    params
  })
}

export function addGateway(data) {
  return request({
    url: '/gateway/add',
    method: 'post',
    data
  })
}

export function searchGateway(data) {
  return request({
    url: '/gateway/search',
    method: 'post',
    data
  })
}

export function updateGateway(data) {
  return request({
    url: '/gateways/',
    method: 'put',
    data
  })
}
