import request from '@/utils/request'

export function getCompanyList(params) {
  return request({
    url: '/companys/list',
    method: 'get',
    params
  })
}

export function getCompany(params) {
  return request({
    url: '/companys/id',
    method: 'get',
    params
  })
}
