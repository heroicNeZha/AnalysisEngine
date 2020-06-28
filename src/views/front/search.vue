<template>
  <div class="scheme-search">
    <div class="select-div">
      <div class="select-group">
        <span class="select-title">技术:</span>
        <el-radio-group v-model="radio_technology">
          <el-radio-button v-for="(item,i) in technology" :key="i" :label="item" />
        </el-radio-group>
      </div>
      <div class="select-group">
        <span class="select-title">网络:</span>
        <el-radio-group v-model="radio_network">
          <el-radio-button v-for="(item,i) in network" :key="i" :label="item" />
        </el-radio-group>
      </div>
      <div class="select-group">
        <span class="select-title">应用:</span>
        <el-radio-group v-model="radio_application">
          <el-radio-button v-for="(item,i) in application" :key="i" :label="item" />
        </el-radio-group>
      </div>
    </div>
    <div class="show-div">
      <el-card v-for="o in 5" :key="o" class="box-card">
        <div slot="header" class="clearfix">
          <span>智慧建筑管理平台</span>
          <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
        </div>
        <div>
          <span>
            北京中云微讯信息技术有限公司
            <span style="float:right">13592570536</span>
          </span>
          <p>北京-北京市-海淀区,中关村大街1号海龙大厦L座1326室</p>
          <p>提供建筑内的软件接入、硬件接入、服务接入、AI接入服务，打破传统软硬件捆绑逻辑，支持硬件、软件、服务的模块块组建与自升级。把自身能力灵活、标准化的赋能给建筑应用服务，并联合应用服务商为建筑搭建组合不同类型的建筑解决方案，让建筑服务可以持续升级。</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SchemeSearch',
  data: function() {
    return {
      radio_technology: '不限',
      radio_network: '不限',
      radio_application: '不限',
      technology: [
        '不限',
        '无线定位',
        'RFID',
        '传感器',
        '生物识别',
        '二维码',
        'IPV6',
        '通信网络',
        'TD-LTE',
        '无线传感',
        'ETC',
        'M2M'
      ],
      network: ['不限', 'Zigbee', '802.11n', 'NFC', 'LTE', 'WiMax'],
      application: [
        '不限',
        '智慧城市',
        '智慧农业',
        '智慧工业',
        '智能安防',
        '智能汽车',
        '智能建筑',
        'AR/VR',
        '机器人/无人机',
        '可穿戴设备'
      ]
    }
  }
}
</script>

<style scoped lang='scss'>
.scheme-search {
  margin-top: 20px;
}
.select-group {
  margin-top: 20px;
  margin-left: 20px;
  .select-title {
    margin-right: 20px;
  }
}
.show-div {
  margin-top: 20px;
}
.box-card {
  margin-left: 10%;
  margin-top: 20px;
  width: 80%;
}
</style>
