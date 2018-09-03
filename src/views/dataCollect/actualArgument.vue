<template>
  <div class="business-list textStyle">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm"  size="medium">
      <el-form-item label="姿态角度:" :inline="false">
        <el-form-item label="Pitch:">
          <!--<input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchA">- -->
          <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchA">-
          <!--<input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchB" @blur.prevent="pitchBBtn()">-->
          <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchB">
        </el-form-item>
        <el-form-item label="Roll:" style="margin-left: 5rem;margin-top: 1rem">
          <!--<input  class="input" maxlength="4" onkeyup="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollA">- -->
          <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollA">-
          <!--<input  class="input" maxlength="4" onkeyup="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollB" @blur.prevent="rollBBtn()">-->
          <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollB">
        </el-form-item>
        <el-form-item label="Yaw:" style="margin-left: 5rem;margin-top: 1rem">
          <!--<input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawA">- -->
          <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawA">-
          <!--<input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawB" @blur.prevent="yawBBtn()">-->
          <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawB">
        </el-form-item>
      </el-form-item>
      <el-form-item label="模糊度:小于">
        <!--<el-select v-model="ruleForm.dimA" placeholder="请选择" style="width: 7rem" >-->
        <!--<el-option-->
        <!--v-for="item in optionsA"-->
        <!--:key="item.value"-->
        <!--:label="item.name"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>- -->
        <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="0" v-model="ruleForm.dimA">- -->
        <el-select v-model="ruleForm.dimB" placeholder="请选择" style="width: 7rem" >
          <el-option
            v-for="item in optionsB"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        <!--<input  class="input" maxlength="16" style="width: 7rem" placeholder="0.1" v-model="ruleForm.dimB" @blur.prevent="dimBtnB()">-->
      </el-form-item>
      <el-form-item label="脸完整度:">
        <el-select v-model="ruleForm.faceAll" placeholder="请选择" style="width: 7rem">
          <el-option
            v-for="item in optionsFace"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="光照范围:大于" >
        <input type="text" class="input" maxlength="3" placeholder="0" v-model="ruleForm.illA" onkeyup="this.value=this.value.replace(/[^\d{1,3}]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d{1,3}]/g,'') " style="width: 7rem">
        <!--<input type="text" class="input" maxlength="3" placeholder="255" v-model="ruleForm.illB" onkeyup="this.value=this.value.replace(/[^\d{1,3}]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d{1,3}]/g,'') " style="width: 7rem" >-->
        <!--@blur.prevent="illBBtn()"-->
      </el-form-item>
      <!--<el-form-item label="遮挡:">-->
        <!--<el-select v-model="ruleForm.keepOut" placeholder="请选择" style="width: 7rem">-->
        <!--<el-option-->
        <!--v-for="item in optionsKeep"-->
        <!--:key="item.value"-->
        <!--:label="item.name"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--<el-form-item label="左眼被遮挡的阈值:" style="margin-left: 5rem;margin-top: 1rem">-->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.left_eye_st">- -->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.left_eye_ed">-->
        <!--</el-form-item>-->
        <!--<el-form-item label="右眼被遮挡的阈值:" style="margin-left: 5rem;margin-top: 1rem">-->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.right_eye_st">- -->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.right_eye_ed">-->
        <!--</el-form-item>-->
        <!--<el-form-item label="鼻子被遮挡的阈值:" style="margin-left: 5rem;margin-top: 1rem">-->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.nose_st">- -->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.nose_ed">-->
        <!--</el-form-item>-->
        <!--<el-form-item label="嘴巴被遮挡的阈值:" style="margin-left: 5rem;margin-top: 1rem">-->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.mouth_st">- -->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.mouth_ed">-->
        <!--</el-form-item>-->
        <!--<el-form-item label="左脸颊被遮挡的阈值:" style="margin-left: 5rem;margin-top: 1rem">-->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.left_cheek_st">- -->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.left_cheek_ed">-->
        <!--</el-form-item>-->
        <!--<el-form-item label="右脸颊被遮挡的阈值:" style="margin-left: 5rem;margin-top: 1rem">-->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.right_cheek_st">- -->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.right_cheek_ed">-->
        <!--</el-form-item>-->
        <!--<el-form-item label="下巴被遮挡的阈值:" style="margin-left: 5rem;margin-top: 1rem">-->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.chin_contour_st">- -->
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.chin_contour_ed">-->
        <!--</el-form-item>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary" style="margin-left: 0rem" @click="backInfo()">还原</el-button>
        <el-button type="primary" @click="submitForm(ruleForm)" style="margin-left: 10rem">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as utils from '@/utils/index'
  import dataCollectApi from '@/api/dataCollect'
    export default {
        name: "actual-argument",
      data(){
        return{
          ruleForm:{
            pitchA:'',
            pitchB:'',
            rollA:'',
            rollB:'',
            yawA:'',
            yawB:'',
            dimA:'',
            dimB:'',
            faceAll:'',
            keepOut:'',
            illA:'',
            // illB:'',
            // left_eye_st:'',
            // left_eye_ed:'',
            // right_eye_st:'',
            // right_eye_ed:'',
            // nose_st:'',
            // nose_ed:'',
            // mouth_st:'',
            // mouth_ed:'',
            // left_cheek_st:'',
            // left_cheek_ed:'',
            // right_cheek_st:'',
            // right_cheek_ed:'',
            // chin_contour_st:'',
            // chin_contour_ed:''
          },
          rules:{
            // illA:globalRules.setting.illRules()
          },
          optionsA:[
            {value:0,name:0},
            {value:0.1,name:0.1},
            {value:0.2,name:0.2},
            {value:0.3,name:0.3},
            {value:0.4,name:0.4},
            {value:0.5,name:0.5},
            {value:0.6,name:0.6},
            {value:0.7,name:0.7},
            {value:0.8,name:0.8},
            {value:0.9,name:0.9},
          ],
          optionsB:[
            {value:0.1,name:0.1},
            {value:0.2,name:0.2},
            {value:0.3,name:0.3},
            {value:0.4,name:0.4},
            {value:0.5,name:0.5},
            {value:0.6,name:0.6},
            {value:0.7,name:0.7},
            {value:0.8,name:0.8},
            {value:0.9,name:0.9},
            {value:1,name:1},
          ],
          optionsFace:[
            {value:0,name:'溢出'},
            {value:1,name:'完整'},
          ],
          optionsKeep:[
            {value:0,name:'无遮挡'},

          ],
        }
      },
      created:function () {
        // 刷新时，获取动态数据 设置navmenu
        let templates = this.$parent
        templates.navMenu = this.$route.name
        templates.upperLevelMenu = ''
        this.dataBack();
      },
      methods:{

        test(a,b,num,type){
          console.log(a);
          console.log(b);
          if(a == ''){
            this.$message({
              message: '请先填写开始范围',
              type: 'error',
              center: true
            });
            if(type == 1){
              this.$data.ruleForm.pitchB = '';
            }else if(type == 2){
              this.$data.ruleForm.rollB = '';
            }else if(type == 3){
              this.$data.ruleForm.yawB = '';
            }
          }else{
            if(a > b){
              this.$message({
                message: '开始范围必须小于结束范围',
                type: 'error',
                center: true
              });

              if(type == 1){
                this.$data.ruleForm.pitchA = '';
                this.$data.ruleForm.pitchB = '';
              }else if(type == 2){
                this.$data.ruleForm.rollA = '';
                this.$data.ruleForm.rollB = '';
              }else if(type == 3){
                this.$data.ruleForm.yawA = '';
                this.$data.ruleForm.yawB = '';
              }
            }else{
              if(a > num || a < -num){
                this.$message({
                  message: '填写开始范围不合法',
                  type: 'error',
                  center: true
                });
                if(type == 1){
                  this.$data.ruleForm.pitchA = '';
                }else if(type == 2){
                  this.$data.ruleForm.rollA = '';
                }else if(type == 3){
                  this.$data.ruleForm.yawA = '';
                }
              }else if(b > num || b < -num){
                this.$message({
                  message: '填写结束范围不合法',
                  type: 'error',
                  center: true
                });
                if(type == 1){
                  this.$data.ruleForm.pitchB = '';
                }else if(type == 2){
                  this.$data.ruleForm.rollB = '';
                }else if(type == 3){
                  this.$data.ruleForm.yawB = '';
                }
              }
            }
          }
        },
        //  保存
        submitForm(val){
          console.log(val);
          if(this.$data.ruleForm.pitchA == '' || this.$data.ruleForm.pitchB == ''){
            this.$message({
              message: '填写Pitch范围',
              type: 'error',
              center: true
            });
          }else{
            if(this.$data.ruleForm.rollA == '' || this.$data.ruleForm.rollB == ''){
              this.$message({
                message: '填写Roll范围',
                type: 'error',
                center: true
              });
            }else{
              if(this.$data.ruleForm.yawA == '' || this.$data.ruleForm.yawB == ''){
                this.$message({
                  message: '填写Yaw范围',
                  type: 'error',
                  center: true
                });
              }else{
                //this.$data.ruleForm.dimA == '' ||
                if( this.$data.ruleForm.dimB == ''){
                  this.$message({
                    message: '请选择模糊度范围',
                    type: 'error',
                    center: true
                  });
                }else{
                  if(this.$data.ruleForm.faceAll == '' ){
                    this.$message({
                      message: '请选择脸完整度',
                      type: 'error',
                      center: true
                    });
                  }else{
                    if(this.$data.ruleForm.illA == ''){
                      this.$message({
                        message: '请填写光照范围范围',
                        type: 'error',
                        center: true
                      });
                    }else{
                      let list = {
                        'pitch_st': this.$data.ruleForm.pitchA,
                        'pitch_ed': this.$data.ruleForm.pitchB,
                        'yaw_st': this.$data.ruleForm.yawA,
                        'yaw_ed': this.$data.ruleForm.yawB,
                        'roll_st': this.$data.ruleForm.rollA,
                        'roll_ed': this.$data.ruleForm.rollB,
                        'illumination_st': this.$data.ruleForm.illA,
                        // 'illumination_ed': this.$data.ruleForm.illB,
                        'blur_st': 0,
                        'blur_ed': this.$data.ruleForm.dimB,
                        'occlusion': this.$data.ruleForm.keepOut,
                        'completeness': this.$data.ruleForm.faceAll,

                        //遮挡
                        // 'left_eye_st':this.$data.ruleForm.left_eye_st,
                        // 'left_eye_ed':this.$data.ruleForm.left_eye_ed,
                        // 'right_eye_st':this.$data.ruleForm.right_eye_st,
                        // 'right_eye_ed':this.$data.ruleForm.right_eye_ed,
                        // 'nose_st':this.$data.ruleForm.nose_st,
                        // 'nose_ed':this.$data.ruleForm.nose_ed,
                        // 'mouth_st':this.$data.ruleForm.mouth_st,
                        // 'mouth_ed':this.$data.ruleForm.mouth_ed,
                        // 'left_cheek_st':this.$data.ruleForm.left_cheek_st,
                        // 'left_cheek_ed':this.$data.ruleForm.left_cheek_ed,
                        // 'right_cheek_st':this.$data.ruleForm.right_cheek_st,
                        // 'right_cheek_ed':this.$data.ruleForm.right_cheek_ed,
                        // 'chin_contour_st':this.$data.ruleForm.chin_contour_st,
                        // 'chin_contour_ed':this.$data.ruleForm.chin_contour_ed

                      }
                      let qs = require('querystring')
                      dataCollectApi.saveMacthSetTrue(qs.stringify(list)).then((response) => {
                        if(response.data.errno == 0){
                          this.$message({
                            message: '设置成功',
                            type: 'success',
                            center: true
                          });
                          this.dataBack();
                        }
                      })
                    }
                  }
                }
              }
            }
          }
        },
        dataBack(){
          let list = {}
          let qs = require('querystring')
          dataCollectApi.seeMacthSetTrue(qs.stringify(list)).then((response) => {
            console.log(response.data.data);
            this.$data.ruleForm.pitchA = response.data.data.pitch_st;
            this.$data.ruleForm.pitchB = response.data.data.pitch_ed;
            this.$data.ruleForm.yawA = response.data.data.yaw_st;
            this.$data.ruleForm.yawB = response.data.data.yaw_ed;
            this.$data.ruleForm.rollA = response.data.data.roll_st;
            this.$data.ruleForm.rollB = response.data.data.roll_ed;
            this.$data.ruleForm.illA = response.data.data.illumination_st;
            // this.$data.ruleForm.illB = response.data.data.illumination_ed;
            this.$data.ruleForm.dimA = response.data.data.blur_st;
            this.$data.ruleForm.dimB = response.data.data.blur_ed;
            this.$data.ruleForm.keepOut = response.data.data.occlusion;
            this.$data.ruleForm.faceAll = response.data.data.completeness;

            //遮挡
            // this.$data.ruleForm.left_eye_st=response.data.data.left_eye_st;
            // this.$data.ruleForm.left_eye_ed=response.data.data.left_eye_ed;
            // this.$data.ruleForm.right_eye_st=response.data.data.right_eye_st;
            // this.$data.ruleForm.right_eye_ed=response.data.data.right_eye_ed;
            // this.$data.ruleForm.nose_st=response.data.data.nose_st;
            // this.$data.ruleForm.nose_ed=response.data.data.nose_ed;
            // this.$data.ruleForm.mouth_st=response.data.data.mouth_st;
            // this.$data.ruleForm.mouth_ed=response.data.data.mouth_ed;
            // this.$data.ruleForm.left_cheek_st=response.data.data.left_cheek_st;
            // this.$data.ruleForm.left_cheek_ed=response.data.data.left_cheek_ed;
            // this.$data.ruleForm.right_cheek_st=response.data.data.right_cheek_st;
            // this.$data.ruleForm.right_cheek_ed=response.data.data.right_cheek_ed;
            // this.$data.ruleForm.chin_contour_st=response.data.data.chin_contour_st;
            // this.$data.ruleForm.chin_contour_ed=response.data.data.chin_contour_ed;
          })
        },
      //  还原数据
        backInfo(){
          this.dataBack();
        },
      }
    }
</script>

<style scoped>
  .textStyle{
    /*border:1px solid red;*/
    width: 45rem;
    margin-left: 30rem;
  }
  .input{
    border: 1px solid #ccc;
    padding: 7px 0px;
    border-radius: 3px;
    padding-left:5px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
  }
  .input:focus{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
  }
  .input::-webkit-outer-spin-button,
  .input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
</style>
