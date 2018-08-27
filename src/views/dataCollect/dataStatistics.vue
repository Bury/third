<template>
  <div class="business-list">
    <div class="top-box">
      <el-form :inline="true" class="demo-form-inline" size="mini">
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
        </el-form-item>
         <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
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
    <div class="radioGroup">
      <el-radio-group v-model="radioType" @change="selectType">
        <el-radio-button label="姿态角度"></el-radio-button>
        <el-radio-button label="模糊度"></el-radio-button>
        <el-radio-button label="光照值"></el-radio-button>
        <el-radio-button label="脸完整度"></el-radio-button>
        <el-radio-button label="遮挡"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="chartWrap">
    	<data-charts :chartData='guestParameters' :chartClass="radioType" :changeFlag="changeFlag"></data-charts>
    </div>
  </div>
</template>

<script src="@/assets/js/dataCollect/dataStatistics.js"></script>

<style scoped>
  .radioGroup{
		text-align: center;
		padding-bottom: 20px;
		background-color: #fff;
		padding-top: 30px;
	}
	.chartWrap{
		background-color: #fff;
	}

</style>
