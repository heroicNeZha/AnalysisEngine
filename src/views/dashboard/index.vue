<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <ve-bar :data="chartData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      chartData: {
        columns: ['日期', '网关', '传感器'],
        rows: [
          { '日期': '6/26', '网关': 12, '传感器': 5, '组网率': 0.32 },
          { '日期': '6/27', '网关': 7, '传感器': 11, '组网率': 0.26 },
          { '日期': '6/28', '网关': 13, '传感器': 6, '组网率': 0.76 },
          { '日期': '6/29', '网关': 17, '传感器': 9, '组网率': 0.49 },
          { '日期': '6/30', '网关': 2, '传感器': 2, '组网率': 0.323 }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
