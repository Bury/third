<template>
  <div class="sidebar fixed">
    <div class="sidebar-inner scrollable-sidebar">
        <div class="main-menu">
          <el-menu :default-active="defaultActive"
                   :default-openeds="openeds"
                   class="el-menu-vertical-demo"
                   @select="handleSelect">
            <template v-for="(item,index) in tableData">
              <el-menu-item class="leftIcon" :index="item.front_url" :key="index" v-if="item.no_child">
                <div>
                  <i :class="item.front_icon"></i>
                  <span slot="title">{{item.name}}</span>
                </div>

              </el-menu-item>

              <el-submenu v-else  :key="index"  :index="item.front_url">
                <template slot="title">
                  <i  :class="item.front_icon"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <template v-for="(item1,index1) in item.children">
                  <el-menu-item :index="item1.front_url" :key="index1" style="padding-left:53px;">
                    <div>
                      {{item1.name}}
                    </div>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>

           <!--menu start -->
            <!--<el-menu :default-active="defaultActive"-->
                     <!--:default-openeds="openeds"-->
                     <!--class="el-menu-vertical-demo"-->
                     <!--@select="handleSelect">-->
                <!--<el-menu-item index="1">-->

                  <!--<router-link :to="{name: 'Dashboard'}" replace><i class="iconfont icon-tongji"></i>统计</router-link>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="9">-->

                  <!--<router-link :to="{name: 'tagManage'}" replace><i class="iconfont icon-biaoqianguanli"></i>标签管理</router-link>-->
                <!--</el-menu-item>-->
                <!--<el-submenu index="2">-->
                    <!--<template slot="title"><i class="iconfont icon-shangjia"></i>商家</template>-->
                    <!--<el-menu-item index="2-1"><router-link :to="{name: 'BusinessList'}" replace>商家管理</router-link></el-menu-item>-->
                <!--</el-submenu>-->
              <!--<el-submenu index="6">-->
                <!--<template slot="title"><i class="iconfont icon-iconset0450"></i>鹰眼数据测试对比</template>-->
                <!--<el-menu-item index="6-1"><router-link :to="{name: 'FaceSampleGrouping'}" replace>人脸样本分组管理</router-link></el-menu-item>-->
                <!--<el-menu-item index="6-2"><router-link :to="{name: 'RecognitionList'}" replace>人脸识别结果记录</router-link></el-menu-item>-->
              <!--</el-submenu>-->
							<!--&lt;!&ndash;<el-submenu index="8">&ndash;&gt;-->
								<!--&lt;!&ndash;<template slot="title"><img src="static/images/main/myqc.png">监控数据</template>&ndash;&gt;-->
								<!--&lt;!&ndash;<el-menu-item index="8-1"><router-link :to="{name: 'EyeDataList'}" replace>数据列表</router-link></el-menu-item>&ndash;&gt;-->
							<!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->

              <!--<el-submenu index="7">-->
                <!--<template slot="title"><i class="iconfont icon-shujufenxi"></i>鹰眼实时数据观测</template>-->
                <!--<el-menu-item index="7-0"><router-link :to="{name: 'ActualArgument'}" replace>实际使用参数同步</router-link></el-menu-item>-->
                <!--<el-menu-item index="7-9"><router-link :to="{name: 'ObservationSetting'}" replace>观测识别基准设置</router-link></el-menu-item>-->
                <!--<el-menu-item index="7-1"><router-link :to="{name: 'DataSetting'}" replace>正常参数基准设置</router-link></el-menu-item>-->
                <!--<el-menu-item index="7-2"><router-link :to="{name: 'DataList'}" replace>数据列表</router-link></el-menu-item>-->
                <!--<el-menu-item index="7-3"><router-link :to="{name: 'AbnormalDataList'}" replace>异常数据列表</router-link></el-menu-item>-->
                <!--<el-menu-item index="7-4"><router-link :to="{name: 'DataStatistics'}" replace>参数统计</router-link></el-menu-item>-->
                <!--<el-menu-item index="7-10"><router-link :to="{name: 'DistinguishStatistics'}" replace>识别统计</router-link></el-menu-item>-->
                <!--<el-menu-item index="7-6"><router-link :to="{name: 'ErrorDataList'}" replace>错误数据列表</router-link></el-menu-item>-->
                <!--<el-menu-item index="7-7"><router-link :to="{name: 'DataRecyleBin'}" replace>回收站</router-link></el-menu-item>-->
                <!--<el-menu-item index="7-8"><router-link :to="{name: 'EyeDataList'}" replace>监控视频观察结果</router-link></el-menu-item>-->
              <!--</el-submenu>-->
                <!--<el-submenu index="3">-->
                    <!--<template slot="title"><i class="iconfont icon-shexiangtouxianxing"></i>设备</template>-->
                    <!--&lt;!&ndash;<el-menu-item index="3-1"><router-link :to="{name: 'Pallet'}" replace>看货盘</router-link></el-menu-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-menu-item index="3-2"><router-link :to="{name: 'Flow'}" replace>流量监控设备</router-link></el-menu-item>&ndash;&gt;-->
                    <!--<el-menu-item index="3-3"><router-link :to="{name: 'Face'}" replace>人脸识别设备</router-link></el-menu-item>-->
                    <!--&lt;!&ndash;<el-menu-item index="3-4"><router-link :to="{name: 'Counter'}" replace>智能货柜</router-link></el-menu-item>&ndash;&gt;-->
                <!--</el-submenu>-->
                <!--<el-submenu index="4">-->
                    <!--<template slot="title"><i class="iconfont icon-shezhi1"></i>设置</template>-->
                    <!--<el-menu-item index="4-1"><router-link :to="{name: 'AccountNumber'}" replace>账号列表</router-link></el-menu-item>-->
                    <!--<el-menu-item index="4-2"><router-link :to="{name: 'Role'}" replace>岗位列表</router-link></el-menu-item>-->
                    <!--&lt;!&ndash;<el-menu-item index="4-3"><router-link :to="{name: 'Power'}" replace>权限设置</router-link></el-menu-item>&ndash;&gt;-->
                <!--</el-submenu>-->
                <!--<el-submenu index="5">-->
                    <!--<template slot="title"><i class="iconfont icon-rizhiriqi"></i>工作日志</template>-->
                    <!--<el-menu-item index="5-1"><router-link :to="{name: 'LoginList'}" replace>登录日志</router-link></el-menu-item>-->
                    <!--<el-menu-item index="5-2"><router-link :to="{name: 'ActiveList'}" replace>操作日志</router-link></el-menu-item>-->
                <!--</el-submenu>-->
              <!--<el-submenu index="10">-->
                <!--<template slot="title"><i class="iconfont icon-weibiaoti-"></i>数据清理</template>-->
                <!--<el-menu-item index="10-1"><router-link :to="{name: 'MerchantList'}" replace>商家列表</router-link></el-menu-item>-->
              <!--</el-submenu>-->
            <!--</el-menu>-->
          <!-- menu end -->
        </div><!-- /main-menu -->
        <div class="footer">
            <div class="info">
              杭州知己科技有限公司<br/>
              版权所有
            </div>
            <div class="version">版本号：1.0.0</div>
        </div>
    </div><!-- /sidebar-inner -->
  </div>
