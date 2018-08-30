<template>
  <div class="allTop" :model="ruleForm" ref="ruleForm">
    <div  style="margin-top: 1rem">
      <div class="firstTop">
        <h4 style="margin-top: 3rem">姿态角度:</h4>
        <div style="margin-left: 2rem">
          <div class="firstTop">
            <p>上下俯仰上限范围:{{ruleForm.pitchA}}</p>
            <p style="margin-left: 2rem">上下俯仰下限范围:{{ruleForm.pitchB}}</p>
          </div>
          <div class="firstTop">
            <p>左右旋转上限范围:{{ruleForm.rollA}}</p>
            <p style="margin-left: 2rem">左右旋转下限范围:{{ruleForm.rollB}}</p>
          </div>
          <div class="firstTop">
            <p>平面旋转上限范围:{{ruleForm.yawA}}</p>
            <p style="margin-left: 2rem">平面旋转下限范围:{{ruleForm.yawB}}</p>
          </div>
        </div>
      </div>
      <div class="firstTop decond">
        <h4>光照:</h4>
        <div style="margin-right: 2rem">
          <div style="margin-left: 1rem">
            <p>上限范围:{{ruleForm.illA}}</p>
            <p>下限范围:{{ruleForm.illB}}</p>
          </div>
        </div>
      </div>
      <div class="firstTop deconds">
        <h4>模糊度:</h4>
        <div>
          <div style="margin-left: 2rem">
            <p>上限范围:{{ruleForm.dimA}}</p>
            <p>下限范围:{{ruleForm.dimB}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as utils from '@/utils/index'
  import dataCollectApi from '@/api/dataCollect'
    export default {
        name: "actual-argument",
      data(){
          return{
            ruleForm:{
              pitchA:'',
              pitchB:'',
              rollA:'',
              rollB:'',
              yawA:'',
              yawB:'',
              dimA:'',
              dimB:'',
              faceAll:'',
              keepOut:'',
              illA:'',
              illB:'',
              faceIsAll:'',
            },
          }
      },
      created:function(){
        // this.setData();
        // 刷新时，获取动态数据 设置navmenu
        let templates = this.$parent
        templates.navMenu = this.$route.name
        templates.upperLevelMenu = ''
        this.dataBack();
      },
      methods:{
        //基准信息返回
        dataBack(){
          let list = {}
          let qs = require('querystring')
          dataCollectApi.dataSettingSaveBack(qs.stringify(list)).then((response) => {
            console.log(response.data.data);
            this.$data.ruleForm.pitchA = response.data.data.pitch_st;
            this.$data.ruleForm.pitchB = response.data.data.pitch_ed;
            this.$data.ruleForm.yawA = response.data.data.yaw_st;
            this.$data.ruleForm.yawB = response.data.data.yaw_ed;
            this.$data.ruleForm.rollA = response.data.data.roll_st;
            this.$data.ruleForm.rollB = response.data.data.roll_ed;
            this.$data.ruleForm.illA = response.data.data.illumination_st;
            this.$data.ruleForm.illB = response.data.data.illumination_ed;
            this.$data.ruleForm.dimA = response.data.data.blur_st;
            this.$data.ruleForm.dimB = response.data.data.blur_ed;
            this.$data.ruleForm.keepOut = response.data.data.occlusion;
            this.$data.ruleForm.faceAll = response.data.data.completeness;
          })
        },
      },
    }
</script>

<style scoped>
  .allTop{
    width: 40rem;
    margin-left: 3rem;
    /*border:1px solid red;*/
    display: flex;
    justify-content: space-around;
  }
  .firstTop{
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
  }
  .decond{
    margin-right: 9rem;
  }
  .deconds{
    margin-right: 11rem;
  }
  .getRed{
    color: #bd2c00;
  }
  .getInYellow{
    color: #800080;
  }
</style>
