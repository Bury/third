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
            <el-switch v-model="value3"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">分配权限</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
    <!-- 新增角色 -->
    <el-dialog title="新增角色" :visible.sync="addRole">
      <el-form label-width="80px">
        <el-form-item label="角色名称" required>
          <el-input style="width:400px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRole = false">取 消</el-button>
        <el-button type="primary" @click="addRole = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      addRole: false,
      tableData: [{
        id: '001',
        name: '技术部',
        time: '2018-1-1'
      }, {
        id: '002',
        name: '运营部',
        time: '2018-1-1'
      }, {
        id: '003',
        name: '商家部',
        time: '2018-1-1'
      }]
    }
  },
  created: function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.upperLevelMenu = ''
  },
  mounted: function () {
  },
  methods: {
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