</template>

<script>
  import userApi from '../../api/user'
export default {
  name: 'sidebar',
  data () {
    return {
      defaultActive: '1',
      openeds: ['2', '3', '4', '5','8'],
      imgSrcHome: 'static/images/main/home_active.png',
      tableData:[],
    }
  },
  created: function () {
    this.menu();
  },
  methods: {
    menu(){
      let qs = require('querystring');
      userApi.menu(qs.stringify()).then((res) => {
        // console.log(res.data.data);
        this.$data.tableData = res.data.data;
      })
    },
    handleSelect (key, keyPath) {
      // console.log(key);
      // console.log(keyPath);
      // 设置默认 active 为当前的 index 就是这里的参数 key
      this.defaultActive = key;
      let path;
      if(key == '1'){
        path = 'Dashboard';
      }else if(key == '9'){
        path = 'tagManage';
      }else if(key == '2-1'){
        path = 'BusinessList';
      }else if(key == '6-1'){
        path = 'FaceSampleGrouping';
      }else if(key == '6-2'){
        path = 'RecognitionList';
      }else if(key == '3-3'){
        path = 'Face';
      }else if(key == '5-1'){
        path = 'LoginList';
      }else if(key == '5-2'){
        path = 'ActiveList';
      }else if(key == '4-1'){
        path = 'AccountNumber';
      }else if(key == '4-2'){
        path = 'Role';
      }else if(key == '7-0'){
        path = 'ActualArgument';
      }else if(key == '7-1'){
        path = 'DataSetting';
      }else if(key == '7-9'){
        path = 'ObservationSetting';
      }else if(key == '7-2'){
        path = 'DataList';
      }else if(key == '7-3'){
        path = 'AbnormalDataList';
      }else if(key == '7-4'){
        path = 'DataStatistics';
      }else if(key == '7-10'){
        path = 'DistinguishStatistics';
      }else if(key == '7-6'){
        path = 'ErrorDataList';
      }else if(key == '7-7'){
        path = 'DataRecyleBin';
      }else if(key == '7-8'){
        path = 'EyeDataList';
      }else if(key == '10-1'){
        path = 'MerchantList';
      }

      this.$router.replace({
        name:path
      })
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo i{
    width: 16px;
    height: 16px;
    font-size: 16px;
    /*color: #fff;*/
    margin-right:8px;
  }
.sidebar {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  position: fixed;
  display: block;
  width: 197px;
  z-index: 100;
  left: 0;
  bottom: 0;
  top: 45px;
  height: 100% - 45px;
  background-color: #495b6c;
}
.sidebar .sidebar-inner {
  background-color: #495b6c;
}
.sidebar .sidebar-inner .user-block {
  padding: 10px 0px 6px 16px;
  box-shadow: 0 1px 0 #34364a;
  -moz-box-shadow: 0 1px 0 #34364a;
  -webkit-box-shadow: 0 1px 0 #34364a;
  height: 50px;
}
.sidebar .sidebar-inner .user-block img {
  float: left;
  width: 40px;
  height: 40px;
  border-radius: 50em;
  -moz-border-radius: 50em;
  -webkit-border-radius: 50em;
  animation: fadeInRotate 0.9s ease;
  -webkit-animation: fadeInRotate 0.9s ease;
  -moz-animation: fadeInRotate 0.9s ease;
  -ms-animation: fadeInRotate 0.9s ease;
  -o-animation: fadeInRotate 0.9s ease;
  border: solid 1px #979797;
}
.sidebar .sidebar-inner .user-block .detail {
  float: left;
  color: #e6f1f7;
  margin-left: 10px;
  padding-top: 10px;
  text-align: left;
}

.sidebar .sidebar-inner .user-block .detail .name {
  font-size: 13px;
  color: #ffffff;
  text-align: center;
  max-width: 80px;
}

.sidebar .sidebar-inner .user-block .detail .grade {
  font-size: 11px;
  color: #ffffff;
  opacity: 0.5;
}

.sidebar .main-menu {
  width: 197px;
  height: 100%;
}

.sidebar .footer {
  background-color: #495b6c;
  margin-top: 40px;
}

.sidebar .footer .logo{
  text-align: center;
}

.sidebar .footer img {
  width: 40px;
  height: 40px;
}

.sidebar .footer .info {
  padding: 3px;
  font-size: 11px;
  text-align: center;
  color: #99a9bf;
}

.sidebar .footer .version {
  margin-top: 20px;
  font-size: 11px;
  text-align: center;
  color: #99a9bf;
}

.sidebar .el-menu-item.is-active a {
  color: #4a4a4a;
}

.sidebar a {
  display: block;
  width: 150px;
}
</style>
