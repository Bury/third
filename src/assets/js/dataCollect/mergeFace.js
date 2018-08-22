import * as utils from '@/utils/index'
import dataCollectApi from '@/api/dataCollect'
export default {
  name: "merge-face",
  data(){
    return{
      routerId:'',
      tableData3: [],
      checkList:[],
      checkId:[],
      checkArr:[],
      groupId:[],
    }
  },
  created:function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.upperLevelMenu = ''
    this.$data.routerId = this.$route.params.id;
    console.log(this.$data.routerId);
    this.mergeList();
    this.$data.checkArr = this.$data.routerId.split(',');
    console.log(this.$data.checkArr);
  },
  methods:{
    mergeList(){
      let list = {
        'ids': this.$data.routerId,
      }
      let qs = require('querystring')
      dataCollectApi.needMergeData(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.tableData3 = response.data.data.list;
      })
    },
    handleSelectionChange(val){
      console.log(val)
      this.$data.checkList = val;
      console.log(this.$data.checkList[0].id);
      this.$data.checkId.push(this.$data.checkList[0].id);
      console.log(this.$data.checkId)
    },
    add(){
      for(var i=0;i<this.$data.checkId.length;i++){
        for(var j=0;j<this.$data.checkArr.length;j++){
          if(this.$data.checkArr[j]==this.$data.checkId[i]){
            this.$data.checkArr.splice(j,1);
            j--;
          }
        }
      }
      console.log(this.$data.checkArr);
      let lastArry = this.$data.checkArr.join(',');
      console.log(lastArry);
      if(this.$data.checkList.length == 1){
        console.log('选择完成');
        let list = {
          'master_id':this.$data.checkId,
          'slave_ids':lastArry
        }
        let qs = require('querystring')
        dataCollectApi.sureMerge(qs.stringify(list)).then((response) => {
          console.log(response.data.errno);
          if(response.data.errno === 0){
            this.$message({
              message: '合并成功',
              type: 'success',
              center: true
            });
          }
          this.$router.replace({name: 'DataList'})
        })
      }else{
        this.$message({
          message: '请选择一组数据作为主数据',
          type: 'error',
          center: true
        });
      }
    },
    handleDelete(val){
      console.log(val);
      this.$data.tableData3.splice(val,1);
    },
  }
}
