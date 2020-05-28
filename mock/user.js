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
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    user: {
      id: '@id',
      name: '@cname()',
      phone: /^1[3456789]\d{9}$/,
      roles: ['admin'],
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      company: {
        id: '@id',
        name: '@ctitle',
        address: '@county(true)',
        industry: '@csentence(2,4)',
        intros: '@csentence'
      }
    }
  }))
}

export default [
  {
    url: '/user/list',
    type: 'post',
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
