import request from '@/utils/request'

export function getSolutionList(params) {
  return request({
    url: '/solution/solutions',
    method: 'get',
    params
  })
}

export function addSolution(params) {
  console.log(params)
  return request({
    url: '/solution/solutions',
    method: 'post',
    params
  })
}
export function updateProgram(data) {
  return request({
    url: '/solution/programs/',
    method: 'put',
    data
  })
}

export function addProgram(params) {
  console.log(params)
  return request({
    url: '/solution/programs',
    method: 'post',
    params
  })
}
export function getProgramListById(params) {
  return request({
    url: '/solution/programs/id',
    method: 'get',
    params
  })
}

export function getProgramList(params) {
  return request({
    url: '/solution/programs/list',
    method: 'get',
    params
  })
}
