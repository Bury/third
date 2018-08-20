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
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-row style="margin-bottom: 1rem;">
        <el-radio-group v-model="radio3">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="性别"></el-radio-button>
          <el-radio-button label="年龄"></el-radio-button>
          <el-radio-button label="身份"></el-radio-button>
        </el-radio-group>
      </el-row>
      <div class="allTop">
        <h3>参数超标范围:</h3>
        <div  style="margin-top: 1rem">
          <div class="firstTop">
            <h4 style="margin-top: 3rem">姿态角度:</h4>
            <div style="margin-left: 2rem">
              <div class="firstTop">
                <p>Pitch上限范围:XX-XX</p>
                <p style="margin-left: 2rem">Pitch下限范围:XX-XX</p>
              </div>
              <div class="firstTop">
                <p>roll上限范围:XX-XX</p>
                <p style="margin-left: 2rem">roll下限范围:XX-XX</p>
              </div>
              <div class="firstTop">
                <p>yaw上限范围:XX-XX</p>
                <p style="margin-left: 2rem">yaw下限范围:XX-XX</p>
              </div>
            </div>
          </div>
          <div class="firstTop decond">
            <h4>光照:</h4>
            <div style="margin-right: 3rem">
              <div>
                <p>上限范围:XX-XX</p>
                <p>下限范围:XX-XX</p>
              </div>
            </div>
          </div>
          <div class="firstTop deconds">
            <h4>模糊度:</h4>
            <div>
              <div>
                <p>上限范围:XX-XX</p>
                <p>下限范围:XX-XX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          label="序号" prop="id"
        >
          <!--<template slot-scope="scope">{{ scope.row.num }}</template>-->
        </el-table-column>
        <el-table-column
          label="来客编号"
        >
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column
          label="照片"
        >
          <template slot-scope="scope">
            <img src="http://dev-api.cc.ibetwo.com/upload/2018/08/09/1_1_1.jpg" alt="" style="width: 6rem;height: 6rem">
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
        >
          <template slot-scope="scope">
            <span :class="{getRed:isErrorA === 1}">{{ scope.row.sex }}</span>
            <i class="el-icon-edit-outline" style="font-size: 1.2rem" @click="takeError()"></i>
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
          label="姿态角度"
        >
          <template slot-scope="scope">
            <p>上下俯仰角度:{{ scope.row.pitch }}</p>
            <p>左右旋转角度:{{ scope.row.yaw }}</p>
            <p>平面旋转角度:{{ scope.row.roll }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="光照"
        >
          <template slot-scope="scope" >
            <span :class="{getInYellow:scope.row.status === 1}">{{scope.row.illumination}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="blur"
          label="模糊度"
        >
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
          label="识别结果"
        >
          <template slot-scope="scope">
            <img src="http://dev-api.cc.ibetwo.com/upload/2018/08/09/1_1_1.jpg" alt="" style="width: 6rem;height: 6rem">
            <span>60%相似</span>
            <i class="el-icon-edit-outline" style="font-size: 1.2rem" @click="takeError()"></i>
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
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
</style>
