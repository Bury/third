<template>
    <div class="clearData">
      <div class="clearData">
        <div class="table">
          <el-table stripe :data="tableData">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="门店名称"></el-table-column>
            <el-table-column prop="person_in_charge" label="门店负责人"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column label="创建时间">
              <template slot-scope="scope" v-if="scope.row.created_at">
                {{scope.row.created_at | date(2)}}
              </template>
            </el-table-column>
            <!--<el-table-column label="操作" width="150">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button type="text" size="small" @click="dele(scope.row)">删除</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
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
            :page-size="requireParams.page_size"
            :total="pagination.totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import clearDataApi from '../../api/clearData'
    export default {
        name: "storeList",
      data(){
          return{
            tableData:[],
            requireParams:{
              page:1,
              page_size:20,
              merchant_id:'',
            },
            pagination: {
              currentPage: 1,
              totalCount: 0,
            },

          }
      },
      created:function(){
        // 刷新时，获取动态数据 设置navmenu
        let templates = this.$parent
        templates.navMenu = this.$route.name
        templates.upperLevelMenu = ''
        this.list();
      },
      methods:{
          list(){
            this.$data.requireParams.merchant_id = this.$route.params.id;
            let qs = require('querystring');
            clearDataApi.storeList(qs.stringify(this.$data.requireParams)).then((res) => {
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
          this.$confirm('此操作将删除该门店所有信息，且删除的信息不可找回, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            clearDataApi.storeListClear(row.id).then((res) => {
              if (res.data.errno === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.list()
              } else {
                this.$alert(res.data.msg, {
                  type: 'error',
                  callback: action => {
                  }
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        },
        handleCurrentChange(currentPage) {
          this.$data.requireParams.page = currentPage;
          this.list();
        },
      },
    }
</script>

<style scoped>

</style>
