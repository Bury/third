<template>
  <div class="business-list textStyle">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm"  size="medium">
      <el-form-item label="姿态角度:" :inline="false">
        <el-form-item label="Pitch:">
          <input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchA">-
          <input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchB" @blur.prevent="pitchBBtn()">
        </el-form-item>
        <el-form-item label="Roll:" style="margin-left: 5rem;margin-top: 1rem">
          <input  class="input" maxlength="4" onkeyup="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollA">-
          <input  class="input" maxlength="4" onkeyup="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollB" @blur.prevent="rollBBtn()">
        </el-form-item>
        <el-form-item label="Yaw:" style="margin-left: 5rem;margin-top: 1rem">
          <input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawA">-
          <input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawB" @blur.prevent="yawBBtn()">
        </el-form-item>
      </el-form-item>
      <el-form-item label="模糊度:大于">
        <!--<el-select v-model="ruleForm.dimA" placeholder="请选择" style="width: 7rem" >-->
          <!--<el-option-->
            <!--v-for="item in optionsA"-->
            <!--:key="item.value"-->
            <!--:label="item.name"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>- -->
        <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="0" v-model="ruleForm.dimA">- -->
        <el-select v-model="ruleForm.dimB" placeholder="请选择" style="width: 7rem" @change="dimBtnB">
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
      <el-form-item label="光照范围:" >
        <input type="text" class="input" maxlength="3" placeholder="0" v-model="ruleForm.illA" onkeyup="this.value=this.value.replace(/[^\d{1,3}]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d{1,3}]/g,'') " style="width: 7rem">-
        <input type="text" class="input" maxlength="3" placeholder="255" v-model="ruleForm.illB" onkeyup="this.value=this.value.replace(/[^\d{1,3}]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d{1,3}]/g,'') " style="width: 7rem" @blur.prevent="illBBtn()">
      </el-form-item>
      <el-form-item label="遮挡:">
        <el-select v-model="ruleForm.keepOut" placeholder="请选择" style="width: 7rem">
          <el-option
            v-for="item in optionsKeep"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)" style="margin-left: 10rem">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="@/assets/js/dataCollect/dataSetting.js"></script>

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
