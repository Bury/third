<!-- myqc icontrol wesupervise 的模板页面，上面是导航条（分为两种 1、面包屑 2、导航菜单） -->
<template>
    <div class="templates">
      <!-- 导航 start -->
      <div class="nav-menu">
        <!-- 商家 start -->
        <el-breadcrumb v-if="navMenu === 'BusinessList'" separator="/">
          <el-breadcrumb-item>商家</el-breadcrumb-item>
          <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'tagManage'" separator="/">
          <el-breadcrumb-item>标签管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'childsTag'" separator="/">
          <el-breadcrumb-item><router-link :to="{ name: 'tagManage' }" replace>商家管理</router-link></el-breadcrumb-item>
          <el-breadcrumb-item>子标签</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'Modules'" separator="/">
          <el-breadcrumb-item>商家</el-breadcrumb-item>
          <el-breadcrumb-item><router-link :to="{ name: 'BusinessList' }" replace>商家管理</router-link></el-breadcrumb-item>
          <el-breadcrumb-item>模块&nbsp;&nbsp;{{ name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!--鹰眼人脸数据测试-->
        <el-breadcrumb v-if="navMenu === 'FaceSampleGrouping'" separator="/">
          <el-breadcrumb-item>鹰眼人脸数据测试</el-breadcrumb-item>
          <el-breadcrumb-item>人脸样本分组管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'FaceSampleManage'" separator="/">
          <el-breadcrumb-item>鹰眼人脸数据测试</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{ name: 'FaceSampleGrouping' }" replace>人脸样本分组管理</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>人脸样本管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'RecognitionResult'" separator="/">
          <el-breadcrumb-item>鹰眼人脸数据测试</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{ name: 'FaceSampleGrouping' }" replace>人脸样本分组管理</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{ name: 'FaceSampleManage', params: {'id': id}}" replace>人脸样本管理</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>识别结果查看</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'RecognitionList'" separator="/">
          <el-breadcrumb-item>鹰眼人脸数据测试</el-breadcrumb-item>
          <el-breadcrumb-item>识别结果列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'RecognitionResultsFound'" separator="/">
          <el-breadcrumb-item>鹰眼人脸数据测试</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{ name: 'RecognitionList' }" replace>识别结果列表</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>识别结果查看</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'RecognitionResultDetail'" separator="/">
          <el-breadcrumb-item>鹰眼人脸数据测试</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{ name: 'RecognitionList' }" replace>识别结果列表</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item  :to="{ name: 'RecognitionResultsFound',params: {'id': singleParsentId}}" replace>识别结果查看</el-breadcrumb-item>
          <el-breadcrumb-item>查看</el-breadcrumb-item>
        </el-breadcrumb>

				 <!--监控数据 -->
				 <el-breadcrumb v-if="navMenu === 'EyeDataList'" separator="/">
				 	<el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
				 	<el-breadcrumb-item>监控视频观察结果</el-breadcrumb-item>
				 </el-breadcrumb>
				 <el-breadcrumb v-if="navMenu === 'TimeFrameList'" separator="/">
				 <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
           <el-breadcrumb-item>
             <router-link :to="{ name: 'EyeDataList' }" replace>监控视频观察结果</router-link>
           </el-breadcrumb-item>
				 <el-breadcrumb-item>时段列表</el-breadcrumb-item>
				 </el-breadcrumb>

        <!--鹰眼数据-->
        <el-breadcrumb v-if="navMenu === 'ActualArgument'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>实际使用参数同步</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'ObservationSetting'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>观测识别基准设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'DataSetting'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>正常参数基准设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'DataList'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>数据列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'MergeFace'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{ name: 'DataList',params: {'id': 1} }" replace>数据列表</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>合并数据</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'MegerRecord'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{ name: 'DataList' ,params: {'id': 1}}" replace>数据列表</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>合并记录</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'ArriveRecord'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{ name: 'DataList',params: {'id': 1} }" replace>数据列表</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>到店记录</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'AbnormalDataList'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>异常数据列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'DataStatistics'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>参数统计</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'DistinguishStatistics'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>识别统计</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'ErrorDataList'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>错误数据列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'DataRecyleBin'" separator="/">
          <el-breadcrumb-item>鹰眼实时数据观测</el-breadcrumb-item>
          <el-breadcrumb-item>回收站</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 设备 -->
        <el-breadcrumb v-if="navMenu === 'Pallet'" separator="/">
          <el-breadcrumb-item>设备</el-breadcrumb-item>
          <el-breadcrumb-item>摄像头</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'Store'" separator="/">
          <el-breadcrumb-item>设备</el-breadcrumb-item>
          <el-breadcrumb-item><router-link :to="{ name: 'Face' }" replace>摄像头</router-link></el-breadcrumb-item>
          <el-breadcrumb-item>{{ storeName }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'Device'" separator="/">
          <el-breadcrumb-item>设备</el-breadcrumb-item>
          <el-breadcrumb-item><router-link :to="{ name: 'Face' }" replace>摄像头</router-link></el-breadcrumb-item>
          <el-breadcrumb-item><router-link :to="{ name: 'Store', params: {storeId: storeId}}" replace>{{ storeName }}</router-link></el-breadcrumb-item>
          <el-breadcrumb-item>{{ shopName }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'Flow'" separator="/">
          <el-breadcrumb-item>设备</el-breadcrumb-item>
          <el-breadcrumb-item>流量监控</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'Face'" separator="/">
          <el-breadcrumb-item>设备</el-breadcrumb-item>
          <el-breadcrumb-item>摄像头</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'Counter'" separator="/">
          <el-breadcrumb-item>设备</el-breadcrumb-item>
          <el-breadcrumb-item>智能柜台</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 设置 -->
        <el-breadcrumb v-if="navMenu === 'AccountNumber'" separator="/">
          <el-breadcrumb-item>设置</el-breadcrumb-item>
          <el-breadcrumb-item>账号列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'Role'" separator="/">
          <el-breadcrumb-item>设置</el-breadcrumb-item>
          <el-breadcrumb-item>岗位列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'Power'" separator="/">
          <el-breadcrumb-item>设置</el-breadcrumb-item>
          <el-breadcrumb-item>权限设置</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 工作日志 -->
        <el-breadcrumb v-if="navMenu === 'LoginList'" separator="/">
          <el-breadcrumb-item>工作日志</el-breadcrumb-item>
          <el-breadcrumb-item>登录日志</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'ActiveList'" separator="/">
          <el-breadcrumb-item>工作日志</el-breadcrumb-item>
          <el-breadcrumb-item>操作日志</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'MerchantList'" separator="/">
          <el-breadcrumb-item>数据清理</el-breadcrumb-item>
          <el-breadcrumb-item>商家列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="navMenu === 'StoreList'" separator="/">
          <el-breadcrumb-item>数据清理</el-breadcrumb-item>
          <el-breadcrumb-item>商家列表</el-breadcrumb-item>
          <el-breadcrumb-item>门店列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 导航 end -->
      <!-- 主要内容 start -->
      <div class="main">
        <router-view></router-view>
      </div>
      <!-- 主要内容 end -->
    </div>
</template>

<script>
export default {
  name: 'templates',
  data () {
    return {
      navMenu: '',
      upperLevelMenu: '',
      orderSn: '',
      orderId: '',
      projectId: '',
      splice: '',
      storeId:'',
      singleParsentId:''
    }
  },
  created: function () {
  },
  methods: {
  }
}
</script>

<style scoped>
.templates {
  padding: 0 !important;
}
.templates .nav-menu {
  height: 49px;
  border-bottom: 1px solid #cccccc;
}

.templates .main {
  padding: 20px;
}
</style>
