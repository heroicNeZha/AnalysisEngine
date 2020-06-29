<template>
  <div class="app-container">
    <el-input v-model="input" placeholder="请输入搜索内容" class="searchClass">
      <div slot="prepend">
        <div class="centerClass">
          <el-select v-model="select" placeholder="请选择" style="width: 90px">
            <el-option label="网关" value="1" />
            <el-option label="传感器" value="2" />
            <el-option label="解决方案" value="3" />
          </el-select>
        </div>
        <div class="centerClass">
          <div class="line" />
        </div>
      </div>
      <el-button slot="append" icon="el-icon-search" @click="onSearch()" />
    </el-input>
    <div class="show-div">
      <el-card v-for="result in results" :key="result.id" class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ result.model }}</span>
        </div>
        <div>
          <p>网间协议: {{ result.innerProtocols }}</p>
          <p>上传协议: {{ result.uploadProtocals }}</p>
          <p>充电电池: {{ result.chargeable == 0? "否":"是" }}</p>
          <p>输入电压: DC {{ result.lowVoltage }}V ~ {{ result.highVoltage }}V</p>
          <p>工作环境: {{ result.lowTemprature }} ~ {{ result.highTemprature }}&#176;C</p>
          <p>传感器介绍: {{ result.desc }}</p>
          <p>所属公司: {{ result.company.name }}</p></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { searchGateway } from '@/api/gateway'
import { searchSensor } from '@/api/sensor'
export default {
  data() {
    return {
      input: '',
      select: '1',
      results: []
    }
  },
  methods: {
    onSearch() {
      this.results.splice(0, this.results.length)
      if (this.select === '1') {
        searchGateway({ 'query': this.input }).then(response => {
          this.results = response.data
        }).catch(() => {
          this.$message('搜索失败')
        })
      } else if (this.select === '2') {
        searchSensor({ 'query': this.input }).then(response => {
          this.results = response.data
        }).catch(() => {
          this.$message('搜索失败')
        })
      }
    }
  }
}
</script>

<style>

.searchClass{
    border: 1px solid #D5E3E8;
  background: #fff;
  border-radius: 20px;
}
.searchClass .el-input-group__prepend {
  border: none;
  background-color: transparent;
  padding: 0 10px 0 30px;
}
.searchClass .el-input-group__append {
  border: none;
  background-color: transparent;
}
.searchClass .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: none;
  background-color: transparent;
}
.searchClass .el-icon-search{
  color: #409eff;
  font-size: 16px;
}
.searchClass .centerClass {
  height: 100%;
  line-height: 100%;
  display: inline-block;
  vertical-align: middle;
  text-align: right;
}
.searchClass .line {
  width: 1px;
  height: 26px;
  background-color: #D5E3E8;
  margin-left: 14px;
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
