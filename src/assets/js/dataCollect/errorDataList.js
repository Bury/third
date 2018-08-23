
import * as utils from '@/utils/index'
import dataCollectApi from '@/api/dataCollect'
const cityOptions = [
  {id:0,'name':'姿态角度'},
  {id:1,'name':'光照'},
  {id:2,'name':'模糊度'},
  {id:3,'name':'遮挡'},
  {id:4,'name':'脸完整度'},
];
export default {
  name: "error-data-list",
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
      ctrlTimeType:[true,false,false,false,false],
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
      radio3:'全部',
      noFilter:true,
      yesFilter:false,
      FormVisible:false,
      dialogTitle:'',
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      faceId:'',
      errorType:'',
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
      },
      rules:{

      },
      options:[
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
      checkList:[],
      tableData3: [],
      pages:'',
      list:{
        'list_type':2,
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
        'pitch_st': '',
        'pitch_ed': '',
        'yaw_st': '',
        'yaw_ed': '',
        'roll_st': '',
        'roll_ed': '',
        'illumination_st': '',
        'illumination_ed': '',
        'blur_st': '',
        'blur_ed': '',
        'occlusion':'',
        'un_angle':0,
        'un_illumination':0,
        'un_blur':0,
        'un_occlusion':0,
        'un_completeness':0,
        'err_gender':1,
        'err_age':1,
        'err_match':1,
        'page':1,
        'page_size':10,
      },
      checkList:[],
      checkListId:[],
      errText:'',
      // un_angle:0,
      // un_illumination:0,
      // un_blur:0,
      // un_occlusion:0,
      // un_completeness:0,
    }
  },

  created:function(){
    // this.setData();
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.upperLevelMenu = ''
    this.dataList();
    this.dataBack();
  },

  methods: {
//门店下拉
    getPartList(){
      let list = {
        'type': 1,
        'parent_id': 1,
      }
      let qs = require('querystring')
      dataCollectApi.getDepartList(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
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
        console.log(response.data.data);
        this.$data.locationList = response.data.data;
      })
    },
    //数据列表
    dataList(){
      let qs = require('querystring')
      dataCollectApi.dataListFace(qs.stringify(this.$data.list)).then((response) => {
        console.log(response.data.data.list);
        this.$data.tableData3 = response.data.data.list;
        this.pages = response.data.data.pagination;
      })
    },
    //切换分页
    handleCurrentChange(val){
      this.$data.list.page = val;
      this.dataList();
    },
    //选择全部，性别等
    clickAll(){

      if(this.$data.radio3 === '全部'){
        this.$data.list.err_gender = 1;
        this.$data.list.err_age = 1;
        this.$data.list.err_match = 1;
        this.dataList();
      }else if(this.$data.radio3 === '性别'){
        this.$data.list.err_gender = 1;
        this.$data.list.err_age = 0;
        this.$data.list.err_match = 0;
        this.dataList();
      }else if(this.$data.radio3 === '年龄'){
        this.$data.list.err_gender = 0;
        this.$data.list.err_age = 1;
        this.$data.list.err_match = 0;
        this.dataList();
      }else if(this.$data.radio3 === '身份'){
        this.$data.list.err_gender = 0;
        this.$data.list.err_age = 0;
        this.$data.list.err_match = 1;
        this.dataList();
      }
    },
    //基准信息返回
    dataBack(){
      let list = {}
      let qs = require('querystring')
      dataCollectApi.dataSettingSaveBack(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.ruleForm.pitchA = response.data.data.pitch_st;
        this.$data.ruleForm.pitchB = response.data.data.pitch_ed;
        this.$data.ruleForm.yawA = response.data.data.yaw_st;
        this.$data.ruleForm.yawB = response.data.data.yaw_ed;
        this.$data.ruleForm.rollA = response.data.data.roll_st;
        this.$data.ruleForm.rollB = response.data.data.roll_ed;
        this.$data.ruleForm.illA = response.data.data.illumination_st;
        this.$data.ruleForm.illB = response.data.data.illumination_ed;
        this.$data.ruleForm.dimA = response.data.data.blur_st;
        this.$data.ruleForm.dimB = response.data.data.blur_ed;
        this.$data.ruleForm.keepOut = response.data.data.occlusion;
        this.$data.ruleForm.faceAll = response.data.data.completeness;
      })
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
    storeStatistics(d){
      let timeData = {
        time_start:d.begin_time,
        time_end:d.end_time,
      };

    },

    //特征
    statisticsFeature(parameters, types){
      let list = {
        begin_time: parameters.begin_time,
        end_time: parameters.end_time,
        feature: types
      }
      console.log(list)

    },

    //搜索
    onSubmit(){

      // this.requestData();
      console.log(this.$data.list);
      this.$data.list.merchant_id = '';
      this.$data.list.store_id = '';
      this.$data.list.device_id = '';

      //筛选信息
      this.$data.list.pitch_st= this.$data.ruleForm.pitchA,
        this.$data.list.pitch_ed=this.$data.ruleForm.pitchB,
        this.$data.list.yaw_st= this.$data.ruleForm.yawA,
        this.$data.list.yaw_ed= this.$data.ruleForm.yawB,
        this.$data.list.roll_st= this.$data.ruleForm.rollA,
        this.$data.list.roll_ed=this.$data.ruleForm.rollB,
        this.$data.list.illumination_st= this.$data.ruleForm.illA,
        this.$data.list.illumination_ed=this.$data.ruleForm.illB,
        this.$data.list.blur_st= this.$data.ruleForm.dimA,
        this.$data.list.blur_ed= this.$data.ruleForm.dimB,
        this.$data.list.occlusion= this.$data.ruleForm.keepOut,
        this.$data.list.completeness= this.$data.ruleForm.faceAll,
        //过滤异常的
        console.log(this.$data.checkAll);
      console.log(this.$data.checkedCities);
      if(this.$data.checkAll == false){
        if(this.$data.checkedCities.indexOf(0)){
          this.$data.list.un_angle = 0;
        }else{
          this.$data.list.un_angle = 1;
        }
        if(this.$data.checkedCities.indexOf(1)){
          console.log('存在')
          this.$data.list.un_illumination = 0;
        }else{
          this.$data.list.un_illumination = 1;
        }
        if(this.$data.checkedCities.indexOf(2)){
          this.$data.list.un_blur = 0;
        }else{
          this.$data.list.un_blur = 1;
        }
        if(this.$data.checkedCities.indexOf(3)){
          this.$data.list.un_occlusion = 0;
        }else{
          this.$data.list.un_occlusion = 1;
        }
        if(this.$data.checkedCities.indexOf(4)){
          this.$data.list.un_completeness = 0;
        }else{
          this.$data.list.un_completeness = 1;
        }
      }else if(this.$data.checkAll == true){
        this.$data.list.un_angle = 1;
        this.$data.list.un_illumination = 1;
        this.$data.list.un_blur = 1;
        this.$data.list.un_occlusion = 1;
        this.$data.list.un_completeness = 1;
      }
      this.dataList();
    },

    /*
    统计类型切换
    */
    cateChanged(tab, event){
      var nowIdx = tab.index;
      this.$data.ctrlTimeType = [false,false,false,false,false,false];
      this.$data.ctrlTimeType[nowIdx] = true;
      (nowIdx !== 4) && (this.$data.noTimeHide = false);
      this.setData();
    },

    //绑定默认时间
    modelDate(t){
      let d = new Date(t*1000);
      return d;
    },
    getBeginEnd(val){
      let t = new Date();
      let y = t.getFullYear();
      let m = t.getMonth() + 1;
      let d = t.getDate();
      let weekd  = t.getDay();
      switch (val){
        case "all":
          // this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`);
          // this.$data.guestParameters.end_time =  this.getS(`${y}/${m}/${d} 23:59:59`);
          // this.$data.day = this.modelDate(this.$data.guestParameters.begin_time)
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
      if(this.$data.ctrlTimeType[0] === true){
        //all
        this.$data.list.st_time = '';
        this.$data.list.ed_time = '';
        this.dataList();
        // this.getBeginEnd("day")
        // this.requestData();
        // return false;
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
      this.getCustomer(this.$data.guestParameters);
      this.statisticsFeature(this.$data.guestParameters, 'face');
      this.statisticsFeature(this.$data.guestParameters, 'buy');
      this.statisticsFeature(this.$data.guestParameters, 'age');
      this.statisticsFeature(this.$data.guestParameters, 'gender');
      this.statisticsFeature(this.$data.guestParameters, 'camera');
      this.storeStatistics(this.$data.guestParameters)
    },
//操作
    add(){
      this.$router.replace({name: 'MergeFace', params: {id:123}})
    },
    handleSelectionChange(){

    },
    //复选框
    handleCheckAllChange(val) {
      console.log(val);
      console.log(this.checkedCities)
      this.checkedCities = val ? cityOptions.name : [];
      this.isIndeterminate = false;
      if(this.$data.checkAll == false){
        this.$data.checkedCities = []
      }else if(this.$data.checkAll == true){
        this.$data.checkedCities = [0,1,2,3,4]
      }
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },

    //  列表标记错误-性别
    takeError(val,type){
      this.$data.FormVisible = true;
      this.$data.dialogTitle = '标记';
      // console.log(val.id);
      this.$data.faceId = val.id;
      this.$data.errorType = type;
      // console.log(val.gender_mark);
      if(val.gender_mark == 0 || val.age_mark === 0 ){
        this.$data.idOrChangeMark = 1;
        this.$data.errText = '错误';
      }else if(val.gender_mark == 1 || val.age_mark === 1){
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
          this.dataList();
        };
        this.$data.FormVisible = false;
      })
    },
    //  取消操作
    cancel(){
      this.$data.FormVisible = false;
    },
    //  删除记录
    handleDeleteThis(val){
      let list = {
        'id': val.id,
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

  }
}
