<!-- 角色列表 -->
<template>
  <div class="role">
    <div class="search">
      <el-button type="primary" class="add" @click="addForm()">新增角色</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch inactive-value = "0" active-value="1" :value="`${scope.row.status}`" @change="status(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope" v-if="scope.row.created_at">
            {{scope.row.created_at | date(2)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="powerEdit(scope.row)">分配权限</el-button>
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
    <el-dialog title="新增岗位" :visible.sync="addRole">
      <el-form label-width="80px" :model="add" :rules="rules" ref="add">
        <el-form-item label="角色名称" prop="name">
          <el-input style="width:400px;" v-model="add.name"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <div style="margin:20px 0;overflow:hidden;">
            <el-tree :data="dialogForm" show-checkbox default-expand-all node-key="id" ref="tree"
                     highlight-current
                     @check-change="change"
                     :default-checked-keys="checkedIds"
                     class="permission-tree">
            </el-tree>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRole = false">取 消</el-button>
        <el-button type="primary" @click="addRoleAccount('add')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog title="编辑岗位" :visible.sync="editRole">
      <el-form label-width="80px" :model="add" :rules="rules" ref="edit">
        <el-form-item label="角色名称" prop="name">
          <el-input style="width:400px;" v-model="add.name"></el-input>
        </el-form-item>
        <el-form-item label="状态" required>
          <el-radio-group v-model="add.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCancle">取 消</el-button>
        <el-button type="primary" @click="editRoleAccount()">修 改</el-button>
      </div>
    </el-dialog>
    <!--分配权限-->
    <el-dialog title="分配权限" :visible.sync="powerEditForm" :before-close="closeDialog">
      <el-form label-width="80px" :model="powerData" ref="powerEdit">
        <el-form-item label="权限">
          <div style="margin:20px 0;overflow:hidden;">
            <el-tree :data="dialogForm2" show-checkbox default-expand-all node-key="id" ref="editTree"
                     highlight-current
                     :default-checked-keys="editCheckedIds"
                     class="permission-tree">
            </el-tree>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="powerEditCancle">取 消</el-button>
        <el-button type="primary" @click="powerEditSubmit()">确 定</el-button>
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
      editRole:false,
      powerEditForm:false,
      tableData: [],
      pages: {},
      add: {
        name: '',
        status: '1',
        permission_ids:'',
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
    dialogForm:[],
    dialogForm2:[],
      checkedIds:[],
      editCheckedIds:[],
      powerData:{
        role_id:'',
        permission_ids:'',
      },
      roleId:'',
    }
  },
  created: function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.upperLevelMenu = ''
    this.request();

  },
  methods: {
    closeDialog () {
      this.$data.powerEditForm = false;
      setTimeout(() => {
        this.$data.editCheckedIds = [];
      },0)
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
    //获取权限
    power(){
      let qs = require('querystring');
      setupApi.powerRole(qs.stringify()).then((res) => {
        this.$data.dialogForm = res.data.data
      })
    },
    change(data, val, child) {
      // console.log(data)
      // console.log(val)
      // console.log(child)
      // //data该节点的对象，val自身是否被选中，child子节点是否被选中
      // this.$data.nodeId = data.id;
      // if(val == true && data.parent_id != 0) {
      //   this.$data.parentId = this.$refs.tree.getNode(this.$data.nodeId).parent.data.id;
      //   this.$data.checkedIds.push(this.$data.parentId);
      // }
      // console.log(this.$data.checkedIds);
    },
    //添加
    addForm(){
      this.$data.addRole = true;
      this.power();
    },
    addRoleAccount (formName) {
      this.$data.checkedIds = this.$refs.tree.getCheckedKeys();
      this.$data.add.permission_ids = this.$data.checkedIds.toString();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let qs = require('querystring')
          setupApi.addRole(qs.stringify(this.add)).then((response) => {
            let returnData = response.data;
            if (returnData.errno === 0) {
              this.addRole = false;
              this.request();
              this.$data.add = {};
              this.$data.checkedIds = [];
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

    //修改权限
    powerEdit(row){
      this.$data.powerEditForm = true;
      this.$data.roleId = row.id;
      let list = {
        'role_id':row.id,
      };
      let qs = require('querystring');
      setupApi.editPowerPersonal(qs.stringify(list)).then((res) => {
        this.$data.dialogForm2 = res.data.data;
        for(let item of res.data.data){
          if(item.is_permission === 1){
            this.$data.editCheckedIds.push(item.id);
          }
        }

      })
    },
    powerEditCancle(){
      this.$data.powerEditForm = false;
      setTimeout(() => {
        this.$data.editCheckedIds = [];
      },0)
    },
    powerEditSubmit(){
      this.$data.powerData.role_id = this.$data.roleId;
      this.$data.editCheckedIds = this.$refs.editTree.getCheckedKeys();
      this.$data.powerData.permission_ids = this.$data.editCheckedIds.toString()
      let qs = require('querystring');
      setupApi.editPowerRole(qs.stringify(this.$data.powerData)).then((response) => {
        let returnData = response.data;
        if (returnData.errno === 0) {
          this.$data.powerEditForm = false;
          this.request();
          this.$data.editCheckedIds = [];
        } else {
          this.$alert(returnData.msg, {
            type: 'error',
            callback: action => {
            }
          })
        }
      })

    },
    // 编辑
    edit (row) {
      console.log(row)
      this.id = row.id;
      this.add.name = row.name;
      this.add.status = row.status.toString();
      this.$data.editRole = true;
    },
    editCancle(){
      this.$data.editRole = false;
    },
    editRoleAccount () {
      let qs = require('querystring')
      setupApi.editRole(qs.stringify(this.add), this.id).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.$data.editRole = false;
          this.$message.success('修改成功！')
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
    },
    status (row) {
      this.id = row.id
      this.add.name = row.name
      this.add.status = row.status === 0 ? 1 : 0
      let qs = require('querystring')
      setupApi.editRole(qs.stringify(this.add), this.id).then((response) => {
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
.permission-tree{
  float:left;
  padding:20px 40px 20px 20px;
  height:260px;
  overflow:auto;
  border:1px solid #EEEEEE;
}

</style>
