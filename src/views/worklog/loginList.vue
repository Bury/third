<!-- 登录日志 -->
<template>
  <div class="login-list">
    <div class="search">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="时间">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" placeholder="选择日期" style="width: 120px"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" placeholder="选择日期" style="width: 120px"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="IP">
          <el-input style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="账号"></el-table-column>
        <el-table-column prop="ip" label="IP"></el-table-column>
        <el-table-column prop="active" label="状态"></el-table-column>
        <el-table-column prop="time" label="登录时间"></el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-list',
  data () {
    return {
      tableData: [{
        id: '001',
        name: 'admin',
        ip: '36.24.35.126',
        active: '登录成功',
        time: '2018.03.06 12:35:12'
      }, {
        id: '002',
        name: '运营',
        ip: '36.24.35.126',
        active: '登录成功',
        time: '2018.03.06 12:35:12'
      }, {
        id: '003',
        name: '运营',
        ip: '36.24.35.126',
        active: '登录成功',
        time: '2018.03.06 12:35:12'
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
.line{
  text-align:center;
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