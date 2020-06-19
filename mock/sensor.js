import Mock from 'mockjs'

const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@id',
    model: '@ctitle',
    'innerProtocols|1': ['test', 'RS-232', 'RS-485'],
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
      name: '@ctitle',
      address: '@county(true)',
      industry: '@csentence(2,4)',
      intros: '@csentence'
    }
  }
  ))
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

