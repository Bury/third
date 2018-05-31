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
        <el-table-column prop="name" label="账号"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="time" label="创建时间"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="value3"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">密码重置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
    <!-- 新增账号 -->
    <el-dialog title="新增账号" :visible.sync="addAccount">
      <el-form label-width="80px">
        <el-form-item label="账号" required>
          <el-input style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="手机" required>
          <el-input style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="角色" required>
          <el-select placeholder="请选择商家" style="width:400px;">
            <el-option label="管理员" value="shanghai"></el-option>
            <el-option label="运营部" value="beijing"></el-option>
            <el-option label="市场部" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" required>
          <el-radio-group>
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAccount = false">取 消</el-button>
        <el-button type="primary" @click="addAccount = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      addAccount: false,
      tableData: [{
        id: '001',
        name: 'admin',
        role: '超级管理员',
        phone: '18078676767',
        time: '2018-1-1'
      }, {
        id: '002',
        name: '运营01',
        role: '运营',
        phone: '18078676767',
        time: '2018-1-1'
      }, {
        id: '003',
        name: '运营02',
        role: '运营',
        phone: '18078676767',
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