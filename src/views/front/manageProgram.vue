<template>
  <div class="app-container">
    <el-page-header content="项目管理" />
    <el-divider />
    <div class="show-div">
      <el-card v-for="program in programs" :key="program.id" class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ program.name }}</span>
          <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
          <el-button style="float: right; padding: 3px 5px" type="text" @click="showDetail(program.id)">查看</el-button>
          <el-tag size="mini" style="float: right;" :type="program.public | statusFilter">{{ program.public==0?"私有":"公开" }}</el-tag>
        </div>
        <div>
          <span>
            {{ program.user.company.name }}
            <span style="float:right"> {{ program.user.phone }}</span>
          </span>
          <p> {{ program.user.company.address }}</p>
          <p> {{ program.intros }}</p>
        </div>
      </el-card>
    </div>
    <el-dialog title="项目详细信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="公开">
          <el-switch
            v-model="form.public "
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="详细介绍">
          <el-input v-model="form.intros" type="textarea" />
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="form.userId" placeholder="请选择负责人">
            <el-option v-for="user in users" :key="user.id" :label="user.name" :value="user.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="网关">
          <div class="border-box">
            <el-checkbox-group v-model="form.gateway">
              <el-tooltip
                v-for="gateway in gateways"
                :key="gateway.id"
                placement="top"
                effect="light"
              >
                <div slot="content" style="color: #606266;"> 网间协议: {{ gateway.innerProtocols }}
                  <br>上传协议: {{ gateway.uploadProtocals }}
                  <br>充电电池: {{ gateway.chargeable == 0? "否":"是" }}
                  <br>输入电压: DC {{ gateway.lowVoltage }}V ~ {{ gateway.highVoltage }}V
                  <br>工作环境: {{ gateway.lowTemprature }} ~ {{ gateway.highTemprature }}&#176;C
                  <br>网关介绍: {{ gateway.desc }}
                  <br>所属公司: {{ gateway.company.name }}</div>
                <el-checkbox :label="gateway.id">{{ gateway.model }}</el-checkbox>
              </el-tooltip>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="传感器">
          <div class="border-box">
            <el-checkbox-group v-model="form.sensor">
              <el-tooltip
                v-for="sensor in sensors"
                :key="sensor.id"
                placement="top"
                effect="light"
              >
                <div slot="content" style="color: #606266;"> 网间协议: {{ sensor.innerProtocols }}
                  <br>上传协议: {{ sensor.uploadProtocals }}
                  <br>充电电池: {{ sensor.chargeable == 0? "否":"是" }}
                  <br>输入电压: DC {{ sensor.lowVoltage }}V ~ {{ sensor.highVoltage }}V
                  <br>工作环境: {{ sensor.lowTemprature }} ~ {{ sensor.highTemprature }}&#176;C
                  <br>传感器介绍: {{ sensor.desc }}
                  <br>所属公司: {{ sensor.company.name }}</div>
                <el-checkbox :label="sensor.id">{{ sensor.model }}</el-checkbox>
              </el-tooltip>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateForm()">确 定</el-button>
      </div>
    </el-dialog>
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
import { getProgramListById, updateProgram } from '@/api/solution'
import { getUserList } from '@/api/user'
import { getSensorList } from '@/api/sensor'
import { getGatewayList } from '@/api/gateway'
import { mapGetters } from 'vuex'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'gray',
        2: 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      form: {
        name: '',
        public: 1,
        intros: '',
        userId: '',
        gateway: [],
        sensor: []
      },
      programs: null,
      sensors: null,
      gateways: null,
      users: null,
      dialogFormVisible: false
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'cartList'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getSensorList().then(response => {
        this.sensors = response.data.items
      })
      getGatewayList().then(response => {
        this.gateways = response.data.items
      })
      getProgramListById({ id: 3 }).then(response => {
        this.programs = response.data.items
      })
      getUserList().then(response => {
        this.users = response.data.items
      })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('solution/add', this.form).then(() => {
            this.$message('添加成功')
          }).catch(() => {
            this.$message('添加失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    showDetail(id) {
      this.programs.forEach(element => {
        if (element.id === id) {
          this.form = element
        }
      })
      this.dialogFormVisible = true
    },
    editData(event, row) {
      row.edit = true
      this.$set(this.list, row.$index, row)
    },
    updateData(event, row) {
      row.edit = false
      this.$set(this.list, row.$index, row)
    },
    updateForm() {
      this.dialogFormVisible = false
      updateProgram(this.form).then(response => {
        this.$message(response.message)
      }).catch(() => {
        this.$message('修改失败')
      })
    },
    rmCart(id) {
      const e = this.cartList.find(element => element.id === id)
      const index = this.cartList.indexOf(e)
      this.cartList.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
<style>
.border-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
  margin-top: 5px;
  padding-left: 15px;
  white-space: pre-wrap;
}
.show-div {
  margin-top: 20px;
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
