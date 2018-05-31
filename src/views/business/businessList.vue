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
            <el-switch v-model="value3"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
    <!-- 新增Form -->
    <el-dialog title="新增商家" :visible.sync="addVisible">
      <el-form label-width="80px">
        <el-form-item label="全称" required>
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="简称" required>
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="域名" required>
          <el-input>
            <template slot="append">.zhijikeji.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注" required>
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'business-list',
  data () {
    return {
      addVisible: false,
      value3: true,
      tableData: [{
        id: '001',
        name: '金梦园'
      }, {
        id: '002',
        name: '湖州金店'
      }, {
        id: '003',
        name: '王小虎'
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
i{
  font-size:24px;
}
</style>