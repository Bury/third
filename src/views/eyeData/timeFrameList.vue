<template>
	<div class="business-list">
    <el-form :inline="true" class="demo-form-inline" size="mini">
      <el-form-item label="安装位置">
        <el-select v-model="placeId" placeholder="安装位置">
          <el-option v-for="(item,index) in locationList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkOut">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="addWrap">
      <el-button type="primary" size="small" @click="add()">新增</el-button>
    </div>
    <el-table ref="multipleTable"
              :data="tableData3"
              border
              tooltip-effect="dark"
              style="width: 100%;text-align: center"
    >
      <el-table-column prop="id" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="device_name" label="安装位置" align="center">
      </el-table-column>
      <el-table-column prop="device_cid" label="设备编号" align="center" width="120">
      </el-table-column>
      <el-table-column  label="开始时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.st_time | date(8)}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="结束时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.ed_time | date(8)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="进店人次（监控/鹰眼）" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.renci}}/{{scope.row.renci_yy}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="renshu" label="进店人数（监控/鹰眼）" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.renshu}}/{{scope.row.renshu_yy}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="抓拍率" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.zhuapai_ratio}}%</span>
        </template>
      </el-table-column>
      <el-table-column  label="识别率" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.shibie_ratio}}%</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.created_at | date(4)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <div style="display: flex">
            <el-button size="mini" @click="rested(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteThis(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages" v-if="pages.pageCount > 0">
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
      </el-pagination>
    </div>

    <el-dialog :visible.sync="FormVisible" :title="dialogTitle">
      <el-form ref="form" :model="form" label-width="80px" >

        <el-form-item label="安装位置">
          <el-select v-model="form.place" placeholder="请选安装位置" @change="getSysBNum(form.place)">
            <el-option v-for="(item,index) in locationList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备编号">
          <p>{{deviNum}}</p>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-col :span="11">
            <el-time-picker
              type="date"
              placeholder="选择开始时间"
              v-model="form.date1"
              style="width: 100%;"

            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="11">
            <el-time-picker
              type="date"
              placeholder="选择结束"
              v-model="form.date2"
              style="width: 100%;"

            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="进店人次">
          <el-input v-model="form.personTime"></el-input>
        </el-form-item>
        <el-form-item label="进店人数">
          <el-input v-model="form.personNum"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float: right">
            <el-button @click="delet">取消</el-button>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
	</div>
</template>

<script>
  import dataCollectApi from '@/api/dataCollect'
  import eyeDataApi from '@/api/eyeData'
