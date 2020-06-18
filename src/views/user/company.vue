<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="用户名称" width="150">
        <template slot-scope="scope">
          <el-input v-show="scope.row.edit" v-model="scope.row.name" size="small" />
          <span v-show="!scope.row.edit">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司地址" align="center" width="220">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="公司行业" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.industry }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司介绍">
        <template slot-scope="scope">
          <span>{{ scope.row.intros }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-show="!scope.row.edit"
            type="primary"
            size="small"
            icon="edit"
            @click="alert(1)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCompanyList } from '@/api/company'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCompanyList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
