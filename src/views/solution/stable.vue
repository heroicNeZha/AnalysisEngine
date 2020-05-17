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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="解决方案名称" width="200">
        <template slot-scope="scope">
          <el-input v-show="scope.row.edit" v-model="scope.row.name" size="small" />
          <span v-show="!scope.row.edit">{{ scope.row.name }}</span></template>
      </el-table-column>
      <el-table-column label="方案介绍">
        <template slot-scope="scope">
          <span>{{ scope.row.intros }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属公司" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user.company.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司地址" align="center">
        <template slot-scope="scope">{{ scope.row.user.company.address }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="详细信息" width="200">
        <template slot-scope="scope">
          <el-button
            v-show="!scope.row.edit"
            type="primary"
            size="small"
            icon="edit"
            @click="alert(1)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSolutions } from '@/api/solution'

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
      getSolutions().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
