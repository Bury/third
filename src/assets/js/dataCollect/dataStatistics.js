import * as utils from '@/utils/index'
import VueHighcharts from 'vue2-highcharts'
import dataCollectApi from '@/api/dataCollect'
const asyncData = {
  name: '分布率',
  marker: {
    symbol: 'square'
  },
  data: [{
    name:'a',
    y:12
  },{
    name:'b',
    y:30
  },{
    name:'c',
    y:28
  },{
    name:'d',
    y:30
  },
  ]
}
export default {
  name: "data-statistics",
  components: {
    VueHighcharts
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
				tj_type:'blur'
      },
      pickerOptionsSet:{
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      radio:2,
      noFilter:true,
      yesFilter:false,
      equipmentsList:[
        {name:'关凤点',id:1},
        {name:'关凤点',id:2},
      ],
      locationList:[
        {name:'上方',id:1},
        {name:'下方',id:2}
      ],
      checkList:[],
      options: {
        chart: {
          type: 'pie'
        },
        title: {
          text: '模糊值 分布图'
        },
        subtitle: {
          text: ''
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            // allowPointSelect: true, //选中某块区域是否允许分离
            // cursor: 'pointer',
            dataLabels: {
                enabled: false //是否直接呈现数据 也就是外围显示数据与否
            },
            showInLegend: true,

            // dataLabels: {
            //   enabled: true
            // },
          }
        },
        series: []
      },
    }
  },

  created:function(){
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent;
    templates.navMenu = this.$route.name;
    templates.upperLevelMenu = '';
    this.setData();
  },

  methods: {

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
    
    //加载饼状图
    pieLoading(value){
      let pieCharts = this.$refs.pieCharts;
      pieCharts.delegateMethod('showLoading', 'Loading...');
      pieCharts.removeSeries();        
      setTimeout(() => {        
        pieCharts.hideLoading();
        pieCharts.addSeries({
        	name:"模糊度",
        	data: value
        });
      }, 2000)
    },

    //特征
    statisticsFeature(){
		  let qs = require('querystring');
			dataCollectApi.getDataTj(qs.stringify(this.$data. guestParameters)).then((res) => {
				 if(res.data.errno === 0){
				 	 if(res.data.data.length > 0){
				 	 	 let pieData = [];
				 	 	 let resData = res.data.data;
				 	 	 for(let i=0;i<resData.length;i++){
				 	 	 	 pieData.push({name:resData[i].label,y:resData[i].ratio})
				 	 	 }
				 	 	 this.pieLoading(pieData);
				 	 }
				 }else{
				 	 this.$message(res.data.msg)
				 }
			})    

    },
    
    //类型切换
    selectType(val){
    	console.log(val)
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
      this.requestData();
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
        this.statisticsFeature();
        return false;
      }
      if(this.$data.ctrlTimeType[1]){
        //周
        this.getBeginEnd("week")
        this.statisticsFeature();
        return false;

      }
      if(this.$data.ctrlTimeType[2]){
        //月
        this.getBeginEnd("month")
        this.statisticsFeature();
        return false;
      }
      if(this.$data.ctrlTimeType[3]){
        //年
        this.getBeginEnd("year")
        this.statisticsFeature();
        return false;
      }
      if(this.$data.ctrlTimeType[4]){
        //自定义
        this.getBeginEnd("select")
        this.statisticsFeature();
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
    load(){
      let lineCharts = this.$refs.lineCharts;
      lineCharts.delegateMethod('showLoading', 'Loading...');
      setTimeout(() => {
        lineCharts.addSeries(asyncData);
        lineCharts.hideLoading();
      }, 2000)
    },
  }
}
