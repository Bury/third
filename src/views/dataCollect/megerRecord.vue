<template>
  <div class="business-list">
    <el-table
      ref="table"
      :data="tableData3"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
      >
      </el-table-column>
      <el-table-column
        label="序号" prop="id"
      >
        <!--<template slot-scope="scope">{{ scope.row.num }}</template>-->
      </el-table-column>
      <!--<el-table-column-->
        <!--label="来客编号"-->
      <!--&gt;-->
        <!--<template slot-scope="scope">{{ scope.row.customer_id }}</template>-->
      <!--</el-table-column>-->
      <el-table-column
        label="照片"
      >
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="width: 6rem;height: 6rem">
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
      >
        <template slot-scope="scope">
          <span :class="{getRed:scope.row.gender_mark === 1}">{{ scope.row.gender == 1 ? '男' : '女' }}</span>
          <!--<i class="el-icon-edit-outline" style="font-size: 1.2rem" @click="takeError(scope.row,0)"></i>-->
        </template>

      </el-table-column>
      <el-table-column
        label="年龄"
      >
        <template slot-scope="scope">
          <span :class="{getRed:scope.row.age_mark === 1}">{{ scope.row.age }}</span>
          <!--<i class="el-icon-edit-outline" style="font-size: 1.2rem" @click="takeError(scope.row,1)"></i>-->
        </template>
      </el-table-column>
      <el-table-column
        label="姿态角度"
      >
        <template slot-scope="scope">
          <p :class="{getInYellow:scope.row.pitch_d === 1}">上下俯仰角度:{{ scope.row.pitch }}</p>
          <p :class="{getInYellow:scope.row.pitch_d === 1}">左右旋转角度:{{ scope.row.yaw }}</p>
          <p :class="{getInYellow:scope.row.pitch_d === 1}">平面旋转角度:{{ scope.row.roll }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="光照"
      >
        <template slot-scope="scope" >
          <span :class="{getInYellow:scope.row.illumination_d === 1}">{{scope.row.illumination}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="模糊度"
      >
        <template slot-scope="scope">
          <span :class="{getInYellow:scope.row.blur_d === 1}">{{scope.row.blur}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="遮挡"
      >
        <template slot-scope="scope">
          <p :class="{getInYellow:scope.row.occlusion_d === 1}">左眼遮挡:{{ scope.row.left_eye }}</p>
          <p :class="{getInYellow:scope.row.occlusion_d === 1}">右眼遮挡:{{ scope.row.right_eye }}</p>
          <p :class="{getInYellow:scope.row.occlusion_d === 1}">左脸颊遮挡:{{ scope.row.left_cheek }}</p>
          <p :class="{getInYellow:scope.row.occlusion_d === 1}">右脸颊遮挡:{{ scope.row.right_cheek }}</p>
          <p :class="{getInYellow:scope.row.occlusion_d === 1}">鼻子遮挡:{{ scope.row.nose }}</p>
          <p :class="{getInYellow:scope.row.occlusion_d === 1}">嘴巴遮挡:{{ scope.row.mouth }}</p>
          <p :class="{getInYellow:scope.row.occlusion_d === 1}">下巴遮挡:{{ scope.row.chin_contour }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="脸完整度"
      >
        <template slot-scope="scope" style="text-align: center">
          <span :class="{getInYellow:scope.row.completeness_d === 1}">{{scope.row.completeness == 1 ? '完整' : '溢出'}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--label="识别结果"-->
      <!--&gt;-->
        <!--<template slot-scope="scope">-->
          <!--<img :src="scope.row.customer_avatar" alt="" style="width: 6rem;height: 6rem">-->
          <!--<span :class="{getRed:scope.row.merge_id === 1}">{{scope.row.score}}%相似</span>-->
          <!--<i class="el-icon-edit-outline" style="font-size: 1.2rem" @click="takeError(scope.row,2)"></i>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{scope.row.created_at | date(4)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template slot-scope="scope" >
          <div style="display: flex;flex-direction: column">
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row)">移除合并项</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col style="text-align: center">
        <button class="btn" @click="back()" style="margin-right: 2rem">返回</button>
        <button class="btn" @click="add()">保存</button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as utils from '@/utils/index'
  import dataCollectApi from '@/api/dataCollect'
    export default {
        name: "meger-record",
      data(){
        return{
          routerId:'',
          tableData3: [],
          checkList:[],
          checkId:[],
          checkArr:[],
          groupId:[],
          multipleSelection: [],
          index:'',
        }
      },
      created:function () {
        // 刷新时，获取动态数据 设置navmenu
        let templates = this.$parent
        templates.navMenu = this.$route.name
        templates.upperLevelMenu = ''
        this.$data.routerId = this.$route.params.id;
        console.log(this.$data.routerId);
        this.mergeList();
        this.$data.checkArr = this.$data.routerId.split(',');
        console.log(this.$data.checkArr);
      },
      methods:{
        mergeList(){
          let list = {
            'id': this.$data.routerId,
          }
          let qs = require('querystring')
          dataCollectApi.mergeDetail(qs.stringify(list)).then((response) => {
            console.log(response.data.data);
            if(response.data.errno === -1){
              this.$message({
                message: '暂无合并记录',
                type: 'error',
                center: true
              });
            }else{
              this.$data.tableData3 = response.data.data;
              console.log(this.$data.routerId)
              for (let i = 0; i < this.$data.tableData3.length;i++) {
                if (this.$data.tableData3[i].id === this.$data.tableData3[0].id) {
                  this.$data.index = i;
                  break;
                }
              }
              console.log(this.$data.index)
              console.log(this.tableData3[1])

              this.$nextTick(function(){
                this.checked();//每次更新了数据，触发这个函数即可。
              })
            }
          })
        },
        checked(){
          //首先el-table添加ref="table"引用标识
          this.$refs.table.toggleRowSelection(this.tableData3[this.$data.index],true);
        },
        handleSelectionChange(val){
          console.log(val)
          this.$data.checkList = val;
          console.log(this.$data.checkList[0].id);
          this.$data.checkId.push(this.$data.checkList[0].id);
          console.log(this.$data.checkId)
        },
        add(){
          for(var i=0;i<this.$data.checkId.length;i++){
            for(var j=0;j<this.$data.checkArr.length;j++){
              if(this.$data.checkArr[j]==this.$data.checkId[i]){
                this.$data.checkArr.splice(j,1);
                j--;
              }
            }
          }
          console.log(this.$data.checkArr);
          let lastArry = this.$data.checkArr.join(',');
          console.log(lastArry);
          if(this.$data.checkList.length == 1){
            console.log('选择完成');
            let list = {
              'master_id':this.$data.checkId,
              'slave_ids':lastArry
            }
            let qs = require('querystring')
            dataCollectApi.sureMerge(qs.stringify(list)).then((response) => {
              console.log(response.data.errno);
              if(response.data.errno === 0){
                this.$message({
                  message: '合并成功',
                  type: 'success',
                  center: true
                });
              }
              this.$router.replace({name: 'DataList'})
            })
          }else{
            this.$message({
              message: '请选择一组数据作为主数据',
              type: 'error',
              center: true
            });
          }
        },
        handleDelete(val){
          console.log(val);
          if(val.id === this.$data.routerId){
            this.$message({
              message: '此数据是合并主数据不能移除',
              type: 'error',
              center: true
            });
          }else{
            let list = {
              'id':val.id,
            }
            let qs = require('querystring')
            dataCollectApi.outMerge(qs.stringify(list)).then((response) => {
              console.log(response.data.errno);
              if(response.data.errno === 0){
                this.$message({
                  message: '移出成功',
                  type: 'success',
                  center: true
                });
                this.mergeList();
              }
            })
          }
        },
      //  返回上一页
        back(){
          this.$router.replace({name: 'DataList',params: {id:1}})
        },
      }
    }
</script>

<style scoped>
  .btn{
    width: 5rem;
    height: 2.5rem;
    /*float: right;*/
    /*margin-right: 5rem;*/
    margin-top: 3rem;
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
