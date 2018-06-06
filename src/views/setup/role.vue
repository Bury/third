<!-- 角色列表 -->
<template>
  <div class="role">
    <div class="search">
      <el-button type="primary" class="add" @click="addRole = true">新增角色</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch inactive-value = "0" active-value="1" :value="`${scope.row.status}`"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope" v-if="scope.row.created_at">
            {{scope.row.created_at | date(2)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">分配权限</el-button>
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="dele(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages" v-if="pages.pageCount > 0">
        <el-pagination background layout="prev, pager, next" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
        </el-pagination>
      </div>
    </div>
    <!-- 新增角色 -->
    <el-dialog :title="title" :visible.sync="addRole">
      <el-form label-width="80px">
        <el-form-item label="角色名称" required>
          <el-input style="width:400px;" v-model="add.name"></el-input><br/>
          <span v-if="addButton" style="color:#999;font-size:12px">备注：新建账号状态默认为开启</span>
        </el-form-item>

        <el-form-item label="状态" required v-if="!addButton">
          <el-radio-group v-model="add.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRole = false">取 消</el-button>
        <el-button type="primary" @click="addRoleAccount" v-if="addButton === true">确 定</el-button>
        <el-button type="primary" @click="editRoleAccount" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import setupApi from '../../api/setup'
export default {
  name: 'role',
  data () {
    return {
      addRole: false,
      addButton: true,
      title: '新增角色',
      tableData: [],
      pages: {},
      add: {
        name: '',
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
  },
  mounted: function () {
  },
  methods: {
    closeDialog () {
      this.addRole = false
      this.title = '新增角色'
      this.addButton = true
    },
    request () {
      setupApi.roleList().then((response) => {
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
    // 添加
    addRoleAccount () {
      let qs = require('querystring')
      setupApi.addRole(qs.stringify(this.add)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.addRole = false
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
      console.log(row)
      this.title = '修改角色'
      this.id = row.id
      this.add.name = row.name
      this.add.status = row.status.toString()
      this.addRole = true
      this.addButton = false
    },
    editRoleAccount () {
      let qs = require('querystring')
      setupApi.editRole(qs.stringify(this.add), this.id).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.addRole = false
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
    // 删除
    dele (row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setupApi.deleRole(row.id).then((response) => {
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
  text-align:right;
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