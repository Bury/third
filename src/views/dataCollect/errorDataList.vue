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
      <el-row style="margin-bottom: 1rem;">
        <el-radio-group v-model="radio3" @change="clickAll">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="性别"></el-radio-button>
          <el-radio-button label="年龄"></el-radio-button>
          <el-radio-button label="身份"></el-radio-button>
        </el-radio-group>
      </el-row>
      <div class="allTop" :model="ruleForm" ref="ruleForm" style="width: 70rem">
        <h3>参数超标范围:</h3>
        <div  style="margin-top: 1rem;display: flex">
          <div style="width: 33rem">
            <div class="firstTop">
              <h4 style="margin-top: 3rem">姿态角度:</h4>
              <div style="margin-left: 2rem">
                <div class="firstTop">
                  <p>上下俯仰上限范围:{{ruleForm.pitchA}}</p>
                  <p style="margin-left: 2rem">上下俯仰下限范围:{{ruleForm.pitchB}}</p>
                </div>
                <div class="firstTop">
                  <p>左右旋转上限范围:{{ruleForm.rollA}}</p>
                  <p style="margin-left: 2rem">左右旋转下限范围:{{ruleForm.rollB}}</p>
                </div>
                <div class="firstTop">
                  <p>平面旋转上限范围:{{ruleForm.yawA}}</p>
                  <p style="margin-left: 2rem">平面旋转下限范围:{{ruleForm.yawB}}</p>
                </div>
              </div>
            </div>
            <div class="firstTop decond">
              <h4 style="width: 3rem">光照:</h4>
              <div style="margin-right: 2rem">
                <div style="margin-left: 1rem">
                  <p>上限范围:{{ruleForm.illA}}</p>
                  <p>下限范围:{{ruleForm.illB}}</p>
                </div>
              </div>
            </div>
            <div class="firstTop deconds">
              <h4 >模糊度:</h4>
              <div>
                <div style="margin-left: 2rem">
                  <p>上限范围:{{ruleForm.dimA}}</p>
                  <p>下限范围:{{ruleForm.dimB}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="firstTop">
            <h4 style="margin-top: 3rem">遮挡:</h4>
            <div style="margin-left: 2rem">
              <div class="firstTop">
                <p>左眼被遮挡上限范围:{{ruleForm.left_eye_st}}</p>
                <p style="margin-left: 2rem">左眼被遮挡下限范围:{{ruleForm.left_eye_ed}}</p>
              </div>
              <div class="firstTop">
                <p>右眼被遮挡上限范围:{{ruleForm.right_eye_st}}</p>
                <p style="margin-left: 2rem">右眼被遮挡下限范围:{{ruleForm.right_eye_ed}}</p>
              </div>
              <div class="firstTop">
                <p>鼻子被遮挡上限范围:{{ruleForm.nose_st}}</p>
                <p style="margin-left: 2rem">鼻子被遮挡下限范围:{{ruleForm.nose_ed}}</p>
              </div>
              <div class="firstTop">
                <p>嘴巴被遮挡上限范围:{{ruleForm.mouth_st}}</p>
                <p style="margin-left: 2rem">嘴巴被遮挡下限范围:{{ruleForm.mouth_ed}}</p>
              </div>
              <div class="firstTop">
                <p>左脸颊被遮挡上限范围:{{ruleForm.left_cheek_st}}</p>
                <p style="margin-left: 2rem">左脸颊被遮挡下限范围:{{ruleForm.left_cheek_ed}}</p>
              </div>
              <div class="firstTop">
                <p>右脸颊被遮挡上限范围:{{ruleForm.right_cheek_st}}</p>
                <p style="margin-left: 2rem">右脸颊被遮挡下限范围:{{ruleForm.right_cheek_ed}}</p>
              </div>
              <div class="firstTop">
                <p>下巴被遮挡上限范围:{{ruleForm.chin_contour_st}}</p>
                <p style="margin-left: 2rem">下巴被遮挡下限范围:{{ruleForm.chin_contour_ed}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-row>
        <el-col>
          <el-button type="primary" @click="onSubmit" style="float: right;margin-right: 2rem;margin-bottom: 2rem">查询</el-button>
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
            <i class="el-icon-edit-outline" style="font-size: 1.2rem" @click="takeError(scope.row,0)"></i>
          </template>

        </el-table-column>
        <el-table-column
          label="年龄" width="60" align="center"
        >
          <template slot-scope="scope">
            <span :class="{getRed:scope.row.age_mark === 1}">{{ scope.row.age }}</span>
            <i class="el-icon-edit-outline" style="font-size: 1.2rem" @click="takeErrorA(scope.row,1)"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="姿态角度" align="center"
        >
          <template slot-scope="scope">
            <p :class="{getInYellow:scope.row.pitch_d === 1}">上下俯仰角度:{{ scope.row.pitch }}</p>
            <p :class="{getInYellow:scope.row.yaw_d === 1}">左右旋转角度:{{ scope.row.yaw }}</p>
            <p :class="{getInYellow:scope.row.roll_d === 1}">平面旋转角度:{{ scope.row.roll }}</p>
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
            <p :class="{getInYellow:scope.row.left_eye_d === 1}">左眼遮挡:{{ scope.row.left_eye }}</p>
            <p :class="{getInYellow:scope.row.right_eye_d === 1}">右眼遮挡:{{ scope.row.right_eye }}</p>
            <p :class="{getInYellow:scope.row.left_cheek_d === 1}">左脸颊遮挡:{{ scope.row.left_cheek }}</p>
            <p :class="{getInYellow:scope.row.right_cheek_d === 1}">右脸颊遮挡:{{ scope.row.right_cheek }}</p>
            <p :class="{getInYellow:scope.row.nose_d === 1}">鼻子遮挡:{{ scope.row.nose }}</p>
            <p :class="{getInYellow:scope.row.mouth_d === 1}">嘴巴遮挡:{{ scope.row.mouth }}</p>
            <p :class="{getInYellow:scope.row.chin_contour_d === 1}">下巴遮挡:{{ scope.row.chin_contour }}</p>
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
              <i class="el-icon-edit-outline" style="font-size: 1.2rem" @click="takeErrorB(scope.row,2)"></i>
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
          label="操作" align="center"
        >
          <template slot-scope="scope" style="display: flex">
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteThis(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages" v-if="pages.pageCount > 0">
        <el-pagination background layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="pages.perPage" :page-count = 'pages.pageCount' @size-change="handleSizeChange" :total="pages.totalCount">
        </el-pagination>
      </div>
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
    </div>
</template>

<script src="@/assets/js/dataCollect/errorDataList.js"></script>

<style scoped>
  .allTop{
    width: 40rem;
    margin-left: 3rem;
    /*border:1px solid red;*/
    display: flex;
    justify-content: space-around;
  }
  .firstTop{
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
  }
  .decond{
    margin-right: 9rem;
  }
  .deconds{
    margin-right: 11rem;
  }
  .getRed{
    color: #bd2c00;
  }
  .getInYellow{
    color: #800080;
  }
</style>
