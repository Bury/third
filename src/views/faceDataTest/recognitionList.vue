<template>
  <el-table
    ref="multipleTable"
    :data="tableData3"
    border
    tooltip-effect="dark"
    style="width: 100%;"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
    >
    </el-table-column>
    <el-table-column
      prop="id"
      label="序号"
    >
      <!--<template slot-scope="scope">-->
        <!--<span style="margin-left: 10px">{{ scope.row.num }}</span>-->
      <!--</template>-->
    </el-table-column>
    <el-table-column
      prop="group_name"
      label="对比数据1"
    >
      <!--<template slot-scope="scope" style="text-align: center">-->
        <!--<span>{{scope.row.name1}}</span>-->
      <!--</template>-->
    </el-table-column>
    <el-table-column
      prop="s_group_name"
      label="对比数据2"
    >
      <!--<template slot-scope="scope" style="text-align: center">-->
        <!--<span>{{scope.row.name2}}</span>-->
      <!--</template>-->
    </el-table-column>
    <el-table-column
      label="时间"
      show-overflow-tooltip>
      <template slot-scope="scope" style="text-align: center">
        <span>{{scope.row.created_at | date(4)}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop=""
      label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="checkOut(scope.row)">查看</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import faceDataApi from '../../api/faceDataTest'
    export default {
        name: "recognition-list",
      data(){
          return{
            tableData3: [],
          }
      },
      created: function () {
        // 刷新时，获取动态数据 设置navmenu
        let templates = this.$parent
        templates.navMenu = this.$route.name
        templates.upperLevelMenu = ''
        this.getList();
      },
      methods:{
          getList(){
            let list = {
              'group_id	':'',
              'disable_pagination':'',
              'page':1
            }
            let qs = require('querystring')
            faceDataApi.faceSoult(qs.stringify(list)).then((response) => {
              console.log(response.data.data);
              this.$data.tableData3 = response.data.data;
            })
          },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        checkOut(value){
          this.$router.replace({name: 'RecognitionResultsFound', params: {id: value.id}})
        },
      //  删除
        handleDelete(val){
          let list = {
            'id':val.id,
          }
          let qs = require('querystring')
          faceDataApi.faceGroupDelete(qs.stringify(list)).then((response) => {
            console.log(response.data.data);
            if(response.data.errno === 0){
              this.getList();
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  center: true
                });
            }
          })
        },

      }
    }
</script>

<style scoped>

</style>
