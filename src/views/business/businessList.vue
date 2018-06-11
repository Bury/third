<!-- 商家列表 -->
<template>
  <div class="business-list">
    <div class="search">
      <el-input placeholder="请输入商家" v-model="searchKey" style="width:200px"></el-input>
      <el-button icon="el-icon-search" @click="request"></el-button>
      <el-button type="primary" class="add" @click="addVisible = true">新增</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="商家名称"></el-table-column>
        <el-table-column label="模块">
          <template slot-scope="scope">
            <i class="el-icon-menu" @click="modules(scope.row)"></i>
          </template>
        </el-table-column>
        <el-table-column label="账号管理">
          <template slot-scope="scope">
            <i class="el-icon-edit-outline" @click="accountActive(scope.row)"></i>
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
      <div class="pages" v-if="pages.pageCount > 0">
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
        </el-pagination>
      </div>
    </div>
    <!-- 新增Form -->
    <el-dialog :title="title" :visible.sync="addVisible" @close="closeDialog('add')">
      <el-form :model="add" label-width="80px" class="demo-ruleForm" ref="add" :rules="rules">
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
        <el-button type="primary" @click="addForm('add')" v-if="addButton === true">确 定</el-button>
        <el-button type="primary" @click="editForm('add')" v-else>修 改</el-button>
      </div>
    </el-dialog>
     <!-- 账号管理 -->
    <el-dialog title="设置商家管理员账号" :visible.sync="accountVisible">
      <el-form :model="account" label-width="80px" class="demo-ruleForm" ref="account" :rules="rulesAcc">
        <el-form-item label="账号" prop="username">
          <el-input v-model="account.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="account.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="accountVisible = false">取 消</el-button>
        <el-button type="primary" @click="setAcc('account')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import businessApi from '../../api/business'
import storage from '../../utils/storage'

export default {
  name: 'business-list',
  data () {
    return {
      title: '新增商家',
      addButton: true,
      addVisible: false,
      accountVisible: false,
      pages: {},
      tableData: [],
      id: '',
      account: {
        mid: '',
        username: 'admin',
        password: '123456'
      },
      searchKey: '',
      currentPage: '1',
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
      },
      rulesAcc: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
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
      let list = {
        'filter[or][][name][like]': this.searchKey,
        'filter[or][][fullname][like]': this.searchKey,
        'page': this.currentPage
      }
      let qs = require('querystring')
      businessApi.businessList(qs.stringify(list)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.tableData = returnData.data.list
          this.pages = returnData.data.pagination
        } else {
          this.$alert(returnData.msg, {
            type: 'error',
            callback: action => {
            }
          })
        }
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.request()
    },
    closeDialog () {
      this.addVisible = false
      this.title = '新增商家'
      this.addButton = true
      this.$refs[formName].resetFields()
    },
    // 删除
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
            this.$alert(returnData.msg, {
              type: 'error',
              callback: action => {
              }
            })
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
      this.title = '修改商家'
      this.id = row.id
      this.add.name = row.name
      this.add.fullname = row.fullname
      this.add.domain = row.domain
      this.add.remark = row.remark
      this.addVisible = true
      this.addButton = false
    },
    // 修改
    editForm (formName) {
       this.$refs[formName].validate((valid) => {
         if (valid) {
          let qs = require('querystring')
          businessApi.editBusiness(qs.stringify(this.add), this.id).then((response) => {
            let returnData = response.data
            if (returnData.errno === 0) {
              this.addVisible = false
              this.request()
            } else {
              this.$alert(returnData.msg, {
                type: 'error',
                callback: action => {
                }
              })
            }
          })
         } else {
           return false
         }
       })
    },
    // 添加
    addForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let qs = require('querystring')
          businessApi.addBusiness(qs.stringify(this.add)).then((response) => {
            let returnData = response.data
            if (returnData.errno === 0) {
              this.addVisible = false
              this.request()
            } else {
              this.$alert(returnData.msg, {
                type: 'error',
                callback: action => {
                }
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 跳转到模块
    modules (row) {
      storage.setSessionStorage('name', row.name)
      this.$router.replace({name: 'Modules', params: {id: row.id}})
    },
    // 设置账号
    accountActive (row) {
      this.accountVisible = true
      this.account.mid = row.id
    },
    setAcc (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let qs = require('querystring')
          businessApi.setAccount(qs.stringify(this.account)).then((response) => {
            let returnData = response.data
            if (returnData.errno === 0) {
              this.accountVisible = false
              this.request()
            } else {
              this.$alert(returnData.msg, {
                type: 'error',
                callback: action => {
                }
              })
            }
          })
        } else {
          return false
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