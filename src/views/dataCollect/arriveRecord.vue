<template>
  <div class="business-list">
    <el-table
      ref="multipleTable"
      :data="tableData3"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
      >
      </el-table-column>
      <el-table-column
        label="序号" prop="id"
      >
        <!--<template slot-scope="scope">{{ scope.row.num }}</template>-->
      </el-table-column>
      <el-table-column
        label="来客编号"
      >
        <template slot-scope="scope">{{ scope.row.customer_id }}</template>
      </el-table-column>
      <el-table-column
        label="照片"
      >
        <template slot-scope="scope">
          <img :src="scope.row.avatar_path" alt="" style="width: 6rem;height: 6rem">
        </template>
      </el-table-column>
      <el-table-column
        label="拍摄位置"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.device_name}}</span>
        </template>

      </el-table-column>
      <el-table-column
        label="门店编号"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.store_name }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages" v-if="pages.pageCount > 0">
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
      </el-pagination>
    </div>
    <el-row>
      <el-col style="text-align: center">
        <button class="btn" @click="back()" style="margin-right: 2rem">返回</button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import dataCollectApi from '@/api/dataCollect'
    export default {
        name: "arrive-record",
      data(){
          return{
            tableData3:[],
            pageThis:1,
            pages:[],
          }
      },
      created:function () {
        // 刷新时，获取动态数据 设置navmenu
        let templates = this.$parent
        templates.navMenu = this.$route.name
        templates.upperLevelMenu = ''
        this.$data.routerId = this.$route.params.id;
        this.$data.MId = this.$route.params.m_id;
        this.$data.SId = this.$route.params.s_id;
        console.log(this.$data.routerId);
        console.log(this.$data.MId);
        console.log(this.$data.SId);
        this.getArriveList();
      },
      methods:{
        getArriveList(){
          let list = {
            'customer_id': this.$data.routerId,
            'm_id':this.$data.MId,
            's_id':this.$data.SId,
            'page':this.$data.pageThis,
            'page_size':10
          }
          let qs = require('querystring')
          dataCollectApi.customerRecord(qs.stringify(list)).then((response) => {
            console.log(response.data.data);
            if(response.data.errno === -1){
              this.$message({
                message: '暂无到店记录',
                type: 'error',
                center: true
              });
            }else{
              this.$data.tableData3 = response.data.data.list;
              this.pages = response.data.data.pagination;
            }
          })
        },
        handleSelectionChange(){

        },
        handleCurrentChange(val){
          this.$data.pageThis = val;
          this.getArriveList();
        },
      //  返回主页
        back(){
          this.$router.replace({name: 'DataList',params: {id:1}})
        }
      }
    }
</script>

<style scoped>
  .btn{
    width: 5rem;
    height: 2.5rem;
    /*float: right;*/
    /*margin-right: 5rem;*/
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: #4BC076;
    color: white;
  }
  .btn:hover{
    background: #4DB076;
    color: #fff!important;
  }
</style>
