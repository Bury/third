<template>
  <div class="business-list">
    <div class="top-box">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="商家">
          <el-select v-model="merchantId" placeholder="请选商家" @change="GETmerchantId(merchantId)">
            <el-option v-for="merchantName in merchantList" :key="merchantName.id" :label="merchantName.name"
                       :value="merchantName.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店">
          <el-select v-model="storeId" placeholder="请选门店" @change="GETstoreId(storeId)">
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
            v-model="userDefined"
            v-show="ctrlTimeType[0]"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptionsSet">
          </el-date-picker>
          <el-date-picker
            v-show="ctrlTimeType[1]"
            v-model="day"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            placeholder="选择日期时间"
            :picker-options="pickerOptionsSet">
          </el-date-picker>
          <el-date-picker
            v-show="ctrlTimeType[2]"
            v-model="week"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周"
            :picker-options="pickerOptionsSet">
          </el-date-picker>
          <el-date-picker
            v-show="ctrlTimeType[3]"
            v-model="month"
            type="month"
            placeholder="选择月"
            :picker-options="pickerOptionsSet">
          </el-date-picker>
          <el-date-picker
            v-show="ctrlTimeType[4]"
            v-model="year"
            type="year"
            placeholder="选择年"
            :picker-options="pickerOptionsSet">
          </el-date-picker>
          <el-date-picker
            v-model="userDefined"
            v-show="ctrlTimeType[5]"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptionsSet">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <el-tabs v-model="timeType" type="card" @tab-click="cateChanged">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="日统计" name="day"></el-tab-pane>
        <el-tab-pane label="周统计" name="week"></el-tab-pane>
        <el-tab-pane label="月统计" name="month"></el-tab-pane>
        <el-tab-pane label="年统计" name="year"></el-tab-pane>
        <el-tab-pane label="自定义统计" name="userDefined"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="content-box">

      <!--否-->
      <el-form v-show="noFilter">
        <el-form-item label="异常参数:">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" label="isCheck">
            <el-checkbox v-for="city in cities" :label="city.id" :key="city.id" :value="city.id">{{city.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <!--是-->
      <el-form :inline="true" class="demo-form-inline" :model="ruleForm" :rules="rules" ref="ruleForm" size="mini">
        <el-row>
          <el-col>
            <el-button size="mini" style="margin-bottom: 0.5rem" @click="clearRuleForm">参数重置</el-button>
          </el-col>
        </el-row>
        <el-form-item label="姿态角度:" :inline="false">
          <el-form-item label="Pitch:">
            <!--<input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchA">- -->
            <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchA">-
            <!--<input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchB" @blur.prevent="pitchBBtn()">-->
            <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.pitchB">
          </el-form-item>
          <el-form-item label="Roll:" style="">
            <!--<input  class="input" maxlength="4" onkeyup="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollA">- -->
            <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollA">-
            <!--<input  class="input" maxlength="4" onkeyup="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,4}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollB" @blur.prevent="rollBBtn()">-->
            <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.rollB">
          </el-form-item>
          <el-form-item label="Yaw:" style="">
            <!--<input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawA">- -->
            <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawA">-
            <!--<input  class="input" maxlength="3" onkeyup="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" onpaste="this.value=this.value.replace(/[^-\d{1,2}]/g,'')" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawB" @blur.prevent="yawBBtn()">-->
            <input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="请输入内容" v-model="ruleForm.yawB">
          </el-form-item>
        </el-form-item>
        <el-form-item label="模糊度:">
          <el-select v-model="ruleForm.dimA" placeholder="请选择" style="width: 7rem" >
            <el-option
              v-for="item in optionsB"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>-
          <!--<input  class="input" maxlength="16" type="number" style="width: 7rem" placeholder="0" v-model="ruleForm.dimA">- -->
          <el-select v-model="ruleForm.dimB" placeholder="请选择" style="width: 7rem" @change="dimBtnB">
            <el-option
              v-for="item in optionsA"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <!--<input  class="input" maxlength="16" style="width: 7rem" placeholder="0.1" v-model="ruleForm.dimB" @blur.prevent="dimBtnB()">-->
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
      style="width: 100%;text-align: center"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
      >
      </el-table-column>
      <el-table-column
        label="序号" prop="id" width="70" align="center"
      >
        <!--<template slot-scope="scope">{{ scope.row.num }}</template>-->
      </el-table-column>
      <el-table-column
        label="来客编号" width="50" align="center"
      >
        <template slot-scope="scope">{{ scope.row.customer_id }}</template>
      </el-table-column>
      <el-table-column
        label="照片" width="120" align="center"
      >
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="width: 6rem;height: 6rem">
        </template>
      </el-table-column>
      <el-table-column
        label="性别" width="60" align="center"
      >
        <template slot-scope="scope">
          <span :class="{getRed:scope.row.gender_mark === 1}">{{ scope.row.gender == 1 ? '男' : '女' }}</span>
          <!--<i class="el-icon-edit-outline" style="font-size: 1.2rem" @click="takeError(scope.row,0)"></i>-->
        </template>

      </el-table-column>
      <el-table-column
        label="年龄" width="60" align="center"
      >
        <template slot-scope="scope">
          <span :class="{getRed:scope.row.age_mark === 1}">{{ scope.row.age }}</span>
          <!--<i class="el-icon-edit-outline" style="font-size: 1.2rem" @click="takeErrorA(scope.row,1)"></i>-->
        </template>
      </el-table-column>
      <el-table-column
        label="姿态角度" align="center"
      >
        <template slot-scope="scope">
          <p :class="{getInYellow:scope.row.pitch_d === 1}">上下俯仰角度:{{ scope.row.pitch }}</p>
          <p :class="{getInYellow:scope.row.pitch_d === 1}">左右旋转角度:{{ scope.row.yaw }}</p>
          <p :class="{getInYellow:scope.row.pitch_d === 1}">平面旋转角度:{{ scope.row.roll }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="光照" width="60" align="center"
      >
        <template slot-scope="scope" >
          <span :class="{getInYellow:scope.row.illumination_d === 1}">{{scope.row.illumination}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="模糊度" align="center"
      >
        <template slot-scope="scope">
          <span :class="{getInYellow:scope.row.blur_d === 1}">{{scope.row.blur}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="遮挡" width="200" align="center"
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
        label="脸完整度" width="90" align="center"
      >
        <template slot-scope="scope" style="text-align: center">
          <span :class="{getInYellow:scope.row.completeness_d === 1}">{{scope.row.completeness == 1 ? '完整' : '溢出'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="识别结果" width="280" align="center"
      >
        <template slot-scope="scope">
          <div style="display: flex;align-items: center">
            <img :src="scope.row.customer_avatar" alt="" style="width: 6rem;height: 6rem">
            <span :class="{getRed:scope.row.match_mark === 1}">{{scope.row.score}}%相似</span>
            <!--<i class="el-icon-edit-outline" style="font-size: 1.2rem" @click="takeErrorB(scope.row,2)"></i>-->
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间" align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.created_at | date(4)}}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="操作"
      >
      <template slot-scope="scope" style="display: flex">
        <el-button
        size="mini"
        type="danger"
        @click="handleBack(scope.row)">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages" v-if="pages.pageCount > 0">
      <el-pagination background layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="pages.perPage" :page-count = 'pages.pageCount' @size-change="handleSizeChange" :total="pages.totalCount">
      </el-pagination>
    </div>
    <!--恢复标记错误-->
    <el-dialog :title="dialogTitle" :visible.sync="FormVisible">
      <el-form  label-width="180px" class="demo-ruleForm">
        <p>是否取消此项为{{errText}}?</p>
        <p>红色表示内容错误</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="@/assets/js/dataCollect/dataRecyleBin.js"></script>

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
  .getRed{
    color: #bd2c00;
  }
  .getInYellow{
    color: #800080;
  }
</style>
