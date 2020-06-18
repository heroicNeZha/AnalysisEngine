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
      <el-table-column label="" align="center" width="70">
        <template slot-scope="scope">
          <img :src="scope.row.avatar+'?imageView2/1/w/40/h/40'" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="150">
        <template slot-scope="scope">
          <el-input v-show="scope.row.edit" v-model="scope.row.name" size="small" />
          <span v-show="!scope.row.edit">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" width="150">
        <template slot-scope="scope">
          <el-input v-show="scope.row.edit" v-model="scope.row.name" size="small" />
          <span v-show="!scope.row.edit">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属公司" align="center" width="220">
        <template slot-scope="scope">{{ scope.row.company.name }}</template>
      </el-table-column>
      <el-table-column label="所属行业" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.company.industry }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司地址">
        <template slot-scope="scope">
          <span>{{ scope.row.company.address }}</span>
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
import { getUserList } from '@/api/user'

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
      getUserList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
