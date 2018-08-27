<template>
	<div class="business-list">
		<el-form :inline="true" class="demo-form-inline" size="mini">
			<el-form-item label="门店">
				<el-select v-model="storeId" placeholder="请选门店">
					<el-option v-for="(item,index) in storeList" :key="index" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="时间选择：">
				<el-date-picker v-model="day" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期时间" :picker-options="pickerOptionsSet">
				</el-date-picker>
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
			<el-table-column prop="store_name" label="门店" align="center">
			</el-table-column>
			<el-table-column prop="mdate" label="日期" align="center">
			</el-table-column>
			<el-table-column  label="进店人次（监控/鹰眼）" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.renci}}/{{scope.row.renci_yy}}</span>
        </template>
			</el-table-column>
			<el-table-column  label="进店人数（监控/鹰眼）" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.renshu}}/{{scope.row.renshu_yy}}</span>
        </template>
			</el-table-column>
			<el-table-column label="抓拍率" align="center">
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
			<el-table-column label="操作" align="center" width="210">
				<template slot-scope="scope">
					<div style="display: flex">
            <el-button size="mini" @click="takeIn(scope.row)">进入</el-button>
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
<!--新增-->
    <el-dialog :visible.sync="FormVisible" :title="dialogTitle">
      <el-form ref="form" :model="form" label-width="80px" >

        <el-form-item label="门店">
          <el-select v-model="form.parte" placeholder="请选门店">
            <el-option v-for="(item,index) in storeList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
              @change="changeStartTime"

              :picker-options="pickerOptionsSet"
            ></el-date-picker>
          </el-col>
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
		name: 'eye-data-list',
		data() {
			return {
				storeList: [],
				storeId: '',
				day: '',
				pickerOptionsSet: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e6
					}
				},
        tableData3: [],
        pages:'',
        form:{
          parte:'',
          date1:'',
          desc:''
        },
        FormVisible:false,
        dialogTitle:'',
        isOrReturn:'',
        returnId:'',
        list:{
          m_id:'',
          s_id:'',
          mdate:'',
          page:1,
          page_size:20,
        }
			}
		},
		created: function () {
			let templates = this.$parent;
			templates.navMenu = this.$route.name;
			templates.upperLevelMenu = '';
			this.getPartList();
			this.getList();
		},
		methods: {
			getPartList() {
				let list = {
					'type': 1,
					'parent_id': 1,
				};
				let qs = require('querystring');
				dataCollectApi.getDepartList(qs.stringify(list)).then((response) => {
					this.$data.storeList = response.data.data;
				})
			},
      getList(){
        // let list = {
        //   'm_id': '',
        //   's_id': '',
        //   'mdate':'',
        //   'page':1,
        //   'page_size':20
        // };
        let qs = require('querystring');
        eyeDataApi.monitoyingList(qs.stringify(this.$data.list)).then((response) => {
          this.$data.tableData3 = response.data.data.list;
          this.pages = response.data.data.pagination;
        })
      },
      //分页
      handleCurrentChange(val){
        this.$data.list.page = val;
        this.getList();
      },
      //查询
      checkOut(){
			  console.log('ddd');
			  console.log(this.$data.day)
        console.log(this.TimeOut(this.$data.day/1000,4))
			  this.$data.list.s_id = this.$data.storeId;
			  this.$data.list.mdate = this.TimeOut(this.$data.day/1000,2);
        this.getList();
      },
        //新增
      add(){
        this.$data.FormVisible = true;
        this.$data.dialogTitle = '新增';
        this.$data.isOrReturn = 0;
        this.$data.form.parte = '';
        this.$data.form.date1 = '';
        this.$data.form.desc = '';
        this.$data.returnId='';
      },
      changeStartTime(time){
        console.log(time);
      },
        //新增确认
      onSubmit(){
			//   console.log(this.$data.form.date1/1000);
        // console.log(this.$data.form.parte);
        // console.log(this.$data.form.desc);
        // console.log(this.TimeOut(this.$data.form.date1/1000,4));
        if(this.$data.form.parte === ''){
          this.$message({
            message: '请选择门店',
            type: 'error',
            center: true
          });
        }else{
          if(this.$data.form.date1 === ''){
            this.$message({
              message: '请选择时间',
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
                //创建
                let list = {
                  'm_id': 1,
                  's_id': this.$data.form.parte,
                  'mdate':this.TimeOut(this.$data.form.date1/1000,4),
                  'remark':this.$data.form.desc,
                };
                let qs = require('querystring');
                eyeDataApi.monitoyingCreat(qs.stringify(list)).then((response) => {
                  console.log(response.data.errno)
                  if(response.data.errno === 0){
                    this.$message({
                      message: '创建成功',
                      type: 'success',
                      center: true
                    });
                    this.$data.FormVisible = false;
                    this.getList();
                    //  清空创建数据
                    this.$data.form.parte = '';
                    this.$data.form.date1 = '';
                    this.$data.form.desc = '';
                  }
                })
              }else if(this.$data.isOrReturn === 1){
                console.log(this.$data.form.date1);
                //编辑
                let list = {
                  'id':this.$data.returnId,
                  'm_id': 1,
                  's_id': this.$data.form.parte,
                  'mdate':this.$data.form.date1,
                  'remark':this.$data.form.desc,
                };
                let qs = require('querystring');
                eyeDataApi.monitoyingUpdate(qs.stringify(list)).then((response) => {
                  console.log(response.data.errno)
                  if(response.data.errno === 0){
                    this.$message({
                      message: '编辑成功',
                      type: 'success',
                      center: true
                    });
                    this.$data.FormVisible = false;
                    this.getList();
                    //  清空创建数据
                    this.$data.form.parte = '';
                    this.$data.form.date1 = '';
                    this.$data.form.desc = '';
                    this.$data.returnId='';
                  }
                })
              }
            }
          }
        }

      },
        // 取消
      delet(){
        this.$data.FormVisible = false;
      },
        //再编辑
      rested(val){
        this.$data.FormVisible = true;
        this.$data.dialogTitle = '编辑';
        this.$data.form.parte = val.s_id;
        this.$data.form.date1 = val.mdate;
        this.$data.form.desc = val.remark;
        this.$data.isOrReturn = 1;
        this.$data.returnId = val.id;
      },
        //删除
      deleteThis(val){
			  console.log(val.id)
        let list = {
          'id': val.id,
        };
        let qs = require('querystring');
        eyeDataApi.monitoyingDelete(qs.stringify(list)).then((response) => {
          console.log(response.data.errno)
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
        //进入
      takeIn(val){
        this.$router.replace({name: 'TimeFrameList', params: {id:val.id,partId:val.m_id}})
      },
		}
	}
</script>
<style scoped>
	.addWrap {
		text-align: right;
		margin-bottom: 10px;
	}
	.bottomPage{
		text-align: center;
		margin-top: 20px;
	}
</style>
