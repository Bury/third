<!-- 账号列表 -->
<template>
  <div class="account">
    <div class="search">
      <el-input placeholder="搜索账号" v-model="search.username" style="width:200px"></el-input>
      <el-input placeholder="搜索手机" v-model="search.mobile" style="width:200px"></el-input>
      <el-button icon="el-icon-search" @click="request"></el-button>
      <el-button type="primary" class="add" @click="add()">新增</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%;">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mobile" label="手机号码"></el-table-column>
        <el-table-column label="创建时间" style="text-align: center;">
          <template slot-scope="scope" v-if="scope.row.created_at">
            {{scope.row.created_at | date(2)}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch inactive-value = "0" active-value="1" :value="`${scope.row.status}`" @change="status(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <!--<el-button type="text" size="small" @click="changePsd(scope.row)">密码重置</el-button>-->
            <el-button type="text" size="small" @click="dele(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages" v-if="pages.pageCount > 0">
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
        </el-pagination>
      </div>
    </div>
    <!-- 新增账号 -->
    <el-dialog :title="title" :visible.sync="addAccount" @close="closeDialog()">
      <el-form label-width="80px" class="demo-ruleForm" :model="roleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input style="width:400px;" v-model="roleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" style="width:400px;" v-model="roleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input style="width:400px;" v-model="roleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select placeholder="请选择角色" v-model="roleForm.role_id" style="width:400px;">
            <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="roleForm.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAccount = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd()" v-if="addButton === true">确 定</el-button>
        <el-button type="primary" @click="submitEdit()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import setupApi from '../../api/setup'

export default {
  name: 'account',
  data () {
    return {
      title: '新增账号',
      addButton: true,
      addAccount: false,
      tableData: [],
      pages: {},
      roleList: {},
      id: '',
      currentPage: 1,
      search: {
        username: '',
        mobile: '',
        page: ''
      },
      roleForm: {
        username: '',
        password: '',
        mobile: '',
        role_id: '',
        status: '1'
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)){
                callback();
              } else {
                callback("请输入正确的手机号");
              }
            },
            trigger: 'blur'
          }
        ],
        role_id: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择账号状态', trigger: 'change' }
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
    this.roleRequest()
  },
  methods: {
    closeDialog () {
      this.addAccount = false;
      this.title = '新增账号'
      this.addButton = true
      setTimeout( () => {
        this.$refs.ruleForm.resetFields()
      },0)

    },
    // 获取用户列表
    request () {
      let list = {
        'username': this.search.username,
        'mobile': this.search.mobile,
        'page': this.currentPage
      }
      let qs = require('querystring')
      setupApi.userList(qs.stringify(list)).then((response) => {
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
    // 获取角色
    roleRequest () {
      let qs = require('querystring')
      setupApi.roleList().then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.roleList = returnData.data.list
        } else {
          this.$alert(returnData.msg, {
            type: 'error',
            callback: action => {
            }
          })
        }
      })
    },
    // 添加
    add(){
      this.$data.addAccount = true;
      this.$data.roleForm = {
        username: '',
        password: '',
        mobile: '',
        // role_id: '',
        status: '1'
      };
    },
    submitAdd () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let qs = require('querystring')
          setupApi.addUser(qs.stringify(this.roleForm)).then((response) => {
            let returnData = response.data
            if (returnData.errno === 0) {
              this.addAccount = false
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
    // 修改
    edit (row) {
      console.log(row);
      this.title = '修改账号'
      this.id = row.id
      this.roleForm.username = row.username
      this.roleForm.password = row.password
      this.roleForm.mobile = row.mobile
      this.roleForm.role_id = row.role_id
      this.roleForm.status = row.status.toString()
      this.addAccount = true
      this.addButton = false
    },
    submitEdit () {
      let list = {
        'id':this.id,
        'username':this.roleForm.username,
        'password':this.roleForm.password,
        'mobile':this.roleForm.mobile,
        'role_id':this.roleForm.role_id,
        'status':this.roleForm.status,
      };
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let qs = require('querystring')
          setupApi.editUser(qs.stringify(list),this.id).then((response) => {
            let returnData = response.data
            if (returnData.errno === 0) {
              this.addAccount = false;

              this.request();
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
    // 删除
    dele (row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setupApi.deleUser(row.id).then((response) => {
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
    status (row) {
      let list = {
        "id":row.id,
        "status":row.status === 0 ? 1 : 0
      }
      let qs = require('querystring')
      setupApi.changeUserStatus(qs.stringify(list)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.request()
        } else {
          this.$alert(returnData.msg, {
            type: 'error',
            callback: action => {
            }
          })
        }
      })
    },
    // changePsd(row){
    //   console.log(row);
    // }
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
</style>
