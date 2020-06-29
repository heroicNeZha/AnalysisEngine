<template>
  <div class="app-container">
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSensorList } from '@/api/sensor'
import { getGatewayList } from '@/api/gateway'
import { getUserList } from '@/api/user'
import { addProgram } from '@/api/solution'
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
        public: '2',
        intros: '',
        userId: '',
        gateway: [],
        sensor: []
      },
      sensors: null,
      gateways: null,
      users: null
    }
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
      getUserList().then(response => {
        this.users = response.data.items
      })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addProgram(this.form).then(() => {
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
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
<style scoped>
.border-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
  margin-top: 5px;
  padding-left: 15px;
  white-space: pre-wrap;
}
</style>
