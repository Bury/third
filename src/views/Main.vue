<!-- 用户登录后的首页 -->
<template>
    <div class="main-box">
      <navbar ref="header"></navbar>
      <sidebar ref="leftmenu"></sidebar>
      <div class="content" ref="content">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import Navbar from '../components/main/Navbar'
import Sidebar from '../components/main/Sidebar'

export default {
  name: 'main-box',
  components: {
    Navbar,
    Sidebar
  },
  data () {
    return {
    }
  },
  created: function () {
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      let pathName = this.$route.name
      // 判断当前路径，设置菜单效果
      let usercenter = this.$refs.content
      let sidebar = this.$refs.leftmenu

      if (usercenter) {
        usercenter.navMenu = pathName
      }
       console.log(pathName)
      switch (pathName) {
        // 商家
        case 'BusinessList':
        case 'Modules':
          sidebar.defaultActive = '2-1'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'tagManage':
          sidebar.defaultActive = '9'
           sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'childsTag':
          sidebar.defaultActive = '9'
           sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        // 设备
        case 'Pallet':
        case 'Store':
        case 'Device':
          sidebar.defaultActive = '3-1'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'Flow':
          sidebar.defaultActive = '3-2'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'Face':
          sidebar.defaultActive = '3-3'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'Counter':
          sidebar.defaultActive = '3-4'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        // 设置
        case 'AccountNumber':
          sidebar.defaultActive = '4-1'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'Role':
          sidebar.defaultActive = '4-2'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'Power':
          sidebar.defaultActive = '4-3'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        // 工作日志
        case 'LoginList':
          sidebar.defaultActive = '5-1'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'ActiveList':
          sidebar.defaultActive = '5-2'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        //鹰眼人脸数据测试
        case 'FaceSampleGrouping':
          sidebar.defaultActive = '6-1'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break

        case 'TimeFrameList':
          sidebar.defaultActive = '8-1'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'FaceSampleManage':
        case 'RecognitionResult':
        case 'RecognitionList':
          sidebar.defaultActive = '6-2'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'RecognitionResultsFound':
        //  鹰眼数据
        case 'ActualArgument':
          sidebar.defaultActive = '7-0'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'DataSetting':
          sidebar.defaultActive = '7-1'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'DataList':
          sidebar.defaultActive = '7-2'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'MergeFace':
        case 'MegerRecord':
        case 'ArriveRecord':
        case 'AbnormalDataList':
          sidebar.defaultActive = '7-3'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'DataStatistics':
          sidebar.defaultActive = '7-4'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'ErrorDataList':
          sidebar.defaultActive = '7-6'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'DataRecyleBin':
          sidebar.defaultActive = '7-7'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'EyeDataList':
          sidebar.defaultActive = '7-8'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'ObservationSetting':
          sidebar.defaultActive = '7-9'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        case 'DistinguishStatistics':
          sidebar.defaultActive = '7-10'
          sidebar.imgSrcHome = 'static/images/main/home.png'
          break
        //   usercenter.topMenu = ''
        //   usercenter.left_menu_active = '0'
        //   usercenter.top_menu_active = '0'
        //   break
      }
    }
  }
}
</script>

<style scoped>
.main-box {
  background-color: #495b6c;
  min-width: 1200px;
}

.main-box .sidebar {
  width: 190px;
  min-width: 190px;
}

.main-box .content {
  color: black;
  margin-left: 190px;
  margin-top: 45px;
  background-color: #f9f9f9;
  overflow-y: auto;
  overflow-x: hidden;
}

.main-box .content > div {
  padding: 20px;
}

.main-box .customer-service {
  width: 40px;
  height: 40px;
  position: fixed;
  right: 40px;
  bottom: 30px;
  line-height: 40px;
  z-index: 9991;
  cursor: pointer;
}

.main-box .customer-servic img {
  vertical-align: middle;
  width: 40px;
  height: 40px;
  padding: 65px 20px 0px 20px;
}
</style>
