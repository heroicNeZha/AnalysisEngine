<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="解决方案名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="类型">
        <el-tag :type="form.public_ | statusFilter">{{ form.public_===0?"私有":form.public_===1?"公开":"解决方案" }}</el-tag>
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
            <el-checkbox v-for="gateway in gateways" :key="gateway.id" :label="gateway.id">{{ gateway.name }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="传感器">
        <div class="border-box">
          <el-checkbox-group v-model="form.sensor">
            <el-checkbox v-for="sensor in sensors" :key="sensor.id" :label="sensor.id">{{ sensor.name }}</el-checkbox>
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
        public_: '2',
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
}
</style>
