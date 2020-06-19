<template>
  <div class="app-container" style="width:50%">
    <el-form ref="form" :model="form" label-width="160px">
      <el-form-item label="传感器名称">
        <el-input v-model="form.model" size="small" autocomplete="off" />
      </el-form-item>
      <el-form-item label="物联网设备间协议">
        <el-input v-model="form.innerProtocols " size="small" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上传协议">
        <el-input v-model="form.uploadProtocals " size="small" autocomplete="off" />
      </el-form-item>
      <el-form-item label="可充电电池">
        <el-input v-model="form.chargeable" size="small" autocomplete="off" />
      </el-form-item>
      <el-form-item label="输入电压">
        <el-row>
          <el-col :span="10"><el-input v-model="form.lowVoltage" size="small" autocomplete="off" /></el-col>
          <el-col :span="4" style="text-align:center"> ~ </el-col>
          <el-col :span="10"><el-input v-model="form.highVoltage" size="small" autocomplete="off" /></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="工作环境">
        <el-row>
          <el-col :span="10"><el-input v-model="form.lowTemprature" size="small" autocomplete="off" /></el-col>
          <el-col :span="4" style="text-align:center"> ~ </el-col>
          <el-col :span="10"><el-input v-model="form.highTemprature" size="small" autocomplete="off" /></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="传感器介绍">
        <el-input v-model="form.desc" size="small" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4}" />
      </el-form-item>
      <el-form-item label="所属公司">
        <el-select v-model="form.companyId" placeholder="请选择所属公司">
          <el-option v-for="company in companys" :key="company.id" :label="company.name" :value="company.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建类型">
        <el-radio-group v-model="form.type">
          <el-radio label="0">网关</el-radio>
          <el-radio label="1">传感器</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCompanyList } from '@/api/company'
import { addSensor } from '@/api/sensor'
export default {
  data() {
    return {
      form: {
        model: '',
        innerProtocols: '',
        uploadProtocals: '',
        chargeable: '',
        lowVoltage: '',
        highVoltage: '',
        lowTemprature: '',
        highTemprature: '',
        desc: '',
        otherDesc: '',
        industrialGrad: '',
        companyId: '',
        type: '1'
      },
      companys: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getCompanyList().then(response => {
        this.companys = response.data.items
      })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addSensor(this.form).then(() => {
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
.line {
  text-align: center;
}
</style>

