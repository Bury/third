<template>
  <div class="business-list">
    <el-row>
      <el-col style="margin-top: 1rem;margin-left: 2rem">
        <h2>{{routerName}}</h2>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 1rem;margin-bottom: 2rem">
      <el-col :span="10" :offset="12">
        <p>提示：删除功能是删除一些质量较差的图片 同一人的图片可以保留一张或多张</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <button class="btn" @click="alldele()">批量删除</button>
        <button class="btn" @click="takeUp()">识别查找</button>
        <button class="btn" @click="takeUpImage()">上传图片</button>
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
      label="照片"
    >
      <template slot-scope="scope">
        <!--<img src="http://dev-api.cc.ibetwo.com/upload/2018/08/09/1_1_1.jpg" alt="" style="width: 6rem;height: 6rem">-->
        <img  :src="scope.row.avatar" alt="" style="width: 6rem;height: 6rem">
      </template>
    </el-table-column>
      <el-table-column
        label="性别"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gender == 1?'男':'女' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
      >
        <!--<template slot-scope="scope">-->
          <!--<span style="margin-left: 10px">{{ scope.row.f }}</span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column
        label="姿态角度"
      >
        <template slot-scope="scope">
          <p>上下俯仰角度:{{ scope.row.pitch }}</p>
          <p>左右旋转角度:{{ scope.row.yaw }}</p>
          <p>平面旋转角度:{{ scope.row.roll }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="illumination"
        label="光照"
      >
        <!--<template slot-scope="scope">-->
          <!--<span style="margin-left: 10px">{{ scope.row.c }}</span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column prop="blur"
        label="模糊度"
      >
        <!--<template slot-scope="scope">-->
          <!--<span style="margin-left: 10px">{{ scope.row.e }}</span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column
        label="遮挡"
      >
        <template slot-scope="scope">
          <p>左眼遮挡:{{ scope.row.left_eye }}</p>
          <p>右眼遮挡:{{ scope.row.right_eye }}</p>
          <p>左脸颊遮挡:{{ scope.row.left_cheek }}</p>
          <p>右脸颊遮挡:{{ scope.row.right_cheek }}</p>
          <p>鼻子遮挡:{{ scope.row.nose }}</p>
          <p>嘴巴遮挡:{{ scope.row.mouth }}</p>
          <p>下巴遮挡:{{ scope.row.chin_contour }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="脸完整度"
      >
        <template slot-scope="scope" style="text-align: center">
          <span>{{scope.row.completeness == 1 ? '完整' : '溢出'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
      >
        <template slot-scope="scope" style="text-align: center">
          <span>{{scope.row.created_at | date(4)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="FormVisible">
      <el-form :model='formName' ref="formName" label-width="180px" class="demo-ruleForm">
        <el-form-item label="请选择人脸样本查找分组:">
          <el-select v-model="formName.region" placeholder="请选择活动区域">
            <el-option v-for="groupName in groupList" :key="groupName.id" :label="groupName.name"
                       :value="groupName.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel(formName)">取 消</el-button>
        <el-button type="primary" @click="submitForm(formName)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="uploadTitle" :visible.sync="FormUpload">
      <el-form :model='formIamge' ref="formIamge" label-width="180px" class="demo-ruleForm">
        <el-upload
          :action="importFileUrl()"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="getUploadIamge"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelImage(formIamge)">取 消</el-button>
        <el-button type="primary" @click="submitImage(formIamge)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import faceDataApi from '../../api/faceDataTest'
  import storage from '../../utils/storage'
    export default {
        name: "face-sample-manage",
      data(){
          return{
            tableData3: [],
            dialogTitle:'',
            FormVisible:false,
            formName:{
              region:''
            },
            routerId:'',
            routerName:'',
            multipleSelection:[],
            idKeyList:[],
            groupId:'',
            groupList:[],
            uploadTitle:'上传图片',
            FormUpload:false,
            dialogImageUrl: '',
            dialogVisible: false,
            formIamge:{

            },
          }
      },
      created: function () {
        // 刷新时，获取动态数据 设置navmenu
        let templates = this.$parent
        this.$data.routerId = this.$route.params.id;
        this.$data.routerName = this.$route.params.name;
        templates.navMenu = this.$route.name
        templates.upperLevelMenu = ''
        if(this.$route.params.id != undefined){
          this.$data.routerId = this.$route.params.id;
        }else{
          this.$data.routerId = storage.getSessionStorage('groupId');
        }
        if(this.$route.params.name != undefined){
          this.$data.routerName = this.$route.params.name;
        }else{
          this.$data.routerName = storage.getSessionStorage('groupName');
        }
        // console.log(this.$data.routerId);
        // console.log(this.$data.routerName);
        this.List()
      },
      methods:{
        //  图片上传地址
        importFileUrl(){
          return global.LOADUP_IMAGES
        },
        List(){
          let list = {
            'filter[and][][group_id]': this.$data.routerId,
            'filter[and][][device_id][like]':'',
            'disable_pagination': '',
            'page': 1
          }
          let qs = require('querystring')
          faceDataApi.faceGroupList(qs.stringify(list)).then((response) => {
            // console.log(response.data.data);
            this.$data.tableData3 = response.data.data.list;
            // console.log(this.$data.tableData3);
            // this.pages = response.data.data.pagination;
          })
        },
        handleSelectionChange(val) {
          this.$data.idKeyList =[];
          this.$data.multipleSelection = val;
          // console.log(this.multipleSelection);
          // console.log(this.multipleSelection.length)
          for(let i = 0; this.$data.multipleSelection.length > 0; i ++){
            // let pushId = this.$data.multipleSelection[0].id;
            this.$data.groupId = this.$data.multipleSelection[0].group_id;
            this.$data.idKeyList.push(this.$data.multipleSelection[i].id);
            // console.log(this.$data.idKeyList)
          }
        },
        //批量删除
        alldele(){
          if(this.$data.multipleSelection == 0){
            this.$message({
              message: '请最少选择一组数据',
              type: 'error',
              center: true
            });
          }else{
            let deleArry = this.$data.idKeyList.join(',');
            let list = {
              'ids':deleArry,
            };
            let qs = require('querystring');
            this.$confirm("确认删除？","提示",{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'wraning'
            }).then(() => {
              faceDataApi.delteeFaceLit(qs.stringify(list)).then((response) => {
              console.log(response.data);
              if(response.data.errno === 0){
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  center: true
                });

                this.List();
              }
              })
            }).catch(() =>{

            })


          }
        },
        //识别查找
        takeUp(){
          if(this.$data.multipleSelection == 0){
            this.$message({
              message: '请最少选择一组数据',
              type: 'error',
              center: true
            });
          }else{
            this.$data.dialogTitle = '识别查找';
            this.$data.FormVisible = true;
            console.log(this.$data.groupId);
            let list = {
              'now_id':this.$data.groupId,
            }
            let qs = require('querystring')
            faceDataApi.faceSearch(qs.stringify(list)).then((response) => {
              console.log(response.data.data);
              this.$data.groupList = response.data.data
            })
          }
        },
        //识别查询取消
        cancel(){
          this.$data.FormVisible = false;
          this.$data.groupList = [];
        },
        //删除
        handleDelete(value){
          this.$confirm("确认删除？","提示",{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'wraning'
          }).then(() => {
            let list = {
             'ids':value.id
            };
            let qs = require('querystring');
            faceDataApi.delteeFaceLit(qs.stringify(list)).then((response) => {
            if(response.data.errno === 0){
              this.$message({
                message: '删除成功',
                type: 'success',
                center: true
              });
              this.List();
            };
            })
          }).catch(() => {

          })


        },
        //选取识别，确认查看
        submitForm(){
          console.log(this.$data.formName.region);
          if(this.$data.formName.region == ''){
            this.$message({
              message: '请最少选择一组数据',
              type: 'error',
              center: true
            });
          }else{
            let deleArrys = this.$data.idKeyList.join(',');
            console.log(deleArrys);
            let list = {
              'ids':deleArrys,
              'group_id':this.$data.formName.region
            }
            let qs = require('querystring')
            faceDataApi.faceSearchSure(qs.stringify(list)).then((response) => {
              console.log(response.data.data);
              if(response.data.errno == 0){
                console.log(response.data.data.insert_id);
                let id = response.data.data.insert_id
                this.$router.replace({name: 'RecognitionResult', params: {id:id}})
              }
            })

          }

        },
        //上传图片
        takeUpImage(){
          this.$data.FormUpload = true;
        },
        //取消
        cancelImage(){
          this.$data.FormUpload = false;
        },
        //上传图片成功回调
        getUploadIamge(response, file, fileList){
          console.log(response);
          console.log(file);
          console.log(fileList);
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
      //  确认上传
        submitImage(){

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
</style>
