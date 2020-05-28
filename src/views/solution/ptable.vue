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
      <el-table-column align="center" label="项目名称" width="150">
        <template slot-scope="scope">
          <el-input v-show="scope.row.edit" v-model="scope.row.name" size="small" />
          <span v-show="!scope.row.edit">{{ scope.row.name }}</span></template>
      </el-table-column>
      <el-table-column label="项目介绍">
        <template slot-scope="scope">
          <span>{{ scope.row.intros }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属公司" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user.company.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司地址" align="center">
        <template slot-scope="scope">{{ scope.row.user.company.address }}</template>
      </el-table-column>
      <el-table-column class-name="types-col" label="类型" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.public | typesFilter">{{ scope.row.public==0?"private":"public" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="详细信息" width="100">
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
import { getProgramList } from '@/api/solution'

export default {
  filters: {
    typesFilter(type) {
      const typesMap = {
        1: 'success',
        0: 'gray'
      }
      return typesMap[type]
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
      getProgramList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
