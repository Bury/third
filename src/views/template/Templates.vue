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

        <el-breadcrumb v-if="navMenu === 'Modules'" separator="/">
          <el-breadcrumb-item>商家</el-breadcrumb-item>
          <el-breadcrumb-item><router-link :to="{ name: 'BusinessList' }" replace>商家管理</router-link></el-breadcrumb-item>
          <el-breadcrumb-item>模块&nbsp;&nbsp;{{ name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 设备 -->
        <el-breadcrumb v-if="navMenu === 'Pallet'" separator="/">
          <el-breadcrumb-item>设备</el-breadcrumb-item>
          <el-breadcrumb-item>看货盘</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'Store'" separator="/">
          <el-breadcrumb-item>设备</el-breadcrumb-item>
          <el-breadcrumb-item><router-link :to="{ name: 'Pallet' }" replace>看货盘</router-link></el-breadcrumb-item>
          <el-breadcrumb-item>门店&nbsp;&nbsp;{{ storeId }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'Flow'" separator="/">
          <el-breadcrumb-item>设备</el-breadcrumb-item>
          <el-breadcrumb-item>流量监控</el-breadcrumb-item>
        </el-breadcrumb>

        <el-breadcrumb v-if="navMenu === 'Face'" separator="/">
          <el-breadcrumb-item>设备</el-breadcrumb-item>
          <el-breadcrumb-item>人脸识别</el-breadcrumb-item>
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
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
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
      splice: ''
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
