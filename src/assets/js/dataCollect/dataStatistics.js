import * as utils from '@/utils/index';
import dataCollectApi from '@/api/dataCollect';
import dataCharts from '@/views/dataCollect/dataCharts';
export default {
  name: "data-statistics",
  components: {
    dataCharts
  },

  data () {
    return {
      noTimeHide:false,
      goStoreNum:'',
      timeType: 'day',
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
      radioType:'姿态角度',
      guestParameters:{
				merchant_id:1,
				store_id:'',
				device_id:'',
        st_time:'',
        ed_time:'',
				tj_type:''
      },
      changeFlag:false,
      pickerOptionsSet:{
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      radio:2,
      noFilter:true,
      yesFilter:false,
      equipmentsList:[],
      locationList:[],
      checkList:[],
      location:'',
      storeId:'',
    }
  },

  created:function(){
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent;
    templates.navMenu = this.$route.name;
    templates.upperLevelMenu = '';
    this.setData();
    this.getPartList();
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
    //时间转为秒
    getS(value){
      var formatTimeS = new Date(value).getTime()/1000;
      return  formatTimeS
    },

    //到店人数
    storeStatistics(d){
      let timeData = {
        time_start:d.st_time,
        time_end:d.ed_time,
      };

    },

    //类型切换
    selectType(val){
    	if(val == "姿态角度"){
    		this.$data.guestParameters.tj_type = "";
    	}else if(val == "模糊度"){
    		this.$data.guestParameters.tj_type = "blur";
    	}else if(val == "光照值"){
    		this.$data.guestParameters.tj_type = "illumination";
    	}else if(val == "脸完整度"){
    		this.$data.guestParameters.tj_type = "completeness";
    	}else if(val == "遮挡"){
    		this.$data.guestParameters.tj_type = "occlusion";
    	}
    	this.$data.changeFlag = !this.$data.changeFlag;
    },

    //搜索
    onSubmit(){
      if(this.$data.ctrlTimeType[0]){
        if(this.$data.day == null) { return false}
        this.$data.guestParameters.st_time = this.getS(this.$data.day);
        this.$data.guestParameters.ed_time =   this.getS(this.$data.day) + 86399;

      }else if(this.$data.ctrlTimeType[1]){
        if(this.$data.week == null) { return false}
        this.$data.guestParameters.st_time = this.getS(this.$data.week);
        this.$data.guestParameters.ed_time =   this.getS(this.$data.week) + 604799;

      }else if(this.$data.ctrlTimeType[2]){
        if(this.$data.month== null) { return false}
        let nexty,nextm;
        let t = new Date(this.$data.month);
        let m = t.getMonth() + 1;
        let y = t.getFullYear();
        m === 12 ? (nexty = y + 1,nextm = 1):(nexty = y,nextm = m + 1)
        this.$data.guestParameters.st_time = t.getTime() / 1000;
        this.$data.guestParameters.ed_time =  this.getS(`${nexty}/${nextm}/01 00:00:00`) - 1;

      }else if(this.$data.ctrlTimeType[3]){
        if(this.$data.year == null) {return false;}
        let yearDate = new Date(this.$data.year);
        let y = yearDate.getFullYear();
        this.$data.guestParameters.st_time = this.getS(`${y}/01/01 00:00:00`);
        this.$data.guestParameters.ed_time =  this.getS(`${y}/12/31 23:59:59`);

      }else if(this.$data.ctrlTimeType[4]){
        if(this.$data.userDefined == null || this.$data.userDefined.length == 0) {
          this.$data.noTimeHide = true;
          return false;
        }else{
          this.$data.noTimeHide = false;
        }
        this.$data.guestParameters.st_time = utils.getDateTime(this.userDefined[0]);
        this.$data.guestParameters.ed_time =  utils.getDateTime(this.userDefined[1]);

      }
      this.$data.changeFlag = !this.$data.changeFlag;
    },

    /*
    统计类型切换
    */
    cateChanged(tab, event){
      var nowIdx = tab.index;
      this.$data.ctrlTimeType = [false,false,false,false,false];
      this.$data.ctrlTimeType[nowIdx] = true;
      (nowIdx !== 4) && (this.$data.noTimeHide = false);
      this.setData();
      this.$data.changeFlag = !this.$data.changeFlag;
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
        case "day":
          this.$data.guestParameters.st_time = this.getS(`${y}/${m}/${d} 00:00:00`);
          this.$data.guestParameters.ed_time =  this.getS(`${y}/${m}/${d} 23:59:59`);
          this.$data.day = this.modelDate(this.$data.guestParameters.st_time)
          break;
        case "week":
          if(weekd === 0){ weekd = 7 }
          this.$data.guestParameters.st_time = this.getS(`${y}/${m}/${d} 00:00:00`) - 86400*(weekd-1);
          this.$data.guestParameters.ed_time =  this.getS(`${y}/${m}/${d} 23:59:59`) + 86400*(7 - weekd);
          this.$data.week =  this.modelDate(this.$data.guestParameters.st_time)
          break;
        case "month":
          let nexty,nextm;
          m === 12 ? (nexty = y + 1,nextm = 1):(nexty = y,nextm = m + 1)
          this.$data.guestParameters.st_time = this.getS(`${y}/${m}/01 00:00:00`);
          this.$data.guestParameters.ed_time =  this.getS(`${nexty}/${nextm}/01 00:00:00`) - 1;
          this.$data.month =  this.modelDate(this.$data.guestParameters.st_time)
          break;
        case "year":
          this.$data.guestParameters.st_time = this.getS(`${y}/01/01 00:00:00`);
          this.$data.guestParameters.ed_time =  this.getS(`${y}/12/31 23:59:59`);
          this.$data.year =  this.modelDate(this.$data.guestParameters.st_time)
          break;
        case "select":
          if(this.$data.userDefined !== null && this.$data.userDefined.length !== 0){
            this.$data.noTimeHide = false;
            this.$data.guestParameters.st_time = utils.getDateTime(this.userDefined[0]);
            this.$data.guestParameters.ed_time =  utils.getDateTime(this.userDefined[1]);
          }else{
            this.$data.noTimeHide = true;
          }
          break;
      }
    },

    setData(){
      if(this.$data.ctrlTimeType[0]){
        //日
        this.getBeginEnd("day");
        return false;
      }
      if(this.$data.ctrlTimeType[1]){
        //周
        this.getBeginEnd("week")
        return false;

      }
      if(this.$data.ctrlTimeType[2]){
        //月
        this.getBeginEnd("month")
        return false;
      }
      if(this.$data.ctrlTimeType[3]){
        //年
        this.getBeginEnd("year")
        return false;
      }
      if(this.$data.ctrlTimeType[4]){
        //自定义
        this.getBeginEnd("select")
        return false;
      }

    },

    requestData(){
//       this.statisticsFeature(this.$data.guestParameters, 'face');
//       this.statisticsFeature(this.$data.guestParameters, 'buy');
//       this.statisticsFeature(this.$data.guestParameters, 'age');
//       this.statisticsFeature(this.$data.guestParameters, 'gender');
//       this.statisticsFeature(this.$data.guestParameters, 'camera');
//       this.storeStatistics(this.$data.guestParameters)
    },
//操作
    add(){
      this.$router.replace({name: 'MergeFace', params: {id:123}})
    },
    handleSelectionChange(){

    },
    //是否过滤异常
    filterBtn(){
      console.log(this.$data.radio)
      if(this.$data.radio == 1){
        this.$data.yesFilter = true;
        this.$data.noFilter = false;
      }else{
        this.$data.yesFilter = false;
        this.$data.noFilter = true;
      }

    },
  }
}
