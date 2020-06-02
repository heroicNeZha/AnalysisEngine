import request from '@/utils/request'

export function getSolutionList(params) {
  return request({
    url: '/solution/solutions',
    method: 'get',
    params
  })
}

export function getProgramList(params) {
  return request({
    url: '/solution/programs',
    method: 'get',
    params
  })
}

export function addSolution(params) {
  return request({
    url: '/solution/solutions',
    method: 'post',
    params
  })
}
