<!-- 账号列表 -->
<template>
  <div class="account">
    <div class="search">
      <el-input placeholder="搜索账号" style="width:200px"></el-input>
      <el-input placeholder="搜索手机" style="width:200px"></el-input>
      <el-button icon="el-icon-search"></el-button>
      <el-button type="primary" class="add" @click="addAccount = true">新增</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="rolename" label="角色"></el-table-column>
        <el-table-column prop="mobie" label="手机号码"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope" v-if="scope.row.created_at">
            {{scope.row.created_at | date(2)}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch inactive-value = "0" active-value="1" :value="`${scope.row.status}`"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small">密码重置</el-button>
            <el-button type="text" size="small" @click="dele(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination background layout="prev, pager, next" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
        </el-pagination>
      </div>
    </div>
    <!-- 新增账号 -->
    <el-dialog :title="title" :visible.sync="addAccount" @close='closeDialog'>
      <el-form label-width="80px">
        <el-form-item label="账号" required>
          <el-input style="width:400px;" v-model="roleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" required v-if="addButton === true">
          <el-input style="width:400px;" v-model="roleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机" required>
          <el-input style="width:400px;" v-model="roleForm.mobie"></el-input>
        </el-form-item>
        <el-form-item label="角色" required>
          <el-select placeholder="请选择商家" v-model="roleForm.role_id" style="width:400px;">
            <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" required>
          <el-radio-group v-model="roleForm.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAccount = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd" v-if="addButton === true">确 定</el-button>
        <el-button type="primary" @click="submitEdit" v-else>修 改</el-button>
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
      titile: '新增账号',
      addButton: true,
      addAccount: false,
      tableData: [],
      pages: {},
      roleList: {},
      id: '',
      roleForm: {
        username: '',
        password: '',
        mobie: '',
        role_id: '',
        status: '1'
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
  mounted: function () {
  },
  methods: {
    closeDialog () {
      this.addAccount = false
      this.title = '新增账号'
      this.addButton = true
    },
    // 获取用户列表
    request () {
      setupApi.userList().then((response) => {
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
    // 获取角色
    roleRequest () {
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
    submitAdd () {
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
    },
    // 修改
    edit (row) {
      this.title = '修改账号'
      this.id = row.id
      this.roleForm.username = row.username
      this.roleForm.password = row.password
      this.roleForm.mobie = row.mobie
      this.roleForm.role_id = row.role_id
      this.roleForm.status = row.status.toString()
      this.addAccount = true
      this.addButton = false
    },
    submitEdit () {
      let qs = require('querystring')
      setupApi.editUser(qs.stringify(this.roleForm), this.id).then((response) => {
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
</style>