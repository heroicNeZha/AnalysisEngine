<template>
  <div class="app-container">
    <el-table
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
      <el-table-column label="传感器名称" width="150" align="center">
        <template slot-scope="scope">
          <el-input v-show="scope.row.edit" v-model="scope.row.name" size="small" />
          <span v-show="!scope.row.edit">{{ scope.row.name }}</span></template>
      </el-table-column>
      <el-table-column label="传感器介绍" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="所属公司" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.company.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司地址" align="center">
        <template slot-scope="scope">{{ scope.row.company.address }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="公司行业" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.company.industry }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="属性" width="110">
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
      <el-table-column align="center" prop="created_at" label="编辑" width="110">
        <template slot-scope="scope">
          <el-button
            v-show="!scope.row.edit"
            type="primary"
            size="small"
            icon="edit"
            @click="scope.row.edit=true"
          >编辑</el-button>
          <el-button
            v-show="scope.row.edit"
            type="success"
            size="small"
            icon="check"
            @click="scope.row.edit=false"
          >完成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/sensor'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
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
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
