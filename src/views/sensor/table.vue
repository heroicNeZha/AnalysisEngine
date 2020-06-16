<template>
  <div class="app-container">
    <div>
      <el-table
        v-loading="listLoading"
        :row-key="Math.random()"
        name="table1"
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
              type="primary"
              size="small"
              icon="edit"
              @click="showDetail(scope.row.id)"
            >查看属性</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="编辑" width="110">
          <template slot-scope="scope">
            <el-button
              v-show="!scope.row.edit"
              type="primary"
              size="small"
              icon="edit"
              @click="editData($event,scope.row)"
            >编辑</el-button>
            <el-button
              v-show="scope.row.edit"
              type="success"
              size="small"
              icon="check"
              @click="updateData($event,scope.row)"
            >完成</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="传感器详细信息" :visible.sync="dialogFormVisible">
        <el-form :model="detailForm">
          <el-form-item label="传感器名称" :label-width="formLabelWidth">
            <el-input v-model="detailForm.name" size="small" autocomplete="off" />
          </el-form-item>
          <el-form-item label="传感器介绍" :label-width="formLabelWidth">
            <el-input v-model="detailForm.description" size="small" autocomplete="off" />
          </el-form-item>
          <el-form-item label="所属公司" :label-width="formLabelWidth">
            <el-select v-model="detailForm.company.id" placeholder="请选择公司">
              <el-option v-for="company in companys" :key="company.id" :label="company.name" :value="company.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="公司地址" :label-width="formLabelWidth">
            <el-input v-model="detailForm.company.address" size="small" autocomplete="off" />
          </el-form-item>
          <el-form-item label="公司行业" :label-width="formLabelWidth">
            <el-input v-model="detailForm.company.industry" size="small" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSensorList } from '@/api/sensor'
import { getCompanyList } from '@/api/company'

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
      listLoading: true,
      dialogFormVisible: false,
      detailForm: {
        id: '',
        name: '',
        description: '',
        type: '1',
        company: {
          id: '',
          name: '',
          address: '',
          industry: '',
          intros: ''
        }
      },
      companys: null,
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getSensorList().then(response => {
        this.list = response.data.items
      })
      getCompanyList().then(response => {
        this.companys = response.data.items
        this.listLoading = false
      })
    },
    showDetail(id) {
      this.list.forEach(element => {
        if (element.id === id) {
          this.detailForm = element
        }
      })
      this.dialogFormVisible = true
    },
    editData(event, row) {
      row.edit = true
      this.$set(this.list, row.$index, row)
    },
    updateData(event, row) {
      row.edit = false
      this.$set(this.list, row.$index, row)
    }
  }
}
</script>
