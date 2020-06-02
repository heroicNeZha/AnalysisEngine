import Mock from 'mockjs'

const solutions = Mock.mock({
  'items|30': [{
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
        name: '@ctitle',
        address: '@county(true)',
        industry: '@csentence(2,4)',
        intros: '@csentence'
      }
    }
  }]
})

const programs = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@ctitle',
    'public|0-1': 0,
    intros: '@csentence',
    user: {
      id: '@id',
      name: '@cname()',
      phone: /^1[3456789]\d{9}$/,
      company: {
        id: '@id',
        name: '@ctitle',
        address: '@county(true)',
        industry: '@csentence(2,4)',
        intros: '@csentence'
      }
    }
  }]
})

export default [
  {
    url: '/solution/solutions',
    type: 'get',
    response: config => {
      const items = solutions.items
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
    url: '/solution/programs',
    type: 'get',
    response: config => {
      const items = programs.items
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
    url: '/solution/solutions',
    type: 'post',
    response: config => {
      console.log(config.query)
      return {
        code: 200,
        msg: '插入成功'
      }
    }
  }
]

