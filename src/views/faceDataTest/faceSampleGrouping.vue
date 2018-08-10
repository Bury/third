<template>
  <div class="business-list">
    <el-row>
      <el-col>
        <button class="btn" @click="add()">新建</button>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      border
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
      >
      </el-table-column>
      <el-table-column prop="id"
        label="序号"
        >
        <!--<template slot-scope="scope">-->
          <!--<span style="margin-left: 10px">{{ scope.row.num }}</span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        >
        <!--<template slot-scope="scope" style="text-align: center">-->
          <!--<span>{{scope.row.name}}</span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column
        prop="updated_at"
        label="摄像头连接操作"
        show-overflow-tooltip>
        <template slot-scope="scope" style="text-align: center">
          <!--<p>设备编号: 1231321321</p>-->
          <button class="btn" v-show="scope.row.is_link == 0" @click="isTakeUp(scope.row)">断开链接</button>
          <button class="btns" v-show="scope.row.is_link == 1" @click="isTakeDown(scope.row)">选择接入</button>
        </template>
      </el-table-column>
      <el-table-column
      prop=""
      label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="manage(scope.row)">管理</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages" v-if="pages.pageCount > 0">
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
      </el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="FormVisible">
      <el-form :model='formName' ref="formName" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name" >
          <el-input v-model="formName.name" class="listWidth"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel(formName)">取 消</el-button>
        <el-button type="primary" @click="submitForm(formName)">确 定</el-button>
      </div>
    </el-dialog>

    <!--禁用提醒框-->
    <el-dialog title="提醒" :visible.sync="AreIsSure">
      <el-form label-width="150px" class="demo-ruleForm">
        <p>您确认要断开此连接?</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noSure()">取 消</el-button>
        <el-button type="primary" @click="isSure()">确 定</el-button>
      </div>
    </el-dialog>
    <!--启用提醒-->
    <el-dialog title="提醒" :visible.sync="AreIsSureUp">
      <el-form label-width="150px" class="demo-ruleForm">
        <p>您确认要打开此连接?</p>
        <p>接入摄像头后将自动接入上传的图片</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noSureUp()">取 消</el-button>
        <el-button type="primary" @click="isSureUP()">确 定</el-button>
      </div>
    </el-dialog>
    <!--删除提醒框-->
    <el-dialog title="提醒" :visible.sync="AreIsSureDele">
      <el-form label-width="150px" class="demo-ruleForm">
        <p>您确认要删除整个分组下的所有数据?</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noSureDele()">取 消</el-button>
        <el-button type="primary" @click="isSureDele()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import faceDataApi from '../../api/faceDataTest'
  import storage from '../../utils/storage'
    export default {
        name: "face-sample-grouping",
      data(){
        return {
          tableData3: [],
          multipleSelection: [],
          dialogTitle:'',
          FormVisible:false,
          AreIsSure:false,
          AreIsSureId:'',
          isOldOrNew:'',
          handleEditId:'',
          handleEditIsLink:'',
          AreIsSureDele:false,
          handleDeleteId:'',
          AreIsSureUp:false,
          isTakeDownId:'',
          pages:'',
          formName:{
            name:'',
          },
          rules:{
            name:[
              {required: true, message: '分组名称不能重复', trigger: 'blur'},
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
            ]
          },
        }
      },
      created: function () {
        // 刷新时，获取动态数据 设置navmenu
        let templates = this.$parent
        templates.navMenu = this.$route.name
        templates.upperLevelMenu = ''
        this.faceListAll()

      },
      methods:{
          //列表
          faceListAll(){
            let list = {
              'filter[or][][name][like]': '',
              'disable_pagination': '',
              'page': 1
            }
            let qs = require('querystring')
            faceDataApi.faceList(qs.stringify(list)).then((response) => {
              console.log(response.data.data);
              this.$data.tableData3 = response.data.data.list;
              console.log(this.$data.tableData3);
              this.pages = response.data.data.pagination;
            })
          },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //点击断开连接
        isTakeUp(value){
          this.$data.AreIsSure = true;
          this.$data.AreIsSureId = value.id;
        },
        //确认断开连接
        isSure(){
          let list = {
            'id': this.$data.AreIsSureId,
            'is_link':1
          };
          let qs = require('querystring')
          faceDataApi.deviceLink(qs.stringify(list)).then((response) => {
            console.log(response.data.errno);
            if(response.data.errno === 0){
              this.$message({
                message: '断开连接成功',
                type: 'success',
                center: true
              });
              this.$data.AreIsSure = false;
              this.faceListAll();
            }
          })
        },
        //取消断开连接操作
        noSure(){
          this.$data.AreIsSure = false;
        },
        //连接确认
        isTakeDown(value){
          this.$data.AreIsSureUp = true;
          this.$data.isTakeDownId = value.id;
        },
        //连接确认取消
        noSureUp(){
          this.$data.AreIsSureUp = false;
        },
        //连接确认确认
        isSureUP(){
            console.log(this.$data.isTakeDownId)
          let list = {
            'id': this.$data.isTakeDownId,
            'is_link':0
          };
          let qs = require('querystring')
          faceDataApi.deviceLink(qs.stringify(list)).then((response) => {
            console.log(response.data.errno);
            if(response.data.errno === 0){
              this.$message({
                message: '连接成功',
                type: 'success',
                center: true
              });
              this.$data.AreIsSureUp = false;
              this.faceListAll();
            }
          })
        },
        //新增
        add(){
          this.$data.FormVisible = true;
          this.$data.dialogTitle = '新增';
          this.$data.isOldOrNew = 1;
        },
        //编辑
        handleEdit(value){
          this.$data.FormVisible = true;
          this.$data.dialogTitle = '编辑';
          this.$data.formName.name = value.name;
          this.$data.isOldOrNew = 2;
          this.$data.handleEditId = value.id;
          this.$data.handleEditIsLink= value.is_link;
        },
        //取消编辑
        cancel(){
          this.$data.FormVisible = false;
          this.$data.formName = {};
        },
        //新增确认
        submitForm(value){
            console.log(value.name);
          let list = {
            'name': value.name,
          };
          let lists ={
            'name': value.name,
            'id':this.$data.handleEditId,
            'remark':'',
            'is_link':this.$data.handleEditIsLink
          }
          if(this.$data.isOldOrNew == 1){
            console.log('新增');
            let qs = require('querystring')
            faceDataApi.createANew(qs.stringify(list)).then((response) => {
              console.log(response.data.errno);
              if(response.data.errno === 0){
                this.$message({
                  message: '新建成功',
                  type: 'success',
                  center: true
                });
                this.$data.FormVisible = false;
                this.faceListAll();
                this.$data.formName = {};
              }
            })
          }else if(this.$data.isOldOrNew == 2){
            console.log('编辑');
            let qs = require('querystring')
            faceDataApi.createAUpdate(qs.stringify(lists)).then((response) => {
              console.log(response.data.errno);
              if(response.data.errno === 0){
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  center: true
                });
                this.$data.FormVisible = false;
                this.faceListAll();
                this.$data.formName = {};
              }
            })
          }

        },
        //删除
        handleDelete(value){
          this.$data.AreIsSureDele = true;
          this.$data.handleDeleteId = value.id;
        },
        //确定删除
        isSureDele(){
          let list = {
            'id':this.$data.handleDeleteId ,
          };
          let qs = require('querystring')
          faceDataApi.deleteThis(qs.stringify(list)).then((response) => {
            console.log(response.data.errno);
            if(response.data.errno === 0){
              this.$message({
                message: '删除成功',
                type: 'success',
                center: true
              });
              this.$data.AreIsSureDele = false;
              this.faceListAll();
            }
          })
        },
        //取消删除
        noSureDele(){
          this.$data.AreIsSureDele = false;
        },
        //管理
        manage(value){
          storage.setSessionStorage('groupName', value.name)
          storage.setSessionStorage('groupId', value.id)
          this.$router.replace({name: 'FaceSampleManage', params: {id: value.id,name:value.name}})
        },
        //分页
        handleCurrentChange(val){
          this.currentPage = val;
          this.faceListAll();
        }
      }
    }
</script>

<style scoped>
  .btn{
    float: right;
    margin-right: 5rem;
    margin-bottom: 1rem;
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: #4BC076;
    color: white;
  }
  .btn:hover{
    background: #4DB076;
    color: #fff!important;
  }
  .btns{
    float: right;
    margin-right: 5rem;
    margin-bottom: 1rem;
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: red;
    color: white;
  }
  .btns:hover{
    background: #bd2c00;
    color: #fff!important;
  }
  .pages{
    text-align:center;
    margin-top:30px;
  }
</style>
