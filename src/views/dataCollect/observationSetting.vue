<template>
    <div class="business-list" style="margin: 10rem auto;text-align: center">
      <div style="width: 20rem">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="基准:">
            <el-select v-model="form.region" placeholder="请选择基准值">
              <el-option v-for="item in arr" :key="item" :label="item"
                         :value="item"></el-option>
            </el-select>%
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="margin-top: 3rem">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
  import dataCollectApi from '@/api/dataCollect'
    export default {
        name: "observation-setting",
      data(){
          return{
            form:{
              region:''
            },
            arr:[],
          }
      },
      created:function () {
        // 刷新时，获取动态数据 设置navmenu
        let templates = this.$parent
        templates.navMenu = this.$route.name
        templates.upperLevelMenu = '';
        this.getOption();
        this.dataBack();
      },
      methods:{
        getOption(){
          for(var i=80;i<101;i++){
            this.$data.arr.push(i);
          }

        },
        onSubmit(){
          let list = {
            'match_set':this.$data.form.region
          }
          let qs = require('querystring')
          dataCollectApi.saveMacthSet(qs.stringify(list)).then((response) => {
            if(response.data.errno == 0){
              this.$message({
                message: '设置成功',
                type: 'success',
                center: true
              });
              this.dataBack();
            }
          })
        },
        dataBack(){
          let list = {}
          let qs = require('querystring')
          dataCollectApi.seeMacthSet(qs.stringify(list)).then((response) => {
            console.log(response.data.data.match_set);
            this.$data.form.region = response.data.data.match_set;
          })
        },
      }
    }
</script>

<style scoped>

</style>
