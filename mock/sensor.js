import Mock from 'mockjs'

const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@id',
    name: '@ctitle',
    description: '@csentence(10,15)',
    type: '1',
    company: {
      id: '@id',
      name: '@ctitle',
      address: '@county(true)',
      industry: '@ctitle(2,4)',
      intros: '@csentence'
    },
    properties: {
      id: '@id',
      name: '@ctitle',
      value: '@ctitle(2,4)'
    }
  }))
}

export default [
  {
    url: '/sensor/list',
    type: 'get',
    response: config => {
      const items = List
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  /**
   * post data:{ name: '111', description: '1111', type: '0', companyId: '1' }
   * return data:{code: 200, message: "添加成功", data: null}
   */
  {
    url: '/sensor/add',
    type: 'post',
    response: config => {
      console.log(config.body)

      return {
        code: 200,
        message: '添加成功',
        data: null
      }
    }
  },
  {
    url: '/sensors/',
    type: 'put',
    response: config => {
      console.log(config.body)

      return {
        code: 200,
        message: '修改成功',
        data: null
      }
    }
  }
]

