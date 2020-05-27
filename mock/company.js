import Mock from 'mockjs'

const List = []
const count = 8

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@id',
    name: '@ctitle',
    address: '@county(true)',
    industry: '@ctitle(2,4)',
    intros: '@csentence'
  }))
}

export default [
  {
    url: '/companys/list',
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

  {
    url: '/companys/id',
    type: 'get',
    response: config => {
      const { id } = config.query
      console.log(id)
      for (var company of List) {
        if (company.id === id) {
          return {
            code: 200,
            data: company
          }
        }
      }
      return {
        code: 404,
        message: '资源不存在'
      }
    }
  }
]
