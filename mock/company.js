import Mock from 'mockjs'

const List = []
const count = 8

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@id',
    name: '@cword(2,3) 有限公司',
    address: '@county(true)',
    industry: '@cword(2,3)',
    intros: '提供的软件接入、硬件接入、服务接入、AI接入服务，打破传统软硬件捆绑逻辑，支持硬件、软件、服务的模块块组建与自升级。把自身能力灵活、标准化的赋能给应用服务，并联合应用服务商为建筑搭建组合不同类型的解决方案，让服务可以持续升级。 @csentence'
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
