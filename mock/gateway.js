import Mock from 'mockjs'

const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@id',
    model: '@word(4,6) 网关',
    'innerProtocols|1': ['RS-351', 'RS-232', 'RS-485'],
    'uploadProtocals|1': ['TCP', 'UDP', 'HTTP'],
    'chargeable|0-1': 1,
    'lowVoltage|1-10': 1,
    'highVoltage|20-30': 10,
    'lowTemprature|0-10': 10,
    'highTemprature|30-60': 30,
    desc: '@csentence(10,15)',
    otherDesc: '尺寸：90 x 88 x 56 mm',
    industrialGrad: '工业级',
    company: {
      id: '@id',
      name: '@cword(2,3) 有限公司',
      address: '@county(true)',
      industry: '@cword(2,3)',
      intros: '提供的软件接入、硬件接入、服务接入、AI接入服务，打破传统软硬件捆绑逻辑，支持硬件、软件、服务的模块块组建与自升级。把自身能力灵活、标准化的赋能给应用服务，并联合应用服务商为建筑搭建组合不同类型的解决方案，让服务可以持续升级。 @csentence'
    }
  }
  ))
}

export default [
  {
    url: '/gateway/list',
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
    url: '/gateway/add',
    type: 'post',
    response: config => {
      console.log(config.body)
      const element = config.body
      element.company = Mock.mock({
        id: '@id',
        name: '@cword(2,3) 有限公司',
        address: '@county(true)',
        industry: '@cword(2,3)',
        intros: '提供的软件接入、硬件接入、服务接入、AI接入服务，打破传统软硬件捆绑逻辑，支持硬件、软件、服务的模块块组建与自升级。把自身能力灵活、标准化的赋能给应用服务，并联合应用服务商为建筑搭建组合不同类型的解决方案，让服务可以持续升级。 @csentence'
      })
      List.unshift(element)

      return {
        code: 200,
        message: '添加成功',
        data: null
      }
    }
  },
  {
    url: '/gateways/',
    type: 'put',
    response: config => {
      console.log(config.body)
      const element = config.body
      element.company = Mock.mock({
        id: '@id',
        name: '@cword(2,3) 有限公司',
        address: '@county(true)',
        industry: '@cword(2,3)',
        intros: '提供的软件接入、硬件接入、服务接入、AI接入服务，打破传统软硬件捆绑逻辑，支持硬件、软件、服务的模块块组建与自升级。把自身能力灵活、标准化的赋能给应用服务，并联合应用服务商为建筑搭建组合不同类型的解决方案，让服务可以持续升级。 @csentence'
      })
      List.unshift(element)

      return {
        code: 200,
        message: '修改成功',
        data: null
      }
    }
  },
  {
    url: '/gateway/search',
    type: 'post',
    response: config => {
      const query = config.body.query
      console.log(query)
      return {
        code: 200,
        message: '添加成功',
        data: List.filter(gateway => {
          return gateway.model.indexOf(query) > -1 || gateway.innerProtocols.indexOf(query) > -1 || gateway.uploadProtocals.indexOf(query) > -1
        })
      }
    }
  }
]
