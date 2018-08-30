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
      },
      methods:{
        getOption(){
          for(var i=80;i<101;i++){
            this.$data.arr.push(i);
          }

        },
        onSubmit(){

        },
      }
    }
</script>

<style scoped>

</style>
