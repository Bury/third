import Vue from 'vue'
import Router from 'vue-router'

// 贸点点web 框架
import Main from '../views/Main'
import Dashboard from '../views/Dashboard'
import Templates from '../views/template/Templates'

// 登录页面
import Home from '../views/Home'

//商家
import BusinessList from '../views/business/businessList'
import Modules from '../views/business/modules'

import Counter from '../views/equipment/counter'
import Face from '../views/equipment/face'
import Flow from '../views/equipment/flow'
import Pallet from '../views/equipment/pallet'
import Store from '../views/equipment/store'
import Device from '../views/equipment/device'

import AccountNumber from '../views/setup/accountNumber'
import Power from '../views/setup/power'
import Role from '../views/setup/role'

import ActiveList from '../views/worklog/activeList'
import LoginList from '../views/worklog/loginList'
//鹰眼人脸数据测试
import FaceSampleGrouping from '../views/faceDataTest/faceSampleGrouping'
import FaceSampleManage from '../views/faceDataTest/faceSampleManage'
import RecognitionList from '../views/faceDataTest/recognitionList'
import RecognitionResult from '../views/faceDataTest/recognitionResult'
import RecognitionResultsFound from '../views/faceDataTest/recognitionResultsFound'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Home,
      meta: { auth: false }
    },
    {
    path: '/',
    component: Main,
    children: [{
      path: '',
      name: 'Dashboard',
      component: Dashboard
    },{
      path: 'business',
      component: Templates,
      children: [
          // 商家列表
          { path: '', name: 'BusinessList', component: BusinessList },
          { path: 'modules/:id', name: 'Modules', component: Modules }
      ]
    },{
      path:'faceDataTest',
      component:Templates,
      children:[
        //鹰眼人脸数据测试
        {path:'FaceSampleGrouping',name:'FaceSampleGrouping',component:FaceSampleGrouping},
        {path:'FaceSampleManage/:id&&:name',name:'FaceSampleManage',component:FaceSampleManage},
        {path:'RecognitionList',name:'RecognitionList',component:RecognitionList},
        {path:'RecognitionResult/:id',name:'RecognitionResult',component:RecognitionResult},
        {path:'RecognitionResultsFound/:id',name:'RecognitionResultsFound',component:RecognitionResultsFound},
      ]
    },{
      path: 'equipment',
      component: Templates,
      children: [
          // 设备
          { path: 'counter', name: 'Counter', component: Counter },
          { path: 'face', name: 'Face', component: Face },
          { path: 'flow', name: 'Flow', component: Flow },
          { path: 'pallet', name: 'Pallet', component: Pallet },
          { path: 'store/:storeId', name: 'Store', component: Store },
          { path: 'device/:shopId', name: 'Device', component: Device }
      ]
    },{
      path: 'setup',
      component: Templates,
      children: [
          // 设置
          { path: 'accountNumber', name: 'AccountNumber', component: AccountNumber },
          { path: 'power', name: 'Power', component: Power },
          { path: 'role', name: 'Role', component: Role }
      ]
    },{
      path: 'worklog',
      component: Templates,
      children: [
          // 日志
          { path: 'loginlist', name: 'LoginList', component: LoginList },
          { path: 'activelist', name: 'ActiveList', component: ActiveList }
      ]
    }]
  }]
})
export default router
