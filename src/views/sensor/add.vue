<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="网关名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="form.description" type="textarea" rows="5" />
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
export default {
  data() {
    return {
      form: {
        name: '',
        describtion: '',
        type: '1',
        companyId: ''
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
          this.$store.dispatch('gateway/add', this.form).then(() => {
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

