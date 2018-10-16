<template>
    <div class="clearData">
      <div class="table">
        <el-table stripe :data="tableData">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="商家名称"></el-table-column>
          <el-table-column prop="fullname" label="商家全称"></el-table-column>
          <!--<el-table-column label="状态">-->
            <!--<template slot-scope="scope">-->
              <!--<el-switch inactive-value = "0" active-value="1" :value="`${scope.row.status}`"></el-switch>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="创建时间">
            <template slot-scope="scope" v-if="scope.row.created_at">
              {{scope.row.created_at | date(2)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="view(scope.row)">查看门店</el-button>
              <el-button type="text" size="small" @click="dele(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="tableData.length > 0" style="">
        <el-pagination
          style="text-align: center;margin: 2rem auto;"
          background
          class="pagination"
          layout="prev, pager, next"
          small
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-size="requestParams.page_size"
          :total="pagination.totalCount">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import clearDataApi from '../../api/clearData'
    export default {
        name: "merchantList",
      data(){
        return{
          tableData:[],
          requestParams:{
            page:1,
            page_size:20,
          },
          pagination: {
            currentPage: 1,
            totalCount: 0,
          },
          merchant_id:'',
        }
      },
      created:function(){
        // 刷新时，获取动态数据 设置navmenu
        let templates = this.$parent
        templates.navMenu = this.$route.name
        templates.upperLevelMenu = ''
        this.list();
      },
      methods: {
        list() {
          let qs = require('querystring');
          clearDataApi.merchantList(qs.stringify(this.$data.requestParams)).then((res) => {
            // console.log(res);
            if (res.data.errno === 0) {
              this.$data.tableData = res.data.data.list;
              this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
              this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
            } else {
              this.$message.error(res.data.msg);
            }
          })
        },
        dele(row) {
          let qs = require('querystring');
          this.$confirm('此操作将删除该商家所有信息，且删除的信息不可找回, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            clearDataApi.merchantListClear(qs.stringify({'merchant_id':row.id})).then((res) => {
              if (res.data.errno === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.list()
              } else {
                this.$message.error(res.data.msg)
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        },
        view(row){
          // console.log(row);
          this.$data.merchant_id = row.id;
          this.$router.push({name: 'StoreList',params:{id:row.id}});
        },
        handleCurrentChange(currentPage) {
          this.$data.requestParams.page = currentPage;
          this.list();
        },
      }
    }
</script>

<style scoped>

</style>
