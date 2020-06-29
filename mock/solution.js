import Mock from 'mockjs'
const solutions = []
const programs = []
const count = 30

for (let i = 0; i < count; i++) {
  solutions.push(Mock.mock({
    id: '@id',
    name: '@ctitle',
    public: '2',
    intros: '@csentence',
    user: {
      id: '@id',
      name: '@cname()',
      phone: /^1[3456789]\d{9}$/,
      company: {
        id: '@id',
        name: '@cword(2,3) 有限公司',
        address: '@county(true)',
        industry: '@cword(2,3)',
        intros: '提供的软件接入、硬件接入、服务接入、AI接入服务，打破传统软硬件捆绑逻辑，支持硬件、软件、服务的模块块组建与自升级。把自身能力灵活、标准化的赋能给应用服务，并联合应用服务商为建筑搭建组合不同类型的解决方案，让服务可以持续升级。 @csentence'
      }
    }}))
}
for (let i = 0; i < count; i++) {
  programs.push(Mock.mock({
    id: '@id',
    name: '@ctitle 项目',
    'public|1': ['0', '1'],
    intros: '本项目提供的软件接入、硬件接入、服务接入、AI接入服务，@csentence',
    user: {
      id: '@id',
      name: '@cname()',
      phone: /^1[3456789]\d{9}$/,
      company: {
        id: '@id',
        name: '@cword(2,3) 有限公司',
        address: '@county(true)',
        industry: '@cword(2,3)',
        intros: '提供的软件接入、硬件接入、服务接入、AI接入服务，打破传统软硬件捆绑逻辑，支持硬件、软件、服务的模块块组建与自升级。把自身能力灵活、标准化的赋能给应用服务，并联合应用服务商为建筑搭建组合不同类型的解决方案，让服务可以持续升级。 @csentence'
      }
    }
  }))
}

export default [
  {
    url: '/solution/solutions',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: {
          total: solutions.length,
          items: solutions
        }
      }
    }
  },
  {
    url: '/solution/solutions',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: {
          total: solutions.length,
          items: solutions
        }
      }
    }
  },
  {
    url: '/solution/programs/list',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: {
          total: programs.length,
          items: programs
        }
      }
    }
  },
  {
    url: '/solution/programs/id',
    type: 'get',
    response: config => {
      const { id } = config.query
      return {
        code: 200,
        data: {
          total: programs.length,
          items: programs.slice(0, id)
        }
      }
    }
  },
  {
    url: '/solution/solutions/',
    type: 'put',
    response: config => {
      console.log(config.query)
      const element = config.query
      element.user = Mock.mock({
        id: '@id',
        name: '@cname()',
        phone: /^1[3456789]\d{9}$/,
        company: {
          id: '@id',
          name: '@cword(2,3) 有限公司',
          address: '@county(true)',
          industry: '@cword(2,3)',
          intros: '提供的软件接入、硬件接入、服务接入、AI接入服务，打破传统软硬件捆绑逻辑，支持硬件、软件、服务的模块块组建与自升级。把自身能力灵活、标准化的赋能给应用服务，并联合应用服务商为建筑搭建组合不同类型的解决方案，让服务可以持续升级。 @csentence'
        }
      })
      solutions.unshift(element)
      return {
        code: 200,
        message: '修改成功',
        data: null
      }
    }
  },
  {
    url: '/solution/solutions',
    type: 'post',
    response: config => {
      console.log(config.query)
      const element = config.query
      element.user = Mock.mock({
        id: '@id',
        name: '@cname()',
        phone: /^1[3456789]\d{9}$/,
        company: {
          id: '@id',
          name: '@cword(2,3) 有限公司',
          address: '@county(true)',
          industry: '@cword(2,3)',
          intros: '提供的软件接入、硬件接入、服务接入、AI接入服务，打破传统软硬件捆绑逻辑，支持硬件、软件、服务的模块块组建与自升级。把自身能力灵活、标准化的赋能给应用服务，并联合应用服务商为建筑搭建组合不同类型的解决方案，让服务可以持续升级。 @csentence'
        }
      })
      solutions.unshift(element)
      return {
        code: 200,
        msg: '插入成功'
      }
    }
  },
  {
    url: '/solution/programs',
    type: 'post',
    response: config => {
      console.log(config.query)
      const element = config.query
      element.user = Mock.mock({
        id: '@id',
        name: '@cname()',
        phone: /^1[3456789]\d{9}$/,
        company: {
          id: '@id',
          name: '@cword(2,3) 有限公司',
          address: '@county(true)',
          industry: '@cword(2,3)',
          intros: '提供的软件接入、硬件接入、服务接入、AI接入服务，打破传统软硬件捆绑逻辑，支持硬件、软件、服务的模块块组建与自升级。把自身能力灵活、标准化的赋能给应用服务，并联合应用服务商为建筑搭建组合不同类型的解决方案，让服务可以持续升级。 @csentence'
        }
      })
      programs.unshift(element)
      return {
        code: 200,
        msg: '插入成功'
      }
    }
  }
]

