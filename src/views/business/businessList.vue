<!-- 商家列表 -->
<template>
  <div class="business-list">
    <div class="search">
      <el-input placeholder="请输入商家" style="width:200px"></el-input>
      <el-button icon="el-icon-search"></el-button>
      <el-button type="primary" class="add" @click="addVisible = true">新增</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="商家名称"></el-table-column>
        <el-table-column label="模块">
          <template slot-scope="scope">
            <i class="el-icon-menu"></i>
          </template>
        </el-table-column>
        <el-table-column label="账号管理">
          <template slot-scope="scope">
            <i class="el-icon-edit-outline"></i>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch inactive-value = "0" active-value="1" :value="`${scope.row.status}`"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="handleDele(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination background layout="prev, pager, next" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
        </el-pagination>
      </div>
    </div>
    <!-- 新增Form -->
    <el-dialog :title="title" :visible.sync="addVisible" @close='closeDialog'>
      <el-form :model="add" label-width="80px" class="demo-ruleForm" :rules="rules" ref="add">
        <el-form-item label="全称" prop="fullname">
          <el-input v-model="add.fullname"></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="name">
          <el-input v-model="add.name"></el-input>
        </el-form-item>
        <el-form-item label="域名" prop="domain">
          <el-input v-model="add.domain">
            <template slot="append">.zhijikeji.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="add.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addForm" v-if="addButton === true">确 定</el-button>
        <el-button type="primary" @click="editForm" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import businessApi from '../../api/business'
export default {
  name: 'business-list',
  data () {
    return {
      title: '新增商家',
      addButton: true,
      addVisible: false,
      pages: {},
      tableData: [],
      id: '',
      add: {
        name: '',
        fullname: '',
        domain: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商家简称', trigger: 'blur' }
        ],
        fullname: [
          { required: true, message: '请输入商家全称', trigger: 'blur' }
        ],
        domain: [
          { required: true, message: '请输入域名', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      }
    }
  },
  created: function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.upperLevelMenu = ''

    this.request()
  },
  mounted: function () {
  },
  methods: {
    request () {
      businessApi.businessList().then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.tableData = returnData.data.list
          this.pages = returnData.data.pagination
        } else {
          console.log('bbb')
        }
      })
    },
    closeDialog () {
      this.addVisible = false
      this.title = '新增商家'
      this.addButton = true
    },
    handleDele (row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        businessApi.deleBusiness(row.id).then((response) => {
          let returnData = response.data
          if (returnData.errno === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.request()
          } else {
            console.log(returnData.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })     
      })
    },
    handleEdit (row) {
      console.log(row)
      this.title = '修改商家'
      this.id = row.id
      this.add.name = row.name
      this.add.fullname = row.fullname
      this.add.domain = row.domain
      this.add.remark = row.remark
      this.addVisible = true
      this.addButton = false
    },
    editForm () {
      let qs = require('querystring')
      businessApi.editBusiness(qs.stringify(this.add), this.id).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.addVisible = false
          this.request()
        } else {
          console.log(returnData.msg)
        }
      })
    },
    addForm () {
      let qs = require('querystring')
      businessApi.addBusiness(qs.stringify(this.add)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.addVisible = false
          this.request()
        } else {
          console.log(returnData.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.search{
  position:relative;
}
.search .add{
  position: absolute;
  top:0;
  right:0;
}
.table{
  margin-top:20px;
  padding:20px;
  border-radius: 4px;
  background-color: #ffffff;
  border: solid 2px #f1f5fc;
}
.pages{
  text-align:center;
  margin-top:30px;
}
i{
  font-size:24px;
}
</style>