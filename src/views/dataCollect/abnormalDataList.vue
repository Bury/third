<template>
  <div class="business-list">
    <div class="top-box">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="门店">
          <el-select v-model="storeId" placeholder="请选门店">
            <el-option v-for="equipmentsName in equipmentsList" :key="equipmentsName.id" :label="equipmentsName.name"
                       :value="equipmentsName.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装位置">
          <el-select v-model="location" placeholder="请选择安装位置">
            <el-option v-for="locationName in locationList" :key="locationName.id" :label="locationName.name"
                       :value="locationName.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker
            v-show="ctrlTimeType[0]"
            v-model="day"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            placeholder="选择日期时间"
            :picker-options="pickerOptionsSet">
          </el-date-picker>
          <el-date-picker
            v-show="ctrlTimeType[1]"
            v-model="week"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周"
            :picker-options="pickerOptionsSet">
          </el-date-picker>
          <el-date-picker
            v-show="ctrlTimeType[2]"
            v-model="month"
            type="month"
            placeholder="选择月"
            :picker-options="pickerOptionsSet">
          </el-date-picker>
          <el-date-picker
            v-show="ctrlTimeType[3]"
            v-model="year"
            type="year"
            placeholder="选择年"
            :picker-options="pickerOptionsSet">
          </el-date-picker>
          <el-date-picker
            v-model="userDefined"
            v-show="ctrlTimeType[4]"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptionsSet">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <el-tabs v-model="timeType" type="card" @tab-click="cateChanged">
        <el-tab-pane label="日统计" name="day"></el-tab-pane>
        <el-tab-pane label="周统计" name="week"></el-tab-pane>
        <el-tab-pane label="月统计" name="month"></el-tab-pane>
        <el-tab-pane label="年统计" name="year"></el-tab-pane>
        <el-tab-pane label="自定义统计" name="userDefined"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="content-box">

      <!--否-->
      <el-form>
        <el-form-item label="异常参数:">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="全部"></el-checkbox>
            <el-checkbox label="姿态角度"></el-checkbox>
            <el-checkbox label="光照"></el-checkbox>
            <el-checkbox label="模糊度"></el-checkbox>
            <el-checkbox label="遮挡"></el-checkbox>
            <el-checkbox label="脸完整度"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <!--是-->
      <el-form :inline="true" class="demo-form-inline" :model="ruleForm" :rules="rules" ref="ruleForm" size="mini">
        <el-form-item label="姿态角度:" :inline="false">
          <el-form-item label="Pitch:">
            <input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchA">-
            <input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchB" @blur.prevent="pitchBBtn()">
          </el-form-item>
          <el-form-item label="Roll:" style="">
            <input  class="input" maxlength="4" onkeyup="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollA">-
            <input  class="input" maxlength="4" onkeyup="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollB" @blur.prevent="rollBBtn()">
          </el-form-item>
          <el-form-item label="Yaw:" style="">
            <input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawA">-
            <input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawB" @blur.prevent="yawBBtn()">
          </el-form-item>
        </el-form-item>
        <el-form-item label="模糊度:">
          <el-select v-model="ruleForm.dimA" placeholder="请选择" style="width: 7rem" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>-
          <el-select v-model="ruleForm.dimB" placeholder="请选择" style="width: 7rem" @change="dimBtnB">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="脸完整度:">
          <el-select v-model="ruleForm.faceIsAll" placeholder="请选择" style="width: 7rem">
            <el-option value="1" label="1">1</el-option>
            <el-option value="0" label="0">0</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="光照范围:">
          <input type="text" class="input" maxlength="3" placeholder="0" v-model="ruleForm.illA" onkeyup="this.value=this.value.replace(/[^\d{1,3}]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d{1,3}]/g,'') " style="width: 7rem">-
          <input type="text" class="input" maxlength="3" placeholder="255" v-model="ruleForm.illB" onkeyup="this.value=this.value.replace(/[^\d{1,3}]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d{1,3}]/g,'') " style="width: 7rem" @blur.prevent="illBBtn()">
        </el-form-item>
        <el-form-item label="遮挡:">
          <el-select v-model="ruleForm.keepOut" placeholder="请选择" style="width: 7rem">
            <el-option value="1" label="是">是</el-option>
            <el-option value="2" label="否">否</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-col>
        <el-button type="primary" @click="onSubmit" style="float: right;margin-right: 5rem;margin-bottom: 2rem">查询</el-button>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
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
        label="序号"
      >
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
      <el-table-column
        label="来客编号"
      >
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
      <el-table-column
        label="照片"
      >
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
      <el-table-column
        label="性别"
      >
        <template slot-scope="scope">
          {{ scope.row.sex }}
          <i class="el-icon-edit-outline" style="font-size: 1.2rem"></i>
        </template>

      </el-table-column>
      <el-table-column
        label="年龄"
      >
        <template slot-scope="scope">
          {{ scope.row.f }}
          <i class="el-icon-edit-outline" style="font-size: 1.2rem"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姿态角度"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="光照"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="模糊度"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="遮挡"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="脸完整度"
      >
      </el-table-column>
      <el-table-column
        label="识别结果"
      >
        <template>
          <img src="http://dev-api.cc.ibetwo.com/upload/2018/08/15/14_1534334004_3592.jpg" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope" style="display: flex">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="@/assets/js/dataCollect/abnormalDataList.js"></script>

<style scoped>
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
