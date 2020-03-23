<template>
  <div class="schemeSearch">
    <div>
      <el-radio-group v-model="radio1">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "SchemeSearch",
  data: function() {
    return {
      technology: [
        "无线定位",
        "RFID",
        "传感器",
        "生物识别",
        "二维码",
        "IPV6",
        "通信网络",
        "TD-LTE",
        "无线传感",
        "ETC",
        "M2M"
      ],
      network: ["Zigbee", "802.11n", "NFC", "LTE", "WiMax"],
      application: [
        "智慧城市",
        "智慧农业",
        "智慧工业",
        "智能安防",
        "智能汽车",
        "智能建筑",
        "AR/VR",
        "机器人/无人机",
        "可穿戴设备"
      ]
    };
  }
};
</script>