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
        console.log(this.$data.routerId);
        this.getArriveList();
      },
      methods:{
        getArriveList(){
          let list = {
            'customer_id': this.$data.routerId,
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
      }
    }
</script>

<style scoped>

</style>
