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
    <el-row>
      <el-col>
        <el-button type="primary" @click="onSubmit" style="float: right;margin-right: 2rem">查询</el-button>
      </el-col>
    </el-row>
    <div class="hideBox">
      <el-row class="itemStyle">
        <el-col :span="5"><div>进店人数:</div></el-col>
        <el-col :span="5"><div>{{get.jd_ct}}</div></el-col>
      </el-row>
      <el-row class="itemStyle">
        <el-col :span="5"><div>识别人数:</div></el-col>
        <el-col :span="5"><div>{{get.sb_ct}}</div></el-col>
      </el-row>
      <el-row class="itemStyle">
        <el-col :span="5"><div>人数识别率:</div></el-col>
        <el-col :span="5"><div>{{get.sbl}}%</div></el-col>
      </el-row>
      <el-row class="itemStyle">
        <el-col :span="5"><div>正确人数:</div></el-col>
        <el-col :span="5"><div>{{get.zq_ct}}</div></el-col>
        <el-col :span="5"><div>正确识别率:</div></el-col>
        <el-col :span="5"><div>{{get.zq_sbl}}%</div></el-col>
      </el-row>
      <el-row class="itemStyle">
        <el-col :span="5"><div>错误人数:</div></el-col>
        <el-col :span="5"><div>{{get.cw_ct}}</div></el-col>
        <el-col :span="5"><div>错误识别率:</div></el-col>
        <el-col :span="5"><div>{{get.cw_sbl}}%</div></el-col>
      </el-row>
      <el-row class="itemStyle">
        <el-col :span="5"><div>年龄错误人数:</div></el-col>
        <el-col :span="5"><div>{{get.nl_cw_ct}}</div></el-col>
        <el-col :span="5"><div>年龄错误识别百分比:</div></el-col>
        <el-col :span="5"><div>{{get.nl_cw_sbl}}%</div></el-col>
      </el-row>
      <el-row class="itemStyle">
        <el-col :span="5"><div>性别错误人数:</div></el-col>
        <el-col :span="5"><div>{{get.xb_cw_ct}}</div></el-col>
        <el-col :span="5"><div>性别错误识别百分比:</div></el-col>
        <el-col :span="5"><div>{{get.xb_cw_sbl}}%</div></el-col>
      </el-row>
      <el-row class="itemStyle">
        <el-col :span="5"><div>熟客识别错误百分比:</div></el-col>
        <el-col :span="5"><div>{{get.sk_ct}}</div></el-col>
        <el-col :span="5"><div>熟客错误识别百分比:</div></el-col>
        <el-col :span="5"><div>{{get.sk_sbl}}%</div></el-col>
      </el-row>
    </div>

  </div>
</template>

<script src="@/assets/js/dataCollect/distinguishStatistics"></script>

<style scoped>
  .hideBox{
    /*border:1px solid red;*/
    /*width: 20rem;*/
    padding: 2rem 4rem;
  }
  .itemStyle{
    margin-bottom: 1rem;
  }
</style>
