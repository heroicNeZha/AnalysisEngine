import request from '@/utils/request'

export function getSensorList(params) {
  return request({
    url: '/sensor/list',
    method: 'get',
    params
  })
}
export function addSensor(data) {
  return request({
    url: '/sensor/add',
    method: 'post',
    data
  })
}
