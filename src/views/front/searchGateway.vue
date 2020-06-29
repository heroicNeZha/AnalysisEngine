<template>
  <div class="app-container">
    <div style="margin-top:40px">
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
    </div>
    <div class="show-div">
      <el-card v-for="result in results" :key="result.id" class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ result.model }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addCart(result)">加入购物车</el-button>
        </div>
        <div>
          <p>网间协议: {{ result.innerProtocols }}</p>
          <p>上传协议: {{ result.uploadProtocals }}</p>
          <p>充电电池: {{ result.chargeable == 0? "否":"是" }}</p>
          <p>输入电压: DC {{ result.lowVoltage }}V ~ {{ result.highVoltage }}V</p>
          <p>工作环境: {{ result.lowTemprature }} ~ {{ result.highTemprature }}&#176;C</p>
          <p>传感器介绍: {{ result.desc }}</p>
          <p>所属公司: {{ result.company.name }}</p>
        </div>
      </el-card>
    </div>
    <div class="cart-button" style="right: 40px; bottom: 60px;">
      <el-popover
        placement="top-end"
        width="800"
        trigger="click"
      >
        <el-table :data="cartList">
          <el-table-column width="100" property="model" label="组件名" />
          <el-table-column width="100" property="innerProtocols" label="网间协议" />
          <el-table-column width="100" property="uploadProtocals" label="上传协议" />
          <el-table-column width="80" label="充电电池">
            <template slot-scope="scope">
              <span>{{ scope.row.chargeable == 0? "否":"是" }}</span>
            </template>
          </el-table-column>
          <el-table-column width="120" label="输入电压">
            <template slot-scope="scope">
              <span>DC {{ scope.row.lowVoltage }}V ~ {{ scope.row.highVoltage }}V</span>
            </template>
          </el-table-column>
          <el-table-column width="150" property="company.name" label="所属公司" />
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                icon="edit"
                @click="rmCart(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          slot="reference"
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
        >购物车</el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { searchGateway } from '@/api/gateway'
import { searchSensor } from '@/api/sensor'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      input: '',
      select: '1',
      results: []
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'cartList'
    ])
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
    },
    addCart(element) {
      this.cartList.push(element)
    },
    rmCart(id) {
      const e = this.cartList.find(element => element.id === id)
      const index = this.cartList.indexOf(e)
      this.cartList.splice(index, 1)
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
  margin-top: 40px;
}
.box-card {
  margin-left: 10%;
  margin-top: 20px;
  width: 80%;
}
.cart-button{
  position: fixed;
  background-color: #fff;
  width: 80px;
  height: 40px;
  border-radius: 50%;
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0,0,0,.12);
  cursor: pointer;
  z-index: 5;
}
</style>
