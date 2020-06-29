import Mock from 'mockjs'

const tokens = {
  admin: {
    token: 'admin'
  },
  editor: {
    token: 'editor'
  }
}

const List = []
const count = 8

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@id',
    name: '@cname()',
    phone: /^1[3456789]\d{9}$/,
    roles: ['admin'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    company: {
      id: '@id',
      name: '@cword(2,3) 有限公司',
      address: '@county(true)',
      industry: '@cword(2,3)',
      intros: '提供的软件接入、硬件接入、服务接入、AI接入服务，打破传统软硬件捆绑逻辑，支持硬件、软件、服务的模块块组建与自升级。把自身能力灵活、标准化的赋能给应用服务，并联合应用服务商为建筑搭建组合不同类型的解决方案，让服务可以持续升级。 @csentence'
    }
  }))
}

export default [
  {
    url: '/user/list',
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
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 602,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      console.log(token)
      const info = List[0]

      // mock error
      if (!info) {
        return {
          code: 500,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
