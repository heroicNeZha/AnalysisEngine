import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@ctitle',
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
  }]
})

export default [
  {
    url: '/sensor/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]

