import * as utils from '@/utils/index';
import dataCollectApi from '@/api/dataCollect';
export default {
  name: "distinguish-statistics",
  data(){
    return{
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
      merchantId:'',
      merchantList:[],
      equipmentsList:[],
      locationList:[],
      get:{
        jd_ct:'',
        sb_ct:'',
        sbl:'',
        zq_ct:'',
        zq_sbl:'',
        cw_ct:'',
        cw_sbl:'',
        nl_cw_ct:'',
        nl_cw_sbl:'',
        xb_cw_ct:'',
        xb_cw_sbl:'',
        sk_ct:'',
        sk_sbl:''
      },
      list:{
        merchant_id:'',
        store_id:'',
        device_id:'',
        st_time:'',
        ed_time:''
      }
    }
  },
  created:function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.upperLevelMenu = '';
    this.getMerchant();
    this.dataList();
  },
  methods:{
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
    //时间转为秒
    getS(value){
      var formatTimeS = new Date(value).getTime()/1000;
      return  formatTimeS
    },

    //客流量
    getCustomer(parameters){

    },

    //数据列表
    dataList(){

      let qs = require('querystring')
      dataCollectApi.distinguishS(qs.stringify(this.$data.list)).then((response) => {
        console.log(response.data.data);
        this.$data.get = response.data.data;
      })
    },

  //  查询
    onSubmit(){
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
      this.$data.list.merchant_id = this.$data.merchantId;
      this.$data.list.store_id = this.$data.storeId ;
      this.$data.list.device_id = this.$data.location;
      this.dataList();
    },
  },
}
