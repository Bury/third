<!-- 商家模块 -->
<template>
  <div class="modules">
    <el-row :gutter="20">
      <el-col :span="6" v-for="list in moduleList" :key="list.id">
        <el-card  class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
              <span>{{list.name}}</span>
              <el-switch style="float: right; padding: 3px 0"
                inactive-value = "0"
                active-value="1"
                :value="`${list.status}`"
                @change="status(list.id, list.status)">
              </el-switch>
            </div>
            <div class="text item">
              
              有效期剩余：<span class="day">{{list.days}}天</span> <!--<i class="el-icon-circle-plus"></i>-->
              <el-button style="float: right; padding: 3px 0" type="text">权限设置</el-button>
              <el-form style="margin-top:20px">
                <el-form-item label="增加有效期：">
                  <el-select placeholder="请选择" style="width:125px" v-model="days" @change="addTime(list.id)">
                    <el-option label="1个月" value="1m"></el-option>
                    <el-option label="2个月" value="2m"></el-option>
                    <el-option label="3个月" value="3m"></el-option>
                    <el-option label="4个月" value="4m"></el-option>
                    <el-option label="5个月" value="5m"></el-option>
                    <el-option label="6个月" value="6m"></el-option>
                    <el-option label="7个月" value="7m"></el-option>
                    <el-option label="8个月" value="8m"></el-option>
                    <el-option label="9个月" value="9m"></el-option>
                    <el-option label="10个月" value="10m"></el-option>
                    <el-option label="11个月" value="111m"></el-option>
                    <el-option label="1年" value="1y"></el-option>
                    <el-option label="2年" value="2y"></el-option>
                    <el-option label="3年" value="3y"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import businessApi from '../../api/business'
import storage from '../../utils/storage'

export default {
  name: 'modules',
  data () {
    return {
      moduleList: {},
      list: {
        mid: ''
      },
      days: ''
    }
  },
  created: function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.name = storage.getSessionStorage('name')
    templates.upperLevelMenu = ''

    this.list.mid = this.$route.params.id
    this.request()

  },
  mounted: function () {
  },
  methods: {
    request () {
      let qs = require('querystring')
      businessApi.getSubsystem(qs.stringify(this.list)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.moduleList = returnData.data.subsystem_list
        } else {
          this.$alert(returnData.msg, {
            type: 'error',
            callback: action => {
            }
          })
        }
      })
    },
    // 增加有效期
    addTime (moduleId) {
      let list = {
        mid: this.list.mid,
        id: moduleId,
        days: this.days
      }
      let qs = require('querystring')
      businessApi.updateDay(qs.stringify(list)).then((response) => {
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
    // 更改状态
    status (moduleId, status) {
      let list = {
        mid: this.list.mid,
        id: moduleId,
        status: status === 0 ? 1 : 0
      }
      let qs = require('querystring')
      businessApi.updateStatus(qs.stringify(list)).then((response) => {
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
.success{
  background:#67c23a;
}
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
  color: #ccc;
  font-size:22px;
  vertical-align: middle;
}
.item .day{
  color:#f00;
}
</style>