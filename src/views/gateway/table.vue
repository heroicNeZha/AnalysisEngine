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
      <el-table-column label="网关名称" width="150" align="center">
        <template slot-scope="scope">
          <el-input v-show="scope.row.edit" v-model="scope.row.model" size="small" />
          <span v-show="!scope.row.edit">{{ scope.row.model }}</span></template>
      </el-table-column>
      <el-table-column label="物联网设备间协议" align="center">
        <template slot-scope="scope">{{ scope.row.innerProtocols }}</template>
      </el-table-column>
      <el-table-column label="上传协议" align="center">
        <template slot-scope="scope">{{ scope.row.uploadProtocals }}</template>
      </el-table-column>
      <el-table-column label="可充电电池" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.chargeable | chargeableFilter">{{ scope.row.chargeable==0?" 否 ":" 是 " }}</el-tag></template>
      </el-table-column>
      <el-table-column label="输入电压" align="center">
        <template slot-scope="scope">DC {{ scope.row.lowVoltage }} ～ {{ scope.row.highVoltage }} V</template>
      </el-table-column>
      <el-table-column label="工作环境" align="center">
        <template slot-scope="scope">{{ scope.row.lowTemprature }} ～ {{ scope.row.highTemprature }} &#176;C</template>
      </el-table-column>
      <el-table-column label="网关介绍">
        <template slot-scope="scope">{{ scope.row.desc }}</template>
      </el-table-column>
      <el-table-column label="所属公司" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.company.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="属性" width="110">
        <template slot-scope="scope">
          <el-button
            v-show="!scope.row.edit"
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
    <el-dialog title="网关详细信息" :visible.sync="dialogFormVisible">
      <el-form :model="detailForm">
        <el-input v-model="detailForm.id" type="hidden" size="small" autocomplete="off" />
        <el-form-item label="网关名称" :label-width="formLabelWidth">
          <el-input v-model="detailForm.model" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="网关介绍" :label-width="formLabelWidth">
          <el-input v-model="detailForm.desc" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="物联网设备间协议" :label-width="formLabelWidth">
          <el-input v-model="detailForm.innerProtocols " size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上传协议" :label-width="formLabelWidth">
          <el-input v-model="detailForm.uploadProtocals " size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="可充电电池" :label-width="formLabelWidth">
          <el-input v-model="detailForm.chargeable" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="输入电压" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="10"><el-input v-model="detailForm.lowVoltage" size="small" autocomplete="off" /></el-col>
            <el-col :span="4" style="text-align:center"> ~ </el-col>
            <el-col :span="10"><el-input v-model="detailForm.highVoltage" size="small" autocomplete="off" /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="工作环境" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="10"><el-input v-model="detailForm.lowTemprature" size="small" autocomplete="off" /></el-col>
            <el-col :span="4" style="text-align:center"> ~ </el-col>
            <el-col :span="10"><el-input v-model="detailForm.highTemprature" size="small" autocomplete="off" /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="网关介绍" :label-width="formLabelWidth">
          <el-input v-model="detailForm.desc " size="small" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4}" />
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth">
          <el-select v-model="detailForm.company.id" placeholder="请选择公司">
            <el-option v-for="company in companys" :key="company.id" :label="company.name" :value="company.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGatewayList, updateGateway } from '@/api/gateway'
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
    },
    chargeableFilter(chargeable) {
      const statusMap = {
        1: 'success',
        0: 'info'
      }
      return statusMap[chargeable]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      companys: null,
      // detail dialog
      detailForm: {
        id: '',
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
        company: {
          id: '',
          name: '',
          address: '',
          industry: '',
          intros: ''
        }
      },
      dialogFormVisible: false,
      formLabelWidth: '140px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getGatewayList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
      getCompanyList().then(response => {
        this.companys = response.data.items
        this.listLoading = false
      })
    },
    // detail Dialog
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
    },
    updateForm() {
      this.dialogFormVisible = false
      updateGateway(this.detailForm).then(response => {
        this.$message(response.message)
      }).catch(() => {
        this.$message('修改失败')
      })
    }
  }
}
</script>
