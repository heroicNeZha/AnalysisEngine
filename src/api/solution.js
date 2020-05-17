import request from '@/utils/request'

export function getSolutions(params) {
  return request({
    url: '/solution/solutions',
    method: 'get',
    params
  })
}

export function getPrograms(params) {
  return request({
    url: '/solution/programs',
    method: 'get',
    params
  })
}
