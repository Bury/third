

import * as utils from '@/utils/index'
import dataCollectApi from '@/api/dataCollect'
import storage from '@/utils/storage'
const cityOptions = [
  {'name':'姿态角度','id':1},
  {'name':'光照','id':2},
  {'name':'模糊度','id':3},
  {'name':'遮挡','id':4},
  {'name':'脸完整度','id':5},
];
// const cityOptions = ['姿态角度','光照','模糊度','遮挡','脸完整度'];
export default {

  name: 'dashboard',

  components: {

  },

  data () {
    return {
      noTimeHide:false,
      goStoreNum:'',
      timeType: 'all',
      day:'',
      week:'',
      month:'',
      year:'',
      userDefined:[],
      ctrlTimeType:[true,false,false,false,false,false],
      chartClass:'line',
      guestData:{},
      guestVisitedInfoData:[],
      guestBoughtInfoData:[],
      ageData:[],
      guestGenderData:[],
      guestFromData:[],
      guestParameters:{
        begin_time:'',
        end_time:'',
      },
      pickerOptionsSet:{
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      storeId:'',
      location:'',
      input:'',
      radio:2,
      noFilter:true,
      yesFilter:false,
      FormVisible:false,
      dialogTitle:'',
      checkAll: false,
      FaceVisible:false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      getBDImg:[],
      faceId:'',
      errorType:'',
      merchantId:'',
      ruleForm:{
        pitchA:'',
        pitchB:'',
        rollA:'',
        rollB:'',
        yawA:'',
        yawB:'',
        dimA:'',
        dimB:'',
        faceAll:'',
        keepOut:'',
        illA:'',
        illB:'',
        faceIsAll:'',
        left_eye_st:'',
        left_eye_ed:'',
        right_eye_st:'',
        right_eye_ed:'',
        nose_st:'',
        nose_ed:'',
        mouth_st:'',
        mouth_ed:'',
        left_cheek_st:'',
        left_cheek_ed:'',
        right_cheek_st:'',
        right_cheek_ed:'',
        chin_contour_st:'',
        chin_contour_ed:''
      },
      rules:{

      },
      optionsA:[
        {value:0,name:0},
        {value:0.1,name:0.1},
        {value:0.2,name:0.2},
        {value:0.3,name:0.3},
        {value:0.4,name:0.4},
        {value:0.5,name:0.5},
        {value:0.6,name:0.6},
        {value:0.7,name:0.7},
        {value:0.8,name:0.8},
        {value:0.9,name:0.9},
      ],
      optionsB:[
        {value:0.1,name:0.1},
        {value:0.2,name:0.2},
        {value:0.3,name:0.3},
        {value:0.4,name:0.4},
        {value:0.5,name:0.5},
        {value:0.6,name:0.6},
        {value:0.7,name:0.7},
        {value:0.8,name:0.8},
        {value:0.9,name:0.9},
        {value:1,name:1},
      ],
      equipmentsList:[],
      locationList:[],
      merchantList:[],
      checkList:[],
      tableData3: [],
      pages:'',
      list:{
        'list_type':0,
        'merchant_id':'',
        'store_id':'',
        'device_id':'',
        'st_time':'',
        'ed_time':'',
        'st_age':'',
        'ed_age':'',
        'gender':'',
        'completeness':'',
        'occlusion':'',
        'st_pitch': '',
        'ed_pitch': '',
        'st_yaw': '',
        'ed_yaw': '',
        'st_roll': '',
        'ed_roll': '',
        'st_illumination': '',
        'ed_illumination': '',
        'st_blur': '',
        'ed_blur': '',
        'occlusion':'',
        // 'un_angle':0,
        // 'un_illumination':0,
        // 'un_blur':0,
        // 'un_occlusion':0,
        // 'un_completeness':0,
        'un_data':'',
        'err_gender':'',
        'err_age':'',
        'err_match':'',
        'page':1,
        'page_size':10,
      //  遮挡
        'left_eye_st':'',
        'left_eye_ed':'',
        'right_eye_st':'',
        'right_eye_ed':'',
        'nose_st':'',
        'nose_ed':'',
        'mouth_st':'',
        'mouth_ed':'',
        'left_cheek_st':'',
        'left_cheek_ed':'',
        'right_cheek_st':'',
        'right_cheek_ed':'',
        'chin_contour_st':'',
        'chin_contour_ed':''
      },
      checkList:[],
      checkListId:[],
      idOrChangeMark:'',
      errText:'',
      postUnData:'',
      PostLocalList:'',
      // currentPage:1,

      // un_angle:0,
      // un_illumination:0,
      // un_blur:0,
      // un_occlusion:0,
      // un_completeness:0,
      getBackCheck:'',
    }
  },

  created:function(){
    // this.setData();
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.upperLevelMenu = '';
    this.$data.routerId = this.$route.params.id;
    if(this.$data.routerId === 1){
      this.$data.PostLocalList = storage.getLocalStorage('postList');
      console.log(this.$data.PostLocalList);
      console.log(this.$data.PostLocalList.st_pitch);
      console.log(this.$data.PostLocalList.ed_pitch);
      //填充取到的数据
      //-商家联动
      this.$data.merchantId = this.$data.PostLocalList.merchant_id;
      this.GETmerchantId(this.$data.PostLocalList.merchant_id)
      this.$data.storeId =this.$data.PostLocalList.store_id;
      this.GETstoreId(this.$data.PostLocalList.store_id);
      this.$data.location = this.$data.PostLocalList.device_id ;
      //-筛选条件
      this.$data.ruleForm.pitchA = this.$data.PostLocalList.st_pitch;
      this.$data.ruleForm.pitchB = this.$data.PostLocalList.ed_pitch;
      this.$data.ruleForm.yawA = this.$data.PostLocalList.st_yaw;
      this.$data.ruleForm.yawB = this.$data.PostLocalList.ed_yaw;
      this.$data.ruleForm.rollA = this.$data.PostLocalList.st_roll;
      this.$data.ruleForm.rollB = this.$data.PostLocalList.ed_roll;
      this.$data.ruleForm.illA = this.$data.PostLocalList.st_illumination;
      this.$data.ruleForm.illB = this.$data.PostLocalList.ed_illumination;
      this.$data.ruleForm.dimA = this.$data.PostLocalList.st_blur;
      this.$data.ruleForm.dimB = this.$data.PostLocalList.ed_blur;
      this.$data.ruleForm.keepOut = this.$data.PostLocalList.occlusion;
      this.$data.ruleForm.faceAll = this.$data.PostLocalList.completeness;
      //-遮挡
      this.$data.ruleForm.left_eye_st=this.$data.PostLocalList.left_eye_st;
      this.$data.ruleForm.left_eye_ed=this.$data.PostLocalList.left_eye_ed;
      this.$data.ruleForm.right_eye_st=this.$data.PostLocalList.right_eye_st;
      this.$data.ruleForm.right_eye_ed=this.$data.PostLocalList.right_eye_ed;
      this.$data.ruleForm.nose_st=this.$data.PostLocalList.nose_st;
      this.$data.ruleForm.nose_ed=this.$data.PostLocalList.nose_ed;
      this.$data.ruleForm.mouth_st=this.$data.PostLocalList.mouth_st;
      this.$data.ruleForm.mouth_ed=this.$data.PostLocalList.mouth_ed;
      this.$data.ruleForm.left_cheek_st=this.$data.PostLocalList.left_cheek_st;
      this.$data.ruleForm.left_cheek_ed=this.$data.PostLocalList.left_cheek_ed;
      this.$data.ruleForm.right_cheek_st=this.$data.PostLocalList.right_cheek_st;
      this.$data.ruleForm.right_cheek_ed=this.$data.PostLocalList.right_cheek_ed;
      this.$data.ruleForm.chin_contour_st=this.$data.PostLocalList.chin_contour_st;
      this.$data.ruleForm.chin_contour_ed=this.$data.PostLocalList.chin_contour_ed;
      //  -时间
      console.log(storage.getLocalStorage('timeType'));
      this.$data.timeType = storage.getLocalStorage('timeType');
      if(this.$data.timeType === 'month'){
        this.$data.ctrlTimeType = [false,false,false,true,false,false];
        console.log(this.$data.PostLocalList.st_time);
        console.log(this.TimeOut(this.$data.PostLocalList.st_time,4))
        if(this.$data.PostLocalList.st_time == null || this.$data.PostLocalList.st_time == 0){
          this.$data.month = '';
        }else{
          this.$data.month = this.TimeOut(this.$data.PostLocalList.st_time,4);
        }

      }else if(this.$data.timeType === 'all'){
        this.$data.ctrlTimeType = [true,false,false,false,false,false];
        console.log(this.$data.PostLocalList.st_time);
        console.log(this.$data.PostLocalList.ed_time);
        // console.log(this.TimeOut(this.$data.PostLocalList.st_time,4))
        // console.log(this.TimeOut(this.$data.PostLocalList.ed_time,4))
        if(this.$data.PostLocalList.st_time == null || this.$data.PostLocalList.st_time == 0){
          this.$data.userDefined[0] = '';
          this.$data.userDefined[1] = '';
        }else{
          this.$data.userDefined[0] = this.TimeOut(this.$data.PostLocalList.st_time,4);
          this.$data.userDefined[1] = this.TimeOut(this.$data.PostLocalList.ed_time,4);
        }
      }else if(this.$data.timeType === 'day'){
        this.$data.ctrlTimeType = [false,true,false,false,false,false];
        // console.log(this.$data.PostLocalList.st_time);
        if(this.$data.PostLocalList.st_time == null || this.$data.PostLocalList.st_time == 0){
          this.$data.day = '';
        }else{
          this.$data.day = this.TimeOut(this.$data.PostLocalList.st_time,4);
        }
        // console.log(this.TimeOut(this.$data.PostLocalList.st_time,4))
        // console.log(this.TimeOut(this.$data.PostLocalList.ed_time,4))

        // this.$data.day[1] = this.TimeOut(this.$data.PostLocalList.ed_time,4);
      }else if(this.$data.timeType === 'week'){
        this.$data.ctrlTimeType = [false,false,true,false,false,false];
        // console.log(this.$data.PostLocalList.st_time);
        // console.log(this.TimeOut(this.$data.PostLocalList.st_time,4))
        // console.log(this.TimeOut(this.$data.PostLocalList.ed_time,4))
        if(this.$data.PostLocalList.st_time == null || this.$data.PostLocalList.st_time == 0){
          this.$data.week = '';
        }else {
          let t = new Date();
          let y = t.getFullYear();
          let m = t.getMonth() + 1;
          let d = t.getDate();
          let weekd  = t.getDay();
          if(weekd === 0){ weekd = 7 }
          this.$data.PostLocalList.st_time = this.getS(`${y}/${m}/${d} 00:00:00`) - 86400*(weekd-1);
          this.$data.PostLocalList.ed_time =  this.getS(`${y}/${m}/${d} 23:59:59`) + 86400*(7 - weekd);
          this.$data.week =  this.modelDate(this.$data.PostLocalList.st_time)
        }
      }else if(this.$data.timeType === 'year'){
        this.$data.ctrlTimeType = [false,false,false,false,true,false];
        // console.log(this.$data.PostLocalList.st_time);
        // console.log(this.TimeOut(this.$data.PostLocalList.st_time,4))
        // console.log(this.TimeOut(this.$data.PostLocalList.ed_time,4))
        if(this.$data.PostLocalList.st_time == null || this.$data.PostLocalList.st_time == 0){
          this.$data.year = '';
        }else {
          this.$data.PostLocalList.st_time = this.getS(`${y}/01/01 00:00:00`);
          this.$data.PostLocalList.ed_time =  this.getS(`${y}/12/31 23:59:59`);
          this.$data.year =  this.modelDate(this.$data.PostLocalList.st_time)
        }

      }else if(this.$data.timeType === 'userDefined'){
        this.$data.ctrlTimeType = [false,false,false,false,false,true];
        // console.log(this.$data.PostLocalList.st_time);
        // console.log(this.TimeOut(this.$data.PostLocalList.st_time,4))
        // console.log(this.TimeOut(this.$data.PostLocalList.ed_time,4))
        if(this.$data.PostLocalList.st_time == null || this.$data.PostLocalList.st_time == 0){
          this.$data.userDefined[0] = '';
          this.$data.userDefined[1] = '';
        }else {
          this.$data.userDefined[0] = this.TimeOut(this.$data.PostLocalList.st_time,4);
          this.$data.userDefined[1] = this.TimeOut(this.$data.PostLocalList.ed_time,4);
        }

      }
    //  -勾选异常
      if(this.$data.PostLocalList.un_data !== ''){
        if(this.$data.PostLocalList.un_data === '1'){
          this.$data.checkAll == true;
          this.$data.checkedCities = [1];
        }else if(this.$data.PostLocalList.un_data === '1,2'){
          this.$data.checkAll == true;
          this.$data.checkedCities = [1,2];
        }else if(this.$data.PostLocalList.un_data === '1,2,3'){
          this.$data.checkAll == true;
          this.$data.checkedCities = [1,2,3];
        }else if(this.$data.PostLocalList.un_data === '1,2,3,4'){
          this.$data.checkAll == true;
          this.$data.checkedCities = [1,2,3,4];
        }else if(this.$data.PostLocalList.un_data === '1,2,3,4,5'){
          this.$data.checkAll == true;
          this.$data.checkedCities = [1,2,3,4,5];
        }
      }
    //  是否过滤异常
      console.log(storage.getLocalStorage('radio'))
      if(storage.getLocalStorage('radio') === 2){
        this.$data.radio = 2;
        this.$data.noFilter = true;
        this.yesFilter = false;
      }else if(storage.getLocalStorage('radio') === 1){
        this.$data.radio = 1;
        this.yesFilter = true;
        this.$data.noFilter = false;
      }
      //分页显示
      console.log(this.$data.PostLocalList.page)
      // this.$data.currentPage = this.$data.PostLocalList.page;
      // this.$data.PostLocalList.page = this.$data.PostLocalList.page;
      // this.handleCurrentChange(this.$data.PostLocalList.page);
      this.LocalList();
    }else{
      console.log('原始');
      this.dataList();
    }
    this.$data.checkListId = [];

    this.getMerchant();
    this.dataBack();
  },
mounted(){
  // storage.setLocalStorage('postList','');
  // storage.setLocalStorage('timeType','');
  // storage.setLocalStorage('radio','');
},
  methods: {
    //商家下拉
    getMerchant(){
      let list = {
        'type': 0,
        'parent_id': 0,
      }
      let qs = require('querystring')
      dataCollectApi.getDepartList(qs.stringify(list)).then((response) => {
        // console.log(response.data.data);
        this.$data.merchantList = response.data.data;
      })
    },
    //门店下拉
    GETmerchantId(val){
      let list = {
        'type': 1,
        'parent_id': val,
      }
      let qs = require('querystring')
      dataCollectApi.getDepartList(qs.stringify(list)).then((response) => {
        // console.log(response.data.data);
        this.$data.equipmentsList = response.data.data;
      })
    },
    //联动获取位置
    GETstoreId(val){
      let list = {
        'type': 2,
        'parent_id': val,
      }
      let qs = require('querystring')
      dataCollectApi.getDepartList(qs.stringify(list)).then((response) => {
        // console.log(response.data.data);
        this.$data.locationList = response.data.data;
      })
    },
    //获取观测识别标准
    dataBack(){
      let list = {}
      let qs = require('querystring')
      dataCollectApi.seeMacthSet(qs.stringify(list)).then((response) => {
        console.log(response.data.data.match_set);
        this.$data.getBackCheck = response.data.data.match_set;
      })
    },
    //数据列表
    dataList(){
      // let list = {
      //   'merchant_id':'',
      //   'store_id':'',
      //   'device_id':'',
      //   'st_time':'',
      //   'ed_time':'',
      //   'st_age':'',
      //   'ed_age':'',
      //   'gender':'',
      //   'completeness':'',
      //   'occlusion':'',
      //   'pitch_st': '',
      //   'pitch_ed': '',
      //   'yaw_st': '',
      //   'yaw_ed': '',
      //   'roll_st': '',
      //   'roll_ed': '',
      //   'illumination_st': '',
      //   'illumination_ed': '',
      //   'blur_st': '',
      //   'blur_ed': '',
      //   'page':1,
      //   'page_size':10,
      // }
      let qs = require('querystring')
      dataCollectApi.dataListFace(qs.stringify(this.$data.list)).then((response) => {
        console.log(response.data.data.list);
        this.$data.tableData3 = response.data.data.list;
        this.pages = response.data.data.pagination;
      })
    },
    //缓存数据列表
    LocalList(){
      let qs = require('querystring')
      dataCollectApi.dataListFace(qs.stringify(this.$data.PostLocalList)).then((response) => {
        console.log(response.data.data.list);
        this.$data.tableData3 = response.data.data.list;
        this.pages = response.data.data.pagination;
      })
    },
    //切换分页
    handleCurrentChange(val){
      //this.$data.routerId === 1   storage.getLocalStorage('postList') === ''
      console.log(val);
      if(this.$data.routerId === 1){
        console.log('我走了存储')
        this.$data.PostLocalList.page = val;
        this.$data.currentPage = val;
        this.LocalList();
        // this.dataList();
      }else{
        console.log('我走了原生');
        this.$data.list.page = val;
        this.$data.currentPage = val;
        this.dataList();
      }
      // this.$data.list.page = val;
      // this.$data.currentPage = val;
      // this.dataList();

    },
    //直接跳转分页
    handleSizeChange(val){
      if(this.$data.routerId === 1){
        console.log('我调动了点击事件')
        this.$data.PostLocalList.page = val;
        this.$data.currentPage = val;
        this.LocalList();
      }else{
        this.$data.list.page = val;
        this.$data.currentPage = val;
        this.dataList();
      }
    },
    //时间转为秒
    getS(value){
      var formatTimeS = new Date(value).getTime()/1000;
      return  formatTimeS
    },

    //客流量
    getCustomer(parameters){

    },

    //到店人数
    // storeStatistics(d){
    //   let timeData = {
    //     time_start:d.begin_time,
    //     time_end:d.end_time,
    //   };
    //
    // },

    //特征
    statisticsFeature(parameters, types){
      // let list = {
      //   begin_time: parameters.begin_time,
      //   end_time: parameters.end_time,
      //   feature: types
      // }
      // console.log(list)
      // console.log(parameters);
      // console.log(types);
      // console.log(this.$data.userDefined);
      if(types == 'face'){
        this.$data.list.st_time = parameters.begin_time;
        this.$data.list.ed_time = parameters.end_time;
        this.dataList();
      }
      console.log(this.TimeOut(parameters.begin_time,4));
      console.log(this.TimeOut(parameters.end_time,4));
    },

    //查询
    onSubmit(){
      console.log(this.$data.userDefined);
      // this.statisticsFeature();
      console.log(this.$data.timeType);
      if(this.$data.timeType == 'all'){
        this.$data.list.st_time = this.$data.userDefined[0] /1000;
        this.$data.list.ed_time = this.$data.userDefined[1]/1000;
        // console.log(this.$data.list.st_time);
        // console.log(this.$data.list.ed_time);
      }else if(this.$data.timeType == 'day'){
        this.$data.list.st_time = this.getS(this.$data.day);
        this.$data.list.ed_time = this.getS(this.$data.day) + 86399;
      }else if(this.$data.timeType == 'week'){
        this.$data.list.st_time = this.getS(this.$data.week);
        this.$data.list.ed_time = this.getS(this.$data.week) + 604799;
      }else if(this.$data.timeType == 'month'){
        let nexty,nextm;
        let t = new Date(this.$data.month);
        let m = t.getMonth() + 1;
        let y = t.getFullYear();
        m === 12 ? (nexty = y + 1,nextm = 1):(nexty = y,nextm = m + 1)
        this.$data.list.st_time = t.getTime() / 1000;
        this.$data.list.ed_time =  this.getS(`${nexty}/${nextm}/01 00:00:00`) - 1;
      }else if(this.$data.timeType == 'year'){
        let yearDate = new Date(this.$data.year);
        let y = yearDate.getFullYear();
        this.$data.list.st_time = this.getS(`${y}/01/01 00:00:00`);
        this.$data.list.ed_time =  this.getS(`${y}/12/31 23:59:59`);
      }else if(this.$data.timeType == 'userDefined'){
        this.$data.list.st_time = this.$data.userDefined[0] /1000;
        this.$data.list.ed_time = this.$data.userDefined[1]/1000;
      }

      console.log(this.$data.list);
      this.$data.list.merchant_id = this.$data.merchantId;
      // this.$data.list.store_id = '';
      // this.$data.list.device_id = '';
      //传分页
      console.log('分页' + this.$data.currentPage);
      if(this.$data.currentPage == '' || this.$data.currentPage == undefined){
        this.$data.list.page = this.$data.PostLocalList.page;
      }else{
        this.$data.list.page = this.$data.currentPage;
      }


      //筛选信息
        this.$data.list.store_id = this.$data.storeId ;
        this.$data.list.device_id = this.$data.location;
        this.$data.list.st_pitch= this.$data.ruleForm.pitchA,
        this.$data.list.ed_pitch=this.$data.ruleForm.pitchB,
        this.$data.list.st_yaw= this.$data.ruleForm.yawA,
        this.$data.list.ed_yaw= this.$data.ruleForm.yawB,
        this.$data.list.st_roll= this.$data.ruleForm.rollA,
        this.$data.list.ed_roll=this.$data.ruleForm.rollB,
        this.$data.list.st_illumination= this.$data.ruleForm.illA,
        this.$data.list.ed_illumination=this.$data.ruleForm.illB,
        this.$data.list.st_blur= this.$data.ruleForm.dimA,
        this.$data.list.ed_blur= this.$data.ruleForm.dimB,
        this.$data.list.occlusion= this.$data.ruleForm.keepOut,
        this.$data.list.completeness= this.$data.ruleForm.faceAll,
      //    -遮挡
          this.$data.list.left_eye_st = this.$data.ruleForm.left_eye_st;
      this.$data.list.left_eye_ed = this.$data.ruleForm.left_eye_ed;
      this.$data.list.right_eye_st = this.$data.ruleForm.right_eye_st;
      this.$data.list.right_eye_ed = this.$data.ruleForm.right_eye_ed;
     this.$data.list.nose_st =  this.$data.ruleForm.nose_st;
      this.$data.list.nose_ed = this.$data.ruleForm.nose_ed;
      this.$data.list.mouth_st = this.$data.ruleForm.mouth_st;
      this.$data.list.mouth_ed = this.$data.ruleForm.mouth_ed;
     this.$data.list.left_cheek_st =  this.$data.ruleForm.left_cheek_st;
      this.$data.list.left_cheek_ed = this.$data.ruleForm.left_cheek_ed;
      this.$data.list.right_cheek_st = this.$data.ruleForm.right_cheek_st;
      this.$data.list.right_cheek_ed = this.$data.ruleForm.right_cheek_ed;
      this.$data.list.chin_contour_st = this.$data.ruleForm.chin_contour_st;
      this.$data.list.chin_contour_ed = this.$data.ruleForm.chin_contour_ed;
      //过滤异常的
      // console.log(this.$data.checkAll);
      // console.log(this.$data.checkedCities);
      this.$data.postUnData = this.$data.checkedCities.join(',');
      // console.log(this.$data.postUnData);
      this.$data.list.un_data = this.$data.postUnData;
      // console.log(this.$data.list.un_data)


      this.dataList();
    },

    /*
    统计类型切换
    */
    cateChanged(tab, event){
      var nowIdx = tab.index;
      this.$data.ctrlTimeType = [false,false,false,false,false,false];
      this.$data.ctrlTimeType[nowIdx] = true;
      (nowIdx !== 5) && (this.$data.noTimeHide = false);
      this.setData();
      console.log(nowIdx)
      console.log(this.$data.ctrlTimeType)
      console.log(tab)
    },

    //绑定默认时间
    modelDate(t){
      let d = new Date(t*1000);
      return d;
    },
    getBeginEnd(val){
      console.log(val);
      let t = new Date();
      let y = t.getFullYear();
      let m = t.getMonth() + 1;
      let d = t.getDate();
      let weekd  = t.getDay();
      switch (val){
        case "all":
          // if(this.$data.userDefined !== null && this.$data.userDefined.length !== 0){
          //   this.$data.noTimeHide = false;
          //   this.$data.guestParameters.begin_time = utils.getDateTime(this.userDefined[0]);
          //   this.$data.guestParameters.end_time =  utils.getDateTime(this.userDefined[1]);
          //   console.log(this.$data.guestParameters.begin_time);
          //   console.log(this.$data.guestParameters.end_time);
          // }else{
          //   this.$data.noTimeHide = true;
          // }
          break;
        case "day":
          this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`);
          this.$data.guestParameters.end_time =  this.getS(`${y}/${m}/${d} 23:59:59`);
          this.$data.day = this.modelDate(this.$data.guestParameters.begin_time)
          break;
        case "week":
          if(weekd === 0){ weekd = 7 }
          this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`) - 86400*(weekd-1);
          this.$data.guestParameters.end_time =  this.getS(`${y}/${m}/${d} 23:59:59`) + 86400*(7 - weekd);
          this.$data.week =  this.modelDate(this.$data.guestParameters.begin_time)
          break;
        case "month":
          let nexty,nextm;
          m === 12 ? (nexty = y + 1,nextm = 1):(nexty = y,nextm = m + 1)
          this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/01 00:00:00`);
          this.$data.guestParameters.end_time =  this.getS(`${nexty}/${nextm}/01 00:00:00`) - 1;
          this.$data.month =  this.modelDate(this.$data.guestParameters.begin_time)
          break;
        case "year":
          this.$data.guestParameters.begin_time = this.getS(`${y}/01/01 00:00:00`);
          this.$data.guestParameters.end_time =  this.getS(`${y}/12/31 23:59:59`);
          this.$data.year =  this.modelDate(this.$data.guestParameters.begin_time)
          break;
        case "select":
          if(this.$data.userDefined !== null && this.$data.userDefined.length !== 0){
            this.$data.noTimeHide = false;
            this.$data.guestParameters.begin_time = utils.getDateTime(this.userDefined[0]);
            this.$data.guestParameters.end_time =  utils.getDateTime(this.userDefined[1]);
          }else{
            this.$data.noTimeHide = true;
          }
          break;
      }
    },

    setData(){
      console.log(this.$data.ctrlTimeType[0])
      console.log(this.$data.ctrlTimeType[1])
      if(this.$data.ctrlTimeType[0]){
        //all
        this.$data.list.st_time = '';
        this.$data.list.ed_time = '';
        this.dataList();
        // this.getBeginEnd("all")
        // this.requestData();
        return false;
      }
      if(this.$data.ctrlTimeType[1]){
        //日

        this.getBeginEnd("day")
        this.requestData();
        return false;
      }
      if(this.$data.ctrlTimeType[2]){
        //周
        this.getBeginEnd("week")
        this.requestData();
        return false;

      }
      if(this.$data.ctrlTimeType[3]){
        //月
        this.getBeginEnd("month")
        this.requestData();
        return false;
      }
      if(this.$data.ctrlTimeType[4]){
        //年
        this.getBeginEnd("year")
        this.requestData();
        return false;
      }
      if(this.$data.ctrlTimeType[5]){
        //自定义
        this.getBeginEnd("select")
        this.requestData();
        return false;
      }

    },

    requestData(){
      console.log(this.$data.guestParameters)
      this.getCustomer(this.$data.guestParameters);
      this.statisticsFeature(this.$data.guestParameters, 'all');
      this.statisticsFeature(this.$data.guestParameters, 'face');
      this.statisticsFeature(this.$data.guestParameters, 'buy');
      this.statisticsFeature(this.$data.guestParameters, 'age');
      this.statisticsFeature(this.$data.guestParameters, 'gender');
      this.statisticsFeature(this.$data.guestParameters, 'camera');
      // this.storeStatistics(this.$data.guestParameters)
    },
//操作
    add(){
      if(this.$data.checkList == 0){
        this.$message({
          message: '请最少选择一组数据',
          type: 'error',
          center: true
        });
      }else{
        console.log(this.$data.checkListId);
        let deleArry = this.$data.checkListId.join(',');
        console.log(deleArry)
        //合并之前调一次查询，防止上次已经进行一次存了
        this.onSubmit();
        //存储所有填入的值
        storage.setLocalStorage('postList',this.$data.list);
        storage.setLocalStorage('timeType',this.$data.timeType);
        storage.setLocalStorage('radio',this.$data.radio);
        console.log(this.$data.month);
        this.$router.replace({name: 'MergeFace', params: {id:deleArry}})
      }
      this.$data.checkListId = [];
    },
    //勾选状态
    handleSelectionChange(val){
      console.log(val);
      this.$data.checkList = val;
      // this.$data.checkListId = [];
      for(let i = 0; this.$data.checkList.length > 0; i ++){
        let ids = this.$data.checkList[i].id;
        this.$data.checkListId.push(ids);
        console.log(this.$data.checkListId);
      }
    },
  //是否过滤异常
    filterBtn(){
      console.log(this.$data.radio)
      if(this.$data.radio == 1){
        this.$data.yesFilter = true;
        this.$data.noFilter = false;
      //  当为1的时候，勾选状态全取消
        this.$data.checkedCities = [];
        this.$data.checkAll = false;
      }else{
        this.$data.yesFilter = false;
        this.$data.noFilter = true;
      //  当为2的时候，填写的过滤参数为空
        this.$data.ruleForm = {};
      }

    },
    //复选框
    handleCheckAllChange(val) {
      console.log(val);
      // console.log(this.checkedCities)
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
      if(this.$data.checkAll == false){
        this.$data.checkedCities = [];
      }else if(this.$data.checkAll == true){
        this.$data.checkedCities = [1,2,3,4,5]
      }
      console.log(this.$data.checkedCities);
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      console.log(value);
    },
    //模糊度
    dimBtnB(){
      // console.log(parseFloat(this.$data.ruleForm.dimA));
      // console.log(this.$data.ruleForm.dimB);
      // if(parseFloat(this.$data.ruleForm.dimA) == ''){
      //   this.$message({
      //     message: '请先选取开始数据',
      //     type: 'error',
      //     center: true
      //   });
      //   this.$data.ruleForm.dimB = '';
      // }else {
      //   if(parseFloat(this.$data.ruleForm.dimA) >= parseFloat(this.$data.ruleForm.dimB)){
      //     this.$message({
      //       message: '开始范围不能大于结束范围',
      //       type: 'error',
      //       center: true
      //     });
      //     this.$data.ruleForm.dimB = '';
      //   }
        // else {
        //   if(this.$data.ruleForm.dimA > 0.1 || this.$data.ruleForm.dimB > 0.1){
        //     this.$message({
        //       message: '填写范围不合法',
        //       type: 'error',
        //       center: true
        //     });
        //     this.$data.ruleForm.dimA = '';
        //     this.$data.ruleForm.dimB = '';
        //   }
        // }
      // }
    },
    //光照范围判断
    illBBtn(){
      // console.log(this.$data.ruleForm.illA)
      // console.log(this.$data.ruleForm.illB)
      // if(this.$data.ruleForm.illA == ''){
      //   this.$message({
      //     message: '请先填写开始范围',
      //     type: 'error',
      //     center: true
      //   });
      //   this.$data.ruleForm.illB = '';
      // }else{
      //   if(this.$data.ruleForm.illA > this.$data.ruleForm.illB){
      //     this.$message({
      //       message: '开始范围必须小于结束范围',
      //       type: 'error',
      //       center: true
      //     });
      //     this.$data.ruleForm.illA = '';
      //     this.$data.ruleForm.illB = '';
      //   }else{
      //     if(this.$data.ruleForm.illA > 255 || this.$data.ruleForm.illA > 255){
      //       this.$message({
      //         message: '填写范围不合法',
      //         type: 'error',
      //         center: true
      //       });
      //       this.$data.ruleForm.illA = '';
      //       this.$data.ruleForm.illB = '';
      //     }
      //   }
      // }
    },
    // test(a,b,num,type){
    //   // console.log(a);
    //   // console.log(b);
    //   if(a == ''){
    //     this.$message({
    //       message: '请先填写开始范围',
    //       type: 'error',
    //       center: true
    //     });
    //     if(type == 1){
    //       this.$data.ruleForm.pitchB = '';
    //     }else if(type == 2){
    //       this.$data.ruleForm.rollB = '';
    //     }else if(type == 3){
    //       this.$data.ruleForm.yawB = '';
    //     }
    //   }else{
    //     if(a > b){
    //       this.$message({
    //         message: '开始范围必须小于结束范围',
    //         type: 'error',
    //         center: true
    //       });
    //
    //       if(type == 1){
    //         this.$data.ruleForm.pitchA = '';
    //         this.$data.ruleForm.pitchB = '';
    //       }else if(type == 2){
    //         this.$data.ruleForm.rollA = '';
    //         this.$data.ruleForm.rollB = '';
    //       }else if(type == 3){
    //         this.$data.ruleForm.yawA = '';
    //         this.$data.ruleForm.yawB = '';
    //       }
    //     }else{
    //       if(a > num || a < -num){
    //         this.$message({
    //           message: '填写开始范围不合法',
    //           type: 'error',
    //           center: true
    //         });
    //         if(type == 1){
    //           this.$data.ruleForm.pitchA = '';
    //         }else if(type == 2){
    //           this.$data.ruleForm.rollA = '';
    //         }else if(type == 3){
    //           this.$data.ruleForm.yawA = '';
    //         }
    //       }else if(b > num || b < -num){
    //         this.$message({
    //           message: '填写结束范围不合法',
    //           type: 'error',
    //           center: true
    //         });
    //         if(type == 1){
    //           this.$data.ruleForm.pitchB = '';
    //         }else if(type == 2){
    //           this.$data.ruleForm.rollB = '';
    //         }else if(type == 3){
    //           this.$data.ruleForm.yawB = '';
    //         }
    //       }
    //     }
    //   }
    // },
    //姿态角度pitch判断
    pitchBBtn(){
      // this.test(parseFloat(this.$data.ruleForm.pitchA),parseFloat(this.$data.ruleForm.pitchB),90,1);
    },
    //姿态角度roll判断
    rollBBtn(){
      // this.test(parseFloat(this.$data.ruleForm.rollA),parseFloat(this.$data.ruleForm.rollB),180,2);
    },
    //姿态角度yaw判断
    yawBBtn(){
      // this.test(parseFloat(this.$data.ruleForm.yawA),parseFloat(this.$data.ruleForm.yawB),90,3);
    },

  //  列表标记错误-性别
    takeError(val,type){
      this.$data.FormVisible = true;
      this.$data.dialogTitle = '标记';
      // console.log(val.id);
      this.$data.faceId = val.id;
      this.$data.errorType = type;
      // console.log(val.gender_mark);
      if(val.gender_mark == 0){
        this.$data.idOrChangeMark = 1;
        this.$data.errText = '错误';
      }else if(val.gender_mark == 1){
        this.$data.idOrChangeMark = 0;
        this.$data.errText = '正确';
      }
      //|| val.age_mark === 0 ||val.match_mark === 0   || val.age_mark === 1 ||val.match_mark === 1
    },
  //  列表标记错误-年龄
    takeErrorA(val,type){
      this.$data.FormVisible = true;
      this.$data.dialogTitle = '标记';
      // console.log(val.id);
      this.$data.faceId = val.id;
      this.$data.errorType = type;
      // console.log(val.age_mark);
      if(val.age_mark === 0 ){
        this.$data.idOrChangeMark = 1;
        this.$data.errText = '错误';
      }else if(val.age_mark === 1){
        this.$data.idOrChangeMark = 0;
        this.$data.errText = '正确';
      }
    },
    //  列表标记错误-身份
    takeErrorB(val,type){
      this.$data.FormVisible = true;
      this.$data.dialogTitle = '标记';
      // console.log(val.id);
      this.$data.faceId = val.id;
      this.$data.errorType = type;
      // console.log(val.match_mark);
      if(val.match_mark === 0 ){
        this.$data.idOrChangeMark = 1;
        this.$data.errText = '错误';
      }else if(val.match_mark === 1){
        this.$data.idOrChangeMark = 0;
        this.$data.errText = '正确';
      }
    },
  //  标记错误确认
    submitForm(){
      let list = {
        'id': this.$data.faceId,
        'type': this.$data.errorType,
        'mark_val':this.$data.idOrChangeMark
      }
      let qs = require('querystring')
      dataCollectApi.takeErrorMark(qs.stringify(list)).then((response) => {
        console.log(response.data.errno);
        if(response.data.errno === 0){
          this.$message({
            message: '标记成功',
            type: 'success',
            center: true
          });
        };
        this.$data.FormVisible = false;
        this.dataList();
      })
    },
  //  取消操作
    cancel(){
      this.$data.FormVisible = false;
    },
  //  查看合并记录
    handleEdit(val){
      //查看合并记录之前调一次查询，防止上次已经进行一次存了
      this.onSubmit();
      //存储所有填入的值
      storage.setLocalStorage('postList',this.$data.list);
      storage.setLocalStorage('timeType',this.$data.timeType);
      storage.setLocalStorage('radio',this.$data.radio);
      this.$router.replace({name: 'MegerRecord', params: {id:val.id}})
    },
  //  删除记录
    handleDeleteThis(val){
      let list = {
        'id': val.id,
        'type':0
      }
      let qs = require('querystring')
      dataCollectApi.deletFasce(qs.stringify(list)).then((response) => {
        console.log(response.data.errno);
        if(response.data.errno === 0){
          this.$message({
            message: '删除成功',
            type: 'success',
            center: true
          });
          this.dataList();
        };

      })
    },
    //到店记录
    handleDelete(val){
      //到店记录之前调一次查询，防止上次已经进行一次存了
      this.onSubmit();
      //存储所有填入的值
      storage.setLocalStorage('postList',this.$data.list);
      storage.setLocalStorage('timeType',this.$data.timeType);
      storage.setLocalStorage('radio',this.$data.radio);
      this.$router.replace({name: 'ArriveRecord', params: {id:val.customer_id}})
    },
  //  查看百度人脸图
    manage(val){
      this.$data.FaceVisible = true;
      let list = {
        'id': val.id,
        'customer_id': val.customer_id,
      }
      let qs = require('querystring')
      dataCollectApi.getBaiduFace(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        if(response.data.data == ''){
          this.$message({
            message: '暂无百度图片信息',
            type: 'error',
            center: true
          });
        }else{
          this.$data.getBDImg = response.data.data;
        }
      })
    },
    cancelshow(){
      this.$data.FaceVisible = false;
    },
  //  清除参数填写
    clearRuleForm(){
      this.$data.ruleForm = {};
      // this.$data.list = {};
      // this.$data.list.list_type = 0;
      // this.$data.list.page = 1;
      // this.$data.list.page_size = 10;
      this.dataList();
    },
  }

}
