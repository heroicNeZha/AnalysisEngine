<template>
  <div class="dashboard-container">{{ list }}<br>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="网关名称">
        <el-input v-model="form.cid" />
      </el-form-item>
      <button title="查询" @click="queryData">查询</button>
      {{ query }}
    </el-form>
  </div>

</template>

<script>
import { getCompany, getCompanyList } from '@/api/company'
export default {
  data() {
    return {
      form: {
        cid: '1'
      },
      list: null,
      query: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    queryData() {
      const param = { id: this.form.cid }
      getCompany(param).then(response => {
        this.query = response.data
      })
    },
    fetchData() {
      getCompanyList().then(response => {
        this.list = response.data.items
      })
    }
  }
}
</script>
