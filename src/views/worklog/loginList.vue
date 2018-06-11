<!-- 登录日志 -->
<template>
  <div class="login-list">
    <div class="search">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="时间">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" v-model="search.startTime" placeholder="选择日期" style="width: 140px"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" v-model="search.endTime" placeholder="选择日期" style="width: 140px"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="IP">
          <el-input v-model="search.ip" style="width: 140px"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="search.account" style="width: 140px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="searchList"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="actor_name" label="账号"></el-table-column>
        <el-table-column prop="actor_ip" label="IP"></el-table-column>
        <el-table-column prop="msg" label="状态"></el-table-column>
        <el-table-column label="登录时间">
          <template slot-scope="scope" v-if="scope.row.created_at">
            {{scope.row.created_at | date(2)}}
          </template>
        </el-table-column>
      </el-table>
      <div class="pages" v-if="pages.pageCount > 0">
        <el-pagination background layout="prev, pager, next" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import worklogApi from '../../api/worklog'
import * as utils from '../../utils/index'

export default {
  name: 'login-list',
  data () {
    return {
      tableData: [],
      pages: {},
      search: {
        startTime: '',
        endTime: '',
        ip: '',
        account: ''
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
      worklogApi.loginList().then((response) => {
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
    searchList () {
      let list = {
        'filter[and][][created_at][>=]': this.search.startTime ? utils.getDateTime(this.search.startTime) : '',
        'filter[and][][created_at][<=]': this.search.endTime ? utils.getDateTime(this.search.endTime) : '',
        'filter[and][][actor_name][like]': this.search.account,
        'filter[and][][actor_ip][like]': this.search.ip
      }
      let qs = require('querystring')
      worklogApi.loginList(qs.stringify(list)).then((response) => {
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