export default {
  name: 'time-frame-list',
  data () {
    return {
      tableData3: [],
      placeId:'',
      FormVisible:false,
      dialogTitle:'',
      locationList:'',
      routerId:'',
      pages:'',
      form:{
        place:'',
        date1:'',
        date2:'',
        personTime:'',
        personNum:'',
        desc:''
      },
      isOrReturn:'',
      returnId:'',
      deviNum:'',
      // list:{
      //   monitor_id:routerId,
      //   d_id:'',
      //   page:1,
      //   page_size:20
      // },
    }
  },
  created: function () {
    this.$data.routerId = this.$route.params.id;
    this.$data.pertId = this.$route.params.partId;
	  let templates = this.$parent
	  templates.navMenu = this.$route.name
	  templates.upperLevelMenu = '';
	  console.log(this.$data.routerId)
    console.log(this.$data.pertId)
    this.getList();
    this.GETstoreId();
  },
  methods: {
    //安装位置
    GETstoreId(){
      let list = {
        'type': 2,
        'parent_id': this.$data.pertId,
      }
      let qs = require('querystring')
      dataCollectApi.getDepartList(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.locationList = response.data.data;
      })
    },
    getList(){
      let list = {
        'monitor_id': this.$data.routerId,
        'd_id': '',
        'page':1,
        'page_size':20
      };
      let qs = require('querystring');
      eyeDataApi.monitoyingTimeList(qs.stringify(list)).then((response) => {
        this.$data.tableData3 = response.data.data.list;
        this.pages = response.data.data.pagination;
      })
    },
    //分页
    handleCurrentChange(val){
      let list = {
        'monitor_id': this.$data.routerId,
        'd_id': this.$data.placeId,
        'page':val,
        'page_size':20
      };
      let qs = require('querystring');
      eyeDataApi.monitoyingTimeList(qs.stringify(list)).then((response) => {
        this.$data.tableData3 = response.data.data.list;
        this.pages = response.data.data.pagination;
      })
    },
    //联动获取设备编号
    getSysBNum(val){
      // console.log(val);
      let list = {
        'type': 2,
        'id': val,
      };
      let qs = require('querystring');
      eyeDataApi.monitoyingSDetail(qs.stringify(list)).then((response) => {
        // console.log(response.data.data.device_cid);
        this.$data.deviNum = response.data.data.device_cid;
      })
    },
    //新建
    add(){
      this.$data.FormVisible = true;
      this.$data.dialogTitle = '新建';
      this.$data.isOrReturn = 0;
      this.$data.form.place='';
      this.$data.form.date1 = '';
      this.$data.form.date2 = '';
      this.$data.form.personTime = '';
      this.$data.form.personNum = '';
      this.$data.form.desc = '';
      this.$data.deviNum = '';
    },
  //  创建确认
    onSubmit(){
      if(this.$data.form.place === ''){
        this.$message({
          message: '请选择安装位置',
          type: 'error',
          center: true
        });
      }else{
        if(this.$data.form.date1 === ''){
          this.$message({
            message: '请选择开始时间',
            type: 'error',
            center: true
          });
        }else{
          if(this.$data.form.date2 === ''){
            this.$message({
              message: '请选择结束时间',
              type: 'error',
              center: true
            });
          }else{
            if(this.$data.form.personTime === ''){
              this.$message({
                message: '请填写人次',
                type: 'error',
                center: true
              });
            }else{
              if(this.$data.form.personNum === ''){
                this.$message({
                  message: '请填写人数',
                  type: 'error',
                  center: true
                });
              }else{
                if(this.$data.form.desc === ''){
                  this.$message({
                    message: '请填写备注',
                    type: 'error',
                    center: true
                  });
                }else{
                  if(this.$data.isOrReturn === 0){
                  //  新建
                    let list = {
                      'monitor_id': this.$data.routerId,
                      'd_id': this.$data.form.place,
                      'st_time':this.$data.form.date1/1000,
                      'ed_time':this.$data.form.date2/1000,
                      'renci':this.$data.form.personTime,
                      'renshu':this.$data.form.personNum,
                      'remark':this.$data.form.desc
                    };
                    let qs = require('querystring');
                    eyeDataApi.monitoyingTimeCreate(qs.stringify(list)).then((response) => {
                      if(response.data.errno === 0){
                        this.$message({
                          message: '创建成功',
                          type: 'success',
                          center: true
                        });
                        this.getList();
                        this.$data.FormVisible = false;
                      //  保存清空数据
                        this.$data.form.place='';
                        this.$data.form.date1 = '';
                        this.$data.form.date2 = '';
                        this.$data.form.personTime = '';
                        this.$data.form.personNum = '';
                        this.$data.form.desc = '';
                        this.$data.deviNum = '';
                      }
                    })
                  }else if(this.$data.isOrReturn === 1){
                  //  在编辑
                    let list = {
                      'id':this.$data.returnId,
                      'monitor_id': this.$data.routerId,
                      'd_id': this.$data.form.place,
                      'st_time':this.$data.form.date1,
                      'ed_time':this.$data.form.date2,
                      'renci':this.$data.form.personTime,
                      'renshu':this.$data.form.personNum,
                      'remark':this.$data.form.desc
                    };
                    let qs = require('querystring');
                    eyeDataApi.monitoyingTimeUpdate(qs.stringify(list)).then((response) => {
                      if(response.data.errno === 0){
                        this.$message({
                          message: '编辑成功',
                          type: 'success',
                          center: true
                        });
                        this.$data.FormVisible = false;
                        this.getList();
                        //  保存清空数据
                        this.$data.form.place='';
                        this.$data.form.date1 = '';
                        this.$data.form.date2 = '';
                        this.$data.form.personTime = '';
                        this.$data.form.personNum = '';
                        this.$data.form.desc = '';
                        this.$data.deviNum = '';
                      }
                    })
                  }
                }
              }
            }
          }
        }
      }
    },
  //  创建取消
    delet(){
      this.$data.FormVisible = false;
    },
  //  删除
    deleteThis(val){
      let list = {
        'id': val.id,
      };
      let qs = require('querystring');
      eyeDataApi.monitoyingTimeDelete(qs.stringify(list)).then((response) => {
        if(response.data.errno === 0){
          this.$message({
            message: '删除成功',
            type: 'success',
            center: true
          });
          this.getList();
        }
      })
    },
  //  编辑
    rested(val){
      this.$data.FormVisible = true;
      this.$data.dialogTitle = '编辑';
      this.$data.returnId = val.id;
      this.$data.isOrReturn = 1;
      this.$data.form.place=val.d_id;
      this.$data.form.date1 = val.st_time;
      this.$data.form.date2 = val.ed_time;
      this.$data.form.personTime = val.renci;
      this.$data.form.personNum = val.renshu;
      this.$data.form.desc = val.remark;
      this.$data.deviNum = val.device_cid;
    },
  //  查询
    checkOut(){
      // this.$data.list.d_id = this.$data.placeId;
      let list = {
        'monitor_id': this.$data.routerId,
        'd_id': this.$data.placeId,
        'page':1,
        'page_size':20
      };
      let qs = require('querystring');
      eyeDataApi.monitoyingTimeList(qs.stringify(list)).then((response) => {
        this.$data.tableData3 = response.data.data.list;
        this.pages = response.data.data.pagination;
      })
    },
  }
}
</script>
<style scoped>
  .addWrap {
    text-align: right;
    margin-bottom: 10px;
  }
</style>
