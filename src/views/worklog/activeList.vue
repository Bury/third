<!-- 操作日志 -->
<template>
  <div class="active">
    <div class="search">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="时间">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" placeholder="选择日期" v-model="search.startTime" style="width: 140px"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" placeholder="选择日期" v-model="search.endTime" style="width: 140px"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="操作关键词">
          <el-input style="width: 140px" v-model="search.text"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input style="width: 140px" v-model="search.account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="request"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="actor_name" label="账号"></el-table-column>
        <el-table-column prop="msg" label="操作"></el-table-column>
        <el-table-column label="登录时间">
          <template slot-scope="scope" v-if="scope.row.created_at">
            {{scope.row.created_at | date(2)}}
          </template>
        </el-table-column>
      </el-table>
      <div class="pages" v-if="pages.pageCount > 0">
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import worklogApi from '../../api/worklog'
import * as utils from '../../utils/index'

export default {
  name: 'active',
  data () {
    return {
       tableData: [],
       pages: {},
       search: {
         startTime: '',
         endTime: '',
         text: '',
         account: ''
       },
       currentPage: '1'
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
        'filter[and][][created_at][>=]': this.search.startTime ? utils.getDateTime(this.search.startTime) : '',
        'filter[and][][created_at][<=]': this.search.endTime ? utils.getDateTime(this.search.endTime) : '',
        'filter[and][][actor_name][like]': this.search.account,
        'filter[and][][actor_ip][like]': this.search.text,
        'page': this.currentPage
      }
      let qs = require('querystring')
      worklogApi.opList(qs.stringify(list)).then((response) => {
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